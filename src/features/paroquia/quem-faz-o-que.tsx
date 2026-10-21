import estilo from './quem-faz-o-que.module.css'

/** Os papéis do Ambão. Confira em `harness/produto.md` antes de mudar o que cada um faz. */
const papeis = [
  {
    quem: 'Administrador da paróquia',
    faz: 'Cria as igrejas e entrega a coordenação. Cuida dos eventos, do caixa, dos treinamentos e das publicações da paróquia. Acompanha o caixa e o dízimo de cada igreja, sem precisar lançar.',
  },
  {
    quem: 'Coordenador da igreja',
    faz: 'Conduz a própria igreja: escalas, caixa, dízimo, cantina, galeria, rifas e publicações.',
  },
  {
    quem: 'Padre',
    faz: 'Acompanha a paróquia e todas as igrejas, inclusive as publicações internas e as próprias participações, sem a parte administrativa.',
  },
  {
    quem: 'Membro com acesso',
    faz: 'Opera o que recebeu permissão para operar, na própria igreja. Responde às escalas e acompanha o próprio dízimo.',
  },
  {
    quem: 'Membro sem acesso',
    faz: 'Tem a ficha cadastrada na igreja e pode ser escalado, sem precisar entrar no sistema.',
  },
]

export function QuemFazOQue() {
  return (
    <div className="mx-auto mt-14 w-[90%] max-w-[78rem] lg:mt-20">
      <h3 className="text-[1.375rem] font-medium tracking-tight">Quem faz o quê</h3>
      <div className="mt-4">
        <table className={`${estilo.papeis} w-full text-left text-[15px]`}>
          <thead>
            <tr className="bg-pink text-[13px]">
              <th scope="col" className="w-[30%] rounded-l-field px-4 py-2.5 font-medium">
                Quem
              </th>
              <th scope="col" className="rounded-r-field px-4 py-2.5 font-medium">
                O que faz no Ambão
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line align-top">
            {papeis.map((papel) => (
              <tr key={papel.quem}>
                <th scope="row" className="px-4 py-3.5 font-medium">
                  {papel.quem}
                </th>
                <td className="px-4 py-3.5 text-pretty">{papel.faz}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
