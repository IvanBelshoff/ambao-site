'use client'

import type { ReactNode } from 'react'
import { Icone, type NomeIcone } from '@/components/ui/icone'
import { Marca } from '@/components/ui/marca'
import { useAbas } from '@/lib/abas'
import { LG, semMovimento, useMedia } from '@/lib/media'
import estilo from './placa.module.css'

export type TelaDaPlaca = { id: string; rotulo: string; icone: NomeIcone; conteudo: ReactNode }

/** Os outros módulos do painel: só leitura, para mostrar o tamanho do sistema. */
const outras: { rotulo: string; icone: NomeIcone }[] = [
  { rotulo: 'Galeria', icone: 'galeria' },
  { rotulo: 'Financeiro', icone: 'financeiro' },
  { rotulo: 'Música', icone: 'musica' },
]

const rolarAte = (aba: HTMLElement) =>
  aba.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: semMovimento() ? 'auto' : 'smooth' })

/**
 * A placa: o painel do Ambão sobre o céu, com dados fictícios. A lateral troca a
 * tela, com setas, Home e End; no celular, vira uma fileira que rola de lado.
 */
export function Placa({ telas }: { telas: TelaDaPlaca[] }) {
  const vertical = useMedia(LG, true)
  const { trocou, propsDaAba, propsDoPainel } = useAbas(
    telas.map((tela) => tela.id),
    { orientacao: vertical ? 'vertical' : 'horizontal', aoTrocar: rolarAte },
  )

  return (
    <div className="papel overflow-hidden rounded-field bg-paper text-ink shadow-card ring-1 ring-white/35 lg:grid lg:h-[34rem] lg:grid-cols-[10.5rem_minmax(0,1fr)]">
      <div className="border-b border-line px-3 pt-4 pb-3 lg:border-r lg:border-b-0 lg:px-2.5 lg:pt-5">
        <p className="hidden px-2.5 text-blue lg:flex">
          <Marca />
        </p>
        <div
          role="tablist"
          aria-label="Telas do painel"
          aria-orientation={vertical ? 'vertical' : 'horizontal'}
          className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-0.5 [scrollbar-width:none] lg:mx-0 lg:mt-5 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-0"
        >
          {telas.map((tela) => (
            <button
              key={tela.id}
              type="button"
              {...propsDaAba(tela.id)}
              className="flex h-11 shrink-0 cursor-pointer items-center gap-2.5 rounded-field px-3 text-[14px] font-medium whitespace-nowrap text-muted transition-colors duration-150 hover:bg-pink hover:text-blue aria-selected:bg-pink aria-selected:text-blue lg:h-10 lg:px-2.5"
            >
              <Icone nome={tela.icone} className="h-[18px] w-[18px]" />
              {tela.rotulo}
            </button>
          ))}
        </div>
        <ul className="mt-4 hidden flex-col gap-0.5 border-t border-line pt-4 lg:flex" aria-label="Outras telas do painel">
          {outras.map((item) => (
            <li key={item.rotulo} className="flex h-9 items-center gap-2.5 px-2.5 text-[13px] font-medium text-muted/80">
              <Icone nome={item.icone} className="h-[18px] w-[18px]" />
              {item.rotulo}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative min-w-0 overflow-hidden">
        <p className="absolute top-4 right-4 z-10 rounded-full border border-line bg-surface px-2.5 py-0.5 text-[12px] text-muted sm:top-5 sm:right-5">
          Dados fictícios
        </p>
        {telas.map((tela) => (
          <section key={tela.id} {...propsDoPainel(tela.id)} className={`px-5 py-5 sm:px-7 sm:py-6 ${trocou ? estilo.chegando : ''}`}>
            {tela.conteudo}
          </section>
        ))}
      </div>
    </div>
  )
}
