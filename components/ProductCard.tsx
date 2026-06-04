'use client'

import { motion } from 'framer-motion'
import { Ruler, Layers, Check } from 'lucide-react'
import { useState } from 'react'
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
  const { addToQuote, removeFromQuote, isInQuote } = useQuote()
  const inCart = isInQuote(id)

  const handleAdd = () => {
    if (inCart) {
      removeFromQuote(id)
    } else {
      addToQuote({ id, name, category, thicknesses, dimensions, finish, gradient })
    }
    onAddToQuote?.(id)
  }

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
    >
      {/* Material swatch — image container */}
      <div
        className="h-52 relative overflow-hidden flex-shrink-0"
        style={{ background: gradient }}
        role="img"
        aria-label={`Aperçu texture — ${name}`}
      >
        {/* Depth gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

        {/* Hover shimmer */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/8 to-transparent" />

        {/* Brand Ribbon — top-left of image container */}
        <div className="absolute top-0 left-0 z-10">
          <BrandRibbon width={28} height={44} />
        </div>

        {/* Finish badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-black/30 backdrop-blur-md text-white text-[8.5px] font-semibold tracking-[0.22em] uppercase px-2.5 py-1.5 border border-white/10">
            {finish}
          </span>
        </div>

        {/* Category chip */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="bg-white/15 backdrop-blur-md text-white text-[8px] font-bold tracking-[0.25em] uppercase px-2.5 py-1 border border-white/15">
            {category === 'Worktop' ? 'Plan de Travail' : category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3.5">
        <div>
          <h3 className="font-sans font-bold text-[#1A1C20] text-[1rem] leading-tight tracking-tight mb-1.5">
            {name}
          </h3>
          <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Technical specs */}
        <div className="space-y-2 pt-3 border-t border-zinc-100">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <Ruler size={10} className="text-[#D9A05B]" />
              <span className="tracking-wide">Dimensions</span>
            </div>
            <span className="text-[#1A1C20] font-semibold text-[11px]">{dimensions}</span>
          </div>
          <div className="flex items-start gap-1.5">
            <Layers size={10} className="text-[#D9A05B] mt-0.5 flex-shrink-0" />
            <div className="flex flex-wrap gap-1.5">
              {thicknesses.map((t) => (
                <span
                  key={t}
                  className="bg-[#F9F9F6] text-[#1A1C20] text-[9px] font-black tracking-[0.2em] uppercase px-2.5 py-1 border border-zinc-100"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-1">
          <button
            id={`add-to-quote-${id}`}
            onClick={handleAdd}
            className={`w-full flex items-center justify-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase py-3 transition-all duration-250 ${
              inCart
                ? 'bg-[#D9A05B]/15 text-[#D9A05B] border border-[#D9A05B]/30'
                : 'bg-[#1A1C20] hover:bg-[#D9A05B] text-white'
            }`}
            aria-label={`Ajouter ${name} au devis`}
          >
            {inCart ? (
              <>
                <Check size={11} strokeWidth={3} />
                Ajouté ✓
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
