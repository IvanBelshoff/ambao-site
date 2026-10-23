import { Disco } from '@/components/ui/disco'
import { Selo, type TomSelo } from '@/components/ui/selo'
import { igrejaDemo } from '@/dados/financeiro-demo'
import { Momento } from '@/features/folheto/momento'
import { Folha, Vitrine } from '@/features/folheto/vitrine'
import { type RespostaDaEscala, alocacoes, prontidao, resumidas } from './escala-demo'

const selos: Record<RespostaDaEscala, { tom: TomSelo; rotulo: string }> = {
  confirmou: { tom: 'ok', rotulo: 'Confirmou' },
  recusou: { tom: 'nao', rotulo: 'Recusou' },
  'sem-resposta': { tom: 'espera', rotulo: 'Sem resposta' },
}

export function Escalas() {
  return (
    <Momento
      id="escalas"
      titulo="Quem faz a leitura na missa de domingo?"
      rubrica="Sábado à noite."
      leitura="A coordenação ainda confirma pelo grupo quem lê, quem canta e quem leva as oferendas. Com tanta mensagem, uma troca de última hora passa despercebida."
      resposta="No Ambão, a escala é publicada com antecedência, cada pessoa responde se pode ir, e quem foi escalado já recebe o texto do dia para se preparar."
      junto={[
        'Várias pessoas na mesma função',
        'Leituras do dia preenchidas pela liturgia oficial',
        'Recusa com motivo, para a coordenação remanejar',
        'Repertório com os cantos da celebração',
      ]}
      vitrine={
        <Vitrine legenda="A coordenação vê quem confirmou, quem ainda não respondeu e quem não pode.">
          <EscalaDaCelebracao />
        </Vitrine>
      }
    />
  )
}

/** A escala publicada, com a barra de prontidão e a resposta de cada pessoa. */
function EscalaDaCelebracao() {
  const { aceitaram, semResposta, recusaram, total } = prontidao()
  return (
    <Folha>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[13px] text-muted">Escala da celebração</p>
          <h3 className="mt-1 text-[1.25rem] leading-tight font-medium tracking-tight">30º Domingo do Tempo Comum</h3>
          <p className="mt-1 text-[13px] text-muted">Domingo, 25 de outubro · 9h · {igrejaDemo}</p>
        </div>
        <Selo tom="publicada">Publicada</Selo>
      </div>

      <div className="mt-5">
        <div
          className="flex h-1.5 gap-0.5 overflow-hidden rounded-full"
          role="img"
          aria-label={`${aceitaram} de ${total} aceitaram, ${semResposta} sem resposta, ${recusaram} recusou`}
        >
          <span className="bg-success" style={{ flex: aceitaram }} />
          <span className="bg-warning" style={{ flex: semResposta }} />
          <span className="bg-danger" style={{ flex: recusaram }} />
        </div>
        <p className="tabular mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-muted">
          <span>
            <span className="font-medium text-ink">
              {aceitaram} de {total}
            </span>{' '}
            aceitaram
          </span>
          <span>
            <span className="font-medium text-ink">{semResposta}</span> sem resposta
          </span>
          <span>
            <span className="font-medium text-ink">{recusaram}</span> recusou
          </span>
        </p>
      </div>

      <ul className="mt-4 divide-y divide-line border-t border-line text-[14px]">
        {alocacoes.map((alocacao) => (
          <li
            key={`${alocacao.funcao}-${alocacao.iniciais}`}
            className="grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-x-3 py-2.5 [grid-template-areas:'disco_funcao_selo'_'disco_nome_selo']"
          >
            <span className="text-[12px] text-muted [grid-area:funcao]">{alocacao.funcao}</span>
            <Disco tamanho="sm" tom="lavado" className="[grid-area:disco]">
              {alocacao.iniciais}
            </Disco>
            <span className="min-w-0 [grid-area:nome]">
              {alocacao.pessoa}
              {alocacao.motivo ? <span className="block text-[12px] text-muted">{alocacao.motivo}</span> : null}
            </span>
            <Selo tom={selos[alocacao.resposta].tom} className="[grid-area:selo]">
              {selos[alocacao.resposta].rotulo}
            </Selo>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[13px] text-muted">{resumidas.texto}</p>
    </Folha>
  )
}
