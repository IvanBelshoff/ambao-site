import type { ComponentProps } from 'react'

/**
 * As vozes de ação. No céu, o branco com texto azul marinho e o contorno branco;
 * no papel, o azul cheio e o contorno em fio de campo. Nunca dois cheios lado a lado.
 */
const variantes = {
  ceu: 'h-12 gap-2 bg-white px-5 text-action hover:bg-pink',
  'ceu-contorno': 'h-12 gap-2 px-5 text-white ring-1 ring-white/60 ring-inset hover:bg-white/12',
  primario: 'h-11 gap-2 bg-action px-5 text-on-action hover:bg-action-hover',
  contorno: 'h-11 gap-2 px-4 text-ink ring-1 ring-field ring-inset hover:bg-pink hover:text-blue',
} as const

export type VarianteBotao = keyof typeof variantes

export const classeBotao = (variante: VarianteBotao, className = '') =>
  `inline-flex cursor-pointer items-center rounded-field text-[15px] font-medium transition-[background-color,color] duration-150 disabled:cursor-default disabled:opacity-60 ${variantes[variante]} ${className}`

export function BotaoLink({
  variante,
  className,
  ...props
}: Omit<ComponentProps<'a'>, 'className'> & { variante: VarianteBotao; className?: string }) {
  return <a className={classeBotao(variante, className)} {...props} />
}

export function Botao({
  variante,
  className,
  type = 'button',
  ...props
}: Omit<ComponentProps<'button'>, 'className'> & { variante: VarianteBotao; className?: string }) {
  return <button type={type} className={classeBotao(variante, className)} {...props} />
}
