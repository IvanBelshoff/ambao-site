'use client'

import { useEffect, useState } from 'react'
import { classeBotao } from '@/components/ui/botao'
import { Icone } from '@/components/ui/icone'
import { LogoGithub, LogoLinkedin } from '@/components/ui/marcas'
import { LinkContato } from '@/features/contato/link-contato'
import { ID_DEVS, aoPedirParaAbrir } from './abrir'
import { Arquitetura } from './arquitetura'
import { Camadas } from './camadas'
import estilo from './como-foi-feito.module.css'

/** Para devs: como foi feito, fechado num accordion fora da navegação. Abre sozinho pelo link do rodapé. */
export function ComoFoiFeito() {
  const [aberto, setAberto] = useState(false)

  useEffect(() => {
    const abrirSeHash = () => {
      if (window.location.hash === `#${ID_DEVS}`) setAberto(true)
    }
    abrirSeHash()
    window.addEventListener('hashchange', abrirSeHash)
    const parar = aoPedirParaAbrir(() => setAberto(true))
    return () => {
      window.removeEventListener('hashchange', abrirSeHash)
      parar()
    }
  }, [])

  return (
    <section id={ID_DEVS} className="border-t border-line py-14 lg:py-20" aria-labelledby="dev-titulo">
      <div className="mx-auto w-[90%] max-w-[78rem]">
        <details className={estilo.dev} open={aberto} onToggle={(evento) => setAberto(evento.currentTarget.open)}>
          <summary className={estilo.resumo}>
            <span className="min-w-0">
              <span id="dev-titulo" className="block text-[1.5rem] leading-tight font-medium tracking-[-0.02em] sm:text-[1.75rem]">
                Para devs: como o Ambão foi feito
              </span>
              <span className="mt-1 block text-[15px] text-muted">Arquitetura, tecnologia e as decisões por trás do sistema.</span>
            </span>
            <span className={estilo.seta} aria-hidden="true">
              <Icone nome="proximo" />
            </span>
          </summary>

          <div className="pt-10">
            <p className="max-w-[40rem] text-leitura text-pretty">
              O Ambão foi projetado e construído por Ivan Belshoff: a API, o painel web e o desenho de cada tela.
            </p>
            <Arquitetura visivel={aberto} />
            <Camadas />

            <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-8">
              <p className="text-[15px]">
                <span className="font-medium">Ivan Belshoff</span> <span className="text-muted">· autor do Ambão</span>
              </p>
              <div className="flex flex-wrap gap-2">
                <LinkContato canal="linkedin" local="devs" className={classeBotao('contorno')}>
                  <LogoLinkedin />
                  LinkedIn
                </LinkContato>
                <LinkContato canal="github" local="devs" className={classeBotao('contorno')}>
                  <LogoGithub />
                  GitHub
                </LinkContato>
              </div>
            </div>
          </div>
        </details>
      </div>
    </section>
  )
}
