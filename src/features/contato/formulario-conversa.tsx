'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { type FormEvent, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { type Contato, contato } from '@/config/contato'
import { Botao } from '@/components/ui/botao'
import { AreaDeTexto, Campo } from '@/components/ui/campo'
import { Icone } from '@/components/ui/icone'
import { LogoWhatsapp } from '@/components/ui/marcas'
import { LIMITE_MAILTO, assuntoEmail, canaisDoFormulario, linkEmail, linkWhatsapp } from './canais'
import { type Conversa, LIMITE_MENSAGEM, conversaSchema, conversaVazia, montarMensagem } from './conversa'

type Canal = 'whatsapp' | 'email'
type Aberto = { canal: Canal; url: string; texto: string; longo: boolean }

/** "e-mail" sem quebrar no hífen. */
const EMAIL = <span className="whitespace-nowrap">e-mail</span>

/** No toque, o app do WhatsApp assume; uma aba nova ficaria em branco para trás. */
const naMesmaAba = () => window.matchMedia('(pointer: coarse)').matches

/**
 * Um bilhete curto que vira mensagem pronta no WhatsApp ou no e-mail. Nada é
 * enviado a servidor: o site só monta o texto e abre o aplicativo da pessoa,
 * que revisa e envia de lá.
 */
export function FormularioConversa({
  canais = contato,
  producao = process.env.NODE_ENV === 'production',
}: {
  canais?: Contato
  producao?: boolean
}) {
  const [aberto, setAberto] = useState<Aberto | null>(null)
  const [aviso, setAviso] = useState('')
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Conversa>({ resolver: zodResolver(conversaSchema), defaultValues: conversaVazia })
  const caracteres = useWatch({ control, name: 'mensagem' }).length

  const oferece = canaisDoFormulario(canais, producao)
  if (!oferece.whatsapp && !oferece.email) return null

  const abrir = (canal: Canal) => (evento?: FormEvent) => {
    setAviso('')
    return handleSubmit((dados) => {
      const endereco = canais[canal]
      if (!endereco) {
        setAviso(`Preencha ${canal === 'whatsapp' ? 'o WhatsApp' : 'o e-mail'} em src/config/contato.ts.`)
        return
      }
      const texto = montarMensagem(dados)
      const url = canal === 'whatsapp' ? linkWhatsapp(endereco, texto) : linkEmail(endereco, assuntoEmail, texto)
      setAberto({ canal, url, texto, longo: canal === 'email' && url.length > LIMITE_MAILTO })
      if (canal === 'email' || naMesmaAba()) {
        window.location.href = url
        return
      }
      const janela = window.open(url, '_blank')
      if (janela) janela.opener = null
      else window.location.href = url
    })(evento)
  }

  // O botão de envio do formulário é sempre o azul cheio; o outro canal, contorno.
  const principal: Canal = oferece.whatsapp ? 'whatsapp' : 'email'

  return (
    <form
      noValidate
      onSubmit={abrir(principal)}
      aria-labelledby="conversa-titulo"
      className="papel rounded-field bg-white p-5 text-ink shadow-card ring-1 ring-white/35 [text-shadow:none] sm:p-7"
    >
      <h3 id="conversa-titulo" className="text-[1.25rem] leading-tight font-medium tracking-tight">
        Conte um pouco da sua paróquia
      </h3>
      <p className="mt-1.5 text-[14px] text-muted sm:text-[13px]">
        Nome e paróquia bastam. A mensagem abre pronta no WhatsApp ou no {EMAIL}, e nada fica guardado neste site.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Campo
          id="conversa-nome"
          rotulo="Seu nome"
          autoComplete="name"
          required
          erro={errors.nome?.message}
          {...register('nome')}
        />
        <Campo
          id="conversa-paroquia"
          rotulo="Paróquia"
          autoComplete="organization"
          required
          erro={errors.paroquia?.message}
          {...register('paroquia')}
        />
        <div className="sm:col-span-2">
          <Campo
            id="conversa-cidade"
            rotulo="Cidade (opcional)"
            autoComplete="address-level2"
            erro={errors.cidade?.message}
            {...register('cidade')}
          />
        </div>
        <div className="sm:col-span-2">
          <AreaDeTexto
            id="conversa-mensagem"
            rotulo="Como a paróquia se organiza hoje? (opcional)"
            ajuda="Quantas igrejas, quem cuida das escalas, do dízimo e do caixa."
            maxLength={LIMITE_MENSAGEM}
            contador={caracteres > 0 ? `${caracteres.toLocaleString('pt-BR')} de 1.000` : null}
            erro={errors.mensagem?.message}
            {...register('mensagem')}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {oferece.whatsapp ? (
          <Botao type="submit" variante="primario" className="justify-center">
            <LogoWhatsapp />
            Abrir no WhatsApp
          </Botao>
        ) : null}
        {oferece.email ? (
          <Botao
            type={principal === 'email' ? 'submit' : 'button'}
            variante={principal === 'email' ? 'primario' : 'contorno'}
            onClick={principal === 'email' ? undefined : abrir('email')}
            className="justify-center"
          >
            <Icone nome="email" />
            {/* Um elemento só: o gap do botão separaria "no" de "e-mail". */}
            <span>Abrir no {EMAIL}</span>
          </Botao>
        ) : null}
      </div>
      <p className="mt-3 text-[14px] text-muted sm:text-[13px]">Você revisa o texto e envia de lá.</p>

      <div aria-live="polite">
        {aviso ? <p className="mt-5 text-[14px] text-warning">{aviso}</p> : null}
        {aberto && !aviso ? <Pronto aberto={aberto} email={canais.email} /> : null}
      </div>
    </form>
  )
}

/**
 * Depois de abrir: o site não sabe se o app abriu, então diz o que falta e
 * oferece a saída. No e-mail, a saída é copiar a mensagem e escrever direto.
 */
function Pronto({ aberto, email }: { aberto: Aberto; email: string }) {
  const [copiado, setCopiado] = useState(false)
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(aberto.texto)
      setCopiado(true)
    } catch {
      setCopiado(false)
    }
  }

  return (
    <div className="mt-5 border-t border-line pt-5">
      <p className="text-[15px] font-medium">
        {aberto.canal === 'whatsapp' ? 'Falta só tocar em Enviar no WhatsApp.' : <>Falta só tocar em Enviar no seu {EMAIL}.</>}
      </p>
      {aberto.canal === 'whatsapp' ? (
        <p className="mt-1 text-[14px] text-muted sm:text-[13px]">
          Se o WhatsApp não abriu,{' '}
          <a href={aberto.url} target="_blank" rel="noopener" className="text-blue underline hover:text-blue-hover">
            abra por este link
          </a>
          .
        </p>
      ) : (
        <>
          <p className="mt-1 text-[14px] text-muted sm:text-[13px]">
            {aberto.longo ? 'A mensagem é longa e alguns programas cortam o fim: confira antes de enviar. ' : ''}
            Se nada abriu, copie a mensagem e escreva para{' '}
            <a href={`mailto:${email}`} className="font-medium text-blue underline hover:text-blue-hover">
              {email}
            </a>
            .
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Botao variante="contorno" onClick={copiar}>
              <Icone nome={copiado ? 'check' : 'copiar'} />
              {copiado ? 'Mensagem copiada' : 'Copiar mensagem'}
            </Botao>
          </div>
        </>
      )}
    </div>
  )
}
