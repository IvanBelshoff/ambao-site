import { useEffect, useState } from 'react'

/**
 * A faixa de leitura: uma tira fina a 35% do topo da tela, logo abaixo da barra.
 * A seção que passa por ela é a que está sendo lida; a que só entrou pela borda
 * de baixo ainda não conta. As seções são contíguas, então só uma cruza a faixa.
 */
export const FAIXA_DE_LEITURA = '-35% 0px -64% 0px'

/** Qual das seções está sendo lida agora, ou `null` entre elas (recursos, devs, fechamento). */
export function useSecaoAtiva(ids: readonly string[]) {
  const [ativa, setAtiva] = useState<string | null>(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const naFaixa = new Set<string>()
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) naFaixa.add(entrada.target.id)
          else naFaixa.delete(entrada.target.id)
        }
        setAtiva(ids.find((id) => naFaixa.has(id)) ?? null)
      },
      { rootMargin: FAIXA_DE_LEITURA },
    )
    for (const id of ids) {
      const secao = document.getElementById(id)
      if (secao) observador.observe(secao)
    }
    return () => observador.disconnect()
  }, [ids])

  return ativa
}
