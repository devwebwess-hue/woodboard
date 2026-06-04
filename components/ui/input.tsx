'use client'

import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">{icon}</span>
          )}
          <input
            ref={ref}
            className={cn(
              'h-10 w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900',
              'placeholder:text-stone-400',
              'transition-all duration-150',
              'focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/25',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100 dark:placeholder:text-stone-500',
              'dark:focus:border-amber-400 dark:focus:ring-amber-400/20',
              icon && 'pl-9',
              error && 'border-red-400 focus:border-red-500 focus:ring-red-500/25',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
export type { InputProps }
