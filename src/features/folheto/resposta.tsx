'use client'

import { type ReactNode, useEffect, useRef, useState } from 'react'
import { semMovimento } from '@/lib/media'
import estilo from './resposta.module.css'

type Estado = 'parada' | 'aguarda' | 'respondida'

/**
 * A faixa do R. Só espera quem ainda está abaixo da tela no carregamento; o que já
 * está visível fica como está. Sem JavaScript ou com movimento reduzido, já vem escrita.
 */
export function Resposta({ children }: { children: ReactNode }) {
  const faixa = useRef<HTMLParagraphElement>(null)
  const [estado, setEstado] = useState<Estado>('parada')

  useEffect(() => {
    const elemento = faixa.current
    if (!elemento || semMovimento() || !('IntersectionObserver' in window)) return
    if (elemento.getBoundingClientRect().top < window.innerHeight * 0.78) return

    setEstado('aguarda')
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return
        setEstado('respondida')
        observador.disconnect()
      },
      { rootMargin: '0px 0px -22% 0px' },
    )
    observador.observe(elemento)
    return () => observador.disconnect()
  }, [])

  const classeEstado = estado === 'parada' ? '' : estilo[estado]

  return (
    <p
      ref={faixa}
      className={`mt-6 max-w-[34rem] rounded-field bg-pink px-5 py-4 text-leitura leading-[1.55] font-medium text-pretty ${classeEstado}`}
    >
      <span className={`${estilo.r} mr-2 inline-block font-semibold text-blue`}>R.</span>
      {children}
    </p>
  )
}
