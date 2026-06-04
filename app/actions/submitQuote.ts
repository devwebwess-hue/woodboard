'use server'

import { createAdminClient } from '@/utils/supabase/admin'

export interface CartItem {
  id: string
  name: string
  category: string
  finish: string
  dimensions: string
  thicknesses: string[]
  gradient: string
}

export interface SubmitQuoteResult {
  success: boolean
  error?: string
}

export async function submitQuoteAction(
  data: {
    company_name: string
    contact_name: string
    email: string
    phone: string
    material_type: string
    project_specs: string
  },
  cartItems: CartItem[]
): Promise<SubmitQuoteResult> {

  // ── 1. Server-side validation ────────────────────────────────────
  if (!data.company_name?.trim())
    return { success: false, error: "Le nom de l'entreprise est requis." }
  if (!data.contact_name?.trim())
    return { success: false, error: 'Le nom du contact est requis.' }
  if (!data.email?.trim())
    return { success: false, error: "L'adresse email est requise." }
  if (!data.project_specs?.trim())
    return { success: false, error: 'Les spécifications du projet sont requises.' }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email))
    return { success: false, error: 'Adresse email invalide.' }

  // ── 2. Build the row ─────────────────────────────────────────────
  const payload = {
    company_name:  data.company_name.trim(),
    contact_name:  data.contact_name.trim(),
    email:         data.email.trim().toLowerCase(),
    phone:         data.phone?.trim() || null,
    material_type: data.material_type?.trim() ||
      (cartItems.length > 0 ? cartItems[0].category : null),
    project_specs: data.project_specs.trim(),
    cart_items:    cartItems,
    cart_summary:  cartItems.length > 0
      ? cartItems.map((i) => `${i.name} (${i.category} · ${i.finish})`).join(', ')
      : null,
    // submitted_at removed — Supabase auto-populates created_at
  }

  console.log('=== [submitQuoteAction] START ===')
  console.log('company:', payload.company_name)
  console.log('email:  ', payload.email)
  console.log('items:  ', cartItems.length)

  // ── 3. Instantiate client ────────────────────────────────────────
  let supabase: ReturnType<typeof createAdminClient>
  try {
    supabase = createAdminClient()
    console.log('[submitQuoteAction] Admin client created OK')
  } catch (clientErr) {
    const msg = clientErr instanceof Error ? clientErr.message : String(clientErr)
    console.error('[submitQuoteAction] FAILED to create admin client:', msg)
    return { success: false, error: `Client error: ${msg}` }
  }

  // ── 4. Insert ────────────────────────────────────────────────────
  try {
    const { data: rows, error, status, statusText } = await supabase
      .from('quotes')
      .insert([payload])
      .select()

    console.log('[submitQuoteAction] Insert response — status:', status, statusText)

    if (error) {
      // Log every field so nothing is hidden
      console.error('=== SUPABASE INSERT ERROR ===')
      console.error('code:   ', error.code)
      console.error('message:', error.message)
      console.error('details:', error.details)
      console.error('hint:   ', error.hint)
      return {
        success: false,
        error: `DB error [${error.code}]: ${error.message}${error.hint ? ` — Hint: ${error.hint}` : ''}`,
      }
    }

    console.log('[submitQuoteAction] SUCCESS — row id:', rows?.[0]?.id ?? 'no id returned')
    return { success: true }

  } catch (insertErr) {
    const msg = insertErr instanceof Error ? insertErr.message : String(insertErr)
    console.error('[submitQuoteAction] EXCEPTION during insert:', msg)
    return { success: false, error: `Insert exception: ${msg}` }
  }
}
