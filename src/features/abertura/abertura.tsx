import { Ceu } from '@/components/ceu/ceu'
import { BotaoLink } from '@/components/ui/botao'
import { Placa, type TelaDaPlaca } from './placa'
import { TelaCalendario } from './telas/tela-calendario'
import { TelaDizimos } from './telas/tela-dizimos'
import { TelaInicio } from './telas/tela-inicio'
import { TelaParticipacoes } from './telas/tela-participacoes'
import { TelaPublicacoes } from './telas/tela-publicacoes'

const telas: TelaDaPlaca[] = [
  { id: 'inicio', rotulo: 'Início', icone: 'inicio', conteudo: <TelaInicio /> },
  { id: 'participacoes', rotulo: 'Participações', icone: 'participacoes', conteudo: <TelaParticipacoes /> },
  { id: 'dizimo', rotulo: 'Dízimos', icone: 'dizimo', conteudo: <TelaDizimos /> },
  { id: 'publicacoes', rotulo: 'Publicações', icone: 'publicacoes', conteudo: <TelaPublicacoes /> },
  { id: 'calendario', rotulo: 'Calendário', icone: 'calendario', conteudo: <TelaCalendario /> },
]

/** Ritos iniciais: o céu da entrada do painel e o painel aberto sobre ele. */
export function Abertura() {
  return (
    <header id="topo" className="no-ceu relative isolate overflow-hidden bg-night text-white">
      <Ceu />

      <div className="mx-auto grid w-[90%] max-w-[78rem] gap-10 pt-28 pb-16 sm:pt-32 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-14 lg:pt-28 lg:pb-14">
        <div className="ceu-texto">
          <h1 className="text-[2.625rem] leading-[1.04] font-medium tracking-[-0.035em] text-balance sm:text-[3.5rem] xl:text-[4.25rem]">
            Uma paróquia, muitas igrejas, a mesma comunidade.
          </h1>
          <p className="mt-6 max-w-[34rem] text-[1.125rem] leading-[1.6] text-pretty text-white/92 sm:text-[1.1875rem]">
            Escalas, dízimo, caixa e avisos de cada igreja num só lugar, com a paróquia acompanhando tudo de perto.
          </p>
          <div className="mt-9 flex flex-wrap gap-3 [text-shadow:none]">
            <BotaoLink variante="ceu-contorno" href="#escalas">
              Ver como funciona
            </BotaoLink>
          </div>
          <p className="mt-5 text-[13px] text-white/80">As telas desta página usam dados fictícios.</p>
        </div>

        <Placa telas={telas} />
      </div>
    </header>
  )
}
