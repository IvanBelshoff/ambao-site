'use client'

import { type KeyboardEvent, useEffect, useId, useRef, useState } from 'react'
import { Icone, type NomeIcone } from '@/components/ui/icone'
import { alvoDaTecla } from '@/lib/abas'
import { definirTema, type Tema, TEMAS, useTemaEscolhido } from '@/lib/tema'
import estilo from './navegacao.module.css'

const opcoes: Record<Tema, { rotulo: string; icone: NomeIcone }> = {
  claro: { rotulo: 'Claro', icone: 'sol' },
  escuro: { rotulo: 'Escuro', icone: 'lua' },
  sistema: { rotulo: 'Automático', icone: 'automatico' },
}

/**
 * Troca de tema: o ícone mostra a escolha atual e abre o menu com as três, como o do
 * painel. Até montar, o botão fica sem ícone para não piscar o errado.
 */
export function TrocaTema() {
  const escolhido = useTemaEscolhido()
  const [aberto, setAberto] = useState(false)
  const raiz = useRef<HTMLDivElement>(null)
  const gatilho = useRef<HTMLButtonElement>(null)
  const idMenu = useId()
  const rotulo = escolhido ? `Tema: ${opcoes[escolhido].rotulo}` : 'Tema'

  useEffect(() => {
    if (!aberto) return
    // Abre com o foco na escolha atual.
    raiz.current?.querySelector<HTMLElement>('[aria-checked="true"]')?.focus()
    const fora = (evento: PointerEvent) => {
      if (!raiz.current?.contains(evento.target as Node)) setAberto(false)
    }
    document.addEventListener('pointerdown', fora)
    return () => document.removeEventListener('pointerdown', fora)
  }, [aberto])

  const escolher = (tema: Tema) => {
    definirTema(tema)
    setAberto(false)
    gatilho.current?.focus()
  }

  const aoTeclar = (evento: KeyboardEvent<HTMLDivElement>) => {
    if (evento.key === 'Escape') {
      evento.preventDefault()
      setAberto(false)
      gatilho.current?.focus()
      return
    }
    if (evento.key === 'Tab') {
      setAberto(false)
      return
    }
    const itens = Array.from(raiz.current?.querySelectorAll<HTMLElement>('[role="menuitemradio"]') ?? [])
    const alvo = alvoDaTecla(evento.key, itens.indexOf(document.activeElement as HTMLElement), itens.length, 'vertical')
    if (alvo === null) return
    evento.preventDefault()
    itens[alvo]?.focus()
  }

  return (
    <div ref={raiz} className="relative" onKeyDown={aberto ? aoTeclar : undefined}>
      <button
        ref={gatilho}
        type="button"
        className={estilo.tema}
        aria-label={rotulo}
        title={rotulo}
        aria-haspopup="menu"
        aria-expanded={aberto}
        aria-controls={aberto ? idMenu : undefined}
        onClick={() => setAberto(!aberto)}
      >
        {escolhido && <Icone nome={opcoes[escolhido].icone} />}
      </button>
      {aberto && (
        <div id={idMenu} role="menu" aria-label="Tema" className={estilo.menuTema}>
          {TEMAS.map((tema) => (
            <button
              key={tema}
              type="button"
              role="menuitemradio"
              aria-checked={tema === escolhido}
              tabIndex={-1}
              className={estilo.opcaoTema}
              onClick={() => escolher(tema)}
            >
              <Icone nome={opcoes[tema].icone} className="h-4 w-4" />
              {opcoes[tema].rotulo}
              {tema === escolhido && <Icone nome="check" className="ml-auto h-4 w-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
