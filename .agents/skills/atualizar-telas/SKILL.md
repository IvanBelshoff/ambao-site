---
name: atualizar-telas
description: Atualiza o site do Ambão quando o painel muda, refazendo as telas recriadas e os prints da paróquia de demonstração. Use quando uma tela do ambao-web mudar de texto, campo, layout ou número, ou quando os prints de public/telas estiverem velhos.
---

# Atualizar telas

O site mostra o painel de duas formas: telas recriadas em React (placa e vitrines) e prints reais (seção "O painel de perto").

## Telas recriadas

1. Ache a tela do painel em `../ambao-web/src/features/<dominio>` e compare com a recriada:
   - Placa: `src/features/abertura/telas/`.
   - Vitrines: `src/features/<seção>/`.
   - Card do feed: `src/components/painel/card-do-feed.tsx`.
2. Copie a mudança de texto, ordem e estado. Mantenha os dados fictícios.
3. Se um número mudou, mude em `src/dados/financeiro-demo.ts` e rode `npm test`: o teste prova que dízimo, caixa e saldo continuam batendo.
4. Token de cor ou medida mudou em `../ambao-web/src/index.css`: copie para `src/app/globals.css`.

## Prints

Siga `ferramentas/demo/README.md`: suba a API e o painel de demonstração, `npm run demo:semear` e `npm run capturas`. Depois registre a procedência de cada arquivo novo com o `embed-prompt` do impeccable, como o README mostra.

Nunca use paróquia real nas capturas. Nada de nome, foto, telefone ou dízimo de pessoa real.

## Conferir

`npm run build`, abra `out/` com `npm run preview` e veja a seção no computador e no celular.
