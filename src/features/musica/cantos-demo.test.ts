import { describe, expect, it } from 'vitest'
import { resumoDosCantos } from './cantos-demo'

describe('resumoDosCantos', () => {
  it('conta só os momentos de música, como o painel', () => {
    expect(resumoDosCantos()).toBe('7 cantos em 6 de 7 momentos.')
  })

  it('fala do vazio sem número quando não há canto', () => {
    expect(resumoDosCantos([{ tipo: 'musica', nome: 'Entrada', cantos: [] }])).toBe('1 momento, nenhum canto escolhido ainda.')
    expect(resumoDosCantos([])).toBe('Os momentos da celebração e o canto de cada um.')
  })
})
