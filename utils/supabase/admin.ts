import { createClient } from '@supabase/supabase-js'

/**
 * Server-side admin client using the Service Role key.
 * ONLY import this in Server Actions / Route Handlers — never in client components.
 * The service role key bypasses Row Level Security, allowing unauthenticated inserts.
 */
export function createAdminClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://kfjxxeimpzhjqqmdklyl.supabase.co'

  // Service role key — bypasses RLS. Must NEVER be exposed to the browser.
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY ||
    ''

  // If no service role key, fall back to the publishable/anon key
  // (insert will then require a permissive RLS policy on the quotes table)
  const key =
    serviceRoleKey ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    'sb_publishable_6H1XsbZ6CdxDDIe_AysdMw_ETsrKPm1'

  return createClient(supabaseUrl, key, {
    auth: {
      // Disable session persistence — this is a pure server-side client
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
