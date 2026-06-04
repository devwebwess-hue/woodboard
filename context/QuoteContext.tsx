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
  addToQuote: (item: QuoteItem) => void
  removeFromQuote: (id: string) => void
  isInQuote: (id: string) => boolean
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
        if (Array.isArray(parsed)) setItems(parsed)
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

  // ── Single authoritative toggle ──────────────────────────────────
  const toggleProduct = useCallback((product: QuoteItem) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.id === product.id)
      return exists
        ? prev.filter((i) => i.id !== product.id)   // remove
        : [...prev, product]                          // add
    })
  }, [])

  const addToQuote = useCallback((item: QuoteItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev
      return [...prev, item]
    })
  }, [])

  const removeFromQuote = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const isInQuote = useCallback(
    (id: string) => items.some((i) => i.id === id),
    [items]
  )

  const clearQuote = useCallback(() => {
    setItems([])
  }, [])

  return (
    <QuoteContext.Provider
      value={{ items, toggleProduct, addToQuote, removeFromQuote, isInQuote, clearQuote }}
    >
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
