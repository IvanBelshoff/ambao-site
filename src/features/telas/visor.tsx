'use client'

import Lightbox, { type Slide } from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import { semMovimento } from '@/lib/media'

/**
 * O print em tela cheia, sem sair da página: a mesma biblioteca da galeria do
 * painel, com zoom para ler os detalhes e a legenda embaixo. O fundo é a noite do céu.
 */
export default function Visor({ slides, indice, fechar }: { slides: Slide[]; indice: number; fechar: () => void }) {
  const reduzido = semMovimento()
  return (
    <Lightbox
      open
      close={fechar}
      index={indice}
      slides={slides}
      plugins={[Zoom, Captions]}
      zoom={{ maxZoomPixelRatio: 2, scrollToZoom: true }}
      captions={{ descriptionTextAlign: 'center', descriptionMaxLines: 2 }}
      animation={reduzido ? { fade: 0, swipe: 0, navigation: 0, zoom: 0 } : undefined}
      controller={{ closeOnBackdropClick: true }}
      // O print não fica embaixo da barra (título, zoom, fechar) nem da legenda: o slide desconta esse respiro.
      styles={{
        container: { backgroundColor: 'var(--color-night)' },
        slide: { padding: '64px 16px 96px' },
      }}
      labels={{
        Close: 'Fechar',
        Next: 'Próxima tela',
        Previous: 'Tela anterior',
        'Zoom in': 'Aproximar',
        'Zoom out': 'Afastar',
        Lightbox: 'Telas do painel',
        Carousel: 'Telas do painel',
        Slide: 'Tela',
        'Photo gallery': 'Telas do painel',
        '{index} of {total}': '{index} de {total}',
      }}
    />
  )
}
