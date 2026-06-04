'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

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
  addToQuote: (item: QuoteItem) => void
  removeFromQuote: (id: string) => void
  isInQuote: (id: string) => boolean
  clearQuote: () => void
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined)

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([])
  const [mounted, setMounted] = useState(false)

  // Load cart from localStorage after mount to prevent Next.js hydration mismatch
  useEffect(() => {
    try {
      const stored = localStorage.getItem('woodboard_quote_cart')
      if (stored) {
        setItems(JSON.parse(stored))
      }
    } catch (e) {
      console.error('Failed to parse quote cart from localStorage', e)
    }
    setMounted(true)
  }, [])

  // Persist to localStorage on change
  useEffect(() => {
    if (!mounted) return
    try {
      localStorage.setItem('woodboard_quote_cart', JSON.stringify(items))
    } catch (e) {
      console.error('Failed to save quote cart to localStorage', e)
    }
  }, [items, mounted])

  const addToQuote = (item: QuoteItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev
      return [...prev, item]
    })
  }

  const removeFromQuote = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const isInQuote = (id: string) => {
    return items.some((i) => i.id === id)
  }

  const clearQuote = () => {
    setItems([])
  }

  return (
    <QuoteContext.Provider value={{ items, addToQuote, removeFromQuote, isInQuote, clearQuote }}>
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
