import { z } from 'zod'

export const LIMITE_MENSAGEM = 1000

/** O que a pessoa conta da paróquia antes de abrir o WhatsApp ou o e-mail. Nada sai daqui para um servidor. */
export const conversaSchema = z.object({
  nome: z.string().trim().min(2, 'Diga como podemos chamar você.').max(80, 'Use até 80 caracteres.'),
  paroquia: z.string().trim().min(3, 'Diga o nome da paróquia.').max(120, 'Use até 120 caracteres.'),
  cidade: z.string().trim().max(80, 'Use até 80 caracteres.'),
  mensagem: z.string().trim().max(LIMITE_MENSAGEM, 'Use até 1.000 caracteres.'),
})

export type Conversa = z.infer<typeof conversaSchema>

export const conversaVazia: Conversa = { nome: '', paroquia: '', cidade: '', mensagem: '' }

/**
 * "da Paróquia São Bento", "do Santuário de Aparecida". Quem escreve só o nome
 * do padroeiro ("São Bento") ganha o "Paróquia" na frente.
 */
export function daParoquia(paroquia: string) {
  if (/^santu[aá]rio\b/i.test(paroquia)) return `do ${paroquia}`
  if (/^(par[oó]quia|igreja|comunidade|capela|catedral|bas[ií]lica)\b/i.test(paroquia)) return `da ${paroquia}`
  return `da Paróquia ${paroquia}`
}

/** O texto que abre pronto no WhatsApp ou no corpo do e-mail, escrito como a pessoa falaria. */
export function montarMensagem({ nome, paroquia, cidade, mensagem }: Conversa) {
  const onde = cidade ? `${daParoquia(paroquia)}, em ${cidade}` : daParoquia(paroquia)
  const abertura = `Olá! Sou ${nome}, ${onde}. Vi o site do Ambão e queria conversar sobre o sistema para a nossa paróquia.`
  return mensagem ? `${abertura}\n\n${mensagem}` : abertura
}
