'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glass?: boolean
}

export function Card({ children, className, hover = false, glass = false }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={hover ? { y: -4, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.25)' } : undefined}
      className={cn(
        'rounded-2xl border border-stone-200/60 bg-white p-6',
        glass && 'bg-white/70 backdrop-blur-md dark:bg-stone-900/70',
        'dark:border-stone-700/60 dark:bg-stone-900',
        hover && 'cursor-pointer transition-shadow',
        className
      )}
    >
      {children}
    </motion.div>
  )
}

interface CardHeaderProps {
  title: string
  description?: string
  className?: string
}

export function CardHeader({ title, description, className }: CardHeaderProps) {
  return (
    <div className={cn('mb-4', className)}>
      <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{description}</p>
      )}
    </div>
  )
}
