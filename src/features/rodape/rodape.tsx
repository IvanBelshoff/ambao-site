import { Marca } from '@/components/ui/marca'
import { LogoGithub } from '@/components/ui/marcas'
import { LinkContato } from '@/features/contato/link-contato'
import { LinkParaDevs } from './link-para-devs'

export function Rodape() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto flex w-[90%] max-w-[78rem] flex-wrap items-center justify-between gap-4 py-8 text-[13px] text-muted">
        <p className="text-blue">
          <Marca />
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p>
            Feito por Ivan Belshoff · <LinkParaDevs /> · As telas desta página usam dados fictícios.
          </p>
          {/* Só o símbolo: o nome vem no rótulo, para leitor de tela e ao parar o mouse. */}
          <LinkContato
            canal="github"
            local="rodape"
            rotulo="GitHub de Ivan Belshoff"
            className="-m-2 flex size-10 items-center justify-center rounded-field text-muted transition-colors duration-150 hover:bg-pink hover:text-blue"
          >
            <LogoGithub className="h-[18px] w-[18px]" />
          </LinkContato>
        </div>
      </div>
    </footer>
  )
}
