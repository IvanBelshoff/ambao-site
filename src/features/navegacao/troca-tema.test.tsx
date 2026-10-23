import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { CHAVE_TEMA } from '@/lib/tema-script'
import { TrocaTema } from './troca-tema'

afterEach(() => {
  window.localStorage.clear()
  delete document.documentElement.dataset.theme
})

describe('TrocaTema', () => {
  it('oferece claro, escuro e automático, com o automático marcado sem escolha guardada', async () => {
    render(<TrocaTema />)

    await userEvent.click(screen.getByRole('button', { name: 'Tema: Automático' }))

    const opcoes = screen.getAllByRole('menuitemradio')
    expect(opcoes.map((opcao) => opcao.textContent)).toEqual(['Claro', 'Escuro', 'Automático'])
    expect(screen.getByRole('menuitemradio', { name: 'Automático' })).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('menuitemradio', { name: 'Automático' })).toHaveFocus()
  })

  it('guarda a escolha, aplica o tema e devolve o foco ao botão', async () => {
    render(<TrocaTema />)

    await userEvent.click(screen.getByRole('button', { name: 'Tema: Automático' }))
    await userEvent.click(screen.getByRole('menuitemradio', { name: 'Escuro' }))

    expect(window.localStorage.getItem(CHAVE_TEMA)).toBe('escuro')
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Tema: Escuro' })).toHaveFocus()
  })

  it('volta ao automático e segue o aparelho', async () => {
    window.localStorage.setItem(CHAVE_TEMA, 'escuro')
    render(<TrocaTema />)

    await userEvent.click(screen.getByRole('button', { name: 'Tema: Escuro' }))
    await userEvent.click(screen.getByRole('menuitemradio', { name: 'Automático' }))

    expect(window.localStorage.getItem(CHAVE_TEMA)).toBe('sistema')
    // O matchMedia do teste diz que o aparelho está no claro.
    expect(document.documentElement.dataset.theme).toBe('light')
  })

  it('anda pelas setas e fecha no Esc', async () => {
    render(<TrocaTema />)

    await userEvent.click(screen.getByRole('button', { name: 'Tema: Automático' }))
    await userEvent.keyboard('{ArrowDown}')
    expect(screen.getByRole('menuitemradio', { name: 'Claro' })).toHaveFocus()

    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Tema: Automático' })).toHaveFocus()
  })
})
