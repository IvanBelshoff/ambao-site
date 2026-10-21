import { describe, expect, it } from 'vitest'
import { itensDoDiaAberto, rotuloProntidao, semanas } from './calendario-demo'

describe('calendário de demonstração', () => {
  it('vai de segunda, 19/10, a domingo, 8/11, virando o mês no lugar certo', () => {
    expect(semanas.flat().map((d) => `${d.dia}/${d.mes}`)).toEqual([
      '19/out', '20/out', '21/out', '22/out', '23/out', '24/out', '25/out',
      '26/out', '27/out', '28/out', '29/out', '30/out', '31/out', '1/nov',
      '2/nov', '3/nov', '4/nov', '5/nov', '6/nov', '7/nov', '8/nov',
    ])
  })

  it('a escala do 25/10 tem a mesma prontidão do momento Escalas', () => {
    const domingo = semanas[0][6].itens[0]
    expect(domingo.prontidao && rotuloProntidao(domingo.prontidao)).toBe('7/11 confirmados, 1 recusa')
  })

  it('Finados traz o comunicado da paróquia e a escala ainda em rascunho, como o Início da placa', () => {
    const finados = semanas[2][0]
    expect(finados.itens.map((i) => [i.titulo, i.tipo, Boolean(i.rascunho)])).toEqual([
      ['Finados nas quatro igrejas', 'evento', false],
      ['Missa de Finados', 'escala', true],
    ])
  })

  it('a agenda aberta é a do domingo, em ordem de horário', () => {
    expect(itensDoDiaAberto.map((i) => i.inicio)).toEqual(['09:00', '15:00', '19:00'])
  })

  it('escreve a prontidão como o painel', () => {
    expect(rotuloProntidao({ confirmados: 4, total: 10, recusas: 0 })).toBe('4/10 confirmados')
    expect(rotuloProntidao({ confirmados: 0, total: 0, recusas: 0 })).toBe('Sem pessoas escaladas')
    expect(rotuloProntidao({ confirmados: 5, total: 8, recusas: 2 })).toBe('5/8 confirmados, 2 recusas')
  })
})
