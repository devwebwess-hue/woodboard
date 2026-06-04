import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { QuoteProvider } from '@/context/QuoteContext'

// ── Self-hosted via next/font — zero render-blocking Google Fonts request ──
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  preload: true,
})

// ── SEO metadata ───────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'Wood Board — Interior Design Panel',
    template: '%s | Wood Board',
  },
  description:
    "Importateur européen de panneaux MDF, Mélamine et plans de travail premium. Qualité architecturale pour les professionnels algériens de l'aménagement intérieur. Beni Merad, Blida.",
  keywords: [
    'panneaux MDF Algérie',
    'mélamine premium',
    'plans de travail',
    'Blida',
    'Beni Merad',
    'interior design panel',
    'importateur européen',
    'B2B matériaux',
  ],
  openGraph: {
    title: 'Wood Board — Interior Design Panel',
    description:
      'Importateur européen de panneaux MDF, Mélamine et plans de travail premium.',
    type: 'website',
    locale: 'fr_DZ',
  },
  // Prevents FOUC on mobile
  formatDetection: { telephone: false },
}

// ── Viewport — separate export per Next.js 14 spec ─────────────────────────
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1A1C20',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        {/* DNS prefetch + preconnect for Supabase API calls */}
        <link rel="dns-prefetch" href="https://kfjxxeimpzhjqqmdklyl.supabase.co" />
        <link rel="preconnect" href="https://kfjxxeimpzhjqqmdklyl.supabase.co" />
      </head>
      <body className={`${inter.className} antialiased bg-white text-[#1A1C20]`}>
        <QuoteProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </QuoteProvider>

        {/*
          Any future third-party scripts go here with strategy="lazyOnload"
          so they never block the initial render.
          Example:
          <Script src="https://..." strategy="lazyOnload" />
        */}
      </body>
    </html>
  )
}
