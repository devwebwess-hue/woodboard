'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

    const variants = {
      primary:
        'bg-amber-600 text-white hover:bg-amber-500 focus-visible:ring-amber-600 shadow-lg shadow-amber-900/20',
      secondary:
        'bg-stone-800 text-stone-100 hover:bg-stone-700 focus-visible:ring-stone-500',
      ghost: 'hover:bg-stone-100 text-stone-700 dark:hover:bg-stone-800 dark:text-stone-300',
      outline:
        'border border-stone-300 bg-transparent text-stone-700 hover:bg-stone-50 dark:border-stone-600 dark:text-stone-300',
    }

    const sizes = {
      sm: 'h-8 px-3 text-sm gap-1.5',
      md: 'h-10 px-5 text-sm gap-2',
      lg: 'h-12 px-7 text-base gap-2.5',
    }

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.02 }}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
export type { ButtonProps }
