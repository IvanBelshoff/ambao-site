import { Icone } from '@/components/ui/icone'
import { dizimoDoMes } from '@/dados/financeiro-demo'
import { reais } from '@/lib/reais'

/** Os dízimos do mês, na coordenação: os últimos envelopes com recibo. */
export function TelaDizimos() {
  return (
    <>
      <p className="text-[13px] text-muted">Financeiro</p>
      <h2 className="mt-1 pr-28 text-[1.625rem] leading-tight font-medium tracking-tight">Dízimos</h2>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="inline-flex h-11 items-center gap-1 rounded-field border border-field pr-3 pl-1 text-[15px]">
          <span className="flex h-9 w-8 items-center justify-center text-muted">
            <Icone nome="anterior" className="h-4 w-4" />
          </span>
          Outubro de 2026
        </p>
        <span className="inline-flex h-11 items-center rounded-field bg-blue px-4 text-[15px] font-medium text-white">Novo recebimento</span>
      </div>
      <p className="tabular mt-4 text-[13px] text-muted">
        <span className="font-medium text-ink">{dizimoDoMes.envelopes} envelopes</span> · {reais(dizimoDoMes.total)} no mês
      </p>
      <table className="tabular mt-2 w-full text-left text-[14px]">
        <thead>
          <tr className="bg-pink text-[12px] text-ink">
            <th scope="col" className="rounded-l-field px-3 py-2 font-medium">
              Recibo
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Pessoa
            </th>
            <th scope="col" className="hidden px-3 py-2 font-medium sm:table-cell">
              Forma
            </th>
            <th scope="col" className="rounded-r-field px-3 py-2 text-right font-medium">
              Valor
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {dizimoDoMes.ultimos.map((recebimento) => (
            <tr key={recebimento.recibo}>
              <td className="px-3 py-2.5 text-muted">{recebimento.recibo}</td>
              <td className="px-3 py-2.5">
                {recebimento.pessoa}
                {'competencias' in recebimento ? (
                  <span className="block text-[12px] text-muted">{recebimento.competencias}</span>
                ) : null}
              </td>
              <td className="hidden px-3 py-2.5 text-muted sm:table-cell">{recebimento.forma}</td>
              <td className="px-3 py-2.5 text-right whitespace-nowrap">{reais(recebimento.valorNoMes)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
