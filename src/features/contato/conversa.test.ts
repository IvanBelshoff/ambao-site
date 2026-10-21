import { describe, expect, it } from 'vitest'
import { conversaSchema, daParoquia, montarMensagem } from './conversa'

describe('montarMensagem', () => {
  it('escreve como a pessoa falaria, com a mensagem num parágrafo à parte', () => {
    expect(
      montarMensagem({ nome: 'Lúcia', paroquia: 'Paróquia São Bento', cidade: 'Vitória', mensagem: 'Somos 3 igrejas.' }),
    ).toBe(
      'Olá! Sou Lúcia, da Paróquia São Bento, em Vitória. Vi o site do Ambão e queria conversar sobre o sistema para a nossa paróquia.\n\nSomos 3 igrejas.',
    )
  })

  it('deixa de fora a cidade e a mensagem em branco', () => {
    expect(montarMensagem({ nome: 'Lúcia', paroquia: 'São Bento', cidade: '', mensagem: '' })).toBe(
      'Olá! Sou Lúcia, da Paróquia São Bento. Vi o site do Ambão e queria conversar sobre o sistema para a nossa paróquia.',
    )
  })
})

describe('daParoquia', () => {
  it('põe "Paróquia" na frente só de quem escreveu o padroeiro', () => {
    expect(daParoquia('São Bento')).toBe('da Paróquia São Bento')
    expect(daParoquia('paróquia são bento')).toBe('da paróquia são bento')
    expect(daParoquia('Comunidade Santa Luzia')).toBe('da Comunidade Santa Luzia')
    expect(daParoquia('Catedral Metropolitana')).toBe('da Catedral Metropolitana')
  })

  it('usa "do" para santuário', () => {
    expect(daParoquia('Santuário de Aparecida')).toBe('do Santuário de Aparecida')
  })
})

describe('conversaSchema', () => {
  it('pede nome e paróquia e apara os espaços', () => {
    const resultado = conversaSchema.safeParse({ nome: '  Lúcia ', paroquia: ' São Bento ', cidade: '', mensagem: '' })
    expect(resultado.success && resultado.data.nome).toBe('Lúcia')

    const vazio = conversaSchema.safeParse({ nome: ' ', paroquia: '', cidade: '', mensagem: '' })
    expect(vazio.success).toBe(false)
    expect(vazio.error?.issues.map((issue) => issue.path[0])).toEqual(['nome', 'paroquia'])
  })
})
