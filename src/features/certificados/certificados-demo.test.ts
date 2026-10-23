import { describe, expect, it } from 'vitest'
import { folhinha, guardadosRecentes, meusCertificados, pessoaDemo, porExtenso } from './certificados-demo'

describe('certificados de demonstração', () => {
  it('a caminhada vai do mais antigo ao mais recente', () => {
    const datas = meusCertificados.map((c) => c.data ?? '9999')
    expect(datas).toEqual([...datas].sort())
  })

  it('a crisma nova da pessoa é a mesma que a secretaria acabou de guardar', () => {
    const nova = meusCertificados.find((c) => c.novo)
    const daSecretaria = guardadosRecentes.find((g) => g.pessoa === pessoaDemo)
    expect(nova?.tipo).toBe(daSecretaria?.tipo)
    const { dia, ano } = folhinha(nova!.data!)
    expect(daSecretaria?.data).toBe(`${dia}/08/${ano}`)
  })

  it('escreve a folhinha e a data por extenso', () => {
    expect(folhinha('2014-08-03')).toEqual({ mes: 'ago', dia: '03', ano: '2014' })
    expect(porExtenso('2014-08-03')).toBe('3 de agosto de 2014')
  })
})
