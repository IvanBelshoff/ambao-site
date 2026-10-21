import { networkInterfaces } from 'node:os'
import type { NextConfig } from 'next'

/**
 * Os IPv4 desta máquina na rede. O `next dev` bloqueia os próprios scripts para
 * outra origem: sem isto, quem abre pelo IP (o celular, na mesma rede) recebe
 * a página sem JavaScript, sem a barra que vira placa e sem o vídeo do céu.
 */
const ipsDaRede = Object.values(networkInterfaces())
  .flat()
  .filter((rede) => rede?.family === 'IPv4' && !rede.internal)
  .map((rede) => rede!.address)

// Site estático: `next build` gera `out/`, que qualquer hospedagem de arquivos serve.
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
  allowedDevOrigins: ipsDaRede,
  // Os canais de contato do .env, com os nomes de lá. O formulário e o botão do
  // WhatsApp rodam no navegador; sem isto, só variáveis NEXT_PUBLIC_ chegariam até lá.
  env: {
    WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER ?? '',
    EMAIL_USER: process.env.EMAIL_USER ?? '',
    PROFILE_LINKEDIN: process.env.PROFILE_LINKEDIN ?? '',
    PROFILE_GITHUB: process.env.PROFILE_GITHUB ?? '',
  },
}

export default nextConfig
