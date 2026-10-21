import { describe, expect, it } from 'vitest'
import { alvoDaTecla } from './abas'

describe('alvoDaTecla', () => {
  it('anda pelas setas do eixo da lista e dá a volta', () => {
    expect(alvoDaTecla('ArrowDown', 0, 4, 'vertical')).toBe(1)
    expect(alvoDaTecla('ArrowDown', 3, 4, 'vertical')).toBe(0)
    expect(alvoDaTecla('ArrowUp', 0, 4, 'vertical')).toBe(3)
    expect(alvoDaTecla('ArrowRight', 1, 3, 'horizontal')).toBe(2)
    expect(alvoDaTecla('ArrowLeft', 0, 3, 'horizontal')).toBe(2)
  })

  it('ignora a seta do outro eixo', () => {
    expect(alvoDaTecla('ArrowRight', 0, 4, 'vertical')).toBeNull()
    expect(alvoDaTecla('ArrowDown', 0, 4, 'horizontal')).toBeNull()
  })

  it('vai ao começo e ao fim com Home e End', () => {
    expect(alvoDaTecla('Home', 2, 4, 'vertical')).toBe(0)
    expect(alvoDaTecla('End', 0, 4, 'horizontal')).toBe(3)
  })

  it('não trata outras teclas', () => {
    expect(alvoDaTecla('Enter', 0, 4, 'vertical')).toBeNull()
  })
})
