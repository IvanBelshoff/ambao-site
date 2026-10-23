'use client'

import { useEffect, useState } from 'react'
import { Icone, type NomeIcone } from '@/components/ui/icone'
import { LogoWhatsapp } from '@/components/ui/marcas'
import { Marca } from '@/components/ui/marca'
import { LinkContato } from '@/features/contato/link-contato'
import estilo from './navegacao.module.css'
import { useRolagem } from './use-rolagem'
import { useSecaoAtiva } from './use-secao-ativa'

/** Os momentos na ordem da página, com rótulo de uma palavra para caberem na barra. */
const ancoras: { id: string; rotulo: string; icone: NomeIcone }[] = [
  { id: 'escalas', rotulo: 'Escalas', icone: 'participacoes' },
  { id: 'musica', rotulo: 'Música', icone: 'musica' },
  { id: 'calendario', rotulo: 'Calendário', icone: 'calendario' },
  { id: 'leitura', rotulo: 'Leitura', icone: 'leitura' },
  { id: 'dizimo', rotulo: 'Dízimo', icone: 'dizimo' },
  { id: 'avisos', rotulo: 'Avisos', icone: 'comunicado' },
  { id: 'acervo', rotulo: 'Acervo', icone: 'galeria' },
  { id: 'certificados', rotulo: 'Certificados', icone: 'certificado' },
  { id: 'paroquia', rotulo: 'Paróquia', icone: 'igreja' },
  { id: 'telas', rotulo: 'Telas', icone: 'monitor' },
]

const ids = ancoras.map((ancora) => ancora.id)

/** O foco está num campo de formulário: no celular, o disco cobriria a borda dele. */
function usePreenchendo() {
  const [preenchendo, setPreenchendo] = useState(false)
  useEffect(() => {
    // No focusout, olha para onde o foco vai, para não piscar ao passar de um campo para outro.
    const atualizar = (evento: FocusEvent) => {
      const alvo = evento.type === 'focusin' ? evento.target : evento.relatedTarget
      setPreenchendo(alvo instanceof Element && Boolean(alvo.closest('form')))
    }
    document.addEventListener('focusin', atualizar)
    document.addEventListener('focusout', atualizar)
    return () => {
      document.removeEventListener('focusin', atualizar)
      document.removeEventListener('focusout', atualizar)
    }
  }, [])
  return preenchendo
}

/** Larga e transparente sobre o céu; ao rolar, encolhe e vira placa branca. */
export function Navegacao() {
  const { rolada } = useRolagem()
  // Sobre o céu, no topo, nenhuma seção está sendo lida: o realce só existe na barra rolada.
  const lendo = useSecaoAtiva(ids)
  const ativa = rolada ? lendo : null

  return (
    <header className={`${estilo.navegacao} ${rolada ? estilo.rolada : ''} fixed inset-x-0 top-0 z-40`}>
      <div className={`${estilo.casca} mx-auto flex items-center justify-between gap-4`}>
        <a href="#topo" className={`${estilo.marca} flex rounded-field py-1`} aria-label="Ambão, voltar ao topo">
          <Marca />
        </a>
        <nav aria-label="Seções" className="hidden items-center lg:flex">
          {ancoras.map((ancora) => (
            <a
              key={ancora.id}
              href={`#${ancora.id}`}
              aria-current={ancora.id === ativa ? 'location' : undefined}
              className={`${estilo.link} inline-flex items-center gap-1.5`}
            >
              {/* O ícone só entra a partir de 1280px: entre 1024 e 1279px, as dez âncoras não cabem com ele. */}
              <Icone nome={ancora.icone} className="hidden h-4 w-4 xl:block" />
              {ancora.rotulo}
            </a>
          ))}
        </nav>
        <LinkContato canal="whatsapp" local="topo" className={estilo.acao}>
          <LogoWhatsapp />
          <span>WhatsApp</span>
        </LinkContato>
      </div>
    </header>
  )
}

/** Voltar ao início: aparece depois do céu, no canto, em azul marinho. Sai da frente de quem está preenchendo um formulário. */
export function AoTopo() {
  const { alemDoCeu } = useRolagem()
  const preenchendo = usePreenchendo()
  const visivel = alemDoCeu && !preenchendo

  return (
    <a
      href="#topo"
      className={`${estilo.aoTopo} ${visivel ? estilo.visivel : ''}`}
      aria-label="Voltar ao início da página"
      tabIndex={visivel ? 0 : -1}
    >
      <Icone nome="topo" />
    </a>
  )
}
