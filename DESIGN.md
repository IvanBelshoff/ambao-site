---
name: Ambão (site)
description: A entrada do Ambão. O céu do login abre e fecha a página; no meio, um folheto dominical em papel branco e rosa claro.
colors:
  azul-marinho: "#1243a0"
  azul-marinho-hover: "#0e3680"
  azul-lavado: "#eef3fb"
  rosa-claro: "#f8e7ec"
  rosa-traco: "#d4899e"
  rosa-forte: "#b0566f"
  noite: "#082040"
  branco: "#ffffff"
  tinta: "#111111"
  tinta-suave: "#585858"
  fio-campo: "#8f8f8f"
  fio: "#e5e5e5"
  superficie: "#fafafa"
  perigo: "#b3261e"
  sucesso: "#1b6b3a"
  aviso: "#8a5a00"
typography:
  display-ceu:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "4.25rem"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  titulo-momento:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.75rem"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  titulo-secao:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  titulo-fechamento:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  titulo-fechamento-celular:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  titulo-placa:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  titulo-folha:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  leitura:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.7
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  nav:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
  rubrica:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    letterSpacing: "0.16em"
rounded:
  field: "4px"
  feed: "12px"
  pill: "9999px"
spacing:
  momento: "112px"
  momento-celular: "80px"
  vitrine: "28px"
  folha: "20px"
components:
  button-ceu-primario:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.azul-marinho}"
    rounded: "{rounded.field}"
    padding: "0 20px"
    height: "48px"
  button-ceu-primario-hover:
    backgroundColor: "{colors.rosa-claro}"
    textColor: "{colors.azul-marinho}"
    rounded: "{rounded.field}"
    padding: "0 20px"
    height: "48px"
  button-ceu-contorno:
    textColor: "{colors.branco}"
    rounded: "{rounded.field}"
    padding: "0 20px"
    height: "48px"
  button-primary:
    backgroundColor: "{colors.azul-marinho}"
    textColor: "{colors.branco}"
    rounded: "{rounded.field}"
    padding: "0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.azul-marinho-hover}"
    textColor: "{colors.branco}"
    rounded: "{rounded.field}"
    padding: "0 20px"
    height: "44px"
  button-contorno:
    textColor: "{colors.tinta}"
    rounded: "{rounded.field}"
    padding: "0 16px"
    height: "44px"
  button-contorno-hover:
    backgroundColor: "{colors.rosa-claro}"
    textColor: "{colors.azul-marinho}"
    rounded: "{rounded.field}"
    padding: "0 16px"
    height: "44px"
  aba:
    textColor: "{colors.tinta-suave}"
    typography: "{typography.nav}"
    rounded: "{rounded.field}"
    padding: "0 10px"
    height: "40px"
  aba-selecionada:
    backgroundColor: "{colors.rosa-claro}"
    textColor: "{colors.azul-marinho}"
    typography: "{typography.nav}"
    rounded: "{rounded.field}"
    padding: "0 10px"
    height: "40px"
  placa:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.field}"
    height: "34rem"
  resposta:
    backgroundColor: "{colors.rosa-claro}"
    textColor: "{colors.tinta}"
    typography: "{typography.leitura}"
    rounded: "{rounded.field}"
    padding: "16px 20px"
  vitrine:
    backgroundColor: "{colors.rosa-claro}"
    rounded: "{rounded.field}"
    padding: "{spacing.vitrine}"
  folha:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.field}"
    padding: "{spacing.folha}"
  barra:
    backgroundColor: "{colors.branco}"
    height: "60px"
---

# Design System: Ambão (site)

## Overview

**Creative North Star: "A entrada e o folheto"**

O site é a porta do Ambão. Abre no mesmo céu da tela de login do painel, com o painel vivo flutuando nele numa placa branca, e depois vira um folheto dominical: papel branco, faixas de rosa claro, azul marinho como única voz de ação. Fecha de novo no céu, com o "Ide em paz". O céu é o rito de entrada e o rito final; o miolo é leitura calma.

Este sistema é uma extensão do mundo do painel. A base comum (paleta, Inter, o canto de 4px, ícone de traço 1.75, a cruz como único ornamento, a regra do papel sobre o rosa, os selos, o disco de iniciais, o card do feed) está em `ambao-web/DESIGN.md` e vale aqui sem repetição. Este arquivo registra só o que o site acrescenta: o céu com o véu, a placa com lateral que troca a tela, o momento do folheto, a vitrine com a folha, a navegação que vira placa, o formulário de conversa, a lista de recursos sem ícone e a ficha técnica.

