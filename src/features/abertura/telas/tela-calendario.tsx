import { igrejaDemo } from '@/dados/financeiro-demo'
import { aberto, hoje, itensDoDiaAberto, semanas } from '@/features/calendario/calendario-demo'
import { ItemDaAgenda, Marcador } from '@/features/calendario/pecas'

const nomes = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

/** O calendário da coordenação nesta semana: a faixa dos dias e a agenda do domingo. */
export function TelaCalendario() {
  const semana = semanas[0]
  return (
    <>
      <p className="text-[13px] text-muted">Calendário</p>
      <h2 className="mt-1 pr-28 text-[1.625rem] leading-tight font-medium tracking-tight">Esta semana</h2>
      <p className="mt-1 text-[13px] text-muted">19 a 25 de outubro · {igrejaDemo}</p>

      <ol className="tabular mt-4 grid grid-cols-7 rounded-field border border-line py-2 text-center" aria-label="Dias da semana">
        {semana.map((dia, indice) => {
          const eHoje = dia.dia === hoje.dia && dia.mes === hoje.mes
          const eAberto = dia.dia === aberto.dia && dia.mes === aberto.mes
          const disco = eAberto ? 'bg-action text-on-action' : eHoje ? 'text-blue ring-1 ring-blue ring-inset' : dia.dia < hoje.dia ? 'text-muted' : ''
          return (
            <li key={dia.dia} className="flex flex-col items-center gap-1">
              <span className="text-[11px] text-muted">{nomes[indice]}</span>
              <span className={`flex size-8 items-center justify-center rounded-full text-[13px] font-medium ${disco}`}>
                {dia.dia}
                {eHoje ? <span className="sr-only">, hoje</span> : null}
              </span>
              <span aria-hidden="true" className="flex h-1.5 gap-1">
                {dia.itens.map((item) => (
                  <Marcador key={item.titulo} item={item} className="h-1.5 w-1.5" />
                ))}
              </span>
            </li>
          )
        })}
      </ol>

      <h3 className="mt-4 text-[13px] font-medium text-muted">{aberto.rotulo}</h3>
      <ul className="mt-2 grid grid-cols-[minmax(0,1fr)] gap-2">
        {itensDoDiaAberto.map((item) => (
          <li key={item.titulo}>
            <ItemDaAgenda item={item} />
          </li>
        ))}
      </ul>
    </>
  )
}
