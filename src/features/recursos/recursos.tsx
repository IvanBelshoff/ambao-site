/** Só o que o painel já faz. Recurso novo entra aqui depois de existir no sistema (ver PRODUCT.md). */
const recursos = [
  { nome: 'Início por perfil', descricao: 'Cada pessoa abre o Ambão no que pede decisão dela, e depois no resumo do que opera.' },
  { nome: 'Rifas', descricao: 'Números vendidos, a igreja de quem vendeu e o número sorteado.' },
  { nome: 'Treinamentos', descricao: 'Formações organizadas pela paróquia para todas as igrejas.' },
  { nome: 'Cantina', descricao: 'O cardápio da igreja em fichas, com o custo de cada produto.' },
  { nome: 'Membros', descricao: 'A ficha de cada pessoa da comunidade, com foto, e o acesso só para quem precisa entrar.' },
]

/** O resto da vida da comunidade: lista quieta, régua e texto, sem ícone nem card. */
export function Recursos() {
  return (
    <section id="mais" className="border-t border-line py-20 lg:py-28">
      <div className="mx-auto w-[90%] max-w-[78rem]">
        <h2 className="max-w-[20ch] text-[2rem] leading-[1.12] font-medium tracking-[-0.03em] text-balance sm:text-[2.5rem]">
          E o resto da vida da comunidade
        </h2>
        <dl className="mt-10 grid gap-x-12 sm:grid-cols-2">
          {recursos.map((recurso) => (
            <div key={recurso.nome} className="border-t border-line py-5">
              <dt className="text-[1.0625rem] font-medium">{recurso.nome}</dt>
              <dd className="mt-1 ml-0 text-[15px] leading-[1.6] text-pretty text-muted">{recurso.descricao}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
