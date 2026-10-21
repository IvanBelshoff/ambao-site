import dynamic from 'next/dynamic'
import { api, banco, clientes } from './partes'

/** O React Flow só baixa quando a área de devs abre. Até lá, o espaço do diagrama fica reservado. */
const DiagramaArquitetura = dynamic(() => import('./diagrama-arquitetura'), {
  ssr: false,
  loading: () => <div className="h-[160px]" />,
})

/**
 * As partes do sistema e como se ligam: os clientes falam com a API, a API com o
 * banco. O desenho é só visual; quem usa leitor de tela ouve a mesma coisa na lista.
 */
export function Arquitetura({ visivel }: { visivel: boolean }) {
  return (
    <div className="mt-10">
      <ol className="sr-only" aria-label="Como as partes se ligam">
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            {cliente.rotulo} ({cliente.detalhe}) fala com a {api.rotulo} ({api.detalhe}).
          </li>
        ))}
        <li>
          A {api.rotulo} guarda os dados no {banco.rotulo} ({banco.detalhe}).
        </li>
      </ol>
      {visivel ? <DiagramaArquitetura /> : null}
    </div>
  )
}
