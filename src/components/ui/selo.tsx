import type { ReactNode } from 'react'

const tons = {
  ok: 'bg-success/10 px-2 text-success',
  nao: 'bg-danger/10 px-2 text-danger',
  /* Sem resposta: o âmbar da escala no calendário do painel. */
  espera: 'bg-warning/10 px-2 text-warning',
  publicada: 'bg-blue-wash px-2.5 text-blue',
  /* Rascunho: ainda não chegou a ninguém. Neutro, como o selo do painel. */
  rascunho: 'border border-line bg-surface px-2 text-muted',
  dev: 'bg-warning/10 px-2 tracking-normal text-warning',
} as const

export type TomSelo = keyof typeof tons

export function Selo({ tom, className = '', children }: { tom: TomSelo; className?: string; children: ReactNode }) {
  return (
    <span className={`rounded-full py-0.5 text-[12px] font-medium whitespace-nowrap ${tons[tom]} ${className}`}>
      {children}
    </span>
  )
}
