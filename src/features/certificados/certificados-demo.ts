import { igrejaDemo } from '@/dados/financeiro-demo'

/** O que a tela Meus certificados mostra de uma pessoa fictícia. */
export type CertificadoDemo = {
  tipo: string
  /** `AAAA-MM-DD`, ou nulo quando a paróquia não informou. */
  data: string | null
  local: string | null
  celebrante?: string
  registro?: { livro: string; folha: string; termo: string }
  arquivo: 'PDF' | 'Imagem'
  novo?: boolean
}

export const pessoaDemo = 'Mariana Costa'

/** Na ordem da caminhada: do mais antigo ao mais recente. Dados fictícios. */
export const meusCertificados: CertificadoDemo[] = [
  {
    tipo: 'Batismo',
    data: '1998-04-12',
    local: igrejaDemo,
    celebrante: 'Pe. Antônio Lima',
    registro: { livro: '12', folha: '34', termo: '567' },
    arquivo: 'PDF',
  },
  {
    tipo: 'Primeira Eucaristia',
    data: '2007-11-25',
    local: 'Capela Santa Luzia',
    arquivo: 'Imagem',
  },
  {
    tipo: 'Crisma',
    data: '2014-08-03',
    local: 'Catedral Metropolitana',
    celebrante: 'Dom Pedro Alves',
    registro: { livro: '5', folha: '112', termo: '1.048' },
    arquivo: 'PDF',
    novo: true,
  },
]

/** O lado da secretaria: os tipos que a paróquia cadastrou e quantos guarda de cada. */
export const tiposDaParoquia = [
  { nome: 'Batismo', usos: 48 },
  { nome: 'Crisma', usos: 22 },
  { nome: 'Matrimônio', usos: 9 },
  { nome: 'Curso de noivos', usos: 0 },
]

export const guardadosRecentes = [
  { pessoa: pessoaDemo, iniciais: 'MC', tipo: 'Crisma', data: '03/08/2014' },
  { pessoa: 'João Pereira', iniciais: 'JP', tipo: 'Batismo', data: '19/09/2026' },
  { pessoa: 'Rita de Souza', iniciais: 'RS', tipo: 'Matrimônio', data: '22/05/2021' },
]

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

/** As três linhas da folhinha do certificado: mês, dia e o ano no pé. */
export function folhinha(data: string) {
  const [ano, mes, dia] = data.split('-')
  return { mes: MESES[Number(mes) - 1], dia, ano }
}

const MESES_EXTENSO = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
]

export function porExtenso(data: string) {
  const [ano, mes, dia] = data.split('-')
  return `${Number(dia)} de ${MESES_EXTENSO[Number(mes) - 1]} de ${ano}`
}