O site pode o que o painel recusa nas telas de operação: o céu em vídeo, o véu em gradiente e a sombra da placa. Os três pertencem à entrada e só aparecem sobre a noite do céu. Do primeiro momento em diante, a profundidade volta a ser tonal.

**Key Characteristics:**

- Céu do login como abertura e fechamento, sob um véu de noite
- A placa do painel, branca, com a sombra da entrada e a lateral que funciona
- O momento do folheto: a hora em rubrica corrida, a dor como pergunta, o R. na faixa rosa
- A tela recriada sobre a vitrine rosa, em folha branca
- Azul marinho só na ação; rosa claro no calor, no hover e na faixa
- Uma face só, Inter, e a cruz como único ornamento

## Colors

A paleta é a do painel, com uma cor nova: a noite do céu.

### Primary

- **Azul marinho** (`{colors.azul-marinho}`): o botão da navegação rolada, o "R." da resposta, o rótulo da ficha técnica, o dia lido na semana de leitura, a marca fora do céu. Sobre o céu, a ação inverte: botão branco com texto azul marinho.
- **Azul marinho profundo** (`{colors.azul-marinho-hover}`): o botão azul com o ponteiro em cima.
- **Azul lavado** (`{colors.azul-lavado}`): selo "Publicada", disco de iniciais nas telas recriadas, saldo do mês e fundo do `code` na seção técnica.

### Secondary

- **Rosa claro** (`{colors.rosa-claro}`): a faixa da resposta, a vitrine, o cabeçalho das tabelas, a aba selecionada e o hover de toda navegação e botão de contorno fora do céu. Também é a cor da seleção de texto no papel.
- **Rosa forte** (`{colors.rosa-forte}`): a rubrica da hora no início da leitura (4,8:1 sobre branco). Dentro das telas recriadas, faz o que faz no painel: o ponto da celebração no calendário e o tracejado da escala em rascunho.
- **Rosa de traço** (`{colors.rosa-traco}`): polegar da barra de rolagem, o traço da âncora da seção que está sendo lida, segmento "sem resposta" da barra de prontidão e contorno do selo "Sem resposta". Nunca carrega texto.

### Tertiary

- **Noite** (`{colors.noite}`): o fundo do céu antes do vídeo carregar e a cor do véu. O véu é a noite em gradiente: a 74% na borda do texto, caindo a 10% do lado da placa no desktop; no celular, vertical, de 74% a 40%.

### Neutral

- **Branco** (`{colors.branco}`): página, placa, folha, formulário e navegação rolada. Sobre o céu, é o texto e o botão.
- **Tinta** (`{colors.tinta}`): texto principal no papel.
- **Tinta suave** (`{colors.tinta-suave}`): texto de apoio, aba em repouso, a descrição do recurso e o item de navegação em repouso.
- **Fio de campo** (`{colors.fio-campo}`): contorno do botão de contorno no papel.
- **Fio** (`{colors.fio}`): o traço entre momentos, a régua da lista de recursos e da ficha, o contorno da navegação rolada e a borda da placa por dentro.
- **Superfície** (`{colors.superficie}`): a pílula "Dados fictícios" na placa e o fundo da seção de capturas.
- **Perigo, Sucesso, Aviso**: os mesmos estados do painel, só dentro das telas recriadas.

### Named Rules

**The One Voice Rule.** Herdada do painel. Azul marinho é a única cor de ação. No céu, a ação é o branco com texto azul marinho; no papel, é o azul cheio. Nunca os dois botões cheios lado a lado.

**The Night Veil Rule.** Texto branco sobre o céu só existe sobre o véu de noite e com a sombra curta da entrada (`0 1px 1px rgb(5 24 64 / 0.28)`). O véu é o único gradiente do site e não sai do céu.

## Typography

**Display Font:** Inter (com ui-sans-serif, system-ui, sans-serif)
**Body Font:** Inter (com ui-sans-serif, system-ui, sans-serif)
**Label/Mono Font:** Inter para rótulo; ui-monospace só no `code` da seção técnica.

**Character:** A mesma face do painel, aberta em escala de página. O título do céu é grande, médio e apertado; a pergunta de cada momento é um título de leitura, não de anúncio. A rubrica é pequena, larga e em caixa alta, e corre dentro da frase.

