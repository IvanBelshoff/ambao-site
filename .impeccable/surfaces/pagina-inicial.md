---
version: 1
slug: "pagina-inicial"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/globals.css","src/app/layout.tsx","src/features","src/components"]
---

Escopo: landing pública do Ambão (`src/app/page.tsx`, que compõe as seções de `src/features`), modo Persuade. Dois públicos de peso igual: quem decide numa paróquia (padre, secretária, coordenador) e quem avalia o autor (recrutador, pessoa de tecnologia). Ação: conversar no WhatsApp; e-mail e LinkedIn como alternativas, e o formulário de conversa que monta a mensagem. Prova: as telas do painel recriadas com dados fictícios, rotuladas como tal, mais uma galeria de prints. Restrições: sem clientes, preços, depoimentos nem aplicativo; não usar dados reais.

Migração: a página nasceu em HTML e JavaScript puros (`../ambao-site-vanilla`) e foi reescrita em Next.js com o mesmo visual. A comparação de pixels por seção, no computador e no celular, ficou abaixo de 0,1% de diferença em todas as seções, exceto o fechamento, que ganhou o formulário.

## Direction contract

THESIS: A página é a entrada do Ambão. Abre no céu da tela de login com o painel vivo flutuando nele, e conta o resto como um folheto dominical: cada seção nomeia uma dor da paróquia e responde com o R. Recusa o hero dividido de SaaS com selo de logos e a fileira de três cards iguais.

OWN-WORLD: Céu em vídeo (ceu_mar) em tela cheia, texto branco com a sombra da entrada; placa branca de canto 4px com a sombra do login; depois, papel branco, faixas de rosa claro #f8e7ec, azul marinho #1243a0 como única voz de ação, rubrica da hora em caixa alta 11px tracking .16em em rosa forte #b0566f, corrida no início da leitura (nunca rótulo sobre o título), R. em azul semibold sobre a faixa rosa, Inter só, ícone de traço 1.75, a cruz como único ornamento.

STORY: Em segundos a pessoa entende que o Ambão organiza escalas, dízimo, caixa e avisos de cada igreja com a paróquia acompanhando. Desce pelos momentos (Escalas, Música, Calendário, Leitura do dia, Dízimo e caixa, Avisos, Acervo, Quem faz o quê), vê cada tela trabalhando, e termina no contato, fechado pelo Ide em paz. A pessoa de tecnologia acha Como foi feito e Quem fez.

FIRST VIEWPORT: Céu em tela cheia. Topo: cruz e AMBÃO à esquerda, âncoras à direita. Coluna esquerda (~45%): título de 4.25rem em quatro linhas (adaptação registrada: em três linhas não cabe ao lado da placa), subtítulo de 19px, Ver como funciona em contorno (o WhatsApp fica no botão da navegação, sem repetir na abertura), nota de dados fictícios. Direita (~46%): placa do painel no Início da Igreja São José Operário, lateral clicável que troca a tela (Início, Participações, Dízimo, Publicações, Calendário). O título das Escalas espia na borda inferior a partir de 800px de altura.

FORM: Céu, painel e folheto, fusão escolhida pelo usuário das estruturas 7 (painel navegável) e 4 (folheto) da lista ordenada; seed 8b5e9e34. Interação assinatura: a lateral da placa troca a tela com transição curta; nas seções, o R. entra quando a dor termina de ser lida.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
