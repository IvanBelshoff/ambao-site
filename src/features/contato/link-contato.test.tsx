import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LinkContato } from './link-contato'

describe('LinkContato', () => {
  it('diz ao Umami qual canal foi clicado e de onde', () => {
    render(
      <LinkContato canal="whatsapp" local="topo" className="">
        WhatsApp
      </LinkContato>,
    )
    const link = screen.getByRole('link', { name: 'WhatsApp' })
    expect(link).toHaveAttribute('data-umami-event', 'contato-whatsapp')
    expect(link).toHaveAttribute('data-umami-event-local', 'topo')
  })
})
