import { z } from 'zod'

/**
 * Os canais de contato do site. Vêm do `.env` (declarados em `next.config.ts`
 * para chegar também ao navegador). Canal vazio esconde o botão dele no site publicado.
 *
 * - WHATSAPP_NUMBER: o número com DDD, com ou sem o 55 e a máscara. Exemplo: 27999998888
 * - EMAIL_USER: o e-mail que recebe as conversas.
 * - PROFILE_LINKEDIN: o endereço completo do perfil. Exemplo: https://www.linkedin.com/in/seu-perfil
 * - PROFILE_GITHUB: o endereço completo do perfil público. Exemplo: https://github.com/seu-usuario
 */
const canais = {
  whatsapp: process.env.WHATSAPP_NUMBER ?? '',
  email: process.env.EMAIL_USER ?? '',
  linkedin: process.env.PROFILE_LINKEDIN ?? '',
  github: process.env.PROFILE_GITHUB ?? '',
}

const vazio = z.literal('')

/** Só os dígitos; número brasileiro com DDD e sem o país ganha o 55 que o wa.me pede. */
export const normalizarWhatsapp = (valor: string) => {
  const digitos = valor.replace(/\D/g, '')
  return digitos.length === 10 || digitos.length === 11 ? `55${digitos}` : digitos
}

/** Um canal mal preenchido derruba o build com a mensagem de onde corrigir. */
export const contatoSchema = z.object({
  whatsapp: z
    .string()
    .trim()
    .transform(normalizarWhatsapp)
    .pipe(vazio.or(z.string().regex(/^\d{12,13}$/, 'WHATSAPP_NUMBER: use o número com DDD. Exemplo: 27999998888'))),
  email: z.string().trim().pipe(vazio.or(z.email('EMAIL_USER: e-mail inválido.'))),
  linkedin: z
    .string()
    .trim()
    .pipe(vazio.or(z.url({ hostname: /^(www\.)?linkedin\.com$/, error: 'PROFILE_LINKEDIN: use o endereço completo do perfil.' }))),
  github: z
    .string()
    .trim()
    .pipe(vazio.or(z.url({ hostname: /^(www\.)?github\.com$/, error: 'PROFILE_GITHUB: use o endereço completo do perfil.' }))),
})

export type Contato = z.output<typeof contatoSchema>
export type Canal = keyof Contato

export const contato: Contato = contatoSchema.parse(canais)

const faltando = (['whatsapp', 'email', 'linkedin', 'github'] as const).filter((canal) => !contato[canal])
if (process.env.NODE_ENV === 'development' && faltando.length > 0) {
  console.warn(`Ambão: canais vazios no .env (${faltando.join(', ')}). No site publicado, esses botões somem.`)
}
