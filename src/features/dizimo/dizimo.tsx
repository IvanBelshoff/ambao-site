import {
  caixaDoMes,
  igrejaDemo,
  mesDemo,
  reciboDemo,
  saldoDoMes,
  totalDoRecibo,
  totalEntradas,
  totalSaidas,
} from '@/dados/financeiro-demo'
import { Momento } from '@/features/folheto/momento'
import { Folha, Vitrine } from '@/features/folheto/vitrine'
import { reais } from '@/lib/reais'

export function Dizimo() {
  return (
    <Momento
      id="dizimo"
      titulo="Quanto entrou, de quem, e em que mês?"
      rubrica="Depois da missa."
      leitura="O envelope vai para o caderno, o caderno vai para a planilha, e o recibo fica para depois."
      resposta="No Ambão, o dízimo sai com recibo numerado e entra sozinho no caixa da igreja. No fim do mês, o caixa fecha e vira um relatório em Excel."
      junto={[
        'Um recebimento pode cobrir vários meses',
        'Cada pessoa vê o próprio extrato do ano',
        'Lançamento com comprovante e pedido de remoção',
        'Caixa da paróquia separado do caixa de cada igreja',
      ]}
      vitrine={
        <Vitrine legenda="O recibo e o caixa do mesmo mês: a entrada do dízimo já está somada.">
          <div className="grid gap-4">
            <Recibo />
            <CaixaDoMes />
          </div>
        </Vitrine>
      }
    />
  )
}

function Recibo() {
  return (
    <Folha>
      <p className="text-[13px] text-muted">Recibo nº {reciboDemo.numero}</p>
      <h3 className="mt-1 text-[17px] font-medium text-blue">Oferta de dízimo</h3>
      <p className="mt-3 text-[15px]">Igreja {igrejaDemo}</p>
      <p className="mt-1 text-[15px] font-medium">{reciboDemo.pessoa}</p>
      <p className="mt-1 text-[13px] text-muted">
        Recebido em {reciboDemo.recebidoEm} · {reciboDemo.forma}
      </p>
      <ul className="tabular mt-4 divide-y divide-line border-y border-line text-[15px]">
        {reciboDemo.competencias.map((competencia) => (
          <li key={competencia.mes} className="flex items-baseline justify-between gap-3 py-2">
            <span>{competencia.mes}</span>
            <span>{reais(competencia.valor)}</span>
          </li>
        ))}
      </ul>
      <p className="tabular mt-3 flex items-baseline justify-between text-[15px] font-medium">
        <span>Total</span>
        <span>{reais(totalDoRecibo)}</span>
      </p>
    </Folha>
  )
}

function CaixaDoMes() {
  return (
    <Folha>
      <p className="text-[13px] text-muted">Caixa · {mesDemo}</p>
      <h3 className="mt-1 text-[17px] font-medium">{igrejaDemo}</h3>
      <dl className="tabular mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-[13px]">
        <div>
          <dt className="text-muted">Entradas</dt>
          <dd className="mt-0.5 text-[15px] font-medium text-success">{reais(totalEntradas)}</dd>
        </div>
        <div>
          <dt className="text-muted">Saídas</dt>
          <dd className="mt-0.5 text-[15px] font-medium text-danger">{reais(totalSaidas)}</dd>
        </div>
        <div className="col-span-2 rounded-field bg-blue-wash px-3 py-2.5">
          <dt className="text-blue">Saldo do mês</dt>
          <dd className="mt-0.5 text-[1.25rem] font-medium tracking-tight">{reais(saldoDoMes)}</dd>
        </div>
      </dl>
      <ul className="tabular mt-4 divide-y divide-line border-t border-line text-[14px]">
        {caixaDoMes.entradas.map((entrada) => (
          <li key={entrada.categoria} className="flex justify-between gap-3 py-2">
            <span>{entrada.categoria}</span>
            <span>{reais(entrada.valor)}</span>
          </li>
        ))}
        {caixaDoMes.saidas.map((saida) => (
          <li key={saida.categoria} className="flex justify-between gap-3 py-2">
            <span>{saida.categoria}</span>
            <span className="text-muted">{reais(saida.valor, { saida: true })}</span>
          </li>
        ))}
      </ul>
    </Folha>
  )
}