### Hierarchy

- **Display do céu** (500, 2.625rem no celular, 3.5rem a partir de 640px, 4.25rem a partir de 1280px, line-height 1.04, tracking -0.035em): o título da abertura, em quatro linhas ao lado da placa. Só existe no céu.
- **Título do momento** (500, 2rem, 2.5rem a partir de 640px, 2.75rem a partir de 1280px, line-height 1.1, tracking -0.03em, medida de 18ch, balanceado): a dor da paróquia, sempre em forma de pergunta.
- **Título de seção** (500, 2rem, 2.5rem a partir de 640px, line-height 1.12, tracking -0.03em): seções fora do folheto (o resto da vida da comunidade, Como foi feito).
- **Título do fechamento** (500, 2.25rem, 3rem a partir de 640px, line-height 1.08, tracking -0.03em, medida de 18ch): a pergunta final sobre o céu.
- **Título da placa** (500, 1.625rem, line-height 1.25, tracking -0.025em): o título de cada tela recriada na placa do céu, como no cabeçalho de página do painel.
- **Título de folha** (500, 1.25rem, line-height 1.25, tracking -0.025em): o título dentro do papel, como a escala da celebração, a parte do sistema na área de devs e o formulário de conversa.
- **Leitura** (400, 1.125rem, line-height 1.7, medida de 34rem): o texto da dor e da resposta; a resposta aperta a entrelinha para 1.55 e sobe a 500. Subtítulo do céu em 1.1875rem, entrelinha 1.6.
- **Body** (400, 15px, line-height 1.6): descrição de recurso, ficha, decisão técnica, lista do que vem junto.
- **Nav** (500, 14px): âncoras do topo, da barra e aba da placa.
- **Label** (400, 13px): legenda da vitrine (tinta a 70%), nota de dados fictícios, rodapé.
- **Rubrica** (600, 0.6875rem, tracking 0.16em, caixa alta, rosa forte): o momento em palavras, sem hora de relógio ("Sábado à noite.", "Depois da missa."), corrido no início do parágrafo da dor. Hora de relógio na rubrica disputa com a hora que o título às vezes já tem. A mesma medida, em azul marinho ou branco, escreve AMBÃO ao lado da cruz.

### Named Rules

**The Run-In Rubric Rule.** A rubrica corre na primeira linha da leitura, como a rubrica do missal. Ela nunca sobe para cima do título como rótulo de seção; o título do momento abre sozinho.

**The Question Heading Rule.** Todo momento do folheto abre com a dor como pergunta, no título do momento. A resposta não é título: é a faixa do R.

**The Kind Voice Rule.** A dor descreve a situação, nunca a pessoa: quem lê é a secretaria, o coordenador e o leigo do dízimo. Sem "alguém esqueceu", "vira o gargalo" ou "faz do seu jeito". A resposta abre com "No Ambão," logo depois do R., para o leigo saber quem resolve.

## Layout

A página tem uma coluna só, centrada em 90% da largura com teto de 78rem; topo, barra, momentos e rodapé dividem a mesma medida. O céu ocupa a largura toda e põe a grade por dentro: abaixo de 1024px, texto e placa empilham; a partir de 1024px, 5 partes de texto para 6 de placa, com 3.5rem entre elas e a placa a 34rem de altura.

O momento tem 80px de respiro vertical no celular e 112px a partir de 1024px; momentos seguidos são separados por um fio de 1px. A grade do momento é uma coluna no celular e, a partir de 1024px, texto e vitrine em 1 para 1.05, com 4rem de vão (6rem a partir de 1280px). No desktop o texto do momento fica fixo a 7rem do topo enquanto a vitrine passa. O primeiro momento sobe o topo (56px no celular, 48px no desktop) para que o título das Escalas espie na borda do céu.

A lista de recursos vai a duas colunas a partir de 640px, com 3rem de vão. A ficha técnica e as decisões dividem a largura a partir de 1024px. A tabela "Quem faz o quê" vira lista abaixo de 640px: o papel em cima, o alcance embaixo.

A rolagem por âncora deixa 5rem de folga no topo para a navegação. A barra de rolagem é a do painel: fina, com polegar rosa de traço.

### Named Rules

**The Shared Measure Rule.** Tudo fora do céu cabe em 90% com teto de 78rem. Medida estreita (34rem de leitura, 18ch de título) aperta o texto por dentro, nunca a seção.

## Elevation & Depth

