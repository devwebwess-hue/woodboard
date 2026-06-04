'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export interface QuoteItem {
  id: string
  name: string
  category: string
  thicknesses: string[]
  dimensions: string
  finish: string
  gradient: string
}

interface QuoteContextType {
  items: QuoteItem[]
  toggleProduct: (product: QuoteItem) => void
  removeFromQuote: (id: string) => void
  clearQuote: () => void
}

const STORAGE_KEY = 'woodboard_quote_cart'

const QuoteContext = createContext<QuoteContextType | undefined>(undefined)

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([])
  const [mounted, setMounted] = useState(false)

  // ── Hydrate from localStorage AFTER mount to avoid SSR mismatch ──
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          // Normalise: force every id to a string so comparisons never fail
          setItems(parsed.map((item: QuoteItem) => ({ ...item, id: String(item.id) })))
        }
      }
    } catch {
      // localStorage unavailable or corrupt — start with empty cart
    }
    setMounted(true)
  }, [])

  // ── Persist on every change (only after first mount) ──
  useEffect(() => {
    if (!mounted) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Storage quota exceeded or unavailable — ignore
    }
  }, [items, mounted])

  // ── Single authoritative toggle with aggressive String() coercion ──
  const toggleProduct = useCallback((product: QuoteItem) => {
    const normalisedProduct = { ...product, id: String(product.id) }
    setItems((prev) => {
      const isExisting = prev.find(
        (item) => String(item.id) === String(normalisedProduct.id)
      )
      if (isExisting) {
        return prev.filter((item) => String(item.id) !== String(normalisedProduct.id))
      } else {
        return [...prev, normalisedProduct]
      }
    })
  }, [])

  const removeFromQuote = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => String(item.id) !== String(id)))
  }, [])

  const clearQuote = useCallback(() => {
    setItems([])
  }, [])

  return (
    <QuoteContext.Provider value={{ items, toggleProduct, removeFromQuote, clearQuote }}>
      {children}
    </QuoteContext.Provider>
  )
}

export function useQuote() {
  const context = useContext(QuoteContext)
  if (context === undefined) {
    throw new Error('useQuote must be used within a QuoteProvider')
  }
  return context
}
