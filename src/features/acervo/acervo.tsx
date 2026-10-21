import { Icone } from '@/components/ui/icone'
import { Selo } from '@/components/ui/selo'
import { igrejaDemo } from '@/dados/financeiro-demo'
import { Momento } from '@/features/folheto/momento'
import { Folha, Vitrine } from '@/features/folheto/vitrine'

/**
 * As fotos são de arquitetura e objetos, em domínio público ou CC0, as mesmas da
 * paróquia de demonstração (ferramentas/demo/fotos.json). Nenhum rosto.
 */
const fotosDaMissa = [
  { src: '/acervo/velas.webp', alt: 'Velas acesas junto ao vitral', capa: true },
  { src: '/acervo/lecionario.webp', alt: 'Lecionário aberto no ambão' },
  { src: '/acervo/vitral.webp', alt: 'Vitral colorido da igreja' },
  { src: '/acervo/bancos.webp', alt: 'Bancos da nave vazios' },
]

const albunsLiberados = [
  { titulo: 'Quermesse de outubro', dono: 'Paróquia', fotos: 2, capa: '/acervo/praca-capa.webp', alt: 'Coreto da praça enfeitado com bandeirinhas' },
  { titulo: 'Nossa igreja', dono: igrejaDemo, fotos: 4, capa: '/acervo/nave-capa.webp', alt: 'Nave da igreja com o altar ao fundo' },
]

/** O ciclo das fotos: a equipe envia, quem cuida libera, a comunidade vê. */
export function Acervo() {
  return (
    <Momento
      id="acervo"
      titulo="Onde estão as fotos da festa?"
      rubrica="Segunda de manhã."
      leitura="As fotos da missa e da quermesse ficam espalhadas no celular de cada um e em vários grupos."
      resposta="No Ambão, a equipe envia as fotos por 14 dias depois da celebração. Tudo entra em rascunho, quem cuida do acervo escolhe a capa e libera, e a comunidade vê na Galeria só o que foi liberado."
      junto={[
        'Álbuns da paróquia, da igreja e de cada celebração',
        'Fora do prazo, a equipe pede e o coordenador libera',
        'Ocultar uma foto sem apagar o álbum',
        'O álbum inteiro pode ir junto de uma publicação',
      ]}
      vitrine={
        <Vitrine legenda="O álbum da missa ainda em rascunho no acervo, e a Galeria, que mostra só o que foi liberado.">
          <div className="grid gap-4">
            <AcervoDaCelebracao />
            <Galeria />
          </div>
        </Vitrine>
      }
    />
  )
}

function AcervoDaCelebracao() {
  return (
    <Folha>
      <p className="text-[13px] text-muted">Acervo · celebração</p>
      <h3 className="mt-1 text-[1.25rem] leading-tight font-medium tracking-tight">29º Domingo do Tempo Comum</h3>
      <p className="mt-1 text-[13px] text-muted">Domingo, 18 de outubro · 9h · {igrejaDemo}</p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-field bg-pink px-4 py-3">
        <p className="flex items-center gap-2 text-[14px]">
          <Icone nome="calendario" className="h-4 w-4 text-blue" />
          Envio aberto até 1/11.
        </p>
        <span className="inline-flex h-9 items-center gap-2 rounded-field border border-field bg-white px-3 text-[13px] font-medium">
          <Icone nome="galeria" className="h-4 w-4" />
          Enviar fotos e vídeos
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <p className="flex items-center gap-2">
          <span className="text-[15px] font-medium">Missa das 9h</span>
          <Selo tom="rascunho">Rascunho</Selo>
        </p>
        <span className="tabular text-[13px] text-muted">{fotosDaMissa.length} fotos</span>
      </div>
      <ul className="mt-3 grid grid-cols-4 gap-2">
        {fotosDaMissa.map((foto) => (
          <li key={foto.src} className="relative aspect-square overflow-hidden rounded-field bg-blue-wash">
            <img src={foto.src} alt={foto.alt} width={320} height={320} loading="lazy" decoding="async" className="size-full object-cover" />
            {foto.capa ? (
              <span className="absolute bottom-1.5 left-1.5 rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-blue">Capa</span>
            ) : null}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="inline-flex h-10 items-center rounded-field bg-blue px-4 text-[14px] font-medium text-white">Liberar</span>
        <p className="text-[13px] text-muted">Só quem cuida do acervo libera para a Galeria.</p>
      </div>
    </Folha>
  )
}

/** A Galeria só lê: os álbuns liberados, com a capa escolhida. */
function Galeria() {
  return (
    <Folha>
      <p className="text-[13px] text-muted">Galeria · o que a comunidade vê</p>
      <ul className="mt-3 grid grid-cols-2 gap-3">
        {albunsLiberados.map((album) => (
          <li key={album.titulo} className="overflow-hidden rounded-field border border-line">
            <img
              src={album.capa}
              alt={album.alt}
              width={640}
              height={480}
              loading="lazy"
              decoding="async"
              className="block aspect-4/3 w-full object-cover"
            />
            <p className="px-3 pt-2.5 text-[15px] leading-snug font-medium">{album.titulo}</p>
            <p className="tabular px-3 pt-0.5 pb-3 text-[13px] text-muted">
              {album.dono} · {album.fotos} fotos
            </p>
          </li>
        ))}
      </ul>
    </Folha>
  )
}
