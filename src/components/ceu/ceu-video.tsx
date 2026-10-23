'use client'

import { useEffect, useRef } from 'react'
import { type TemaResolvido, useTemaResolvido } from '@/lib/tema'

const TROCA_MS = 1200

/**
 * O céu em vídeo, como o Sky da entrada do painel: dois vídeos iguais, e perto do
 * fim um cede o lugar ao outro num esmaecer, para o mar não dar o salto do loop.
 * Fica em reprodução enquanto está na tela; fora dela, pausa. Só o céu do tema na
 * tela baixa e toca: o do outro tema fica parado e sem arquivo até ser a vez dele.
 */
export function CeuVideo({
  src,
  tema,
  tardio,
  className,
}: {
  src: string
  tema: TemaResolvido
  tardio: boolean
  className: string
}) {
  const ativo = useTemaResolvido() === tema
  const caixa = useRef<HTMLDivElement>(null)
  const primeiroRef = useRef<HTMLVideoElement>(null)
  const segundoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const primeiro = primeiroRef.current
    const segundo = segundoRef.current
    const ceu = caixa.current
    if (!primeiro || !segundo || !ceu) return
    if (!ativo) {
      // Fora de cena, volta ao começo da emenda: o primeiro na frente, o segundo esperando.
      primeiro.pause()
      segundo.pause()
      primeiro.style.transition = ''
      segundo.style.transition = ''
      primeiro.style.opacity = ''
      segundo.style.opacity = '0'
      return
    }

    let frente = primeiro
    let fundo = segundo
    let trocando = false
    let visivel = false
    let carregado = false
    let espera: number | undefined

    for (const video of [primeiro, segundo]) {
      video.muted = true
      video.defaultMuted = true
      video.playsInline = true
      video.loop = false
    }

    const tocar = (video: HTMLVideoElement) => video.play().catch(() => undefined)

    const carregar = () => {
      if (carregado) return
      carregado = true
      // Voltando a este tema, o arquivo já está nos vídeos: trocar o src recomeçaria o download.
      if (primeiro.getAttribute('src') === src) return
      primeiro.src = src
      segundo.src = src
      primeiro.preload = 'auto'
      segundo.preload = 'auto'
    }

    const trocar = () => {
      if (trocando || !Number.isFinite(frente.duration)) return
      if (frente.duration - frente.currentTime > TROCA_MS / 1000) return
      trocando = true
      try {
        fundo.currentTime = 0
      } catch {
        /* o vídeo de trás ainda não leu os metadados */
      }
      tocar(fundo)
      const transicao = `opacity ${TROCA_MS / 1000}s linear`
      frente.style.transition = transicao
      fundo.style.transition = transicao
      requestAnimationFrame(() => {
        frente.style.opacity = '0'
        fundo.style.opacity = '1'
      })
      espera = window.setTimeout(() => {
        frente.pause()
        frente.style.transition = ''
        fundo.style.transition = ''
        ;[frente, fundo] = [fundo, frente]
        trocando = false
      }, TROCA_MS + 40)
    }

    primeiro.addEventListener('timeupdate', trocar)
    segundo.addEventListener('timeupdate', trocar)

    const observador = new IntersectionObserver(([entrada]) => {
      visivel = entrada.isIntersecting
      if (visivel) {
        carregar()
        tocar(frente)
      } else {
        primeiro.pause()
        segundo.pause()
      }
    })
    observador.observe(ceu)

    const aoVoltar = () => {
      if (document.visibilityState === 'visible' && visivel) tocar(frente)
    }
    document.addEventListener('visibilitychange', aoVoltar)

    if (!tardio) carregar()

    return () => {
      observador.disconnect()
      document.removeEventListener('visibilitychange', aoVoltar)
      primeiro.removeEventListener('timeupdate', trocar)
      segundo.removeEventListener('timeupdate', trocar)
      window.clearTimeout(espera)
    }
  }, [src, tardio, ativo])

  return (
    <div ref={caixa} className="absolute inset-0">
      <video
        ref={primeiroRef}
        className={className}
        muted
        playsInline
        preload="none"
      />
      <video ref={segundoRef} className={className} style={{ opacity: 0 }} muted playsInline preload="none" />
    </div>
  )
}
