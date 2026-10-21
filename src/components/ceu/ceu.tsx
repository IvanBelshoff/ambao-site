import { CeuVideo } from './ceu-video'
import estilo from './ceu.module.css'

/**
 * O fundo do céu da entrada do painel: a imagem parada, o vídeo por cima e o véu
 * de noite. Fica atrás do conteúdo de quem o usa (`relative isolate` no pai).
 * `tardio` só carrega o vídeo quando o céu chega à tela, como o do fechamento.
 */
export function Ceu({ tardio = false, rodape = false }: { tardio?: boolean; rodape?: boolean }) {
  const enquadramento = rodape ? 'object-cover object-bottom' : 'object-cover'
  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      <img
        src="/ceu.jpg"
        alt=""
        loading={tardio ? 'lazy' : undefined}
        className={`absolute inset-0 h-full w-full ${enquadramento}`}
      />
      <CeuVideo src="/ceu.mp4" tardio={tardio} className={`absolute inset-0 h-full w-full ${enquadramento}`} />
      <div className={estilo.veu} />
    </div>
  )
}
