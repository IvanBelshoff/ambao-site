import { Cruz } from './cruz'

/** A cruz e AMBÃO na medida da rubrica. A cor vem de quem usa. */
export function Marca({ className = '' }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Cruz />
      <span className="text-kicker font-semibold tracking-kicker uppercase">Ambão</span>
    </span>
  )
}
