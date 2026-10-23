import { CeuVideo } from './ceu-video'
import estilo from './ceu.module.css'

/** O céu de cada tema, como o Sky do painel: o mar de dia, o céu estrelado sobre a serra à noite. */
const CEUS = {
  claro: { foto: '/ceu.jpg', video: '/ceu.mp4', so: 'so-claro' },
  escuro: { foto: '/ceu-noite.jpg', video: '/ceu-noite.mp4', so: 'so-escuro' },
} as const

/**
 * O fundo do céu da entrada do painel: a imagem parada, o vídeo por cima e o véu
 * de noite. Fica atrás do conteúdo de quem o usa (`relative isolate` no pai).
 * `tardio` só carrega o vídeo quando o céu chega à tela, como o do fechamento.
 * O HTML estático leva o céu dos dois temas; o CSS mostra o do tema já na primeira
 * pintura, e só o vídeo do tema na tela é baixado.
 */
export function Ceu({ tardio = false, rodape = false }: { tardio?: boolean; rodape?: boolean }) {
  const enquadramento = rodape ? 'object-cover object-bottom' : 'object-cover'
  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      {(['claro', 'escuro'] as const).map((tema) => (
        <div key={tema} className={`${CEUS[tema].so} absolute inset-0`}>
          <img
            src={CEUS[tema].foto}
            alt=""
            loading={tardio ? 'lazy' : undefined}
            className={`absolute inset-0 h-full w-full ${enquadramento}`}
          />
          <CeuVideo
            src={CEUS[tema].video}
            tema={tema}
            tardio={tardio}
            className={`absolute inset-0 h-full w-full ${enquadramento}`}
          />
        </div>
      ))}
      <div className={estilo.veu} />
    </div>
  )
}
