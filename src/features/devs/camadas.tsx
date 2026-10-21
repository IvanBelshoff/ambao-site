import { Selo } from '@/components/ui/selo'
import { useAbas } from '@/lib/abas'

type Camada = {
  id: 'back' | 'front' | 'mobile'
  aba: string
  titulo: string
  pasta: string
  emDesenvolvimento?: boolean
  ficha: [rotulo: string, valor: string][]
  decisoes: [titulo: string, texto: string][]
}

/** O que cada parte usa. Mudou a stack do sistema, mude aqui (e só o que existe). */
const camadas: Camada[] = [
  {
    id: 'back',
    aba: 'Backend',
    titulo: 'A API',
    pasta: 'ambao-backend',
    ficha: [
      ['Base', 'NestJS 11 e TypeScript.'],
      ['Banco', 'PostgreSQL com TypeORM.'],
      ['Validação', 'Zod.'],
      ['Login', 'JWT.'],
      ['Arquivos', 'PDFKit para PDF e ExcelJS para planilhas.'],
      ['Documentação', 'OpenAPI com Swagger.'],
      ['Testes', 'Jest e Supertest.'],
    ],
    decisoes: [
      ['Liturgia oficial na escala', 'A escala busca a liturgia do dia nas Edições CNBB e preenche leituras, salmo e evangelho.'],
      ['Folha de canto em PDF', 'Gerada a partir do repertório da celebração.'],
      ['Caixa em Excel', 'Fechamento do mês e relatório com os totais por categoria.'],
      ['Publicação agendada', 'O aviso sai sozinho no dia e na hora marcados.'],
    ],
  },
  {
    id: 'front',
    aba: 'Frontend',
    titulo: 'O painel',
    pasta: 'ambao-web',
    ficha: [
      ['Base', 'React 19, TypeScript e Vite.'],
      ['Estilo', 'Tailwind CSS 4.'],
      ['Rotas', 'TanStack Router.'],
      ['Dados', 'TanStack Query.'],
      ['Formulários', 'React Hook Form com Zod.'],
      ['Qualidade', 'Vitest e oxlint.'],
    ],
    decisoes: [
      ['Editor de texto', 'Tiptap nas leituras da escala e na história da igreja.'],
      ['Mapa de acesso', 'React Flow desenha quem pode fazer o quê.'],
      ['Ordenar arrastando', 'dnd-kit para a ordem das funções e dos momentos da celebração.'],
      ['Fotos', 'Recorte da foto de perfil e galeria em tela cheia.'],
      ['Funciona no celular', 'O mesmo painel no computador, no tablet e no celular.'],
    ],
  },
  {
    id: 'mobile',
    aba: 'Mobile',
    titulo: 'O aplicativo',
    pasta: 'ambao-mobile',
    emDesenvolvimento: true,
    ficha: [
      ['Base', 'React Native com Expo.'],
      ['Estado', 'Em desenvolvimento. Ainda não está nas lojas.'],
    ],
    decisoes: [['O que vem com ele', 'O lembrete da leitura do dia.']],
  },
]

const ids = camadas.map((camada) => camada.id)

/** As partes do sistema na área de devs: Backend, Frontend e Mobile, com setas, Home e End. */
export function Camadas() {
  const { propsDaAba, propsDoPainel } = useAbas(ids, { orientacao: 'horizontal' })

  return (
    <div className="mt-12">
      <div role="tablist" aria-label="Partes do sistema" className="flex gap-1 overflow-x-auto border-b border-line [scrollbar-width:none]">
        {camadas.map((camada) => (
          <button
            key={camada.id}
            type="button"
            {...propsDaAba(camada.id)}
            className="-mb-px inline-flex h-12 shrink-0 cursor-pointer items-center gap-2 border-b-2 border-transparent px-4 text-[15px] font-medium whitespace-nowrap text-muted transition-colors duration-150 hover:text-blue aria-selected:border-blue aria-selected:text-blue"
          >
            {camada.aba}
            {camada.emDesenvolvimento ? (
              <Selo tom="dev" className="hidden sm:inline">
                Em desenvolvimento
              </Selo>
            ) : null}
          </button>
        ))}
      </div>

      {camadas.map((camada) => (
        <section key={camada.id} {...propsDoPainel(camada.id)} className="pt-8">
          <h3 className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[1.25rem] font-medium tracking-tight">
            {camada.titulo}: <span className="font-mono text-[0.8em] font-normal text-muted">{camada.pasta}</span>
            {camada.emDesenvolvimento ? <Selo tom="dev">Em desenvolvimento</Selo> : null}
          </h3>
          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
            <dl className="m-0 self-start border-t border-line">
              {camada.ficha.map(([rotulo, valor]) => (
                <div key={rotulo} className="grid grid-cols-[6rem_minmax(0,1fr)] gap-4 border-b border-line py-4">
                  <dt className="text-[15px] font-medium text-blue">{rotulo}</dt>
                  <dd className="m-0 text-[15px] leading-[1.6] text-pretty">{valor}</dd>
                </div>
              ))}
            </dl>
            <div className="grid content-start gap-7">
              {camada.decisoes.map(([titulo, texto]) => (
                <div key={titulo}>
                  <h4 className="text-[1.125rem] font-medium tracking-tight">{titulo}</h4>
                  <p className="mt-1.5 max-w-[38rem] text-[15px] leading-[1.65] text-pretty text-muted">{texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
