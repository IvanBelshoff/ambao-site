import { describe, expect, it } from 'vitest'
import { reais } from '@/lib/reais'
import { caixaDoMes, dizimoDoMes, reciboDemo, saldoDoMes, totalDoRecibo, totalEntradas, totalSaidas } from './financeiro-demo'

// Os valores que a página mostra hoje. Se um número mudar, os outros acompanham.
describe('financeiro da igreja de demonstração', () => {
  it('fecha o caixa de outubro', () => {
    expect(reais(totalEntradas)).toBe('R$ 9.840,00')
    expect(reais(totalSaidas)).toBe('R$ 3.212,60')
    expect(reais(saldoDoMes)).toBe('R$ 6.627,40')
  })

  it('soma no caixa o dízimo do mês e a parte de novembro já recebida', () => {
    const dizimoNoCaixa = caixaDoMes.entradas.find((e) => e.categoria === 'Dízimo')?.valor
    expect(dizimoNoCaixa).toBe(dizimoDoMes.total + 8_000)
    expect(reais(dizimoDoMes.total)).toBe('R$ 6.340,00')
  })

  it('o recibo nº 38 é o último da lista do mês e cobre dois meses', () => {
    expect(dizimoDoMes.ultimos[0].recibo).toBe(reciboDemo.numero)
    expect(dizimoDoMes.ultimos[0].recibo).toBe(dizimoDoMes.envelopes)
    expect(dizimoDoMes.ultimos[0].valorNoMes).toBe(reciboDemo.competencias[0].valor)
    expect(reais(totalDoRecibo)).toBe('R$ 160,00')
  })
})
