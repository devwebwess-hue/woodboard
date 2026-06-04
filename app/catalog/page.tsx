'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowRight, Filter } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import type { ProductCardProps } from '@/components/ProductCard'
import Link from 'next/link'
import { BackButton } from '@/components/BackButton'
import { useQuote } from '@/context/QuoteContext'

type Product = Omit<ProductCardProps, 'onAddToQuote'>

/* ─── Product data ──────────────────────────────────────────────── */
const PRODUCTS: Product[] = [
  {
    id: '1', name: 'MDF Standard Brut', category: 'MDF',
    thicknesses: ['12mm', '16mm', '18mm'], dimensions: '2440 × 1220 mm', finish: 'Brut',
    description: "Panneau MDF haute densité brut, idéal pour la fabrication de mobilier, l'ébénisterie et les projets de construction intérieure.",
    gradient: 'linear-gradient(145deg, #E8DFD0 0%, #D0C5B0 50%, #B8AA94 100%)',
  },
  {
    id: '2', name: 'Mélamine Chêne Naturel', category: 'Melamine',
    thicknesses: ['16mm', '18mm'], dimensions: '2800 × 2070 mm', finish: 'Premier Matt',
    description: 'Décor chêne authentique finition mate douce pour un rendu naturel et chaleureux dans vos espaces de vie.',
    gradient: 'linear-gradient(145deg, #A0855C 0%, #8B6E45 50%, #6B5130 100%)',
  },
  {
    id: '3', name: 'High Gloss Blanc Absolu', category: 'Melamine',
    thicknesses: ['18mm'], dimensions: '2800 × 2070 mm', finish: 'High Gloss',
    description: 'Surface ultra-brillante effet laqué, blanc pur pour cuisines et mobiliers contemporains de haut standing.',
    gradient: 'linear-gradient(145deg, #F8F8F8 0%, #EBEBEB 50%, #D8D8D8 100%)',
  },
  {
    id: '4', name: 'Super Matt Anthracite', category: 'Melamine',
    thicknesses: ['12mm', '16mm', '18mm'], dimensions: '2800 × 2070 mm', finish: 'Super Matt',
    description: 'Finition ultra-mate anthracite, anti-empreintes et résistante aux rayures pour un design épuré et sophistiqué.',
    gradient: 'linear-gradient(145deg, #484848 0%, #303030 50%, #1A1A1A 100%)',
  },
  {
    id: '5', name: 'Noyer Américain Premium', category: 'Melamine',
    thicknesses: ['16mm', '18mm'], dimensions: '2440 × 1220 mm', finish: 'Premier Matt',
    description: "Décor noyer américain aux veines profondes et expressives pour un mobilier de caractère et d'élégance.",
    gradient: 'linear-gradient(145deg, #5C4033 0%, #44301F 50%, #2E200E 100%)',
  },
  {
    id: '6', name: 'Plan de Travail Marbre Blanc', category: 'Worktop',
    thicknesses: ['22mm', '38mm'], dimensions: '3600 × 600 mm', finish: 'High Gloss',
    description: "Décor marbre blanc de Carrare, surface post-formée résistante à la chaleur et à l'humidité pour cuisines professionnelles.",
    gradient: 'linear-gradient(145deg, #F0EEE8 0%, #E0DDD4 50%, #C4C0B4 100%)',
  },
  {
    id: '7', name: 'MDF Hydrofuge (HMR)', category: 'MDF',
    thicknesses: ['12mm', '16mm', '18mm', '22mm'], dimensions: '2440 × 1220 mm', finish: 'Brut',
    description: 'Panneau MDF traité hydrofuge HMR, adapté aux espaces humides : salles de bain, cuisines, agencements extérieurs couverts.',
    gradient: 'linear-gradient(145deg, #5A6B4F 0%, #3D4E35 50%, #2A3824 100%)',
  },
  {
    id: '8', name: 'Mélamine Béton Gris', category: 'Melamine',
    thicknesses: ['16mm', '18mm'], dimensions: '2800 × 2070 mm', finish: 'Super Matt',
    description: 'Décor effet béton mat contemporain, tendance industrielle et urbaine pour meubles, cloisons et fonds de hotte.',
    gradient: 'linear-gradient(145deg, #8A8A8A 0%, #6A6A6A 50%, #4A4A4A 100%)',
  },
  {
    id: '9', name: 'Plan de Travail Chêne Massif', category: 'Worktop',
    thicknesses: ['27mm', '40mm'], dimensions: '3600 × 900 mm', finish: 'Naturel Huilé',
    description: 'Plan de travail chêne massif traité huile naturelle pour une résistance optimale et un aspect authentique durable.',
    gradient: 'linear-gradient(145deg, #9E7B5A 0%, #7A5C3E 50%, #5C4030 100%)',
  },
  {
    id: '10', name: 'MDF Peint Blanc Signal', category: 'MDF',
    thicknesses: ['12mm', '16mm'], dimensions: '2440 × 1220 mm', finish: 'Laqué',
    description: 'MDF poncé et apprêté blanc signal RAL 9003, prêt pour finition laquée ou peint. Idéal pour menuiseries et portes.',
    gradient: 'linear-gradient(145deg, #F5F5F5 0%, #E8E8E8 50%, #D5D5D5 100%)',
  },
  {
    id: '11', name: 'Mélamine Rose Blush', category: 'Melamine',
    thicknesses: ['16mm', '18mm'], dimensions: '2800 × 2070 mm', finish: 'Premier Matt',
    description: 'Coloris rose blush tendance finition mate veloutée, pour dressings, têtes de lit et mobilier résidentiel contemporain.',
    gradient: 'linear-gradient(145deg, #D4A5A0 0%, #B88C88 50%, #9A7070 100%)',
  },
  {
    id: '12', name: 'Plan de Travail Quartz Noir', category: 'Worktop',
    thicknesses: ['30mm', '38mm'], dimensions: '3600 × 650 mm', finish: 'Super Matt',
    description: 'Plan de travail stratifié décor quartz noir mat anti-empreintes, résistant aux chocs thermiques.',
    gradient: 'linear-gradient(145deg, #2A2A2A 0%, #1A1A1A 50%, #0A0A0A 100%)',
  },
]

