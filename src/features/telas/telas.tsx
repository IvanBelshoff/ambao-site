'use client'

import dynamic from 'next/dynamic'
import { type MouseEvent, useState } from 'react'
import { Icone } from '@/components/ui/icone'
import { type Aparelho, aparelhos, arquivoDaCaptura, capturas } from './capturas'

/** O visor só baixa quando alguém abre um print. */
const Visor = dynamic(() => import('./visor'), { ssr: false })

/** A grade acompanha a proporção do aparelho. */
const grade: Record<Aparelho, string> = {
  desktop: 'md:grid-cols-2',
  tablet: 'grid-cols-2 lg:grid-cols-4',
  celular: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
}

/**
 * O painel de perto: prints reais do painel; o seletor troca o aparelho e o
 * print abre em tela cheia na própria página. Sem JavaScript, o link abre o arquivo.
 */
export function Telas() {
  const [aparelho, setAparelho] = useState<Aparelho>('desktop')
  const [aberta, setAberta] = useState<number | null>(null)
  const { largura, altura } = aparelhos[aparelho]

  const slides = capturas.map((captura) => ({
    src: arquivoDaCaptura(captura.tela, aparelho),
    width: largura,
    height: altura,
    alt: `Print do painel: ${captura.titulo.toLowerCase()}, com dados fictícios`,
    title: captura.titulo,
    description: `${captura.descricao} Dados fictícios.`,
  }))

  const abrir = (indice: number) => (evento: MouseEvent<HTMLAnchorElement>) => {
    // Ctrl, Shift ou o botão do meio continuam abrindo o arquivo, como qualquer link.
    if (evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.button !== 0) return
    evento.preventDefault()
    setAberta(indice)
  }

  return (
    <section id="telas" className="border-t border-line bg-surface py-20 lg:py-28">
      <div className="mx-auto w-[90%] max-w-[78rem]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="text-[2rem] leading-[1.12] font-medium tracking-[-0.03em] sm:text-[2.5rem]">O painel de perto</h2>
            <p className="mt-4 max-w-[40rem] text-leitura text-pretty text-muted">
              Prints do painel funcionando, com a Paróquia Sagrada Família, uma paróquia de demonstração com dados fictícios.
            </p>
          </div>
          <div className="inline-flex gap-1 rounded-field border border-line bg-white p-1" role="group" aria-label="Ver as telas no">
            {(Object.keys(aparelhos) as Aparelho[]).map((opcao) => (
              <button
                key={opcao}
                type="button"
                aria-pressed={opcao === aparelho}
                onClick={() => setAparelho(opcao)}
                className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-field border border-transparent px-4 text-[14px] font-medium text-muted transition-colors duration-150 hover:bg-pink/50 hover:text-blue aria-pressed:border-blue aria-pressed:bg-pink aria-pressed:text-blue"
              >
                <Icone nome={aparelhos[opcao].icone} className="h-4 w-4" />
                {aparelhos[opcao].rotulo}
              </button>
            ))}
          </div>
        </div>

        <div className={`mt-10 grid gap-6 ${grade[aparelho]}`}>
          {capturas.map((captura, indice) => {
            const slide = slides[indice]
            return (
              <figure key={captura.tela} className="m-0 min-w-0">
                <a
                  href={slide.src}
                  target="_blank"
                  rel="noopener"
                  onClick={abrir(indice)}
                  aria-label={`Ampliar: ${captura.titulo}`}
                  className="block cursor-zoom-in overflow-hidden rounded-field border border-line bg-white transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-blue/40"
                >
                  <img
                    src={slide.src}
                    width={largura}
                    height={altura}
                    alt={slide.alt}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full"
                  />
                </a>
                <figcaption className="mt-3 text-[14px] text-pretty text-muted">
                  <strong className="font-medium text-ink">{captura.titulo}</strong> · {captura.descricao}
                </figcaption>
              </figure>
            )
          })}
        </div>
        <p className="mt-8 text-[13px] text-muted">Fotos da galeria: Wikimedia Commons, em domínio público ou CC0.</p>
      </div>

      {aberta !== null ? <Visor slides={slides} indice={aberta} fechar={() => setAberta(null)} /> : null}
    </section>
  )
}
