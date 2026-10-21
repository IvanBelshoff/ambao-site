import { describe, expect, it } from 'vitest'
import { prontidao } from './escala-demo'

describe('prontidão da escala de demonstração', () => {
  it('soma as alocações da lista e as resumidas embaixo dela', () => {
    expect(prontidao()).toEqual({ aceitaram: 7, semResposta: 3, recusaram: 1, total: 11 })
  })

  it('conta só a lista quando não há alocação resumida', () => {
    expect(
      prontidao([{ funcao: 'Salmo', iniciais: 'RN', pessoa: 'Rafael Nunes', resposta: 'recusou' }], 0),
    ).toEqual({ aceitaram: 0, semResposta: 0, recusaram: 1, total: 1 })
  })
})
