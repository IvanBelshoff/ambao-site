import { Icone } from '@/components/ui/icone'
import { dizimoDoMes, igrejaDemo, saldoDoMes } from '@/dados/financeiro-demo'
import { reais } from '@/lib/reais'

const paraFazer = [
  { quantos: 1, titulo: 'Escala com recusa', detalhe: '30º Domingo do Tempo Comum · 25/10', tom: 'bg-danger/10 text-danger' },
  { quantos: 1, titulo: 'Escala em rascunho', detalhe: 'Missa de Finados · 2/11', tom: 'bg-blue-wash text-blue' },
]

/** O Início da coordenação: o que pede decisão primeiro, depois o resumo da igreja. */
export function TelaInicio() {
  return (
    <>
      <h2 className="pr-28 text-[1.625rem] leading-tight font-medium tracking-tight">{igrejaDemo}</h2>
      <p className="mt-1 text-[13px] text-muted">Quarta, 21 de outubro · Coordenação</p>

      <div className="mt-5 rounded-field bg-pink px-4 py-4">
        <h3 className="flex items-center gap-2 text-[15px] font-medium">
          Para fazer agora
          <span className="tabular rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-blue">{paraFazer.length}</span>
        </h3>
        <ul className="mt-3 grid grid-cols-[minmax(0,1fr)] gap-2">
          {paraFazer.map((item) => (
            <li key={item.titulo} className="flex min-h-14 items-center gap-3 rounded-field bg-white px-3 py-2.5">
              <span className={`tabular flex size-9 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold ${item.tom}`}>
                {item.quantos}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-medium">{item.titulo}</span>
                <span className="block truncate text-[13px] text-muted">{item.detalhe}</span>
              </span>
              <Icone nome="proximo" className="h-4 w-4 text-muted" />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Resumo titulo="Dízimo de outubro" valor={reais(dizimoDoMes.total)} apoio={`${dizimoDoMes.envelopes} envelopes`} />
        <Resumo titulo="Saldo do mês no caixa" valor={reais(saldoDoMes)} apoio="Outubro em andamento" />
      </div>
    </>
  )
}

function Resumo({ titulo, valor, apoio }: { titulo: string; valor: string; apoio: string }) {
  return (
    <div className="rounded-field border border-line px-4 py-3.5">
      <p className="text-[13px] text-muted">{titulo}</p>
      <p className="tabular mt-1.5 text-[1.125rem] font-medium tracking-tight whitespace-nowrap sm:text-[1.375rem]">{valor}</p>
      <p className="mt-0.5 text-[13px] text-muted">{apoio}</p>
    </div>
  )
}
