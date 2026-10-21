import { Icone } from '@/components/ui/icone'
import { Momento } from '@/features/folheto/momento'
import { Folha, Vitrine } from '@/features/folheto/vitrine'
import { type Dia, type ItemDoCalendario, aberto, hoje, itensDoDiaAberto, semanas } from './calendario-demo'
import { ItemDaAgenda, Marcador, tom } from './pecas'

const diasDaSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
const filtros = ['Todos', 'Eventos', 'Escalações', 'Minhas escalas']

/** O mês da paróquia inteira: as celebrações escaladas e os eventos, no mesmo lugar. */
export function Calendario() {
  return (
    <Momento
      id="calendario"
      titulo="Que missa tem em qual igreja nesta semana?"
      rubrica="Toda segunda-feira."
      leitura="O quadro de horários é montado à mão, e a festa de uma igreja pode cair no mesmo dia de uma formação da paróquia."
      resposta="No Ambão, a paróquia inteira usa um calendário só. Os eventos da paróquia valem para todas as igrejas, cada igreja marca os seus, e as celebrações escaladas aparecem com quem já confirmou."
      junto={[
        'Visão de mês e de semana',
        'Filtro de eventos, escalações e minhas escalas',
        'Quem foi escalado vê “Você · Salmo” no próprio dia',
        'Escala em rascunho marcada antes de ser publicada',
      ]}
      vitrine={
        <Vitrine legenda="Três semanas da igreja, com os eventos da paróquia e as celebrações escaladas. A coordenação vê quem confirmou sem abrir a escala.">
          <Folha>
            <p className="text-[13px] text-muted">Calendário</p>
            <h3 className="mt-1 text-[1.25rem] leading-tight font-medium tracking-tight">19 de outubro a 8 de novembro</h3>
            <div className="-mx-1 mt-4 overflow-x-auto px-1 pb-0.5 [scrollbar-width:none]">
              <div className="inline-flex rounded-field border border-line bg-white p-1">
                {filtros.map((filtro, indice) => (
                  <span
                    key={filtro}
                    className={`rounded-field px-3 py-1.5 text-[13px] font-medium whitespace-nowrap ${
                      indice === 0 ? 'border border-blue bg-pink text-blue' : 'border border-transparent text-muted'
                    }`}
                  >
                    {filtro}
                  </span>
                ))}
              </div>
            </div>

            <Grade />
            <Legenda />

            <div className="mt-5 border-t border-line pt-4">
              <h4 className="text-[15px] font-medium">{aberto.rotulo}</h4>
              <ul className="mt-3 grid grid-cols-[minmax(0,1fr)] gap-2">
                {itensDoDiaAberto.map((item) => (
                  <li key={item.titulo}>
                    <ItemDaAgenda item={item} />
                  </li>
                ))}
              </ul>
            </div>
          </Folha>
        </Vitrine>
      }
    />
  )
}

/** As três semanas. No celular, pontos; a partir de 640px, a etiqueta de cada item, como o mês do painel. */
function Grade() {
  return (
    <div className="mt-4 sm:overflow-hidden sm:rounded-field sm:border sm:border-line">
      <div className="grid grid-cols-7 sm:border-b sm:border-line">
        {diasDaSemana.map((dia) => (
          <span key={dia} className="py-2 text-center text-[13px] font-medium text-muted">
            {dia}
          </span>
        ))}
      </div>
      <div className="flex flex-col sm:gap-px sm:bg-line">
        {semanas.map((semana) => (
          <div key={`${semana[0].mes}-${semana[0].dia}`} className="grid grid-cols-7 sm:gap-px">
            {semana.map((dia) => (
              <Celula key={`${dia.mes}-${dia.dia}`} dia={dia} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function Celula({ dia }: { dia: Dia }) {
  const eHoje = dia.mes === hoje.mes && dia.dia === hoje.dia
  const eAberto = dia.mes === aberto.mes && dia.dia === aberto.dia
  const passado = dia.mes === 'out' && dia.dia < hoje.dia
  const disco = eAberto
    ? 'bg-blue text-white'
    : eHoje
      ? 'text-blue ring-1 ring-blue ring-inset'
      : passado
        ? 'text-muted'
        : 'text-ink'

  return (
    <div className="flex h-14 min-w-0 flex-col items-center bg-white pt-1 sm:h-auto sm:min-h-[5.25rem] sm:items-stretch sm:p-1">
      <span className={`tabular flex size-8 items-center justify-center rounded-full text-[13px] font-medium sm:size-7 ${disco}`}>
        {dia.dia}
        {eHoje ? <span className="sr-only">, hoje</span> : null}
      </span>
      {dia.itens.length > 0 ? (
        <>
          <span aria-hidden="true" className="mt-1 flex gap-1 sm:hidden">
            {dia.itens.map((item) => (
              <Marcador key={item.titulo} item={item} className="h-1.5 w-1.5" />
            ))}
          </span>
          <ul className="mt-1 hidden flex-col gap-0.5 sm:flex">
            {dia.itens.map((item) => (
              <li
                key={item.titulo}
                className={`flex min-w-0 items-center gap-1 rounded-[3px] px-1 py-[3px] text-[11px] leading-tight ${tom(item)}`}
              >
                <Marcador item={item} className="h-1.5 w-1.5" />
                <span className="min-w-0 flex-1 truncate font-medium">{item.titulo}</span>
                {item.prontidao && item.prontidao.recusas > 0 ? (
                  <Icone nome="alerta" className="h-3 w-3 text-danger" />
                ) : null}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  )
}

/** O que cada marca quer dizer: evento, celebração e rascunho. */
function Legenda() {
  const exemplos: [ItemDoCalendario, string][] = [
    [{ titulo: '', tipo: 'evento', inicio: '', fim: '', origem: '' }, 'Evento'],
    [{ titulo: '', tipo: 'escala', inicio: '', fim: '', origem: '' }, 'Celebração'],
    [{ titulo: '', tipo: 'escala', inicio: '', fim: '', origem: '', rascunho: true }, 'Rascunho'],
  ]
  return (
    <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-muted">
      {exemplos.map(([item, rotulo]) => (
        <span key={rotulo} className="inline-flex items-center gap-1.5">
          <Marcador item={item} className="h-2 w-2" />
          {rotulo}
        </span>
      ))}
    </p>
  )
}