const CATEGORIES = ['Tous', 'MDF', 'Melamine', 'Worktop'] as const
const THICKNESSES = ['Toutes', '12mm', '16mm', '18mm', '22mm', '27mm', '38mm'] as const
type Category = (typeof CATEGORIES)[number]
type Thickness = (typeof THICKNESSES)[number]

const categoryLabel = (cat: string) => {
  if (cat === 'Tous') return 'Tous les produits'
  if (cat === 'Worktop') return 'Plans de Travail'
  return cat
}

/* ─── Check SVG ─────────────────────────────────────────────────── */
function CheckIcon() {
  return (
    <svg width="9" height="7" viewBox="0 0 9 7" fill="none" aria-hidden="true">
      <path d="M1 3.5l2.5 2.5L8 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function CatalogPage() {
  /* All hooks unconditionally at top */
  const { items: cartItems } = useQuote()   // ← single source of truth
  const [selectedCategory, setSelectedCategory] = useState<Category>('Tous')
  const [selectedThickness, setSelectedThickness] = useState<Thickness>('Toutes')
  const [searchQuery, setSearchQuery] = useState('')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const catMatch = selectedCategory === 'Tous' || p.category === selectedCategory
      const thickMatch = selectedThickness === 'Toutes' || (p.thicknesses || []).includes(selectedThickness)
      const q = searchQuery.toLowerCase()
      const searchMatch =
        !q ||
        (p.name || '').toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q) ||
        (p.finish || '').toLowerCase().includes(q)
      return catMatch && thickMatch && searchMatch
    })
  }, [selectedCategory, selectedThickness, searchQuery])

  const hasActiveFilters = selectedCategory !== 'Tous' || selectedThickness !== 'Toutes'

  const reset = () => {
    setSelectedCategory('Tous')
    setSelectedThickness('Toutes')
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen bg-[#F9F9F6] pt-[68px]">

      {/* Page header */}
      <div className="bg-[#1A1C20] text-white py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <BackButton className="text-white/45 hover:text-white" />
          </div>
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-10 bg-[#D9A05B]/60" aria-hidden="true" />
            <span className="text-[#D9A05B]/70 text-[9px] font-semibold tracking-[0.4em] uppercase">
              B2B Catalogue
            </span>
          </div>
          <h1 className="font-sans font-black text-4xl md:text-5xl tracking-tight mb-4">
            Catalogue Matériaux
          </h1>
          <p className="text-white/40 text-lg max-w-2xl leading-relaxed">
            Filtrez par catégorie et épaisseur pour identifier la solution idéale à votre projet. Prix et disponibilité sur demande de devis.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">

        {/* ── Search bar + desktop filter pill ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="relative flex-1 max-w-lg">
            <Search size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            <input
              id="catalog-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un produit, finition, catégorie…"
              className="w-full pl-7 pr-4 pb-2.5 pt-1 border-0 border-b border-zinc-300 bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#D9A05B] transition-colors duration-200 rounded-none"
              aria-label="Rechercher dans le catalogue"
            />
          </div>

          {/* Desktop-only filter badge showing active count */}
          {hasActiveFilters && (
            <button
              onClick={reset}
              className="hidden md:flex items-center gap-2 text-[10px] font-bold tracking-[0.18em] uppercase text-[#D9A05B] border border-[#D9A05B]/30 px-4 py-2 hover:bg-[#D9A05B]/10 transition-colors"
            >
              <X size={10} />
              Réinitialiser
            </button>
          )}
        </div>

        {/* ── MOBILE: Fixed floating filter button (bottom of screen) ── */}
        <div className="md:hidden">
          <button
            id="mobile-filter-fab"
            onClick={() => setShowMobileFilters(true)}
            aria-haspopup="dialog"
            aria-expanded={showMobileFilters}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2.5 bg-[#1A1C20] text-white text-[10px] font-bold tracking-[0.22em] uppercase px-6 py-3.5 shadow-2xl shadow-black/30 border border-white/10 rounded-full transition-all active:scale-95"
          >
            <Filter size={13} className="text-[#D9A05B]" />
            Filtres &amp; Catégorie
            {hasActiveFilters && (
              <span className="ml-1 bg-[#D9A05B] text-[#1A1C20] text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {(selectedCategory !== 'Tous' ? 1 : 0) + (selectedThickness !== 'Toutes' ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        {/* ── MOBILE: Full-screen bottom sheet ── */}
        <AnimatePresence>
          {showMobileFilters && (
            <>
              {/* Backdrop */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                onClick={() => setShowMobileFilters(false)}
                aria-hidden="true"
              />

              {/* Sheet */}
              <motion.div
                key="sheet"
                id="mobile-filters-drawer"
                role="dialog"
                aria-modal="true"
                aria-label="Filtres du catalogue"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl max-h-[85vh] overflow-y-auto"
              >
                {/* Handle bar */}
                <div className="flex justify-center pt-3 pb-1">
                  <div className="w-10 h-1 rounded-full bg-zinc-200" />
                </div>

                <div className="px-6 pt-4 pb-10 space-y-8">
                  {/* Header row */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-black text-[#1A1C20] tracking-tight">Filtrer le catalogue</h2>
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 transition-colors"
                      aria-label="Fermer les filtres"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  {/* Category */}
                  <div>
                    <h3 className="text-[9px] font-black text-zinc-400 tracking-[0.35em] uppercase mb-4">
                      Catégorie
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`flex items-center gap-2.5 py-3 px-4 border transition-all text-xs font-medium ${
                            selectedCategory === cat
                              ? 'border-[#D9A05B] bg-[#D9A05B]/8 text-[#1A1C20] font-semibold'
                              : 'border-zinc-200 text-zinc-500 bg-zinc-50'
                          }`}
                        >
                          <div
                            className={`w-3.5 h-3.5 flex items-center justify-center flex-shrink-0 transition-all ${
                              selectedCategory === cat ? 'bg-[#D9A05B]' : 'border border-zinc-300'
                            }`}
                          >
                            {selectedCategory === cat && (
                              <svg width="8" height="6" viewBox="0 0 9 7" fill="none" aria-hidden="true">
                                <path d="M1 3.5l2.5 2.5L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                          <span>{categoryLabel(cat)}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Thickness */}
                  <div>
                    <h3 className="text-[9px] font-black text-zinc-400 tracking-[0.35em] uppercase mb-4">
                      Épaisseur / Taille
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {THICKNESSES.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedThickness(t)}
                          className={`text-[10px] font-bold tracking-[0.15em] uppercase px-4 py-2.5 border transition-all ${
                            selectedThickness === t
                              ? 'bg-[#1A1C20] text-white border-[#1A1C20]'
                              : 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    {hasActiveFilters && (
                      <button
                        onClick={() => { reset(); setShowMobileFilters(false) }}
                        className="flex-1 flex items-center justify-center gap-2 border border-zinc-200 text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase py-3.5 hover:border-red-300 hover:text-red-500 transition-colors"
                      >
                        <X size={11} />
                        Réinitialiser
                      </button>
                    )}
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="flex-1 bg-[#1A1C20] hover:bg-[#D9A05B] text-white text-[10px] font-bold tracking-[0.2em] uppercase py-3.5 transition-colors"
                    >
                      Voir {filtered.length} produit{filtered.length !== 1 ? 's' : ''}
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="flex gap-12">

          {/* ── Sidebar ── */}
          <aside className="w-44 flex-shrink-0 hidden md:block" aria-label="Filtres catalogue">
            <div className="sticky top-24 space-y-10">

              {/* Category */}
              <div>
                <h2 className="text-[9px] font-black text-zinc-400 tracking-[0.3em] uppercase mb-5">
                  Catégorie
                </h2>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      id={`filter-cat-${cat.toLowerCase()}`}
                      onClick={() => setSelectedCategory(cat)}
                      className="flex items-center gap-3 w-full text-left py-2 group transition-colors"
                    >
                      <div
                        className={`w-3.5 h-3.5 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                          selectedCategory === cat
                            ? 'bg-[#D9A05B] border border-[#D9A05B]'
                            : 'border border-zinc-300 group-hover:border-zinc-400'
                        }`}
                      >
                        {selectedCategory === cat && <CheckIcon />}
                      </div>
                      <span
                        className={`text-sm transition-colors duration-150 ${
                          selectedCategory === cat
                            ? 'text-[#1A1C20] font-semibold'
                            : 'text-zinc-400 group-hover:text-zinc-600'
                        }`}
                      >
                        {categoryLabel(cat)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Thickness */}
              <div>
                <h2 className="text-[9px] font-black text-zinc-400 tracking-[0.3em] uppercase mb-5">
                  Épaisseur
                </h2>
                <div className="flex flex-wrap gap-2">
                  {THICKNESSES.map((t) => (
                    <button
                      key={t}
                      id={`filter-thickness-${t.replace('mm', '').replace('Toutes', 'all')}`}
                      onClick={() => setSelectedThickness(t)}
                      className={`text-[9px] font-black tracking-[0.15em] uppercase px-3 py-1.5 rounded-full transition-all duration-200 ${
                        selectedThickness === t
                          ? 'bg-[#1A1C20] text-white'
                          : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset */}
              {hasActiveFilters && (
                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 text-[10px] text-zinc-400 hover:text-[#D9A05B] transition-colors tracking-wide"
                  id="filter-reset"
                >
                  <X size={10} />
                  Réinitialiser
                </button>
              )}
            </div>
          </aside>

          {/* ── Product grid ── */}
          <div className="flex-1 min-w-0">

            {/* Meta bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
              <p className="text-zinc-400 text-sm">
                <span className="font-bold text-[#1A1C20]">{filtered.length}</span>{' '}
                produit{filtered.length !== 1 ? 's' : ''}
              </p>
              {/* Meta bar — driven by global cart state, always in sync */}
              {cartItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-xs text-zinc-500 font-medium">
                    {cartItems.length} sélectionné{cartItems.length > 1 ? 's' : ''}
                  </span>
                  <Link
                    href="/quote"
                    id="catalog-go-to-devis"
                    className="inline-flex items-center gap-1.5 text-[9px] font-bold tracking-[0.18em] uppercase bg-[#D9A05B] text-white px-4 py-2 hover:bg-[#c48a40] transition-colors"
                  >
                    Demander un Devis
                    <ArrowRight size={10} />
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-28">
                <Filter size={32} className="mx-auto text-zinc-300 mb-5" />
                <p className="text-[#1A1C20] font-bold text-xl tracking-tight mb-2">
                  Aucun produit trouvé
                </p>
                <p className="text-zinc-400 text-sm mb-7">
                  Modifiez vos filtres ou votre recherche.
                </p>
                <button
                  onClick={reset}
                  className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D9A05B] hover:underline"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
                <AnimatePresence mode="popLayout">
                  {filtered.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.22 }}
                    >
                      <ProductCard {...product} onAddToQuote={handleAddToQuote} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
