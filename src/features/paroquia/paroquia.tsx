import { Cruz } from '@/components/ui/cruz'
import { Disco } from '@/components/ui/disco'
import { Momento } from '@/features/folheto/momento'
import { Folha, Vitrine } from '@/features/folheto/vitrine'
import { QuemFazOQue } from './quem-faz-o-que'

const igrejas = [
  { sigla: 'SF', nome: 'Matriz Sagrada Família', matriz: true },
  { sigla: 'SJ', nome: 'São José Operário' },
  { sigla: 'SR', nome: 'Santa Rita de Cássia' },
  { sigla: 'SP', nome: 'São Pedro Pescador' },
]

/** O circuito: cada igreja conduz o que é dela, e a paróquia enxerga o todo. */
export function Paroquia() {
  return (
    <Momento
      id="paroquia"
      titulo="Como a paróquia acompanha sem fazer tudo sozinha?"
      rubrica="O ano inteiro."
      leitura="Quando tudo passa pela secretaria, o trabalho se acumula num lugar só. Quando cada igreja anota do seu jeito, fica difícil enxergar o todo."
      resposta="No Ambão, cada igreja lança e conduz o que é dela, e a paróquia enxerga o caixa e o dízimo de todas, cuida dos eventos comuns e deixa a operação com quem está mais perto."
      vitrine={
        <Vitrine legenda="Uma paróquia e quatro igrejas, uma delas matriz.">
          <Folha>
            <div className="flex items-center gap-3">
              <Disco tamanho="lg" tom="azul">
                <Cruz />
              </Disco>
              <span>
                <span className="block text-[15px] font-medium">Paróquia Sagrada Família</span>
                <span className="block text-[13px] text-muted">Eventos, treinamentos, caixa e avisos de todas</span>
              </span>
            </div>
            {/* A árvore desenha os ramos com o mesmo fio de 1px. */}
            <ul className="mt-4 ml-[21px] grid gap-2 border-l border-line pl-5">
              {igrejas.map((igreja) => (
                <li
                  key={igreja.sigla}
                  className="relative flex min-h-11 items-center gap-3 before:absolute before:top-1/2 before:-left-5 before:w-4 before:border-t before:border-line"
                >
                  <Disco tamanho="md" tom="rosa">
                    {igreja.sigla}
                  </Disco>
                  <span className="min-w-0 flex-1 text-[15px]">{igreja.nome}</span>
                  {igreja.matriz ? (
                    <span className="rounded-full border border-line bg-paper px-2 py-0.5 text-[12px] font-medium text-blue">Matriz</span>
                  ) : null}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[13px] text-muted">Cada igreja tem um coordenador, o próprio caixa, o dízimo, as escalas e a cantina.</p>
          </Folha>
        </Vitrine>
      }
    >
      <QuemFazOQue />
    </Momento>
  )
}
