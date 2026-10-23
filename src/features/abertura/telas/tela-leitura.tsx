import {
  META_SEMANAL,
  diasLidos,
  estiloDoDia,
  leiturasDeHoje,
  semanaDeLeitura,
  sequencia,
} from '@/features/leitura/leitura-demo'

/** A leitura do dia de quem está escalado: a semana marcada, as leituras de hoje e a sequência. */
export function TelaLeitura() {
  return (
    <>
      <p className="text-[13px] text-muted">Leitura do dia</p>
      <h2 className="mt-1 pr-28 text-[1.625rem] leading-tight font-medium tracking-tight">Quarta, 21 de outubro</h2>
      <p className="mt-1 text-[13px] text-muted">29ª semana do Tempo Comum</p>

      <div className="mt-4 rounded-field border border-line px-4 py-3">
        <p className="flex items-baseline justify-between text-[13px]">
          <span className="font-medium">Esta semana</span>
          <span className="tabular text-muted">
            {diasLidos} de {META_SEMANAL} dias
          </span>
        </p>
        <ol className="tabular mt-2.5 grid grid-cols-7 text-center" aria-label="Dias da semana">
          {semanaDeLeitura.map((dia) => (
            <li key={dia.numero} className="flex flex-col items-center gap-1">
              <span className="text-[11px] text-muted">{dia.nome}</span>
              <span
                className={`flex size-8 items-center justify-center rounded-full text-[13px] ${dia.estado ? estiloDoDia[dia.estado] : ''}`}
              >
                {dia.numero}
                {dia.estado === 'lido' ? <span className="sr-only">, lida</span> : null}
                {dia.estado === 'hoje' ? <span className="sr-only">, hoje</span> : null}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <h3 className="mt-4 text-[13px] font-medium text-muted">Leituras de hoje</h3>
      <ul className="mt-2 divide-y divide-line rounded-field border border-line">
        {leiturasDeHoje.map((leitura) => (
          <li key={leitura.parte} className="flex items-center justify-between gap-3 px-4 py-2.5">
            <span className="text-[14px] font-medium">{leitura.parte}</span>
            <span className="tabular text-[13px] text-muted">{leitura.referencia}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="inline-flex h-10 items-center rounded-field bg-action px-4 text-[14px] font-medium text-on-action">
          Marcar como lida
        </span>
        <p className="text-[13px] text-muted">
          <span className="font-medium text-ink">{sequencia.atual} semanas seguidas</span> · a maior foi de{' '}
          {sequencia.maior}
        </p>
      </div>
    </>
  )
}
