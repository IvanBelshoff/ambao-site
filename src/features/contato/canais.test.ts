import { describe, expect, it } from 'vitest'
import { type Contato, contatoSchema, normalizarWhatsapp } from '@/config/contato'
import { canaisDoFormulario, linkDoCanal, linkEmail, linkWhatsapp } from './canais'

const preenchido: Contato = {
  whatsapp: '5527999998888',
  email: 'contato@exemplo.com',
  linkedin: 'https://www.linkedin.com/in/exemplo',
  github: 'https://github.com/exemplo',
}

describe('links dos canais', () => {
  it('monta o WhatsApp só com números e a mensagem codificada', () => {
    expect(linkWhatsapp('+55 (27) 99999-8888', 'Olá, Ambão!')).toBe('https://wa.me/5527999998888?text=Ol%C3%A1%2C%20Amb%C3%A3o!')
  })

  it('monta o e-mail com assunto e, se houver, o corpo', () => {
    expect(linkEmail('a@b.com', 'Oi')).toBe('mailto:a@b.com?subject=Oi')
    expect(linkEmail('a@b.com', 'Oi', 'Linha 1\nLinha 2')).toBe('mailto:a@b.com?subject=Oi&body=Linha%201%0ALinha%202')
  })

  it('abre fora da página tudo que não é e-mail', () => {
    expect(linkDoCanal('linkedin', preenchido, true)).toEqual({
      href: 'https://www.linkedin.com/in/exemplo',
      target: '_blank',
      rel: 'noopener',
    })
    expect(linkDoCanal('email', preenchido, true)).toEqual({
      href: 'mailto:contato@exemplo.com?subject=Amb%C3%A3o%20para%20a%20minha%20par%C3%B3quia',
    })
  })

  it('esconde o canal vazio no site publicado e o mantém em desenvolvimento', () => {
    const semLinkedin = { ...preenchido, linkedin: '' }
    expect(linkDoCanal('linkedin', semLinkedin, true)).toBeNull()
    expect(linkDoCanal('linkedin', semLinkedin, false)).toEqual({ href: '#contato' })
  })
})

describe('canaisDoFormulario', () => {
  it('no site publicado, oferece só o que foi preenchido', () => {
    expect(canaisDoFormulario({ ...preenchido, whatsapp: '' }, true)).toEqual({ whatsapp: false, email: true })
  })

  it('em desenvolvimento, mostra os dois mesmo vazios', () => {
    expect(canaisDoFormulario({ whatsapp: '', email: '', linkedin: '', github: '' }, false)).toEqual({ whatsapp: true, email: true })
  })
})

describe('contatoSchema', () => {
  it('aceita canais vazios e preenchidos corretamente', () => {
    expect(contatoSchema.safeParse({ whatsapp: '', email: '', linkedin: '', github: '' }).success).toBe(true)
    expect(contatoSchema.safeParse(preenchido).success).toBe(true)
  })

  it('aceita o WhatsApp com DDD, com ou sem 55 e máscara, e guarda só os dígitos com o país', () => {
    for (const numero of ['27997330218', '(27) 99733-0218', '+55 27 99733-0218', '5527997330218']) {
      expect(contatoSchema.parse({ ...preenchido, whatsapp: numero }).whatsapp).toBe('5527997330218')
    }
    expect(normalizarWhatsapp('2733330218')).toBe('552733330218')
  })

  it('recusa WhatsApp curto, e-mail inválido e perfil de outro site', () => {
    expect(contatoSchema.safeParse({ ...preenchido, whatsapp: '99733-0218' }).success).toBe(false)
    expect(contatoSchema.safeParse({ ...preenchido, email: 'contato@' }).success).toBe(false)
    expect(contatoSchema.safeParse({ ...preenchido, linkedin: 'https://exemplo.com/in/eu' }).success).toBe(false)
    expect(contatoSchema.safeParse({ ...preenchido, github: 'https://gitlab.com/eu' }).success).toBe(false)
  })
})
