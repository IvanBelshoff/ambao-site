import { Ceu } from '@/components/ceu/ceu'
import { canaisDoFormulario, linkDoCanal } from './canais'
import { FormularioConversa } from './formulario-conversa'

const linkNoCeu =
  'font-medium text-white underline decoration-white/50 underline-offset-[0.22em] transition-[text-decoration-color] duration-150 hover:decoration-white'

/**
 * Ritos finais: de volta ao céu, para conversar. O formulário é a ação; quem
 * prefere chamar direto tem um link discreto, e quem avalia o autor, o LinkedIn.
 */
export function Encerramento() {
  const oferece = canaisDoFormulario()
  const temFormulario = oferece.whatsapp || oferece.email
  const whatsapp = linkDoCanal('whatsapp')
  const linkedin = linkDoCanal('linkedin')

  return (
    <section id="contato" className="no-ceu relative isolate overflow-hidden bg-night text-white">
      <Ceu tardio rodape />
      <div className="mx-auto w-[90%] max-w-[78rem] py-24 lg:py-32">
        <div
          className={`grid gap-12 ${temFormulario ? 'lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start lg:gap-14' : ''}`}
        >
          <div className="ceu-texto lg:pt-7">
            <h2 className="max-w-[18ch] text-[2.25rem] leading-[1.08] font-medium tracking-[-0.03em] text-balance sm:text-[3rem]">
              Quer ver o Ambão com a realidade da sua paróquia?
            </h2>
            <p className="mt-5 max-w-[36rem] text-[1.125rem] leading-[1.6] text-pretty text-white/92">
              A conversa é para entender como a sua paróquia se organiza e mostrar o sistema por dentro, com calma.
            </p>
            {whatsapp || linkedin ? (
              <div className="mt-9 grid gap-2 text-[15px] leading-[1.6] text-white/88">
                {whatsapp ? (
                  <p>
                    Prefere sem formulário?{' '}
                    <a {...whatsapp} className={linkNoCeu}>
                      Chame direto no WhatsApp
                    </a>
                    .
                  </p>
                ) : null}
                {linkedin ? (
                  <p>
                    Quer conhecer quem fez o Ambão?{' '}
                    <a {...linkedin} className={linkNoCeu}>
                      Ivan Belshoff
                    </a>
                    .
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>

          <FormularioConversa />
        </div>

        <p className="ceu-texto mt-16 border-t border-white/25 pt-6 text-[1.125rem] text-white/88">
          Ide em paz, e o Senhor vos acompanhe.
        </p>
      </div>
    </section>
  )
}
