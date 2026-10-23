import { Disco } from '@/components/ui/disco'
import { Icone } from '@/components/ui/icone'
import { Momento } from '@/features/folheto/momento'
import { Folha, Vitrine } from '@/features/folheto/vitrine'
import {
  folhinha,
  guardadosRecentes,
  meusCertificados,
  porExtenso,
  tiposDaParoquia,
  type CertificadoDemo,
} from './certificados-demo'

/** A cópia que a paróquia guarda, e a pessoa abrindo quando precisa. */
export function Certificados() {
  return (
    <Momento
      id="certificados"
      titulo="Onde foi parar o certificado de batismo?"
      rubrica="Antes do casamento."
      leitura="Para a crisma ou para o casamento, pedem o certificado do batismo. A cópia recebida anos atrás ficou numa gaveta, numa mudança, na casa dos pais."
      resposta="No Ambão, a paróquia guarda a cópia de cada certificado na ficha da pessoa, com a data, o local e o registro no livro. A pessoa abre e baixa quando quiser, em Meus certificados."
      junto={[
        'Os tipos são da paróquia: batismo, eucaristia, crisma, matrimônio, cursos',
        'Imagem ou PDF, trocado quando chegar uma via nova',
        'A pessoa recebe um aviso quando um certificado é guardado',
        'Só quem a paróquia autoriza vê os certificados dos outros',
        'O Ambão guarda a cópia; a certidão oficial continua com a secretaria',
      ]}
      vitrine={
        <Vitrine legenda="Meus certificados, como a pessoa vê, e a lista da secretaria da paróquia.">
          <div className="grid gap-4">
            <MeusCertificados />
            <DaSecretaria />
          </div>
        </Vitrine>
      }
    />
  )
}

function MeusCertificados() {
  return (
    <Folha className="p-5 sm:p-6">
      <h3 className="text-[1.25rem] leading-tight font-medium tracking-tight">Meus certificados</h3>
      <p className="mt-1 flex items-center gap-1.5 text-[13px] text-muted">
        <Icone nome="info" className="h-3.5 w-3.5 text-blue" />
        Cópia digital. Para fins oficiais, peça a certidão na secretaria.
      </p>

      <ol className="relative mt-5 grid gap-3">
        {/* A espinha da caminhada, ligando uma folhinha à outra. */}
        <span aria-hidden className="absolute top-3 bottom-3 left-[1.375rem] w-px bg-line" />
        {meusCertificados.map((certificado) => (
          <Passo key={certificado.tipo} certificado={certificado} />
        ))}
      </ol>
    </Folha>
  )
}

export function Passo({ certificado }: { certificado: CertificadoDemo }) {
  const dia = certificado.data ? folhinha(certificado.data) : null
  return (
    <li className="relative flex gap-3">
      {dia ? (
        <span
          aria-hidden
          className="relative flex w-11 shrink-0 flex-col items-center self-start overflow-hidden rounded-field border border-blue/25 bg-white text-center"
        >
          <span className="w-full bg-blue py-px text-[10px] font-semibold tracking-[0.12em] text-white uppercase">
            {dia.mes}
          </span>
          <span className="tabular pt-1 text-[17px] leading-none font-medium">{dia.dia}</span>
          <span className="tabular pt-0.5 pb-1 text-[10px] text-muted">{dia.ano}</span>
        </span>
      ) : null}
      <div
        className={`flex min-w-0 flex-1 items-start justify-between gap-3 rounded-field border px-3.5 py-3 ${
          certificado.novo ? 'border-blue/40 bg-pink/40' : 'border-line'
        }`}
      >
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-2">
            <span className="text-[15px] font-medium">{certificado.tipo}</span>
            {certificado.novo ? (
              <span className="rounded-full bg-blue-wash px-2 py-0.5 text-[11px] font-medium text-blue">Novo</span>
            ) : null}
          </p>
          <p className="mt-0.5 text-[13px] text-muted">
            {certificado.data ? <span className="sr-only">{porExtenso(certificado.data)}, </span> : null}
            {[certificado.local, certificado.celebrante].filter(Boolean).join(' · ')}
          </p>
          {certificado.registro ? (
            <dl className="tabular mt-2 inline-grid grid-cols-3 divide-x divide-line overflow-hidden rounded-field border border-line bg-surface text-[12px]">
              {(
                [
                  ['Livro', certificado.registro.livro],
                  ['Folha', certificado.registro.folha],
                  ['Termo', certificado.registro.termo],
                ] as const
              ).map(([rotulo, valor]) => (
                <div key={rotulo} className="px-2 py-1 sm:px-2.5">
                  <dt className="text-[10px] text-muted">{rotulo}</dt>
                  <dd className="m-0 font-medium">{valor}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          <span className="mt-2.5 inline-flex h-8 items-center gap-1.5 rounded-field border border-field bg-white px-2.5 text-[13px] font-medium sm:hidden">
            <Icone nome="baixar" className="h-3.5 w-3.5" />
            Abrir {certificado.arquivo === 'PDF' ? 'PDF' : 'imagem'}
          </span>
        </div>
        <div className="hidden shrink-0 flex-col items-end gap-1.5 sm:flex">
          <span className="inline-flex h-8 items-center gap-1.5 rounded-field border border-field bg-white px-2.5 text-[13px] font-medium">
            <Icone nome="baixar" className="h-3.5 w-3.5" />
            Abrir
          </span>
          <span className="text-[11px] text-muted">{certificado.arquivo}</span>
        </div>
      </div>
    </li>
  )
}

/** A secretaria: os tipos da paróquia com a contagem e os últimos guardados. */
function DaSecretaria() {
  return (
    <Folha>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[13px] text-muted">Certificados · paróquia</p>
        <span className="inline-flex h-9 items-center gap-1.5 rounded-field bg-blue px-3 text-[13px] font-medium text-white">
          <span aria-hidden>+</span> Novo certificado
        </span>
      </div>
      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tipos da paróquia">
        {tiposDaParoquia.map((tipo, indice) => (
          <li
            key={tipo.nome}
            className={`inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-[12px] font-medium ${
              indice === 0 ? 'border-blue/30 bg-pink text-blue' : 'border-line text-ink'
            }`}
          >
            {tipo.nome}
            {tipo.usos > 0 ? <span className="tabular text-muted">{tipo.usos}</span> : null}
          </li>
        ))}
      </ul>
      <ul className="mt-3 divide-y divide-line border-t border-line">
        {guardadosRecentes.map((item) => (
          <li key={item.pessoa} className="flex items-center gap-3 py-2.5">
            <Disco tamanho="sm" tom="lavado">
              {item.iniciais}
            </Disco>
            <span className="min-w-0 flex-1 truncate text-[14px] font-medium">{item.pessoa}</span>
            <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-blue ring-1 ring-blue/25 ring-inset">
              {item.tipo}
            </span>
            <span className="tabular hidden w-[5.5rem] text-right text-[13px] text-muted sm:block">{item.data}</span>
          </li>
        ))}
      </ul>
    </Folha>
  )
}
