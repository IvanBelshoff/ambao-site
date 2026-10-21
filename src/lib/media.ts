import { useSyncExternalStore } from 'react'

/** Lê uma media query e acompanha a mudança. No HTML estático, vale `noServidor`. */
export function useMedia(consulta: string, noServidor = false) {
  return useSyncExternalStore(
    (avisar) => {
      const lista = window.matchMedia(consulta)
      lista.addEventListener('change', avisar)
      return () => lista.removeEventListener('change', avisar)
    },
    () => window.matchMedia(consulta).matches,
    () => noServidor,
  )
}

export const LG = '(min-width: 64rem)'
export const SEM_MOVIMENTO = '(prefers-reduced-motion: reduce)'

export const semMovimento = () => window.matchMedia(SEM_MOVIMENTO).matches
