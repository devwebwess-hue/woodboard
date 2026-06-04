import { createClient } from '@supabase/supabase-js'

/**
 * Server-side admin client — NEVER imported in client components.
 * Uses hardcoded fallbacks so createClient() never receives undefined.
 */
export function createAdminClient() {
  const supabaseUrl = 'https://kfjxxeimpzhjqqmdklyl.supabase.co'
  const supabaseKey  = 'sb_publishable_6H1XsbZ6CdxDDIe_AysdMw_ETsrKPm1'

  console.log('[createAdminClient] using url:', supabaseUrl)

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
