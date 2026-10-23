import { useSyncExternalStore } from 'react'
import { CHAVE_TEMA, CONSULTA_ESCURO } from './tema-script'

/**
 * Tema do site. `sistema` (o "Automático" da navegação) segue o aparelho e é o padrão;
 * `claro` e `escuro` ficam guardados no navegador. A chave e os valores são os do painel
 * (ambao-web/src/lib/tema.ts) e os do script no <head> (./tema-script.ts).
 */
export const TEMAS = ['claro', 'escuro', 'sistema'] as const
export type Tema = (typeof TEMAS)[number]
export type TemaResolvido = 'claro' | 'escuro'

function ehTema(valor: unknown): valor is Tema {
  return typeof valor === 'string' && (TEMAS as readonly string[]).includes(valor)
}

// Sem armazenamento, a escolha vale até recarregar.
let escolhaSemArmazenamento: Tema | null = null

function escolhaGuardada(): Tema {
  if (escolhaSemArmazenamento) return escolhaSemArmazenamento
  try {
    const salvo = window.localStorage.getItem(CHAVE_TEMA)
    return ehTema(salvo) ? salvo : 'sistema'
  } catch {
    return 'sistema'
  }
}

function resolver(): TemaResolvido {
  const escolha = escolhaGuardada()
  if (escolha !== 'sistema') return escolha
  return window.matchMedia(CONSULTA_ESCURO).matches ? 'escuro' : 'claro'
}

function aplicar() {
  document.documentElement.dataset.theme = resolver() === 'escuro' ? 'dark' : 'light'
}

const ouvintes = new Set<() => void>()
const avisarTodos = () => ouvintes.forEach((avisar) => avisar())

/**
 * Troca de tema com a página se dissolvendo de um no outro, céu incluído, no tempo
 * da emenda do céu (o CSS de ::view-transition em app/globals.css), como no painel.
 * Vale também com movimento reduzido: é só opacidade. Sem a API do navegador, ou
 * com a aba escondida, troca direto.
 */
function aplicarSuave() {
  const muda = (document.documentElement.dataset.theme === 'dark' ? 'escuro' : 'claro') !== resolver()
  if (!muda || document.visibilityState !== 'visible' || !('startViewTransition' in document)) {
    aplicar()
    avisarTodos()
    return
  }
  document.startViewTransition(() => {
    aplicar()
    avisarTodos()
    // A foto nova é tirada depois que o React desenhou o outro céu (ele desenha antes do próximo timer).
    return new Promise<void>((pronto) => setTimeout(pronto, 0))
  })
}

/** Troca o tema e guarda a escolha. `sistema` devolve a decisão ao aparelho. */
export function definirTema(tema: Tema) {
  try {
    window.localStorage.setItem(CHAVE_TEMA, tema)
    escolhaSemArmazenamento = null
  } catch {
    escolhaSemArmazenamento = tema
  }
  aplicarSuave()
}

// Aparelho, outras abas e o próprio <html>: escutados uma vez, por quem assinar primeiro.
let escutando = false
function escutar() {
  if (escutando) return
  escutando = true
  window.matchMedia(CONSULTA_ESCURO).addEventListener('change', aplicarSuave)
  window.addEventListener('storage', (evento) => {
    if (evento.key === CHAVE_TEMA) aplicarSuave()
  })
  new MutationObserver(avisarTodos).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })
}

function assinar(avisar: () => void) {
  escutar()
  ouvintes.add(avisar)
  return () => {
    ouvintes.delete(avisar)
  }
}

/** O tema na tela. No HTML estático não há tema ainda: `null` até montar. */
export function useTemaResolvido(): TemaResolvido | null {
  return useSyncExternalStore(
    assinar,
    () => (document.documentElement.dataset.theme === 'dark' ? 'escuro' : 'claro'),
    () => null,
  )
}

/** A escolha de quem visita, inclusive `sistema`. `null` até montar. */
export function useTemaEscolhido(): Tema | null {
  return useSyncExternalStore(assinar, escolhaGuardada, () => null)
}
