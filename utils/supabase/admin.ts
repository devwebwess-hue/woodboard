import { createClient } from '@supabase/supabase-js'

/**
 * Server-side admin client — NEVER imported in client components.
 * Uses hardcoded fallbacks so createClient() never receives undefined.
 */
export function createAdminClient() {
  // Hardcoded fallbacks guarantee a valid string even if env vars are missing
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://kfjxxeimpzhjqqmdklyl.supabase.co'

  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    'sb_publishable_6H1XsbZ6CdxDDIe_AysdMw_ETsrKPm1'

  console.log('[createAdminClient] url prefix:', supabaseUrl.slice(0, 30))

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
