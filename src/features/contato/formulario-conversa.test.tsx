import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { FormularioConversa } from './formulario-conversa'

const canais = { whatsapp: '5527999998888', email: 'contato@exemplo.com', linkedin: '', github: '' }

afterEach(() => vi.restoreAllMocks())

async function preencher() {
  await userEvent.type(screen.getByLabelText('Seu nome'), 'Lúcia')
  await userEvent.type(screen.getByLabelText('Paróquia'), 'São Bento')
}

describe('FormularioConversa', () => {
  it('marca nome e paróquia como obrigatórios e não abre nada sem eles', async () => {
    const abrir = vi.spyOn(window, 'open').mockReturnValue(null)
    render(<FormularioConversa canais={canais} producao />)
    expect(screen.getByLabelText('Seu nome')).toBeRequired()
    expect(screen.getByLabelText('Paróquia')).toBeRequired()

    await userEvent.click(screen.getByRole('button', { name: 'Abrir no WhatsApp' }))

    expect(await screen.findByText('Diga como podemos chamar você.')).toBeInTheDocument()
    expect(screen.getByText('Diga o nome da paróquia.')).toBeInTheDocument()
    expect(screen.getByLabelText('Seu nome')).toHaveAttribute('aria-invalid', 'true')
    expect(abrir).not.toHaveBeenCalled()
  })

  it('abre o WhatsApp com a mensagem pronta e diz o que falta', async () => {
    const janela = { opener: window } as unknown as Window
    const abrir = vi.spyOn(window, 'open').mockReturnValue(janela)
    render(<FormularioConversa canais={canais} producao />)

    await preencher()
    await userEvent.click(screen.getByRole('button', { name: 'Abrir no WhatsApp' }))

    expect(abrir).toHaveBeenCalledOnce()
    const [url, alvo] = abrir.mock.calls[0]
    expect(alvo).toBe('_blank')
    expect(String(url)).toMatch(/^https:\/\/wa\.me\/5527999998888\?text=/)
    expect(decodeURIComponent(String(url).split('text=')[1])).toContain('Sou Lúcia, da Paróquia São Bento.')
    expect(janela.opener).toBeNull()
    expect(await screen.findByText('Falta só tocar em Enviar no WhatsApp.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'abra por este link' })).toHaveAttribute('href', String(url))
  })

  it('conta os caracteres da mensagem e não passa do limite', async () => {
    render(<FormularioConversa canais={canais} producao />)
    const mensagem = screen.getByLabelText('Como a paróquia se organiza hoje? (opcional)')
    expect(mensagem).toHaveAttribute('maxLength', '1000')

    await userEvent.type(mensagem, 'Somos 3 igrejas.')

    expect(screen.getByText('16 de 1.000')).toBeInTheDocument()
  })

  it('com só o e-mail, o e-mail vira a ação principal', () => {
    render(<FormularioConversa canais={{ ...canais, whatsapp: '' }} producao />)
    expect(screen.queryByRole('button', { name: 'Abrir no WhatsApp' })).not.toBeInTheDocument()
    const email = screen.getByRole('button', { name: 'Abrir no e-mail' })
    expect(email).toHaveAttribute('type', 'submit')
    expect(email.className).toContain('bg-action')
  })

  it('no e-mail, oferece copiar a mensagem e escrever direto', async () => {
    const copiar = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: copiar }, configurable: true })
    render(<FormularioConversa canais={{ ...canais, whatsapp: '' }} producao />)

    await preencher()
    await userEvent.click(screen.getByRole('button', { name: 'Abrir no e-mail' }))

    expect(await screen.findByText(/Falta só tocar em Enviar no seu/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'contato@exemplo.com' })).toHaveAttribute('href', 'mailto:contato@exemplo.com')

    await userEvent.click(screen.getByRole('button', { name: 'Copiar mensagem' }))
    expect(copiar).toHaveBeenCalledWith(expect.stringContaining('Sou Lúcia, da Paróquia São Bento.'))
    expect(await screen.findByRole('button', { name: 'Mensagem copiada' })).toBeInTheDocument()
  })

  it('conta no Umami só o canal, e só depois de validar', async () => {
    const track = vi.fn()
    window.umami = { track }
    vi.spyOn(window, 'open').mockReturnValue(null)
    render(<FormularioConversa canais={canais} producao />)

    await userEvent.click(screen.getByRole('button', { name: 'Abrir no WhatsApp' }))
    expect(track).not.toHaveBeenCalled()

    await preencher()
    await userEvent.click(screen.getByRole('button', { name: 'Abrir no WhatsApp' }))
    expect(track).toHaveBeenCalledExactlyOnceWith('formulario-enviado', { canal: 'whatsapp' })
    delete window.umami
  })

  it('some quando não há WhatsApp nem e-mail no site publicado', () => {
    const { container } = render(<FormularioConversa canais={{ ...canais, whatsapp: '', email: '' }} producao />)
    expect(container).toBeEmptyDOMElement()
  })
})
