# ambao-site

Site público do Ambão: apresenta o sistema a outras paróquias e serve de portfólio. Next.js com exportação estática, React 19, TypeScript e Tailwind CSS 4, com a mesma marca do painel (`ambao-web`).

## Rodar

```bash
npm install
npm run dev         # http://localhost:3000
npm run build       # gera out/
npm run preview     # serve o out/
```

## Conferir

```bash
npm run typecheck
npm run lint
npm test
```

## Antes de publicar

1. **Contato**: copie `.env.example` para `.env` e preencha `WHATSAPP_NUMBER` (com DDD; o 55 e a máscara são opcionais), `EMAIL_USER`, `PROFILE_LINKEDIN` e `PROFILE_GITHUB` (endereços completos dos perfis). O `.env` fica fora do git; na Vercel, as mesmas variáveis vão em *Settings → Environment Variables*. Um canal vazio esconde o botão dele no site publicado; sem WhatsApp e sem e-mail, o formulário de conversa também some. Canal mal preenchido derruba o build com a mensagem de onde corrigir. Em desenvolvimento, o terminal avisa o que falta.
2. **Endereço do site**: ajuste `SITE_URL` em `.env` para o domínio final, sem barra no fim. A prévia do link no LinkedIn usa esse endereço para achar `og.png`.
3. **Prints**: os de `public/telas/` vêm da paróquia de demonstração. Para refazer depois de uma mudança no painel, siga [ferramentas/demo/README.md](ferramentas/demo/README.md).

Use sempre uma paróquia de demonstração nas capturas. Nada de nome, foto, telefone ou dízimo de pessoa real.

## Publicar na Vercel

1. Suba este repositório para o GitHub.
2. Na Vercel, importe o repositório. O preset **Next.js** é detectado sozinho e publica o `out/` gerado pelo `output: 'export'`.
3. Em *Settings → Environment Variables*, cadastre as chaves de `.env.example` com os valores do seu `.env`. Sem elas, o site publicado sai sem os botões de contato.

O plano gratuito da Vercel (Hobby) é para uso não comercial. Se o site passar a vender o Ambão, migre para o plano Pro ou para outro serviço estático que permita uso comercial, como o Cloudflare Pages. O site não depende da Vercel: qualquer hospedagem de arquivos estáticos serve o `out/`.

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
