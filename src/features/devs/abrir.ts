export const ID_DEVS = 'como-foi-feito'

const EVENTO = 'ambao:abrir-devs'

/** Pede para a área de devs abrir, mesmo quando o endereço já termina em #como-foi-feito. */
export const abrirComoFoiFeito = () => window.dispatchEvent(new Event(EVENTO))

export function aoPedirParaAbrir(abrir: () => void) {
  window.addEventListener(EVENTO, abrir)
  return () => window.removeEventListener(EVENTO, abrir)
}