O papel é plano e tonal, como no painel: branco, fio, faixa de rosa claro, e dentro da faixa a folha volta ao branco. No conteúdo, a única sombra é a da placa sobre o céu (a do painel e a do formulário de conversa), com um anel branco a 35% que a separa das nuvens. Os dois elementos que flutuam sobre a página inteira, a navegação rolada e o voltar ao topo, levam uma sombra curta para se descolar do que passa embaixo.

### Shadow Vocabulary

- **Placa da entrada** (`box-shadow: 0 24px 60px -20px rgb(9 38 94 / 0.45)`): só papel sobre o céu, a placa do painel e o formulário do fechamento. É o mesmo token da placa de login do painel.
- **Flutuante** (`0 12px 32px -16px rgb(9 38 94 / 0.35)` na navegação, `0 12px 28px -12px rgb(9 38 94 / 0.55)` no voltar ao topo): só o que fica fixo na tela.
- **Texto no céu** (`text-shadow: 0 1px 1px rgb(5 24 64 / 0.28)`): todo texto branco sobre o céu; os botões do céu tiram a sombra.

### Named Rules

**The Sky Only Rule.** Vídeo, véu e a sombra da placa moram no céu. Do primeiro momento em diante, profundidade é lavagem de rosa claro ou azul lavado; só o que flutua fixo na tela (navegação rolada e voltar ao topo) leva a sombra curta.

## Shapes

O canto é o do campo, 4px, em botão, aba, placa, faixa da resposta, vitrine, folha e cabeçalho de tabela. Pílula fica no selo, no disco de iniciais, no dia da semana de leitura e na nota "Dados fictícios". O card do feed recriado mantém os 12px do painel. A régua é o fio de 1px: entre momentos, no topo de cada recurso e entre as linhas da ficha. A árvore da paróquia desenha ramos com o mesmo fio. A cruz é a única forma desenhada.

### Named Rules

**The Paper on Pink Rule.** Herdada do painel. A vitrine é rosa claro e a tela recriada é folha branca sobre ela. Selo e recado sobre o rosa viram papel.

## Components

### Buttons

- **Shape:** canto de campo (4px).
- **No céu, primário:** fundo branco, texto azul marinho, 48px de altura, 20px de lado, 15px médio, ícone de conversa à esquerda. Hover vai a rosa claro.
- **No céu, contorno:** texto branco, anel interno branco a 60%, mesma medida. Hover lava branco a 12%.
- **No papel, primário:** azul marinho cheio, texto branco, 44px. Hover em azul marinho profundo. É o "Conversar" da navegação rolada.
- **No papel, contorno:** texto tinta, anel interno em fio de campo, 44px, 16px de lado. Hover rosa claro com texto azul marinho.
- **Focus:** contorno de 2px azul marinho com 2px de folga; no céu, o contorno é branco.

### Navigation

- **No céu:** 80px de altura, na medida da página. Cruz e AMBÃO à esquerda; no meio, uma âncora por momento, na ordem da página e com rótulo de uma palavra (Escalas, Música, Calendário, Leitura, Dízimo, Avisos, Acervo, Paróquia, Telas) e o ícone de traço de 16px do módulo à esquerda, em 14px médio e 8px de respiro, branco a 90%, hover lava branco a 12%; à direita, "Conversar no WhatsApp" em botão branco com o logo do WhatsApp. Abaixo de 1024px, só a marca e o botão. De 1024 a 1279px, as âncoras ficam sem ícone; até 1399px, o botão diz só "Conversar".
- **Ao rolar (24px):** a mesma navegação encolhe para 60px, desce 12px do topo e vira uma placa branca sólida, canto de 12px, fio em volta e a sombra curta da navegação (520ms, curva de saída). Âncoras em tinta suave com hover rosa claro e texto azul marinho; a âncora da seção que está sendo lida ganha só um traço de 2px em rosa de traço embaixo da palavra, centrado e com 70% da largura do rótulo, sem mudar texto nem fundo (`aria-current="location"`), trocando quando a seção cruza uma faixa a 35% do topo da tela. Sobre o céu e entre seções sem âncora, nenhuma fica acesa. O botão vira azul cheio.
- **Voltar ao topo:** disco azul marinho de 48px no canto, com a sombra curta. Aparece depois de 90% da altura da tela e fica fora do Tab enquanto escondido.

### Placa do painel

