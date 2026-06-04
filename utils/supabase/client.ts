import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

/**
 * Returns a Supabase browser client, or null if env vars are not configured.
 * This prevents build-time crashes during Next.js static analysis / prerendering.
 */
export function createClient() {
  // Only instantiate the real client when both vars are present AND we're in a browser context.
  // During Next.js SSR prerendering, typeof window === 'undefined', so we bail out early.
  if (
    typeof window === 'undefined' ||
    !supabaseUrl ||
    !supabaseKey ||
    supabaseUrl.includes('placeholder') ||
    supabaseUrl.includes('your-project')
  ) {
    return null
  }

  return createBrowserClient(supabaseUrl, supabaseKey)
}
