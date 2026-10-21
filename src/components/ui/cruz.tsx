/** A cruz: o único ornamento da marca. A mesma de `ambao-web/src/components/ui/cross.tsx`. */
export function Cruz({ className = 'h-4 w-3' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 32" fill="currentColor" aria-hidden="true" className={`shrink-0 ${className}`}>
      <path d="M9.5 0h5v8H22v5h-7.5v19h-5V13H2V8h7.5z" />
    </svg>
  )
}
