import { describe, expect, it } from 'vitest'
import { umamiSchema } from './umami'

describe('UMAMI_WEBSITE_ID', () => {
  it('aceita vazio, que desliga a contagem', () => {
    expect(umamiSchema.parse('')).toBe('')
    expect(umamiSchema.parse('   ')).toBe('')
  })

  it('aceita o Website ID do painel', () => {
    expect(umamiSchema.parse(' 4f8e1c2a-9b3d-4e5f-8a7b-1c2d3e4f5a6b ')).toBe('4f8e1c2a-9b3d-4e5f-8a7b-1c2d3e4f5a6b')
  })

  it('derruba o build com outra coisa no lugar do ID', () => {
    expect(() => umamiSchema.parse('https://cloud.umami.is/script.js')).toThrow('UMAMI_WEBSITE_ID')
  })
})