A tela de Início do painel recriada com dados fictícios, numa placa branca de canto de campo, com a sombra da entrada. No desktop, uma lateral de 10.5rem com a marca, cinco abas que trocam a tela (Início, Participações, Dízimos, Publicações e Calendário) e, abaixo de um fio, os outros módulos em 13px tinta suave a 80% (só leitura). No celular a lateral vira uma fileira de abas que rola de lado. A aba repousa em tinta suave e seleciona em rosa claro com texto azul marinho. A tela nova chega em 280ms, com 6px de subida e 2px de desfoque, sem esconder antes a anterior. A nota "Dados fictícios" fica no canto da tela, em pílula de superfície.

### Momento do folheto

A seção que conta uma dor e responde. Ordem fixa: título do momento (a pergunta), parágrafo de leitura que abre com a rubrica da hora, a faixa do R., e às vezes a lista do que vem junto. Ao lado, a vitrine.

- **Faixa do R.:** rosa claro, canto de campo, 16px por 20px, leitura em 500 com entrelinha 1.55. O "R." vem em azul marinho semibold. Quando a faixa entra na vista, ela se escreve da esquerda para a direita em 900ms e o R. aparece logo depois. Com movimento reduzido, a faixa já está escrita.
- **O que vem junto:** lista de 15px em tinta suave, cada item com um visto de traço em azul marinho de 16px.

### Vitrine e folha

A vitrine é a faixa de rosa claro que segura a tela recriada (16px no celular, 24px a partir de 640px, 28px a partir de 1024px). A folha é o papel branco dentro dela, 20px de respiro. Uma vitrine pode ter mais de uma folha, com 16px entre elas, ou o card do feed do painel. A legenda vem embaixo, em 13px tinta a 70%, e termina dizendo que os dados são fictícios. A vitrine estreita vai a 24rem para telas pequenas, como a semana de leitura.

### Visor das telas

Os prints de "O painel de perto" abrem em tela cheia na própria página, com `yet-another-react-lightbox`, a mesma biblioteca da galeria do painel. Fundo na noite do céu, sólido. O print fica entre a barra de cima (o nome da tela à esquerda; aproximar, afastar e fechar à direita) e a legenda embaixo, que termina em "Dados fictícios.", sem passar por baixo de nenhuma das duas. Setas e Esc no teclado, toque para passar, zoom para ler o detalhe. O visor segue o aparelho escolhido e só é baixado quando alguém abre um print; sem JavaScript, o link abre o arquivo. Ao fechar, o foco volta ao print. Com movimento reduzido, sem animação.

### Lista de recursos

Definições sem ícone e sem card: cada recurso abre num fio de 1px, nome em 17px médio, descrição em 15px tinta suave, entrelinha 1.6. Duas colunas a partir de 640px.

### Diagrama da arquitetura

Na área de devs, as partes do sistema ligadas com React Flow (`@xyflow/react`, a mesma biblioteca do mapa de acesso do painel), sem fundo, grade nem pontilhado: o diagrama mora direto no papel. Cada parte é uma caixa de papel com fio de 1px e canto de campo, rótulo em 15px médio azul marinho com o ícone de traço e o detalhe em 13px tinta suave; a API, no centro, em azul lavado com fio azul a 30%; o aplicativo, em desenvolvimento, com fio de campo tracejado. As ligações seguem o mapa de acesso do painel: curvas, tracejadas (6 por 5) em azul marinho de 1.6px, com seta fechada e o traço andando da origem ao destino (0.9s, linear). A do aplicativo, em desenvolvimento, é um tracejado curto em fio de campo, parado. Cada ligação sai de um ponto na borda da caixa: um disco de papel de 8px com contorno de 1.5px, azul marinho no caminho que existe e fio de campo no do aplicativo. A chegada não tem ponto, só a seta. A API recebe cada cliente num lugar, a 35% e 65% do lado, para as setas não se cobrirem. Com movimento reduzido, o traço continua andando, mais devagar (2.6s): é a exceção registrada do site, porque é fino, não desloca nada na tela e é ele que conta que as partes conversam. Em linha a partir de 640px; abaixo, em coluna, com os dois clientes lado a lado no topo. Só lê: sem arrastar, sem zoom, e a rolagem da página passa por cima. O React Flow só é baixado quando a área de devs abre, e uma lista escondida descreve as ligações para leitor de tela.

### Ficha técnica

