import { type KeyboardEvent, useCallback, useRef, useState } from 'react'

export type Orientacao = 'horizontal' | 'vertical'

/**
 * Para onde a tecla leva numa lista de abas, como a lateral do painel: setas no eixo
 * da lista (dando a volta), Home e End. Devolve `null` quando a tecla não é de aba.
 */
export function alvoDaTecla(tecla: string, atual: number, total: number, orientacao: Orientacao): number | null {
  const anterior = orientacao === 'vertical' ? 'ArrowUp' : 'ArrowLeft'
  const proxima = orientacao === 'vertical' ? 'ArrowDown' : 'ArrowRight'
  if (tecla === proxima) return (atual + 1) % total
  if (tecla === anterior) return (atual - 1 + total) % total
  if (tecla === 'Home') return 0
  if (tecla === 'End') return total - 1
  return null
}

/**
 * Abas com tabindex móvel: só a selecionada entra no Tab; as setas trocam e focam.
 * `aoTrocar` recebe a aba nova depois do foco, para quem precisa rolar até ela.
 */
export function useAbas<Id extends string>(
  ids: readonly Id[],
  { orientacao, aoTrocar }: { orientacao: Orientacao; aoTrocar?: (aba: HTMLElement) => void },
) {
  const [ativa, setAtiva] = useState<Id>(ids[0])
  const [trocou, setTrocou] = useState(false)
  const refs = useRef(new Map<Id, HTMLElement>())

  const selecionar = useCallback(
    (id: Id, focar: boolean) => {
      setAtiva(id)
      setTrocou(true)
      const aba = refs.current.get(id)
      if (!aba) return
      if (focar) aba.focus()
      aoTrocar?.(aba)
    },
    [aoTrocar],
  )

  const propsDaAba = (id: Id) => ({
    ref: (elemento: HTMLElement | null) => {
      if (elemento) refs.current.set(id, elemento)
      else refs.current.delete(id)
    },
    role: 'tab' as const,
    id: `aba-${id}`,
    'aria-controls': `painel-${id}`,
    'aria-selected': id === ativa,
    tabIndex: id === ativa ? 0 : -1,
    onClick: () => selecionar(id, false),
    onKeyDown: (evento: KeyboardEvent) => {
      const alvo = alvoDaTecla(evento.key, ids.indexOf(id), ids.length, orientacao)
      if (alvo === null) return
      evento.preventDefault()
      selecionar(ids[alvo], true)
    },
  })

  const propsDoPainel = (id: Id) => ({
    role: 'tabpanel' as const,
    id: `painel-${id}`,
    'aria-labelledby': `aba-${id}`,
    tabIndex: 0,
    hidden: id !== ativa,
  })

  return { ativa, trocou, propsDaAba, propsDoPainel }
}
