interface BrandRibbonProps {
  width?: number
  height?: number
  className?: string
}

/**
 * Wood Board signature vertical ribbon with crisp white "W".
 * Must only be placed absolute top-left on image/swatch containers.
 */
export function BrandRibbon({ width = 28, height = 44, className = '' }: BrandRibbonProps) {
  return (
    <div
      className={`bg-[#1A1C20] flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    >
      <span
        style={{
          fontFamily: 'var(--font-inter, system-ui, sans-serif)',
          fontSize: Math.round(width * 0.6),
          fontWeight: 900,
          color: '#ffffff',
          letterSpacing: '-0.05em',
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        W
      </span>
    </div>
  )
}
