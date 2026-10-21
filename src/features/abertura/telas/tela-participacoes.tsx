import { Icone } from '@/components/ui/icone'
import { igrejaDemo } from '@/dados/financeiro-demo'

const equipe = [
  { funcao: 'Comentários', pessoa: 'Helena Duarte' },
  { funcao: 'Primeira leitura', pessoa: 'Ana Lúcia Prado' },
  { funcao: 'Salmo', pessoa: 'Você' },
]

/** A participação de quem foi escalado: a função, a resposta e o texto para ensaiar. */
export function TelaParticipacoes() {
  return (
    <>
      <p className="text-[13px] text-muted">Minhas participações</p>
      <h2 className="mt-1 pr-28 text-[1.5rem] leading-tight font-medium tracking-tight">30º Domingo do Tempo Comum</h2>
      <p className="mt-1 text-[13px] text-muted">Domingo, 25 de outubro · 9h · {igrejaDemo}</p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-field bg-blue-wash px-4 py-3">
        <p className="text-[15px]">
          Sua função: <span className="font-medium text-blue">Salmo</span>
        </p>
        <p className="inline-flex items-center gap-1.5 text-[13px] font-medium text-success">
          <Icone nome="check" className="h-4 w-4" />
          Você confirmou
        </p>
      </div>

      <h3 className="mt-5 text-[15px] font-medium">Salmo responsorial · Sl 17(18)</h3>
      <p className="mt-2 rounded-field bg-pink px-4 py-3 text-[1.0625rem] leading-snug">
        <span className="mr-2 font-semibold text-blue">R.</span>
        <span className="font-medium">Eu vos amo, ó Senhor, sois minha força e salvação.</span>
      </p>
      <p className="mt-2 text-[13px] text-muted">O texto completo vem da liturgia do dia e fica aqui para você ensaiar.</p>

      <h3 className="mt-5 text-[13px] font-medium text-muted">Equipe da celebração</h3>
      <ul className="mt-2 divide-y divide-line border-y border-line text-[14px]">
        {equipe.map((item) => (
          <li key={item.funcao} className="flex items-center justify-between gap-3 py-2">
            <span className="text-muted">{item.funcao}</span>
            <span className={item.pessoa === 'Você' ? 'font-medium text-blue' : undefined}>{item.pessoa}</span>
          </li>
        ))}
      </ul>
    </>
  )
}
