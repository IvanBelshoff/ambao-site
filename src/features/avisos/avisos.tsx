import { AcoesDoCard, CardDoFeed } from '@/components/painel/card-do-feed'
import { Disco } from '@/components/ui/disco'
import { Icone } from '@/components/ui/icone'
import { igrejaDemo } from '@/dados/financeiro-demo'
import { Momento } from '@/features/folheto/momento'
import { Vitrine } from '@/features/folheto/vitrine'

const enquete = [
  { opcao: 'Venho', votos: 5, meu: true },
  { opcao: 'Não consigo', votos: 1, meu: false },
]

export function Avisos() {
  return (
    <Momento
      id="avisos"
      titulo="O aviso chegou a todas as igrejas?"
      rubrica="Sexta à tarde."
      leitura="O mesmo recado sai em vários grupos, cada um com um texto um pouco diferente, e nem todo mundo fica sabendo."
      resposta="No Ambão, a paróquia publica uma vez para todas as igrejas. Cada igreja escolhe se o aviso é só dela ou da paróquia toda, e quem segue recebe a notificação."
      junto={['Texto, imagem, vídeo ou enquete', 'Sete reações, de Amém a Rezando', 'Comentários e link para compartilhar']}
      vitrine={
        <Vitrine legenda="Um aviso interno da igreja, com enquete.">
          <AvisoComEnquete />
          <QuemVe />
        </Vitrine>
      }
    />
  )
}

function AvisoComEnquete() {
  const totalDeVotos = enquete.reduce((soma, item) => soma + item.votos, 0)
  return (
    <CardDoFeed
      avatar={
        <Disco tamanho="lg" tom="rosa">
          SJ
        </Disco>
      }
      autor={`Igreja ${igrejaDemo}`}
      detalhe="Só a igreja · há 1 dia"
      texto="Mutirão de limpeza no sábado, 31, às 8h, para deixar a igreja pronta para Finados. Quem puder, traga luvas e balde."
    >
      <div className="mt-4">
        <p className="text-[15px] font-medium">Você vem?</p>
        <ul className="tabular mt-2 grid gap-2 text-[15px]">
          {enquete.map((item) => (
            <li key={item.opcao} className="relative flex h-11 items-center justify-between overflow-hidden rounded-field px-3">
              <span
                className={`absolute inset-y-0 left-0 ${item.meu ? 'bg-pink' : 'bg-blue-wash'}`}
                style={{ width: `${Math.round((item.votos / totalDeVotos) * 100)}%` }}
                aria-hidden="true"
              />
              {item.meu ? (
                <span className="relative inline-flex items-center gap-2 font-medium text-blue">
                  <Icone nome="check" className="h-4 w-4" />
                  {item.opcao}
                </span>
              ) : (
                <span className="relative">{item.opcao}</span>
              )}
              <span className="relative text-[13px] text-muted">
                {item.votos} {item.votos === 1 ? 'voto' : 'votos'}
                {item.meu ? ' · seu voto' : ''}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <AcoesDoCard className="mt-4" reacao={{ icone: 'curtir', rotulo: 'Curtir' }} />
    </CardDoFeed>
  )
}

/** Selo e recado sobre o rosa viram papel: a escolha de quem vê, como no compositor. */
function QuemVe() {
  return (
    <div className="mt-4 rounded-field bg-pink p-4">
      <p className="text-[13px] font-medium">Ao publicar, a igreja escolhe quem vê</p>
      <div className="mt-2 grid grid-cols-2 gap-2 text-[14px]">
        <span className="flex min-h-11 items-center gap-2 rounded-field bg-white px-3 font-medium text-blue ring-1 ring-blue/40">
          <Icone nome="check" className="h-4 w-4" />
          Só a igreja
        </span>
        <span className="flex min-h-11 items-center rounded-field bg-white px-3">Paróquia toda</span>
      </div>
    </div>
  )
}