Lista de definição régua por régua: rótulo em 15px médio azul marinho numa coluna de 6rem, valor em 15px tinta, fio em cima e embaixo de cada linha. Ao lado, as decisões: título em 18px médio, texto em 15px tinta suave numa medida de 38rem. O `code` é azul marinho sobre azul lavado, canto de 3px.

### Fechamento no céu

O mesmo céu sob o mesmo véu; o vídeo só carrega quando o fechamento chega à tela. O formulário é a ação: a partir de 1024px, duas colunas na proporção da abertura (5 para 6), a pergunta em título do fechamento e a frase de apoio à esquerda, o formulário de conversa à direita. Sem a fileira de botões do céu: embaixo da frase, duas linhas de 15px em branco a 88% levam o resto, cada uma com o link sublinhado em branco a 50% (inteiro no hover): "Prefere sem formulário? Chame direto no WhatsApp." e "Quer conhecer quem fez o Ambão? Ivan Belshoff no LinkedIn." Sem WhatsApp nem e-mail preenchidos, o formulário some e a grade vira uma coluna. Embaixo, na largura toda, separado por um fio branco a 25%, "Ide em paz, e o Senhor vos acompanhe."

### Formulário de conversa

Papel sobre o céu, como a placa: branco, canto de campo, a sombra da entrada e o anel branco a 35%, 20px de respiro no celular e 28px a partir de 640px.

- **Cabeçalho:** "Conte um pouco da sua paróquia" em título de folha e, embaixo, a nota em tinta suave: nome e paróquia bastam, a mensagem abre pronta e nada fica guardado no site.
- **Campos:** os do painel, campo de 44px com fio de campo, foco só na borda azul marinho com o halo a 20% (o contorno global não entra em campo de texto), erro em perigo embaixo. Rótulo, apoio e erro em 14px no celular e 13px a partir de 640px, para quem lê sem óculos de perto. Nome e paróquia lado a lado a partir de 640px e obrigatórios; cidade e "Como a paróquia se organiza hoje?" na largura toda, marcados como opcionais. Na área de texto a ajuda fica entre o rótulo e a caixa, onde o teclado não cobre, e um contador discreto ("51 de 1.000") aparece no pé quando há texto.
- **Ações:** "Abrir no WhatsApp" e "Abrir no e-mail", o mesmo verbo nos dois. A de envio do formulário é sempre o azul cheio; a outra, contorno (One Voice Rule). Abaixo de 640px os botões ocupam a largura. Embaixo, "Você revisa o texto e envia de lá."
- **Depois de abrir:** o site não sabe se o aplicativo abriu, então diz o que falta, em 15px médio tinta, acima de um fio: "Falta só tocar em Enviar no WhatsApp." com o link de novo; no e-mail, o endereço escrito e "Copiar mensagem" em contorno, que vira "Mensagem copiada" com o visto. No toque, o WhatsApp abre na mesma aba.
- **A mensagem:** escrita como a pessoa falaria, "Olá! Sou Lúcia, da Paróquia São Bento, em Vitória. Vi o site do Ambão e queria conversar…", com o que ela contou num parágrafo à parte.

O voltar ao topo sai da frente enquanto o foco está num campo de formulário.

## Do's and Don'ts

### Do:

- **Do** abrir e fechar a página no céu do login, sempre sob o véu de noite e com a sombra curta no texto branco.
- **Do** contar cada assunto como um momento: a pergunta no título, a hora em rubrica corrida de rosa forte, a resposta na faixa rosa com o R. em azul marinho.
- **Do** mostrar o produto como tela recriada em folha branca sobre a vitrine rosa, com legenda que diz que os dados são fictícios.
- **Do** inverter a ação no céu: botão branco com texto azul marinho, e contorno branco a 60% para a alternativa.
- **Do** separar recursos e fichas por régua de 1px, sem ícone nem card.
- **Do** deixar o movimento curto e de saída (`cubic-bezier(0.16, 1, 0.3, 1)`) e desligá-lo com movimento reduzido.

### Don't:

- **Don't** levar o vídeo, o véu ou a sombra da placa para fora do céu.
- **Don't** pôr a rubrica ou qualquer rótulo em caixa alta acima de um título.
- **Don't** usar fileira de cards iguais com ícone para listar recursos. A lista é régua e texto.
- **Don't** pôr rosa sobre rosa: na vitrine, a tela é folha branca.
- **Don't** introduzir uma segunda face, uma segunda cor de ação ou um ornamento além da cruz.
- **Don't** mostrar dado real nas telas recriadas.
