# ambao-site

Site público do Ambão: apresenta o sistema a outras paróquias e serve de portfólio. Next.js com exportação estática, React 19, TypeScript e Tailwind CSS 4, com a mesma marca do painel (`ambao-web`).

## Rodar

```bash
npm install
npm run dev         # http://localhost:3001 (a 3000 é da API)
npm run build       # gera out/
npm run preview     # serve o out/ em http://localhost:3001
```

## Conferir

```bash
npm run typecheck
npm run lint
npm test
```

## Antes de publicar

1. **Contato**: copie `.env.example` para `.env` e preencha `WHATSAPP_NUMBER` (com DDD; o 55 e a máscara são opcionais), `EMAIL_USER`, `PROFILE_LINKEDIN` e `PROFILE_GITHUB` (endereços completos dos perfis). O `.env` fica fora do git; no GitHub, as mesmas variáveis vão em *Settings → Secrets and variables → Actions → Variables*. Um canal vazio esconde o botão dele no site publicado; sem WhatsApp e sem e-mail, o formulário de conversa também some. Canal mal preenchido derruba o build com a mensagem de onde corrigir. Em desenvolvimento, o terminal avisa o que falta.
2. **Endereço do site**: ajuste `SITE_URL` em `.env` para o domínio final, sem barra no fim. A prévia do link no LinkedIn usa esse endereço para achar `og.png`.
3. **Contagem de visitas**: crie o site em [cloud.umami.is](https://cloud.umami.is) com o domínio de `SITE_URL` e copie o *Website ID* para `UMAMI_WEBSITE_ID`. O Umami conta visitas, origem e os cliques de contato (`contato-whatsapp`, `contato-email`, `contato-linkedin`, `contato-github`, com o `local` do botão) e o envio do formulário (`formulario-enviado`, com o `canal`). Não usa cookie e não recebe nome, paróquia nem mensagem. Vazio desliga: o script nem entra na página.
4. **Prints**: os de `public/telas/` vêm da paróquia de demonstração. Para refazer depois de uma mudança no painel, siga [ferramentas/demo/README.md](ferramentas/demo/README.md).

Use sempre uma paróquia de demonstração nas capturas. Nada de nome, foto, telefone ou dízimo de pessoa real.

## Publicar no GitHub Pages

O site fica em `https://ambao.silexcode.com.br`. O workflow `.github/workflows/publicar.yml` roda a cada push na `main`: confere tipos, lint e testes, gera o `out/` e publica.

1. Em *Settings → Pages*, **Source** é **GitHub Actions** e **Custom domain** é `ambao.silexcode.com.br`, com **Enforce HTTPS** marcado.
2. Em *Settings → Secrets and variables → Actions → Variables*, cadastre as chaves de `.env.example` com os valores do seu `.env`. Sem `SITE_URL`, o build para; sem os canais, o site sai sem os botões de contato. Mudou uma variável: rode o workflow de novo em *Actions → Publicar → Run workflow*.
3. O DNS está no Registro.br, na zona de `silexcode.com.br`: quatro registros `A` em `ambao` para os IPs do GitHub Pages (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`). O nome `ambao` também tem MX e SPF do e-mail, por isso é `A`, não `CNAME`.

O GitHub Pages serve para apresentar projetos, não para operar um negócio: loja, cobrança ou o próprio SaaS ficam fora dos termos. Se o site passar a vender (preço, plano, cadastro), mude para uma hospedagem que permita uso comercial, como o Cloudflare Pages. O site não depende do GitHub: qualquer hospedagem de arquivos estáticos serve o `out/`.

## Imagem de compartilhamento

`public/og.png` (1200 × 630) é a prévia que aparece quando o link é colado no LinkedIn. Para refazer, depois do `npm install`, abra `ferramentas/og.html` direto no navegador numa janela de 1200 × 630 e capture a tela.

## Estrutura

| Pasta | Papel |
|---|---|
| `src/app` | Layout, metadados, a página (só compõe as seções) e os tokens da marca em `globals.css` |
| `src/features` | Uma pasta por seção: abertura e placa, cada momento do folheto, recursos, telas, devs, contato e rodapé |
| `src/components` | Peças repetidas: `ui` (botão, campo, selo, ícone, cruz), `ceu` e `painel` |
| `src/dados` | Números fictícios que mais de uma seção mostra, com teste |
| `src/config/contato.ts` | Canais de contato |
| `public/telas/` | Prints do painel em computador, tablet e celular (`<tela>-<aparelho>.webp`) |
| `ferramentas/demo/` | Paróquia de demonstração e o script que tira os prints |
| `harness/` | Convenções e skills do repositório (comece por `harness/README.md`) |
| `PRODUCT.md`, `DESIGN.md`, `.impeccable/` | Contexto da skill `impeccable` |

O detalhe de pastas, componentes e estilo está em [harness/estrutura.md](harness/estrutura.md).
