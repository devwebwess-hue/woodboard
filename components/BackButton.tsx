'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BackButtonProps {
  className?: string
}

export function BackButton({ className }: BackButtonProps) {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className={cn(
        "inline-flex items-center gap-1.5 py-2 px-4 -ml-4 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-200 active:scale-[0.98] select-none hover:text-[#D9A05B] text-zinc-500",
        className
      )}
      aria-label="Retourner à la page précédente"
    >
      <ChevronLeft size={13} className="stroke-[2.5px]" />
      <span>Retour</span>
    </button>
  )
}
