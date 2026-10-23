import { describe, expect, it, vi } from 'vitest'
import { rastrear } from './rastrear'

describe('rastrear', () => {
  it('passa o evento ao Umami quando o script carregou', () => {
    const track = vi.fn()
    window.umami = { track }
    rastrear('formulario-enviado', { canal: 'email' })
    expect(track).toHaveBeenCalledExactlyOnceWith('formulario-enviado', { canal: 'email' })
    delete window.umami
  })

  it('não faz nada sem o script (desligado ou bloqueado)', () => {
    expect(() => rastrear('formulario-enviado')).not.toThrow()
  })
})
