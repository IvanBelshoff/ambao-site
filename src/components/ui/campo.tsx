import type { ComponentProps, ReactNode } from 'react'

/*
 * Os campos do painel (ambao-web/src/components/ui/field.tsx), na medida do site.
 * O foco é a borda azul marinho com o halo a 20%, sem o contorno global.
 * No celular, rótulo e apoio sobem a 14px: quem lê é a secretaria, não o dev.
 */
const base =
  'w-full rounded-field border border-field bg-paper px-3 text-base text-ink outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-ink/60 hover:border-ink/60 focus:border-blue focus:ring-2 focus:ring-blue/20 aria-invalid:border-danger sm:text-[15px]'

const rotuloClasse = 'block text-[14px] font-medium sm:text-[13px]'
const apoioClasse = 'text-[14px] sm:text-[13px]'

type Comum = { id: string; rotulo: string; ajuda?: string; erro?: string }

function descritores(id: string, ajuda?: string, erro?: string) {
  const lista = [ajuda ? `${id}-ajuda` : '', erro ? `${id}-erro` : ''].filter(Boolean)
  return lista.length > 0 ? lista.join(' ') : undefined
}

function Erro({ id, erro }: { id: string; erro?: string }) {
  if (!erro) return null
  return (
    <p id={`${id}-erro`} role="alert" className={`mt-2 text-danger ${apoioClasse}`}>
      {erro}
    </p>
  )
}

export function Campo({ id, rotulo, ajuda, erro, ...input }: Comum & Omit<ComponentProps<'input'>, 'id' | 'className'>) {
  return (
    <div>
      <label className={rotuloClasse} htmlFor={id}>
        {rotulo}
      </label>
      <input
        id={id}
        className={`mt-2 h-11 ${base}`}
        aria-invalid={erro ? true : undefined}
        aria-describedby={descritores(id, ajuda, erro)}
        {...input}
      />
      {ajuda && !erro ? (
        <p id={`${id}-ajuda`} className={`mt-2 text-muted ${apoioClasse}`}>
          {ajuda}
        </p>
      ) : null}
      <Erro id={id} erro={erro} />
    </div>
  )
}

/**
 * A ajuda fica entre o rótulo e a caixa: embaixo, o teclado do celular a cobre.
 * O contador, quando há, fica no pé, à direita.
 */
export function AreaDeTexto({
  id,
  rotulo,
  ajuda,
  erro,
  contador,
  ...area
}: Comum & { contador?: ReactNode } & Omit<ComponentProps<'textarea'>, 'id' | 'className'>) {
  return (
    <div>
      <label className={rotuloClasse} htmlFor={id}>
        {rotulo}
      </label>
      {ajuda ? (
        <p id={`${id}-ajuda`} className={`mt-1 text-muted ${apoioClasse}`}>
          {ajuda}
        </p>
      ) : null}
      <textarea
        id={id}
        rows={4}
        className={`mt-2 min-h-28 resize-y py-2 ${base}`}
        aria-invalid={erro ? true : undefined}
        aria-describedby={descritores(id, ajuda, erro)}
        {...area}
      />
      <div className="flex items-start justify-between gap-4">
        <Erro id={id} erro={erro} />
        {contador ? <p className="tabular mt-2 ml-auto text-[13px] whitespace-nowrap text-muted">{contador}</p> : null}
      </div>
    </div>
  )
}
