'use client'

import { motion } from 'framer-motion'
import { Ruler, Layers, Check } from 'lucide-react'
import { BrandRibbon } from './BrandRibbon'
import { useQuote } from '@/context/QuoteContext'

export interface ProductCardProps {
  id: string
  name: string
  category: string
  thicknesses: string[]
  dimensions: string
  finish: string
  description: string
  gradient: string
  onAddToQuote?: (id: string) => void
}

export default function ProductCard({
  id,
  name,
  category,
  thicknesses,
  dimensions,
  finish,
  description,
  gradient,
  onAddToQuote,
}: ProductCardProps) {
  const { items, toggleProduct } = useQuote()
  const inCart = items.some((item) => String(item.id) === String(id))

  const handleToggle = () => {
    toggleProduct({ id: String(id), name, category, thicknesses, dimensions, finish, gradient })
    onAddToQuote?.(id)
  }

  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.26, ease: 'easeOut' }}
      className="bg-white border border-zinc-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group"
    >
      {/* ── Material swatch — pure CSS gradient, zero image dependency ── */}
      <div
        className="h-52 relative overflow-hidden flex-shrink-0"
        style={{ background: gradient }}
        role="img"
        aria-label={`Aperçu matière — ${name}`}
      >
        {/* Inner highlight — simulates surface depth / material reflectance */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/18 via-transparent to-black/30" />

        {/* Hover shimmer sweep */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 bg-gradient-to-tr from-transparent via-white/6 to-transparent" />

        {/* Brand Ribbon — top-left */}
        <div className="absolute top-0 left-0 z-20">
          <BrandRibbon width={28} height={44} />
        </div>

        {/* Finish badge — top-right */}
        <div className="absolute top-3 right-3 z-20">
          <span className="bg-black/35 backdrop-blur-sm text-white text-[8px] font-semibold tracking-[0.24em] uppercase px-2.5 py-1.5 border border-white/10">
            {finish}
          </span>
        </div>

        {/* Category chip — bottom-left */}
        <div className="absolute bottom-3 left-3 z-20">
          <span className="bg-black/25 backdrop-blur-sm text-white/90 text-[7.5px] font-bold tracking-[0.28em] uppercase px-2.5 py-1 border border-white/10">
            {category === 'Worktop' ? 'Plan de Travail' : category}
          </span>
        </div>
      </div>

      {/* ── Card body ────────────────────────────────────────────────── */}
      <div className="p-5 flex flex-col flex-1 gap-4">

        {/* Name + description */}
        <div>
          <h3 className="font-sans font-bold text-[#1A1C20] text-[0.95rem] leading-snug tracking-tight mb-1.5">
            {name}
          </h3>
          <p className="text-zinc-400 text-[11.5px] leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Technical specs */}
        <div className="space-y-2.5 pt-3 border-t border-zinc-100">
          {/* Dimensions row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <Ruler size={10} className="text-[#D9A05B] flex-shrink-0" />
              <span className="text-[10px] tracking-wide">Dimensions</span>
            </div>
            <span className="text-[#1A1C20] font-semibold text-[11px]">{dimensions}</span>
          </div>

          {/* Thickness chips */}
          <div className="flex items-start gap-1.5">
            <Layers size={10} className="text-[#D9A05B] mt-[3px] flex-shrink-0" />
            <div className="flex flex-wrap gap-1.5">
              {(thicknesses || []).map((t) => (
                <span
                  key={t}
                  className="bg-zinc-50 text-[#1A1C20] text-[9px] font-black tracking-[0.18em] uppercase px-2.5 py-1 border border-zinc-150"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA — state derived from global context, never local */}
        <div className="mt-auto">
          <button
            id={`add-to-quote-${id}`}
            onClick={handleToggle}
            className={`w-full flex items-center justify-center gap-2 text-[9.5px] font-bold tracking-[0.22em] uppercase py-3.5 transition-colors duration-200 ${
              inCart
                ? 'bg-[#D9A05B]/12 text-[#D9A05B] border border-[#D9A05B]/35 hover:bg-[#D9A05B]/20'
                : 'bg-[#1A1C20] hover:bg-[#2A2C30] text-white'
            }`}
            aria-label={inCart ? `Retirer ${name} du devis` : `Ajouter ${name} au devis`}
            aria-pressed={inCart}
          >
            {inCart ? (
              <>
                <Check size={10} strokeWidth={3} />
                Ajouté au devis ✓
              </>
            ) : (
              'Ajouter au Devis'
            )}
          </button>
        </div>
      </div>
    </motion.article>
  )
}
