const formato = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

/** Centavos em reais, como o painel escreve: R$ 6.340,00. Saída leva o sinal de menos. */
export function reais(centavos: number, { saida = false } = {}) {
  const texto = formato.format(Math.abs(centavos) / 100).replace(/ /g, ' ')
  return saida ? `− ${texto}` : texto
}
