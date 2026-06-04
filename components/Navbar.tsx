'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight } from 'lucide-react'
import { useQuote } from '@/context/QuoteContext'

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Catalogue', href: '/catalog' },
  { label: 'À Propos', href: '/about' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { items } = useQuote()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Routes with a light/white background need a permanent dark navbar
  const isLightRoute = pathname !== '/'
  const solidBg = isLightRoute || scrolled

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          solidBg
            ? 'bg-[#1A1C20] border-b border-white/10 shadow-xl shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between">

          {/* Logotype */}
          <Link href="/" className="group flex flex-col leading-none">
            <span
              className="text-white font-light tracking-[0.52em] text-[0.78rem] uppercase transition-colors duration-300 group-hover:text-[#D9A05B]"
            >
              WOOD BOARD
            </span>
            <span className="text-white/25 text-[7px] tracking-[0.4em] uppercase mt-0.5 font-light">
              Interior Design Panel
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[10.5px] tracking-[0.22em] uppercase font-medium transition-colors duration-300 py-1 ${
                  pathname === link.href
                    ? 'text-[#D9A05B]'
                    : 'text-white/55 hover:text-white'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#D9A05B]"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/quote"
              id="nav-cta-devis"
              className="hidden md:inline-flex items-center gap-2 border border-white/22 hover:border-[#D9A05B] hover:text-[#D9A05B] text-white text-[10px] tracking-[0.2em] uppercase font-semibold px-5 py-2.5 transition-all duration-300"
            >
              Demander un Devis
              {items.length > 0 && (
                <span className="bg-[#D9A05B] text-white text-[8px] font-black w-4.5 h-4.5 flex items-center justify-center rounded-full leading-none ml-1">
                  {items.length}
                </span>
              )}
              <ChevronRight size={12} />
            </Link>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden text-white hover:text-[#D9A05B] transition-colors p-1"
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#1A1C20] md:hidden flex flex-col"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-between px-7 h-[68px] border-b border-white/8">
                <span className="text-white/30 text-[9px] tracking-[0.4em] uppercase font-light">Menu</span>
                <button onClick={() => setMobileOpen(false)} className="text-white/50 hover:text-white transition-colors">
                  <X size={18} />
                </button>
              </div>

              <nav className="flex flex-col px-7 py-8 gap-0">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.07 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between py-4 border-b border-white/6 text-[11px] tracking-[0.25em] uppercase font-medium transition-colors ${
                        pathname === link.href ? 'text-[#D9A05B]' : 'text-white/50 hover:text-white'
                      }`}
                    >
                      {link.label}
                      <ChevronRight size={12} className="text-white/20" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                className="mt-auto px-7 pb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/quote"
                  className="flex items-center justify-center gap-2 border border-[#D9A05B]/40 hover:border-[#D9A05B] text-[#D9A05B]/70 hover:text-[#D9A05B] text-[10px] tracking-[0.22em] uppercase font-semibold py-3.5 w-full transition-all duration-300"
                >
                  Demander un Devis
                  {items.length > 0 && (
                    <span className="bg-[#D9A05B] text-white text-[8px] font-black w-4.5 h-4.5 flex items-center justify-center rounded-full leading-none">
                      {items.length}
                    </span>
                  )}
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
