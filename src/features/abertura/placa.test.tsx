import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Placa, type TelaDaPlaca } from './placa'

const telas: TelaDaPlaca[] = [
  { id: 'inicio', rotulo: 'Início', icone: 'inicio', conteudo: <p>Tela de início</p> },
  { id: 'dizimo', rotulo: 'Dízimos', icone: 'dizimo', conteudo: <p>Tela de dízimos</p> },
]

describe('Placa', () => {
  it('abre na primeira tela e troca pelo clique', async () => {
    render(<Placa telas={telas} />)
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Tela de início')

    await userEvent.click(screen.getByRole('tab', { name: 'Dízimos' }))

    expect(screen.getByRole('tab', { name: 'Dízimos' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Tela de dízimos')
  })

  it('anda pelas abas com o teclado, só com a selecionada no Tab', async () => {
    render(<Placa telas={telas} />)
    const inicio = screen.getByRole('tab', { name: 'Início' })
    expect(screen.getByRole('tab', { name: 'Dízimos' })).toHaveAttribute('tabindex', '-1')

    inicio.focus()
    // Sem matchMedia de verdade no jsdom, a lista fica horizontal.
    await userEvent.keyboard('{ArrowRight}')

    expect(screen.getByRole('tab', { name: 'Dízimos' })).toHaveFocus()
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Tela de dízimos')

    await userEvent.keyboard('{Home}')
    expect(inicio).toHaveFocus()
  })
})
