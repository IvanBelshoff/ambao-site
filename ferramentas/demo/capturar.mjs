/**
 * Tira os prints do painel com a paróquia de demonstração, em desktop, tablet e
 * celular, e grava em public/telas/. Precisa do painel (ambao-web) e da API de
 * demonstração de pé, e do Chrome instalado.
 *
 * Uso: npm run capturas
 * Variáveis: AMBAO_PAINEL (padrão http://localhost:5180), CHROME (caminho do Chrome).
 */
import { mkdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'

const AQUI = dirname(fileURLToPath(import.meta.url))
const SAIDA = join(AQUI, '..', '..', 'public', 'telas')
const PAINEL = process.env.AMBAO_PAINEL ?? 'http://localhost:5180'
const CHROME = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const logins = JSON.parse(readFileSync(join(AQUI, 'logins.json'), 'utf8'))

const APARELHOS = {
  desktop: { width: 1440, height: 900, isMobile: false },
  tablet: { width: 834, height: 1194, isMobile: true },
  celular: { width: 390, height: 844, isMobile: true },
}

/** Cada tela: quem entra, onde, e o que precisa estar na tela antes do print. */
const TELAS = [
  { nome: 'inicio', quem: logins.coordenacao, caminho: '/', espera: 'Para fazer agora' },
  { nome: 'escala', quem: logins.coordenacao, caminho: `/calendario/escalacao/${logins.escala}`, espera: 'aceitaram' },
  { nome: 'participacao', quem: logins.membro, caminho: `/participacoes/${logins.escala}`, espera: 'Salmo' },
  { nome: 'dizimos', quem: logins.coordenacao, caminho: '/financeiro/dizimo', espera: 'Maria das Graças' },
  { nome: 'caixa', quem: logins.coordenacao, caminho: '/financeiro/caixa', espera: 'Oferta' },
  { nome: 'publicacoes', quem: logins.membro, caminho: '/publicacoes', espera: 'Finados' },
  { nome: 'leitura', quem: logins.membro, caminho: '/leitura', espera: 'Esta semana' },
  { nome: 'galeria', quem: logins.coordenacao, caminho: '/galeria', espera: 'Quermesse' },
]

const pausa = (ms) => new Promise((r) => setTimeout(r, ms))

async function entrar(pagina, email) {
  await pagina.goto(`${PAINEL}/login`, { waitUntil: 'domcontentloaded' })
  await pagina.waitForSelector('#email')
  await pagina.type('#email', email)
  await pagina.type('#senha', logins.senha)
  await pagina.click('button[type="submit"]')
  await pagina.waitForFunction(() => location.pathname !== '/login', { timeout: 15000 })
}

async function main() {
  mkdirSync(SAIDA, { recursive: true })
  const navegador = await puppeteer.launch({ executablePath: CHROME, headless: true })
  const filtro = process.argv[2]
  for (const [aparelho, tamanho] of Object.entries(APARELHOS)) {
    for (const quem of new Set(TELAS.map((t) => t.quem))) {
      const contexto = await navegador.createBrowserContext()
      const pagina = await contexto.newPage()
      await pagina.setViewport({ ...tamanho, deviceScaleFactor: 2, hasTouch: tamanho.isMobile })
      await pagina.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
      await entrar(pagina, quem)
      for (const tela of TELAS.filter((t) => t.quem === quem && (!filtro || t.nome === filtro))) {
        const arquivo = join(SAIDA, `${tela.nome}-${aparelho}.webp`)
        try {
          await pagina.goto(`${PAINEL}${tela.caminho}`, { waitUntil: 'domcontentloaded' })
          await pagina.waitForFunction((texto) => document.body.innerText.includes(texto), { timeout: 15000 }, tela.espera)
          await pagina.evaluate(() => document.fonts.ready)
          await pausa(900)
          await pagina.screenshot({ path: arquivo, type: 'webp', quality: 88 })
          console.log('ok', `${tela.nome}-${aparelho}.webp`)
        } catch (erro) {
          await pagina.screenshot({ path: arquivo.replace('.webp', '.falhou.webp'), type: 'webp', quality: 60 })
          console.warn('falhou', `${tela.nome}-${aparelho}:`, erro.message)
        }
      }
      await contexto.close()
    }
  }
  await navegador.close()
}

main().catch((erro) => {
  console.error(erro.message ?? erro)
  process.exitCode = 1
})
