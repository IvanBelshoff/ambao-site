import { type Canal, type Contato, contato } from '@/config/contato'

export const mensagemWhatsapp = 'Olá! Vi o site do Ambão e quero conversar sobre o sistema para a minha paróquia.'
export const assuntoEmail = 'Ambão para a minha paróquia'

export const linkWhatsapp = (numero: string, texto = mensagemWhatsapp) =>
  `https://wa.me/${numero.replace(/\D/g, '')}?text=${encodeURIComponent(texto)}`

export const linkEmail = (email: string, assunto = assuntoEmail, corpo?: string) =>
  `mailto:${email}?subject=${encodeURIComponent(assunto)}${corpo ? `&body=${encodeURIComponent(corpo)}` : ''}`

/** O endereço de cada canal, ou vazio quando ele não foi preenchido. */
export function destino(canal: Canal, canais: Contato = contato) {
  const valor = canais[canal]
  if (!valor) return ''
  if (canal === 'whatsapp') return linkWhatsapp(valor)
  if (canal === 'email') return linkEmail(valor)
  return valor
}

/**
 * Os canais que o formulário oferece. Em desenvolvimento o canal vazio fica à
 * mostra e avisa o que falta ao enviar; no site publicado ele some.
 */
export function canaisDoFormulario(canais: Contato = contato, producao = process.env.NODE_ENV === 'production') {
  return {
    whatsapp: Boolean(canais.whatsapp) || !producao,
    email: Boolean(canais.email) || !producao,
  }
}

/** Acima disso, alguns programas de e-mail cortam o fim do `mailto`. */
export const LIMITE_MAILTO = 1900

/**
 * Os atributos do link de um canal. Canal vazio some do site publicado; em
 * desenvolvimento ele fica, apontando para o contato, para a página não mudar de forma.
 */
export function linkDoCanal(canal: Canal, canais: Contato = contato, producao = process.env.NODE_ENV === 'production') {
  const href = destino(canal, canais)
  if (!href) return producao ? null : { href: '#contato' }
  if (href.startsWith('mailto:')) return { href }
  return { href, target: '_blank', rel: 'noopener' }
}
