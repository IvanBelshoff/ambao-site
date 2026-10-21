/**
 * Os cantos do 30º Domingo do Tempo Comum na igreja de demonstração. Títulos e
 * letras são fictícios, escritos para esta página. O salmo é o mesmo da tela de
 * participação da placa (Sl 17(18)), com a resposta do povo vinda da liturgia.
 */

export type Canto = { titulo: string; autor?: string }

export type MomentoDaMissa =
  | { tipo: 'musica'; nome: string; cantos: Canto[] }
  | { tipo: 'salmo'; resposta: string }

export const momentos: MomentoDaMissa[] = [
  { tipo: 'musica', nome: 'Entrada', cantos: [{ titulo: 'Povo de Deus, vem celebrar' }] },
  { tipo: 'musica', nome: 'Ato penitencial', cantos: [{ titulo: 'Senhor, tende piedade' }] },
  { tipo: 'musica', nome: 'Glória', cantos: [{ titulo: 'Glória a Deus nas alturas' }] },
  { tipo: 'salmo', resposta: 'Eu vos amo, ó Senhor, sois minha força e salvação.' },
  { tipo: 'musica', nome: 'Aclamação ao Evangelho', cantos: [{ titulo: 'Aleluia, a Palavra é luz' }] },
  { tipo: 'musica', nome: 'Ofertório', cantos: [{ titulo: 'Recebe o pão e o vinho', autor: 'Ministério de música' }] },
  { tipo: 'musica', nome: 'Comunhão', cantos: [{ titulo: 'Pão da vida, mesa posta' }, { titulo: 'Fica conosco, Senhor' }] },
  { tipo: 'musica', nome: 'Final', cantos: [] },
]

/** A letra aberta na vitrine: estrofe e refrão, com o refrão marcado como no editor do painel. */
export const letraAberta = {
  momento: 'Ofertório',
  estrofes: [
    { refrao: false, versos: ['Trazemos ao altar o fruto do trabalho,', 'o pão de cada casa, o vinho da colheita.'] },
    { refrao: true, versos: ['Recebe, Senhor, o pão e o vinho,', 'recebe a vida do teu povo.'] },
  ],
}

/** O resumo do card "Cantos da celebração", como o painel escreve (musica-panel.tsx). */
export function resumoDosCantos(lista: MomentoDaMissa[] = momentos) {
  const musicais = lista.filter((m) => m.tipo === 'musica')
  const total = musicais.reduce((soma, m) => soma + m.cantos.length, 0)
  const comCanto = musicais.filter((m) => m.cantos.length > 0).length
  if (musicais.length === 0) return 'Os momentos da celebração e o canto de cada um.'
  if (total === 0) return `${musicais.length} ${musicais.length === 1 ? 'momento' : 'momentos'}, nenhum canto escolhido ainda.`
  return `${total} ${total === 1 ? 'canto' : 'cantos'} em ${comCanto} de ${musicais.length} ${musicais.length === 1 ? 'momento' : 'momentos'}.`
}
