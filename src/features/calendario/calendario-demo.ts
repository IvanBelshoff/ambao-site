import { igrejaDemo } from '@/dados/financeiro-demo'
import { prontidao } from '@/features/escalas/escala-demo'

/**
 * Três semanas do calendário da igreja de demonstração, vistas pela coordenação:
 * a própria igreja e os eventos da paróquia. Tudo fictício, e tudo bate com o
 * resto da página: a escala do 25/10 é a do momento Escalas (e a recusa do Início), o mutirão é o do
 * aviso com enquete, Finados é o do comunicado da placa e a formação é a da demonstração.
 */

export type ItemDoCalendario = {
  titulo: string
  tipo: 'evento' | 'escala'
  inicio: string
  fim: string
  origem: string
  rascunho?: boolean
  /** "7/11 confirmados": só a coordenação vê, na escala publicada. */
  prontidao?: { confirmados: number; total: number; recusas: number }
  comunicado?: boolean
}

export type Dia = { dia: number; mes: 'out' | 'nov'; itens: ItemDoCalendario[] }

const paroquia = 'Paróquia Sagrada Família'
const escala25 = prontidao()

const itensPorDia: Record<string, ItemDoCalendario[]> = {
  'out-24': [{ titulo: 'Missa do sábado', tipo: 'escala', inicio: '19:00', fim: '20:00', origem: igrejaDemo, prontidao: { confirmados: 9, total: 9, recusas: 0 } }],
  'out-25': [
    {
      titulo: '30º Domingo do Tempo Comum',
      tipo: 'escala',
      inicio: '09:00',
      fim: '10:15',
      origem: igrejaDemo,
      prontidao: { confirmados: escala25.aceitaram, total: escala25.total, recusas: escala25.recusaram },
    },
    { titulo: 'Encontro de coordenadores', tipo: 'evento', inicio: '15:00', fim: '17:00', origem: paroquia, comunicado: true },
    { titulo: 'Missa da noite', tipo: 'escala', inicio: '19:00', fim: '20:00', origem: igrejaDemo, prontidao: { confirmados: 6, total: 8, recusas: 0 } },
  ],
  'out-31': [{ titulo: 'Mutirão de limpeza', tipo: 'evento', inicio: '08:00', fim: '11:00', origem: igrejaDemo }],
  'nov-1': [{ titulo: '31º Domingo do Tempo Comum', tipo: 'escala', inicio: '09:00', fim: '10:15', origem: igrejaDemo, prontidao: { confirmados: 4, total: 10, recusas: 0 } }],
  'nov-2': [
    { titulo: 'Finados nas quatro igrejas', tipo: 'evento', inicio: '07:00', fim: '20:00', origem: paroquia, comunicado: true },
    { titulo: 'Missa de Finados', tipo: 'escala', inicio: '09:00', fim: '10:00', origem: igrejaDemo, rascunho: true },
  ],
  'nov-7': [{ titulo: 'Formação de leitores', tipo: 'evento', inicio: '14:00', fim: '17:00', origem: 'Matriz Sagrada Família' }],
  'nov-8': [{ titulo: '32º Domingo do Tempo Comum', tipo: 'escala', inicio: '09:00', fim: '10:15', origem: igrejaDemo, rascunho: true }],
}

/** De segunda, 19 de outubro, a domingo, 8 de novembro de 2026. */
export const semanas: Dia[][] = [0, 1, 2].map((semana) =>
  Array.from({ length: 7 }, (_, indice) => {
    const corrido = 19 + semana * 7 + indice
    const dia = corrido > 31 ? { dia: corrido - 31, mes: 'nov' as const } : { dia: corrido, mes: 'out' as const }
    return { ...dia, itens: itensPorDia[`${dia.mes}-${dia.dia}`] ?? [] }
  }),
)

export const hoje = { dia: 21, mes: 'out' } as const
/** O domingo desta semana: a escala com a recusa que o Início da placa aponta. */
export const aberto = { dia: 25, mes: 'out', rotulo: 'Domingo, 25 de outubro' } as const

export const itensDoDiaAberto = itensPorDia[`${aberto.mes}-${aberto.dia}`]

/** Como o painel escreve (calendar-item.ts). */
export function rotuloProntidao(p: NonNullable<ItemDoCalendario['prontidao']>) {
  if (p.total === 0) return 'Sem pessoas escaladas'
  const base = `${p.confirmados}/${p.total} confirmados`
  if (p.recusas === 0) return base
  return `${base}, ${p.recusas === 1 ? '1 recusa' : `${p.recusas} recusas`}`
}
