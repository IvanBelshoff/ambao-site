import { z } from 'zod'

/**
 * O site no Umami (cloud.umami.is), que conta visitas e cliques de contato sem
 * cookie e sem dado pessoal. Vem do `.env` (declarado em `next.config.ts`).
 * Vazio desliga a contagem: o script nem entra na página.
 *
 * - UMAMI_WEBSITE_ID: o Website ID do painel do Umami. Exemplo: 4f8e1c2a-9b3d-4e5f-8a7b-1c2d3e4f5a6b
 */
export const umamiSchema = z
  .string()
  .trim()
  .pipe(z.literal('').or(z.uuid('UMAMI_WEBSITE_ID: use o Website ID do painel do Umami.')))

export const umamiId = umamiSchema.parse(process.env.UMAMI_WEBSITE_ID ?? '')
