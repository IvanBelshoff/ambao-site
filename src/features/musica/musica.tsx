import { Icone } from '@/components/ui/icone'
import { Momento } from '@/features/folheto/momento'
import { Folha, Vitrine } from '@/features/folheto/vitrine'
import { type MomentoDaMissa, letraAberta, momentos, resumoDosCantos } from './cantos-demo'

/** A música da mesma celebração das Escalas: o domingo continua. */
export function Musica() {
  return (
    <Momento
      id="musica"
      titulo="Qual canto entra no ofertório?"
      rubrica="Na véspera da missa."
      leitura="O ministério de música monta a folha de canto à mão, e quem vai cantar ainda pede a letra pelo grupo."
      resposta="No Ambão, cada momento da missa tem o seu repertório. A celebração recebe os cantos já na ordem, quem foi escalado lê a letra no celular, e a folha de canto sai pronta em PDF."
      junto={[
        'Catálogo de cantos da igreja, com letra e cifra',
        'Refrão marcado na letra, para quem puxa o canto',
        'Link para as sugestões do dia no Músicas para Missa',
        'Folha de canto em três modelos',
      ]}
      vitrine={
        <Vitrine legenda="Os cantos na ordem da missa, com a letra à mão de quem foi escalado para cantar.">
          <CantosDaCelebracao />
        </Vitrine>
      }
    />
  )
}

/** O card "Cantos da celebração" do painel, com o ofertório aberto. */
function CantosDaCelebracao() {
  return (
    <Folha className="p-0">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line px-5 py-4">
        <div>
          <h3 className="text-[15px] font-medium">Cantos da celebração</h3>
          <p className="tabular text-[13px] text-muted">{resumoDosCantos()}</p>
        </div>
        <span className="inline-flex h-9 items-center rounded-field border border-field px-3 text-[13px] font-medium">
          Folha de canto
        </span>
      </div>
      {/* Trilha minmax(0,1fr): sem ela, a linha que não quebra (o salmo) alarga a folha. */}
      <ul className="grid grid-cols-[minmax(0,1fr)] gap-2 px-4 py-4">
        {momentos.map((momento, indice) => (
          <Linha key={indice} momento={momento} />
        ))}
      </ul>
    </Folha>
  )
}

function Linha({ momento }: { momento: MomentoDaMissa }) {
  if (momento.tipo === 'salmo') {
    return (
      <li className="flex min-h-12 items-center gap-3 rounded-field border border-line px-3 py-2.5">
        <Icone nome="leitura" className="h-4 w-4 text-blue" />
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-medium">
            Salmo<span className="ml-1.5 text-[13px] font-normal text-muted">resposta do povo</span>
          </span>
          <span className="mt-0.5 block truncate text-[13px]">{momento.resposta}</span>
        </span>
      </li>
    )
  }

  const aberto = momento.nome === letraAberta.momento
  const quantos = momento.cantos.length
  return (
    <li className="overflow-hidden rounded-field border border-line">
      <div className={`flex min-h-12 items-center gap-3 px-3 py-2.5 ${aberto ? 'bg-pink/50' : ''}`}>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] font-medium">{momento.nome}</span>
          {!aberto && quantos > 0 ? (
            <span className="mt-0.5 block truncate text-[13px] text-muted">{momento.cantos.map((c) => c.titulo).join(' · ')}</span>
          ) : null}
        </span>
        <span className={`tabular shrink-0 text-[13px] ${quantos === 0 ? 'text-muted' : 'font-medium text-blue'}`}>
          {quantos === 0 ? 'Sem canto' : `${quantos} ${quantos > 1 ? 'cantos' : 'canto'}`}
        </span>
        <Icone nome="proximo" className={`h-5 w-5 text-muted ${aberto ? '-rotate-90' : 'rotate-90'}`} />
      </div>
      {aberto ? (
        <div className="border-t border-line px-4 py-3">
          {momento.cantos.map((canto) => (
            <p key={canto.titulo} className="flex min-h-11 items-center gap-2">
              <Icone nome="musica" className="h-4 w-4 text-blue" />
              <span className="min-w-0 truncate text-[15px]">
                {canto.titulo}
                {canto.autor ? <span className="ml-1.5 text-[13px] text-muted">{canto.autor}</span> : null}
              </span>
            </p>
          ))}
          <div className="mt-2 border-t border-line pt-3 text-[15px] leading-relaxed">
            {letraAberta.estrofes.map((estrofe, indice) => (
              <p key={indice} className={`mb-4 last:mb-0 ${estrofe.refrao ? 'font-semibold' : ''}`}>
                {estrofe.versos.map((verso, linha) => (
                  <span key={linha} className="block">
                    {verso}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>
      ) : null}
    </li>
  )
}
