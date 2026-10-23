import type { ReactNode } from 'react'

/** Ícones de traço 1.75, os mesmos do painel. */
const tracos = {
  inicio: (
    <>
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M6.5 10v10h11V10" />
    </>
  ),
  calendario: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="1.5" />
      <path d="M8 3.5V7M16 3.5V7M4 10h16" />
    </>
  ),
  leitura: (
    <>
      <path d="M6.5 3.5h11a1 1 0 0 1 1 1v12.5H7a1.5 1.5 0 0 0-1.5 1.5z" />
      <path d="M5.5 18.5A1.5 1.5 0 0 0 7 20h11.5v-3" />
      <path d="M10 3.5v6l1.75-1.25L13.5 9.5v-6" />
    </>
  ),
  participacoes: (
    <>
      <path d="M8 7.5h8M8 12h8M8 16.5h5" />
      <rect x="4" y="4" width="16" height="16" rx="1.5" />
    </>
  ),
  dizimo: (
    <>
      <rect x="3.5" y="6" width="17" height="12" rx="1.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  publicacoes: <path d="M5 6.5h14M5 12h10M5 17.5h7" />,
  galeria: (
    <>
      <rect x="4" y="5" width="16" height="14" rx="1.5" />
      <path d="m4 15.5 4.2-4 3 3 2.6-3.2L20 16" />
      <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  financeiro: (
    <>
      <path d="M4 19V11M9 19V7M14 19v-5M19 19V9" />
      <path d="M3 19h18" />
    </>
  ),
  musica: (
    <>
      <path d="M9 17.5V6l10-2v11.5" />
      <circle cx="6.5" cy="17.5" r="2.5" />
      <circle cx="16.5" cy="15.5" r="2.5" />
    </>
  ),
  igreja: (
    <>
      <path d="M12 3v4M10.25 4.75h3.5" />
      <path d="m6 11 6-4 6 4v9H6z" />
      <path d="M10.5 20v-4a1.5 1.5 0 0 1 3 0v4" />
    </>
  ),
  alerta: (
    <>
      <path d="M12 4.5 3.5 19h17z" />
      <path d="M12 10v4M12 16.75v.25" />
    </>
  ),
  comunicado: (
    <>
      <path d="M4.5 10v4h3l6 4V6l-6 4z" />
      <path d="M17 9.5a3.5 3.5 0 0 1 0 5" />
    </>
  ),
  proximo: <path d="m9.5 6.5 5.5 5.5-5.5 5.5" />,
  anterior: <path d="M14.5 6.5 9 12l5.5 5.5" />,
  check: <path d="m5.5 12.5 4 4 9-9" />,
  conversa: (
    <>
      <path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5h-8.5l-4.5 3.5v-3.5H5A1.5 1.5 0 0 1 3.5 15V7A1.5 1.5 0 0 1 5 5.5z" />
      <path d="M8 10h8M8 13h5" />
    </>
  ),
  email: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </>
  ),
  copiar: (
    <>
      <rect x="8.5" y="8.5" width="11" height="11" rx="1.5" />
      <path d="M15.5 8.5V6A1.5 1.5 0 0 0 14 4.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5" />
    </>
  ),
  tablet: (
    <>
      <rect x="4.5" y="3" width="15" height="18" rx="2" />
      <path d="M10.5 17.5h3" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4.5" width="18" height="12" rx="1.5" />
      <path d="M8.5 20h7M12 16.5V20" />
    </>
  ),
  pessoa: (
    <>
      <circle cx="12" cy="8" r="3.25" />
      <path d="M5.5 19.5c0-3.2 2.9-5.5 6.5-5.5s6.5 2.3 6.5 5.5" />
    </>
  ),
  codigo: <path d="m8.5 7.5-4.5 4.5 4.5 4.5M15.5 7.5l4.5 4.5-4.5 4.5" />,
  curtir: (
    <>
      <path d="M4.5 11h2.8v8.5H4.5a1 1 0 0 1-1-1V12a1 1 0 0 1 1-1z" />
      <path d="M7.3 11.2l3-6a1.7 1.7 0 0 1 3.2.9V9h4.7a1.6 1.6 0 0 1 1.6 1.9l-1 6.4a2.4 2.4 0 0 1-2.4 2.2H7.3" />
    </>
  ),
  comentar: (
    <path d="M5 6.5h14a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5H10l-4 3v-3H5a1.5 1.5 0 0 1-1.5-1.5v-7A1.5 1.5 0 0 1 5 6.5z" />
  ),
  compartilhar: (
    <>
      <path d="M12 4.5v9" />
      <path d="m8.5 8 3.5-3.5L15.5 8" />
      <path d="M6 13.5v5h12v-5" />
    </>
  ),
  amem: <path d="M10.5 4h3v5h5v3h-5v8h-3v-8h-5V9h5z" />,
  rezando: (
    <>
      <path d="M12 3.2c1.7 1.9 2.2 3.3.1 5.1-2.2-1.8-1.8-3.2-.1-5.1z" />
      <path d="M12 9v1.6" />
      <rect x="8.5" y="10.6" width="7" height="9.9" rx="1.2" />
      <path d="M6.5 20.5h11" />
    </>
  ),
  celular: (
    <>
      <rect x="6.5" y="3" width="11" height="18" rx="2" />
      <path d="M10.5 17.5h3" />
    </>
  ),
  banco: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.5" />
      <path d="M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6" />
      <path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
    </>
  ),
  certificado: (
    <>
      <path d="M14 3.5H6.5a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h5" />
      <path d="M14 3.5 18.5 8v3" />
      <path d="M14 3.5V8h4.5" />
      <path d="M8.5 11.5h5M8.5 14.5h3" />
      <circle cx="17" cy="16" r="2.5" />
      <path d="m15.75 18.25-.75 3 2-1 2 1-.75-3" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 11v5" />
      <circle cx="12" cy="8" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  baixar: (
    <>
      <path d="M12 4v11M7.5 10.5 12 15l4.5-4.5" />
      <path d="M5 19.5h14" />
    </>
  ),
  topo: (
    <>
      <path d="M12 19V5" />
      <path d="m6 11 6-6 6 6" />
    </>
  ),
  sol: (
    <>
      <circle cx="12" cy="12" r="3.75" />
      <path d="M12 3v1.75M12 19.25V21M3 12h1.75M19.25 12H21M5.6 5.6l1.25 1.25M17.15 17.15l1.25 1.25M5.6 18.4l1.25-1.25M17.15 6.85l1.25-1.25" />
    </>
  ),
  lua: <path d="M19.5 14.2A7.75 7.75 0 0 1 9.8 4.5a7.75 7.75 0 1 0 9.7 9.7z" />,
  /** Tema automático: metade clara, metade escura. */
  automatico: (
    <>
      <circle cx="12" cy="12" r="7.75" />
      <path d="M12 4.25a7.75 7.75 0 0 1 0 15.5z" fill="currentColor" stroke="none" />
    </>
  ),
} satisfies Record<string, ReactNode>

export type NomeIcone = keyof typeof tracos

export function Icone({ nome, className = 'h-5 w-5' }: { nome: NomeIcone; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      {tracos[nome]}
    </svg>
  )
}
