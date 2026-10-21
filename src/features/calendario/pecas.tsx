import { Icone } from '@/components/ui/icone'
import { type ItemDoCalendario, rotuloProntidao } from './calendario-demo'

/* As peças do calendário do painel recriadas, usadas pelo momento e pela placa. */

/** O tom do item no painel (calendar-item.ts): evento em azul lavado, celebração em rosa, rascunho tracejado. */
export function tom(item: ItemDoCalendario) {
  if (item.tipo === 'evento') return 'bg-blue-wash text-blue'
  if (item.rascunho) return 'border border-dashed border-rose-strong bg-white text-blue'
  return 'bg-pink text-blue'
}

export function Marcador({ item, className }: { item: ItemDoCalendario; className: string }) {
  const cor = item.tipo === 'evento' ? 'bg-blue' : item.rascunho ? 'border-[1.5px] border-rose-strong bg-white' : 'bg-rose-strong'
  return <span aria-hidden="true" className={`inline-block shrink-0 rounded-full ${cor} ${className}`} />
}

/** Um item na agenda do dia, como o ItemCard do painel. */
export function ItemDaAgenda({ item }: { item: ItemDoCalendario }) {
  return (
    <div className={`flex min-h-11 items-start gap-3 rounded-field px-3 py-2.5 ${tom(item)}`}>
      <Marcador item={item} className="mt-[7px] h-2 w-2" />
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-[15px] font-medium">{item.titulo}</span>
          {item.rascunho ? (
            <span className="rounded-full border border-dashed border-rose-strong px-1.5 text-[11px] leading-4 font-medium text-rose-strong">
              Rascunho
            </span>
          ) : null}
        </span>
        <span className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[13px] text-muted">
          <span className="tabular">
            {item.inicio}–{item.fim}
          </span>
          <span className="inline-flex min-w-0 items-center gap-1">
            <Icone nome="igreja" className="h-3.5 w-3.5" />
            <span className="truncate">{item.origem}</span>
          </span>
          {item.prontidao ? (
            <span
              className={`tabular inline-flex items-center gap-1 ${item.prontidao.recusas > 0 ? 'font-medium text-danger' : ''}`}
            >
              {item.prontidao.recusas > 0 ? <Icone nome="alerta" className="h-3.5 w-3.5" /> : null}
              {rotuloProntidao(item.prontidao)}
            </span>
          ) : null}
          {item.comunicado ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue/10 px-1.5 text-[11px] leading-4 font-medium text-blue">
              <Icone nome="comunicado" className="h-3 w-3" />
              Comunicado às igrejas
            </span>
          ) : null}
        </span>
      </span>
    </div>
  )
}
