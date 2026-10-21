import type { ReactNode } from 'react'

const tamanhos = {
  sm: 'size-8 text-[11px]',
  md: 'size-9 text-[12px]',
  lg: 'size-11 text-[13px]',
} as const

const tons = {
  lavado: 'bg-blue-wash text-blue',
  rosa: 'bg-pink text-blue',
  azul: 'bg-blue text-white',
} as const

/** O disco de iniciais do painel. Com a cruz dentro, é a paróquia. */
export function Disco({
  tamanho,
  tom,
  className = '',
  children,
}: {
  tamanho: keyof typeof tamanhos
  tom: keyof typeof tons
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold ${tamanhos[tamanho]} ${tons[tom]} ${className}`}
    >
      {children}
    </span>
  )
}
