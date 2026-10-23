import type { NomeIcone } from '@/components/ui/icone'

/**
 * Os prints do painel em `public/telas/<tela>-<aparelho>.webp`, e a versão no tema
 * escuro em `<tela>-<aparelho>-escuro.webp`, tirados com a paróquia de demonstração
 * (ferramentas/demo). Cada arquivo tem a procedência ao lado.
 */

export const aparelhos = {
  desktop: { rotulo: 'Computador', icone: 'monitor', largura: 2880, altura: 1800 },
  tablet: { rotulo: 'Tablet', icone: 'tablet', largura: 1668, altura: 2388 },
  celular: { rotulo: 'Celular', icone: 'celular', largura: 780, altura: 1688 },
} as const satisfies Record<string, { rotulo: string; icone: NomeIcone; largura: number; altura: number }>

export type Aparelho = keyof typeof aparelhos

export const capturas = [
  { tela: 'inicio', titulo: 'Início da coordenação', descricao: 'O que pede decisão primeiro, depois o resumo da igreja.' },
  { tela: 'escala', titulo: 'Escala da missa', descricao: 'Funções, pessoas e quem já respondeu.' },
  { tela: 'participacao', titulo: 'Minha participação', descricao: 'Quem foi escalado vê a própria função e o texto do dia.' },
  { tela: 'dizimos', titulo: 'Dízimos do mês', descricao: 'Envelopes com recibo, por dia e por pessoa.' },
  { tela: 'caixa', titulo: 'Caixa da igreja', descricao: 'Entradas, saídas e o saldo do mês.' },
  { tela: 'publicacoes', titulo: 'Mural', descricao: 'Avisos da paróquia e da igreja, com reações e enquete.' },
  { tela: 'leitura', titulo: 'Leitura do dia', descricao: 'A liturgia do dia e a meta da semana.' },
  { tela: 'galeria', titulo: 'Galeria', descricao: 'Álbuns da paróquia, da igreja e das celebrações.' },
] as const

export const arquivoDaCaptura = (tela: string, aparelho: Aparelho, escuro = false) =>
  `/telas/${tela}-${aparelho}${escuro ? '-escuro' : ''}.webp`
