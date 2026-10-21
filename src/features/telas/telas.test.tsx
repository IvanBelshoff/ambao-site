import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Telas } from './telas'

describe('Telas', () => {
  it('abre o print na própria página, com o link do arquivo para quem está sem JavaScript', async () => {
    render(<Telas />)
    const link = screen.getByRole('link', { name: 'Ampliar: Escala da missa' })
    expect(link).toHaveAttribute('href', '/telas/escala-desktop.webp')

    await userEvent.click(link)

    const visor = await screen.findByRole('dialog')
    expect(within(visor).getByText('Escala da missa')).toBeInTheDocument()
    expect(within(visor).getByRole('button', { name: 'Fechar' })).toBeInTheDocument()

    await userEvent.click(within(visor).getByRole('button', { name: 'Fechar' }))
    await expect.poll(() => screen.queryByRole('dialog')).toBeNull()
  })

  it('o visor segue o aparelho escolhido', async () => {
    render(<Telas />)
    await userEvent.click(screen.getByRole('button', { name: 'Celular' }))
    expect(screen.getByRole('link', { name: 'Ampliar: Mural' })).toHaveAttribute('href', '/telas/publicacoes-celular.webp')
  })
})
