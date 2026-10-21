import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { FAIXA_DE_LEITURA, useSecaoAtiva } from './use-secao-ativa'

type Avisar = (entradas: Partial<IntersectionObserverEntry>[]) => void

let avisar: Avisar = () => undefined
let margem = ''

beforeEach(() => {
  for (const id of ['escalas', 'musica', 'calendario']) {
    const secao = document.createElement('section')
    secao.id = id
    document.body.append(secao)
  }
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(callback: Avisar, opcoes: IntersectionObserverInit) {
        avisar = callback
        margem = opcoes.rootMargin ?? ''
      }
      observe() {}
      disconnect() {}
    },
  )
})

afterEach(() => {
  vi.unstubAllGlobals()
  document.body.innerHTML = ''
})

const entrada = (id: string, isIntersecting: boolean) => ({ target: document.getElementById(id)!, isIntersecting })
const ids = ['escalas', 'musica', 'calendario'] as const

describe('useSecaoAtiva', () => {
  it('olha só a faixa de leitura, perto do topo', () => {
    renderHook(() => useSecaoAtiva(ids))
    expect(margem).toBe(FAIXA_DE_LEITURA)
  })

  it('acende a seção que cruza a faixa e troca quando a próxima chega', () => {
    const { result } = renderHook(() => useSecaoAtiva(ids))
    expect(result.current).toBeNull()

    act(() => avisar([entrada('escalas', true)]))
    expect(result.current).toBe('escalas')

    act(() => avisar([entrada('escalas', false), entrada('musica', true)]))
    expect(result.current).toBe('musica')
  })

  it('apaga entre as seções que não estão na barra', () => {
    const { result } = renderHook(() => useSecaoAtiva(ids))
    act(() => avisar([entrada('calendario', true)]))
    act(() => avisar([entrada('calendario', false)]))
    expect(result.current).toBeNull()
  })
})
