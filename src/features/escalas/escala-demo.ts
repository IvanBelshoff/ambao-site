/** A escala do 30º Domingo do Tempo Comum na igreja de demonstração. Dados fictícios. */

export type RespostaDaEscala = 'confirmou' | 'recusou' | 'sem-resposta'

export type Alocacao = {
  funcao: string
  iniciais: string
  pessoa: string
  resposta: RespostaDaEscala
  /** O motivo que a pessoa deu ao recusar. */
  motivo?: string
}

export const alocacoes: Alocacao[] = [
  { funcao: 'Presidir', iniciais: 'AV', pessoa: 'Pe. Antônio Vieira', resposta: 'confirmou' },
  { funcao: 'Comentários', iniciais: 'HD', pessoa: 'Helena Duarte', resposta: 'confirmou' },
  {
    funcao: 'Primeira leitura',
    iniciais: 'AL',
    pessoa: 'Ana Lúcia Prado',
    resposta: 'recusou',
    motivo: '“Vou estar viajando neste fim de semana.”',
  },
  { funcao: 'Salmo', iniciais: 'RN', pessoa: 'Rafael Nunes', resposta: 'confirmou' },
  { funcao: 'Segunda leitura', iniciais: 'BL', pessoa: 'Beatriz Lima', resposta: 'sem-resposta' },
  { funcao: 'Preces', iniciais: 'JP', pessoa: 'Joana Prado', resposta: 'confirmou' },
  { funcao: 'Preces', iniciais: 'MT', pessoa: 'Marcos Teixeira', resposta: 'sem-resposta' },
  { funcao: 'Equipe musical', iniciais: 'PA', pessoa: 'Pedro Henrique Alves', resposta: 'sem-resposta' },
]

/** As alocações que a folha resume numa linha: a homilia e a limpeza, todas confirmadas. */
export const resumidas = { quantas: 3, texto: 'E mais a homilia, com o Pe. Antônio, e duas pessoas na limpeza da igreja. Os três confirmaram.' }

/** A prontidão da escala: quem aceitou, quem ainda não respondeu e quem recusou. */
export function prontidao(lista: Alocacao[] = alocacoes, confirmadasForaDaLista = resumidas.quantas) {
  const contar = (resposta: RespostaDaEscala) => lista.filter((a) => a.resposta === resposta).length
  const aceitaram = contar('confirmou') + confirmadasForaDaLista
  const semResposta = contar('sem-resposta')
  const recusaram = contar('recusou')
  return { aceitaram, semResposta, recusaram, total: aceitaram + semResposta + recusaram }
}
