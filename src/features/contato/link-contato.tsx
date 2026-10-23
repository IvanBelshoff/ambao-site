import type { ReactNode } from 'react'
import type { Canal } from '@/config/contato'
import { linkDoCanal } from './canais'

/**
 * Um link para um canal de contato. Some quando o canal não foi preenchido.
 * `rotulo` dá o nome acessível ao link que só tem ícone. `local` diz ao Umami
 * de onde veio o clique (topo, devs, rodapé).
 */
export function LinkContato({
  canal,
  local,
  className,
  rotulo,
  children,
}: {
  canal: Canal
  local: string
  className: string
  rotulo?: string
  children: ReactNode
}) {
  const link = linkDoCanal(canal)
  if (!link) return null
  return (
    <a
      {...link}
      aria-label={rotulo}
      title={rotulo}
      className={className}
      data-umami-event={`contato-${canal}`}
      data-umami-event-local={local}
    >
      {children}
    </a>
  )
}
