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

/**
 * Server Action — inserts a B2B quote request into Supabase.
 * Uses the admin client (service role key) so RLS never blocks the insert.
 * Zero Supabase code reaches the browser.
 */
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

  // ── Server-side validation ────────────────────────────────────────
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

  // ── Build the row ─────────────────────────────────────────────────
  const payload = {
    company_name:  data.company_name.trim(),
    contact_name:  data.contact_name.trim(),
    email:         data.email.trim().toLowerCase(),
    phone:         data.phone?.trim() || null,
    material_type: data.material_type?.trim() ||
      (cartItems.length > 0 ? cartItems[0].category : null),
    project_specs: data.project_specs.trim(),
    cart_items:    cartItems,          // JSONB column
    cart_summary:  cartItems.length > 0
      ? cartItems.map((i) => `${i.name} (${i.category} · ${i.finish})`).join(', ')
      : null,
    submitted_at:  new Date().toISOString(),
  }

  console.log('[submitQuoteAction] Payload ready — attempting Supabase insert:', {
    company: payload.company_name,
    email:   payload.email,
    items:   cartItems.length,
  })

  // ── Insert via admin client (bypasses RLS) ────────────────────────
  try {
    const supabase = createAdminClient()
    const { data: inserted, error } = await supabase
      .from('quotes')
      .insert([payload])
      .select()   // returns inserted row so we can confirm success

    if (error) {
      console.error('[submitQuoteAction] Supabase error:', {
        code:    error.code,
        message: error.message,
        details: error.details,
        hint:    error.hint,
      })
      return {
        success: false,
        error: `Erreur base de données (${error.code}): ${error.message}`,
      }
    }

    console.log('[submitQuoteAction] Insert successful. Row id:', inserted?.[0]?.id)
    return { success: true }

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[submitQuoteAction] Unexpected exception:', msg)
    return { success: false, error: msg }
  }
}
