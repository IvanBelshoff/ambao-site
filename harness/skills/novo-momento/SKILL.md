---
name: novo-momento
description: Acrescenta um momento ao folheto do site do Ambão (a dor como pergunta, a hora em rubrica, o R. e a tela recriada na vitrine). Use quando o pedido for contar mais um recurso, uma dor da paróquia ou uma seção nova no meio da página.
---

# Novo momento

Leia `PRODUCT.md`, `DESIGN.md` (Momento do folheto, Vitrine e folha) e `harness/estrutura.md`.

## Antes de escrever

1. Confirme que o recurso existe no painel: `../harness/produto.md`, `../harness/clientes.md` e `../ambao-backend/harness/domain/`. O que não existe fica fora.
2. Escreva a dor como pergunta, na voz da paróquia, sem termo técnico. A rubrica é o momento em palavras, sem hora de relógio ("Sábado à noite.", "Depois da missa."). O parágrafo descreve a situação, nunca culpa uma pessoa ou um cargo: quem lê é justamente a secretaria, o coordenador e o leigo do dízimo.
3. A resposta abre com "No Ambão," e diz o que o sistema faz, em uma ou duas frases. Sem adjetivo de venda e sem palavra que soe como limite ("um de cada vez", "só lê").

## Passos

1. Crie `src/features/<dominio>/<dominio>.tsx` exportando um componente que renderiza `Momento` com `id`, `titulo`, `rubrica`, `leitura`, `resposta`, `junto` (opcional) e `vitrine`.
2. A vitrine é `<Vitrine legenda="...">` com uma ou mais `<Folha>`. A legenda diz o que a tela mostra; "Dados fictícios." entra sozinho.
3. Recrie a tela do painel com os mesmos componentes de `components/ui` e `components/painel`. Papel branco sobre o rosa: nunca rosa sobre rosa.
4. Dado que aparece em outra seção vai para `src/dados`, com teste da conta. Dado só desta seção fica na pasta dela.
5. Inclua o componente em `src/app/page.tsx`, na ordem da história. Se a seção merece âncora, acrescente em `ancoras` de `features/navegacao/navegacao.tsx`.
6. Rode a skill `impeccable` com `critique` na seção nova, no computador e no celular.
7. `npm run typecheck`, `npm run lint`, `npm test` e `npm run build`.

## Não fazer

- Rubrica ou rótulo em caixa alta acima do título.
- Fileira de cards iguais com ícone. Lista é régua e texto.
- Sombra, gradiente ou vídeo fora do céu.
- Número que não bate com o resto da página.
