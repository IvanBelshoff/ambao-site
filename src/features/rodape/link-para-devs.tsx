'use client'

import { ID_DEVS, abrirComoFoiFeito } from '@/features/devs/abrir'

/** Quem chega pelo "Para devs" encontra o accordion já aberto. */
export function LinkParaDevs() {
  return (
    <a href={`#${ID_DEVS}`} onClick={abrirComoFoiFeito} className="underline hover:text-blue">
      Para devs
    </a>
  )
}
