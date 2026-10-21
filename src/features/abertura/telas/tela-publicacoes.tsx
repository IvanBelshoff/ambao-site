import { Cruz } from '@/components/ui/cruz'
import { Disco } from '@/components/ui/disco'
import { Icone } from '@/components/ui/icone'
import { AcoesDoCard, CardDoFeed } from '@/components/painel/card-do-feed'

/** Uma publicação da paróquia no mural, com as reações de Amém e Rezando. */
export function TelaPublicacoes() {
  return (
    <>
      <p className="text-[13px] text-muted">Mural</p>
      <h2 className="mt-1 pr-28 text-[1.625rem] leading-tight font-medium tracking-tight">Publicações</h2>
      <CardDoFeed
        className="mt-4"
        avatar={
          <Disco tamanho="lg" tom="azul">
            <Cruz />
          </Disco>
        }
        autor="Paróquia Sagrada Família"
        detalhe="Paróquia toda · há 3 horas"
        texto="Missa de Finados na segunda, 2 de novembro. As quatro igrejas celebram: Matriz às 7h e às 19h, São José Operário às 9h, Santa Rita às 15h e São Pedro às 17h."
      >
        <div className="mt-3 flex items-center justify-between text-[13px] text-muted">
          <span className="flex items-center gap-1.5">
            <span className="flex -space-x-1">
              {(['amem', 'rezando'] as const).map((reacao) => (
                <span key={reacao} className="flex size-6 items-center justify-center rounded-full bg-pink text-blue ring-2 ring-white">
                  <Icone nome={reacao} className="h-3.5 w-3.5" />
                </span>
              ))}
            </span>
            <span className="tabular">11</span>
          </span>
          <span className="tabular">2 comentários</span>
        </div>
        <AcoesDoCard className="mt-2" reacao={{ icone: 'amem', rotulo: 'Amém', ativa: true }} />
      </CardDoFeed>
    </>
  )
}
