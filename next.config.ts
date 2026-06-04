import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // ── Compiler optimisations ─────────────────────────────────────────
  compiler: {
    // Remove console.log in production (keep console.error/warn)
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },

  // ── Tree-shake large packages — only ship used icons/components ────
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@supabase/supabase-js',
    ],
  },

  // ── Image optimisation ─────────────────────────────────────────────
  images: {
    formats: ['image/avif', 'image/webp'],   // AVIF first, WebP fallback
    minimumCacheTTL: 31536000,               // 1 year cache for optimised images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // ── Headers — cache static assets aggressively ─────────────────────
  async headers() {
    return [
      {
        source: '/:path*.{js,css,woff2,png,jpg,avif,webp,svg,ico}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
