import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { QuoteProvider } from '@/context/QuoteContext'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

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
    description: 'Importateur européen de panneaux MDF, Mélamine et plans de travail premium.',
    type: 'website',
    locale: 'fr_DZ',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-[#1A1C20]">
        <QuoteProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </QuoteProvider>
      </body>
    </html>
  )
}
