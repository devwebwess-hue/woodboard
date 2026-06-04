'use server'

import { createClient } from '@/utils/supabase/server'

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
 * Called from the 'use client' quote page with no Supabase code in the browser.
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
  if (!data.company_name?.trim()) return { success: false, error: 'Le nom de l\'entreprise est requis.' }
  if (!data.contact_name?.trim())  return { success: false, error: 'Le nom du contact est requis.' }
  if (!data.email?.trim())         return { success: false, error: 'L\'adresse email est requise.' }
  if (!data.project_specs?.trim()) return { success: false, error: 'Les spécifications du projet sont requises.' }

  // ── Basic email format check ──────────────────────────────────────
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    return { success: false, error: 'Adresse email invalide.' }
  }

  // ── Both vars now have real fallback credentials in server.ts ───────────────────
  const payload = {
    company_name:  data.company_name.trim(),
    contact_name:  data.contact_name.trim(),
    email:         data.email.trim().toLowerCase(),
    phone:         data.phone?.trim() ?? '',
    material_type: data.material_type?.trim() ||
      (cartItems.length > 0 ? cartItems[0].category : null),
    project_specs: data.project_specs.trim(),
    // Store the full cart as JSONB so the sales team sees exactly what was requested
    cart_items:    cartItems,
    cart_summary:  cartItems
      .map((i) => `${i.name} (${i.category} · ${i.finish})`)
      .join(', ') || null,
    submitted_at:  new Date().toISOString(),
  }

  // ── Insert into Supabase ──────────────────────────────────────────
  try {
    const supabase = await createClient()
    const { error } = await supabase.from('quotes').insert([payload])

    if (error) {
      console.error('[submitQuoteAction] Supabase insert error:', error)
      return {
        success: false,
        error: `Erreur base de données : ${error.message}`,
      }
    }

    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur serveur inconnue.'
    console.error('[submitQuoteAction] Unexpected error:', err)
    return { success: false, error: message }
  }
}
