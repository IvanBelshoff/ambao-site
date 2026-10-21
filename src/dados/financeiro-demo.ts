/**
 * O dinheiro da igreja de demonstração em outubro de 2026, em centavos. Todos os
 * dados são fictícios. O Início da placa, a tela de Dízimos e o momento do dízimo
 * e caixa leem daqui, para os números baterem entre si (ver o teste ao lado).
 */

export const igrejaDemo = 'São José Operário'
export const mesDemo = 'outubro de 2026'

export type FormaDeRecebimento = 'Pix' | 'Dinheiro' | 'Transferência'

export type Recebimento = {
  recibo: number
  pessoa: string
  forma: FormaDeRecebimento
  /** O valor que cabe na competência de outubro. */
  valorNoMes: number
  /** Quando o recebimento cobre mais de um mês, a lista aparece embaixo do nome. */
  competencias?: string
}

/** Dízimo com competência de outubro: o que a tela de Dízimos e o Início somam. */
export const dizimoDoMes = {
  envelopes: 38,
  total: 634_000,
  /** Os cinco últimos recebimentos, do mais novo para o mais antigo. */
  ultimos: [
    { recibo: 38, pessoa: 'Maria das Graças Souza', forma: 'Pix', valorNoMes: 8_000, competencias: 'Outubro e novembro' },
    { recibo: 37, pessoa: 'José Carlos Ferreira', forma: 'Dinheiro', valorNoMes: 5_000 },
    { recibo: 36, pessoa: 'Antônia Ribeiro', forma: 'Pix', valorNoMes: 12_000 },
    { recibo: 35, pessoa: 'Francisco Almeida', forma: 'Transferência', valorNoMes: 20_000 },
    { recibo: 34, pessoa: 'Luzia Martins', forma: 'Dinheiro', valorNoMes: 3_000 },
  ] satisfies Recebimento[],
}

/** O recibo nº 38: um recebimento em outubro que já paga novembro. */
export const reciboDemo = {
  numero: 38,
  pessoa: 'Maria das Graças Souza',
  recebidoEm: '18 de outubro de 2026',
  forma: 'Pix' satisfies FormaDeRecebimento,
  competencias: [
    { mes: 'Outubro de 2026', valor: 8_000 },
    { mes: 'Novembro de 2026', valor: 8_000 },
  ],
}

export const totalDoRecibo = reciboDemo.competencias.reduce((soma, c) => soma + c.valor, 0)

/**
 * O caixa de outubro. O dízimo entra pelo dia em que foi recebido: as competências
 * de outubro e a parte de novembro que já chegou no recibo nº 38.
 */
export const caixaDoMes = {
  entradas: [
    { categoria: 'Dízimo', valor: dizimoDoMes.total + reciboDemo.competencias[1].valor },
    { categoria: 'Oferta', valor: 342_000 },
  ],
  saidas: [
    { categoria: 'Manutenção', valor: 164_000 },
    { categoria: 'Água e luz', valor: 118_430 },
    { categoria: 'Material', valor: 38_830 },
  ],
}

const somar = (itens: { valor: number }[]) => itens.reduce((soma, item) => soma + item.valor, 0)

export const totalEntradas = somar(caixaDoMes.entradas)
export const totalSaidas = somar(caixaDoMes.saidas)
export const saldoDoMes = totalEntradas - totalSaidas
