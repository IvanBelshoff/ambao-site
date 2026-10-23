# Estrutura

## Stack

| Peça | Escolha |
|---|---|
| Base | Next.js 16 (App Router) com `output: 'export'`, React 19, TypeScript |
| Estilo | Tailwind CSS 4 (`@tailwindcss/postcss`) e CSS Modules para o que tem estado |
| Formulário | React Hook Form com Zod (`@hookform/resolvers`) |
| Visor de imagem | `yet-another-react-lightbox`, a mesma versão do painel |
| Diagrama | `@xyflow/react` (React Flow), a mesma versão do painel, carregado só quando a área de devs abre |
| Testes | Vitest, Testing Library e jsdom |
| Qualidade | `tsc --noEmit` e oxlint |
| Fonte | Inter pelo `@fontsource/inter` (400, 500 e 600), sem chamar o Google |

`npm run build` gera `out/`, uma pasta de arquivos estáticos. Nada roda no servidor: sem rota de API, sem `headers()`, sem `cookies()`, sem imagem otimizada pelo Next. Imagem é `<img>` com `width` e `height`.

## Pastas

A pasta diz o domínio, como no painel (`../../harness/clientes.md`). Sem camadas de Feature-Sliced Design.

| Pasta | O que guarda |
|---|---|
| `src/app` | `layout.tsx` (metadados, fontes, pular para o conteúdo), `page.tsx` (só compõe as seções) e `globals.css` (tokens e base) |
| `src/features/<seção>` | Uma seção da página e o que é só dela: dados fictícios, peças, CSS Module e teste |
| `src/features/folheto` | O molde do momento: `Momento`, `Resposta`, `Vitrine` e `Folha` |
| `src/components/ui` | Controle repetido, sem paróquia nem escala: botão, campo, selo, disco, ícone, cruz, marca |
| `src/components/ceu` | O céu da entrada: imagem, vídeo que não salta no loop e o véu |
| `src/components/painel` | Peça do painel recriada que aparece em mais de uma seção, como o card do feed |
| `src/dados` | Dado fictício que mais de uma seção mostra e que precisa bater entre si |
| `src/config` | O que o autor preenche antes de publicar: os canais de contato |
| `src/lib` | Infra sem tela: abas pelo teclado, media query, reais |

Seções, na ordem da página: `navegacao`, `abertura` (céu e placa), `apresentacao` (o que é o Ambão), `escalas`, `musica`, `calendario`, `leitura`, `dizimo`, `avisos`, `acervo`, `certificados`, `paroquia`, `recursos`, `telas` (prints), `devs`, `contato` (fechamento e formulário) e `rodape`.

## Servidor e cliente

Componente é de servidor por padrão e vira HTML no build. `'use client'` só onde há estado ou efeito: navegação que encolhe, placa com abas, faixa do R., vídeo do céu, seletor de aparelho e visor dos prints, accordion de devs e formulário. Peça pesada que só serve depois de um clique (o visor) entra por `next/dynamic`, num arquivo à parte. Conteúdo estático entra no componente de cliente como `children` ou prop (`Placa` recebe as telas prontas), para não ir para o JavaScript.

Hook e função pura ficam em `lib` ou na feature, sem `'use client'`. Comportamento que mais de uma seção usa vira hook: `useAbas` (tabindex móvel, setas, Home e End) e `useMedia`.

## Estilo

- Utilitário do Tailwind no próprio componente. A classe repetida vira componente, não `@apply`.
- CSS Module (`<peça>.module.css`) só para o que o utilitário não diz bem: estado com várias transições (navegação, voltar ao topo), animação de entrada (tela da placa, faixa do R.), pseudo-elemento de navegador (`::details-content`) e a tabela que vira lista no celular. O módulo lê os tokens por `var(--color-*)`; o `@theme static` de `globals.css` emite todos.
- Token novo entra em `globals.css` e, se for da marca, também em `../ambao-web/src/index.css`.
- Medida fora do céu: `w-[90%] max-w-[78rem]` centrado. Medida estreita aperta o texto por dentro (34rem de leitura, 18ch de título), nunca a seção.
- Toda animação usa `--ease-saida` e desliga com `prefers-reduced-motion`.
- Dentro de papel sobre o céu (placa, formulário), use a classe `papel`: a seleção volta ao rosa e o foco ao azul.

## Dados fictícios

Toda tela recriada usa dados fictícios, e a legenda da `Vitrine` termina com "Dados fictícios." sozinha. Nome, valor ou data que aparece em mais de uma seção mora em `src/dados` e tem teste que prova a conta (dízimo do mês, caixa e saldo). Dado de uma seção só fica na pasta dela (`escalas/escala-demo.ts`, `musica/cantos-demo.ts`, `calendario/calendario-demo.ts`, também com teste). Foto nas telas recriadas sai de `ferramentas/demo/fotos` (domínio público ou CC0, sem rosto de pessoa), reduzida para `public/acervo/` com a procedência ao lado (`<arquivo>.webp.json`).

## Testes

`npm test` roda o Vitest. Teste fica ao lado do arquivo (`*.test.ts` ou `*.test.tsx`). Cubra regra e conta (prontidão da escala, links dos canais, mensagem do formulário, teclas das abas) e o comportamento de componente com Testing Library pelo papel acessível, não pela classe.

Antes de entregar: `npm run typecheck`, `npm run lint`, `npm test` e `npm run build`.
