export type DiaDeLeitura = { nome: string; numero: number; estado?: 'lido' | 'hoje' }

/** A semana de 19 a 25 de outubro de quem foi escalado para o salmo. Dados fictícios. */
export const semanaDeLeitura: DiaDeLeitura[] = [
  { nome: 'Seg', numero: 19, estado: 'lido' },
  { nome: 'Ter', numero: 20, estado: 'lido' },
  { nome: 'Qua', numero: 21, estado: 'hoje' },
  { nome: 'Qui', numero: 22 },
  { nome: 'Sex', numero: 23 },
  { nome: 'Sáb', numero: 24 },
  { nome: 'Dom', numero: 25 },
]

export const META_SEMANAL = 5

export const diasLidos = semanaDeLeitura.filter((dia) => dia.estado === 'lido').length

export const sequencia = { atual: 6, maior: 9 }

/** As leituras de quarta-feira da 29ª semana do Tempo Comum, ano par. */
export const leiturasDeHoje = [
  { parte: 'Primeira leitura', referencia: 'Ef 3,2-12' },
  { parte: 'Salmo', referencia: 'Is 12,2-6' },
  { parte: 'Evangelho', referencia: 'Lc 12,39-48' },
]

export const estiloDoDia = {
  lido: 'bg-action font-medium text-on-action',
  hoje: 'font-medium text-blue ring-1 ring-blue ring-inset',
} as const
