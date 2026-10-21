import type { ReactNode } from 'react'
import type { Canal } from '@/config/contato'
import { linkDoCanal } from './canais'

/**
 * Um link para um canal de contato. Some quando o canal não foi preenchido.
 * `rotulo` dá o nome acessível ao link que só tem ícone.
 */
export function LinkContato({
  canal,
  className,
  rotulo,
  children,
}: {
  canal: Canal
  className: string
  rotulo?: string
  children: ReactNode
}) {
  const link = linkDoCanal(canal)
  if (!link) return null
  return (
    <a {...link} aria-label={rotulo} title={rotulo} className={className}>
      {children}
    </a>
  )
}
