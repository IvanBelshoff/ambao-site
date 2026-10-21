import type { ReactNode } from 'react'

/**
 * A vitrine: a faixa de rosa claro que segura a tela recriada. A legenda diz o que
 * a tela mostra e termina dizendo que os dados são fictícios.
 */
export function Vitrine({
  legenda,
  estreita = false,
  children,
}: {
  legenda: string
  /** Para telas pequenas, como a semana de leitura. */
  estreita?: boolean
  children: ReactNode
}) {
  return (
    <figure
      className={`m-0 self-start rounded-field bg-pink p-4 sm:p-6 lg:p-7 ${estreita ? 'w-full max-w-[24rem] lg:justify-self-start' : ''}`}
    >
      {children}
      <figcaption className="mt-4 text-[13px] text-pretty text-ink/70">{legenda} Dados fictícios.</figcaption>
    </figure>
  )
}

/** A folha: papel branco sobre o rosa. Nunca rosa sobre rosa. */
export function Folha({ className = 'p-5', children }: { className?: string; children: ReactNode }) {
  return <div className={`rounded-field bg-white ${className}`}>{children}</div>
}
