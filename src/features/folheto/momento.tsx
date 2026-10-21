import type { ReactNode } from 'react'
import { Resposta } from './resposta'

/**
 * Um momento do folheto. Ordem fixa: a dor como pergunta no título, a leitura que
 * abre com a hora em rubrica corrida, o R. na faixa rosa e, às vezes, o que vem junto.
 * Ao lado, a vitrine. A rubrica nunca sobe para cima do título.
 */
export function Momento({
  id,
  titulo,
  rubrica,
  leitura,
  resposta,
  junto,
  vitrine,
  primeiro = false,
  children,
}: {
  id: string
  titulo: string
  /** A hora em que a dor acontece, com o ponto final: "Sábado, 21h." */
  rubrica: string
  leitura: ReactNode
  resposta: ReactNode
  junto?: string[]
  vitrine: ReactNode
  /** O primeiro momento sobe para o título espiar na borda do céu. */
  primeiro?: boolean
  /** O que vem depois da grade, na largura toda, como "Quem faz o quê". */
  children?: ReactNode
}) {
  return (
    <section id={id} className={primeiro ? 'pt-14 pb-20 lg:pt-12 lg:pb-28' : 'border-t border-line py-20 lg:py-28'}>
      <div className="mx-auto grid w-[90%] max-w-[78rem] grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-x-16 lg:gap-y-0 xl:gap-x-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="max-w-[18ch] text-[2rem] leading-[1.1] font-medium tracking-[-0.03em] text-balance sm:text-[2.5rem] xl:text-[2.75rem]">
            {titulo}
          </h2>
          <p className="mt-6 max-w-[34rem] text-leitura text-pretty">
            <span className="text-kicker font-semibold tracking-kicker text-rose-strong uppercase">{rubrica} </span>
            {leitura}
          </p>
          <Resposta>{resposta}</Resposta>
          {junto ? <Junto itens={junto} /> : null}
        </div>
        {vitrine}
      </div>
      {children}
    </section>
  )
}

/** O que vem junto: lista quieta em tinta suave, com o visto de traço em azul marinho. */
function Junto({ itens }: { itens: string[] }) {
  return (
    <ul className="mt-7 grid max-w-[34rem] gap-2.5 text-[15px] text-muted">
      {itens.map((item) => (
        <li key={item} className="relative pl-7">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="absolute top-[0.2rem] left-0 size-4 text-blue"
          >
            <path d="m5.5 12.5 4 4 9-9" />
          </svg>
          {item}
        </li>
      ))}
    </ul>
  )
}
