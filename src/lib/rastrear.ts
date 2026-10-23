declare global {
  interface Window {
    umami?: { track: (evento: string, dados?: Record<string, string>) => void }
  }
}

/**
 * Conta um evento no Umami. Sem o script (canal desligado, bloqueador de
 * anúncio, desenvolvimento), não faz nada. Nunca leva nome, paróquia ou
 * mensagem de ninguém: só o que aconteceu e onde.
 */
export function rastrear(evento: string, dados?: Record<string, string>) {
  window.umami?.track(evento, dados)
}
