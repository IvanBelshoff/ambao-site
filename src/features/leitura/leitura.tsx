import { Momento } from '@/features/folheto/momento'
import { Folha, Vitrine } from '@/features/folheto/vitrine'
import { META_SEMANAL as META, diasLidos, estiloDoDia, semanaDeLeitura as semana, sequencia } from './leitura-demo'

/** Um momento mais quieto: a Palavra durante a semana. */
export function Leitura() {
  const lidos = diasLidos
  return (
    <Momento
      id="leitura"
      titulo="E a Palavra durante a semana?"
      rubrica="Todo dia."
      leitura="Entre um domingo e outro, a leitura do dia depende de cada um lembrar de abrir."
      resposta="No Ambão, cada pessoa marca os dias em que leu a liturgia. A meta é de cinco dias por semana, e um dia perdido não zera a sequência."
      vitrine={
        <Vitrine estreita legenda="Cada conta marca a própria leitura.">
          <Folha className="p-0">
            <div className="border-b border-line px-5 py-3.5">
              <h3 className="text-[15px] font-medium">Esta semana</h3>
              <p className="text-[13px] text-muted">
                {lidos} de {META} dias
              </p>
            </div>
            <div className="px-5 py-5">
              <ol className="tabular -mx-1 grid grid-cols-7 text-center" aria-label="Dias da semana">
                {semana.map((dia) => (
                  <li key={dia.numero} className="flex flex-col items-center gap-1.5">
                    <span className="text-[11px] text-muted">{dia.nome}</span>
                    <span
                      className={`flex size-9 items-center justify-center rounded-full text-[14px] ${dia.estado ? estiloDoDia[dia.estado] : ''}`}
                    >
                      {dia.numero}
                      {dia.estado === 'lido' ? <span className="sr-only">, lida</span> : null}
                      {dia.estado === 'hoje' ? <span className="sr-only">, hoje</span> : null}
                    </span>
                  </li>
                ))}
              </ol>
              <span className="mt-5 flex h-11 w-full items-center justify-center rounded-field bg-blue text-[15px] font-medium text-white">
                Marcar como lida
              </span>
              <p className="mt-2 text-[13px] text-muted">Marca sozinho ao chegar ao fim.</p>
              <p className="mt-5 border-t border-line pt-4 text-[13px] text-muted">
                <span className="font-medium text-ink">{sequencia.atual} semanas seguidas</span> · a maior foi de {sequencia.maior}
              </p>
            </div>
          </Folha>
        </Vitrine>
      }
    />
  )
}
