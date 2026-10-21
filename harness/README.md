# Harness do site

Fonte única das convenções e dos procedimentos do `ambao-site`. Cursor, Codex, Copilot e Gemini CLI leem `AGENTS.md` e as skills em `.agents/skills/`. O texto mora aqui.

## Ordem de leitura

1. Este índice.
2. `estrutura.md` para onde cada coisa fica e como se estiliza.
3. `../PRODUCT.md` para o que a página pode afirmar.
4. `../DESIGN.md` para o sistema visual. A base comum está em `../../ambao-web/DESIGN.md`.
5. A skill do procedimento.

## Mapa

| Arquivo | Uso |
|---|---|
| `estrutura.md` | Stack, pastas, servidor e cliente, estilo, dados fictícios e testes |
| `../PRODUCT.md` | Público, propósito, o que existe e o que não pode ser dito |
| `../DESIGN.md` | Céu, folheto, vitrine, placa, botões e regras nomeadas |
| `../.impeccable/surfaces/pagina-inicial.md` | Contrato de direção da página (tese, mundo, história, primeira dobra) |
| `../ferramentas/demo/README.md` | Paróquia de demonstração e os prints do painel |
| `../divulgacao/linkedin.md` | Rascunho do post de lançamento |

## Skills

| Skill | Quando |
|---|---|
| `novo-momento` | Contar mais uma dor da paróquia no folheto |
| `atualizar-telas` | O painel mudou e a página precisa acompanhar |
| `impeccable` | Qualquer trabalho visual: critique, audit, polish, layout, animate e o resto |

## Skill nova

1. Crie `harness/skills/<nome>/SKILL.md`.
2. `name` no frontmatter é igual ao nome da pasta, em minúsculas e hífens.
3. `description` diz o que a skill faz e em que pedido ela deve ser usada.
4. Crie a junção `.agents/skills/<nome>` apontando para `harness/skills/<nome>` (`New-Item -ItemType Junction`).
5. Não copie o `SKILL.md` para outro diretório.

O `impeccable` não segue essa regra: é instalado por agente (`.claude`, `.agents`, `.cursor`, `.gemini`, `.codex`), na mesma versão do `ambao-web`. Para atualizar, rode `.claude/skills/impeccable/scripts/impeccable.cmd update` na raiz do site.
