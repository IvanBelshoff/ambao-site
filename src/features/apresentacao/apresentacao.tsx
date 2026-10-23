/** Os momentos da página, na ordem em que aparecem: o "O que organiza" leva a cada um. */
const assuntos = [
  { id: 'escalas', rotulo: 'escalas das celebrações' },
  { id: 'musica', rotulo: 'música' },
  { id: 'calendario', rotulo: 'calendário' },
  { id: 'leitura', rotulo: 'leitura do dia' },
  { id: 'dizimo', rotulo: 'dízimo e caixa' },
  { id: 'avisos', rotulo: 'comunicados' },
  { id: 'acervo', rotulo: 'fotos' },
  { id: 'certificados', rotulo: 'certificados' },
  { id: 'mais', rotulo: 'rifas, cantina e treinamentos' },
]

/**
 * O que é o Ambão, dito antes dos casos de uso: uma frase que define e uma ficha
 * de três linhas. Não é um momento do folheto, porque não responde a uma dor:
 * explica o livro antes de abrir a primeira página.
 */
export function Apresentacao() {
  return (
    <section id="o-que-e" aria-labelledby="o-que-e-titulo" className="pt-14 pb-20 lg:pt-12 lg:pb-28">
      <div className="mx-auto grid w-[90%] max-w-[78rem] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-x-16 xl:gap-x-24">
        <div>
          <h2
            id="o-que-e-titulo"
            className="text-[2rem] leading-[1.12] font-medium tracking-[-0.03em] text-balance sm:text-[2.5rem]"
          >
            O que é o Ambão
          </h2>
          <p className="mt-6 max-w-[30rem] text-[1.375rem] leading-[1.45] font-medium tracking-[-0.015em] text-pretty sm:text-[1.5rem]">
            Um sistema para paróquias católicas organizarem, num só lugar, o que hoje fica espalhado entre
            planilhas, cadernos, grupos de WhatsApp e o mural da igreja.
          </p>
          <p className="mt-5 max-w-[34rem] text-leitura text-pretty text-muted">
            Funciona no navegador, no computador ou no celular, sem instalar nada. Cada pessoa entra com a
            própria conta e vê o que é dela.
          </p>
        </div>

        <dl className="m-0 self-start border-t border-line">
          <Linha rotulo="Para quem">
            Para a paróquia com várias igrejas e comunidades: o padre, a secretaria, o coordenador de cada
            igreja, as equipes de liturgia e música, quem cuida do dízimo e cada pessoa da comunidade, cada
            um com o acesso de que precisa.
          </Linha>
          <Linha rotulo="O que organiza">
            <span className="text-pretty">
              {assuntos.map((assunto, indice) => (
                <span key={assunto.id}>
                  <a
                    href={`#${assunto.id}`}
                    className="rounded-[2px] text-blue underline decoration-blue/30 underline-offset-4 transition-colors hover:decoration-blue"
                  >
                    {assunto.rotulo}
                  </a>
                  {indice < assuntos.length - 2 ? ', ' : indice === assuntos.length - 2 ? ' e ' : '.'}
                </span>
              ))}
            </span>
          </Linha>
          <Linha rotulo="Como divide">
            Cada igreja lança e conduz o que é dela: a caixa, o dízimo, as escalas. A paróquia acompanha
            lendo esses dados e conduz o que é de todas. Nada se mistura, e ninguém precisa pedir o
            relatório de ninguém.
          </Linha>
        </dl>

        <p className="text-[15px] text-muted lg:col-span-2">
          A seguir, as situações de toda semana numa paróquia e como o Ambão responde a cada uma.
        </p>
      </div>
    </section>
  )
}

function Linha({ rotulo, children }: { rotulo: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5 border-b border-line py-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6">
      <dt className="text-[15px] font-medium text-blue">{rotulo}</dt>
      <dd className="m-0 text-[1.0625rem] leading-[1.6] text-pretty">{children}</dd>
    </div>
  )
}
