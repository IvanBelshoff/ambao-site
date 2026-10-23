import type { ReactNode } from 'react'
import { Icone, type NomeIcone } from '@/components/ui/icone'

/** O card do feed do painel, recriado: autor, texto e o que vier embaixo. Mantém os 12px do painel. */
export function CardDoFeed({
  avatar,
  autor,
  detalhe,
  texto,
  className = '',
  children,
}: {
  avatar: ReactNode
  autor: string
  detalhe: string
  texto: string
  className?: string
  children?: ReactNode
}) {
  return (
    <article className={`rounded-feed border border-line bg-paper px-5 py-4 ${className}`}>
      <div className="flex items-center gap-3">
        {avatar}
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-medium">{autor}</span>
          <span className="block text-[13px] text-muted">{detalhe}</span>
        </span>
      </div>
      <p className="mt-3 text-[15px] leading-[1.6]">{texto}</p>
      {children}
    </article>
  )
}

/** A barra de ações do card: a reação (azul quando ligada), comentar e compartilhar. */
export function AcoesDoCard({
  reacao,
  className = '',
}: {
  reacao: { icone: NomeIcone; rotulo: string; ativa?: boolean }
  className?: string
}) {
  const acoes = [reacao, { icone: 'comentar', rotulo: 'Comentar' }, { icone: 'compartilhar', rotulo: 'Compartilhar' }] as const
  return (
    <div className={`flex flex-wrap border-t border-line pt-1 text-[13px] font-medium text-muted ${className}`}>
      {acoes.map((acao) => (
        <span
          key={acao.rotulo}
          className={`inline-flex h-11 items-center gap-2 px-2 ${'ativa' in acao && acao.ativa ? 'text-blue' : ''}`}
        >
          <Icone nome={acao.icone} />
          {acao.rotulo}
        </span>
      ))}
    </div>
  )
}
