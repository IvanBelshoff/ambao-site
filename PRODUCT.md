# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Quem chega a este site não usa o Ambão ainda.

1. Quem decide numa paróquia católica: padre, secretária paroquial, coordenador de pastoral ou de comunidade, o leigo que cuida do dízimo e das escalas. Conhece bem planilha, caderno, grupo de WhatsApp e o mural da igreja. Lê do celular, muitas vezes vindo de um post do LinkedIn ou de uma mensagem encaminhada.
2. Quem avalia o autor: recrutador, pessoa de tecnologia, colega de profissão. Quer ver um produto de verdade, as decisões por trás dele e a qualidade do acabamento.

## Product Purpose

Este é o site público do Ambão: apresenta o sistema, mostra as telas e leva a uma conversa. Tem dois objetivos de igual peso: oferecer o Ambão a outras paróquias e servir de portfólio do autor.

Sucesso é a pessoa da paróquia entender em segundos o que o Ambão organiza e chamar no WhatsApp ou no e-mail, e a pessoa de tecnologia sair sabendo como foi construído e quem fez.

## Positioning

Uma paróquia tem várias igrejas, e cada igreja tem a própria operação: caixa, dízimo, escalas das celebrações, cantina, galeria e avisos. O Ambão junta tudo num só lugar, respeitando quem faz o quê: a igreja lança e conduz o que é dela, e a paróquia acompanha lendo esses dados e conduz o que é de todas.

## Operating Context

Site estático (Next.js exportado para arquivos), em português, hospedado na Vercel. Não tem login nem servidor. O contato sai por WhatsApp, e-mail e LinkedIn; o formulário de conversa só monta a mensagem e abre o WhatsApp ou o e-mail da pessoa, sem guardar nada.

O sistema apresentado é o painel web (`ambao-web`) e a API (`ambao-backend`). O aplicativo (`ambao-mobile`, React Native com Expo) está em desenvolvimento. Só a área de devs fala dele, sem data nem recurso prometido.

## Capabilities and Constraints

O que a página pode afirmar, porque existe no painel:

- Uma paróquia, várias igrejas, no máximo uma matriz marcada pela paróquia.
- Papéis: administrador da paróquia, coordenador da igreja, padre (consulta e não administra), membro com permissões marcadas, membro só com ficha.
- Calendário de eventos da paróquia e de cada igreja.
- Escalação de celebrações: funções, várias pessoas na mesma função, rascunho e escala publicada, resposta de quem foi escalado, textos da liturgia do dia preenchidos pela consulta oficial (primeira leitura, salmo, segunda leitura, evangelho), preces, comentários e repertório.
- Leitura do dia: cada conta marca os dias em que leu, meta de 5 dias por semana, sequência de semanas.
- Caixa da paróquia e de cada igreja, separados: lançamentos com comprovante, categorias, fechamento de mês, pedido de remoção, relatório em Excel.
- Dízimo da igreja: recibo numerado, várias competências por recebimento, entrada automática na caixa, extrato da própria pessoa.
- Publicações: comunicado oficial da paróquia ou da igreja, visibilidade interna ou para toda a paróquia, reações, comentários, enquete, seguir paróquia ou igreja para receber aviso.
- Galeria com álbuns da paróquia, da igreja e de cada celebração.
- Rifas, treinamentos da paróquia, cantina (cardápio em fichas), música (repertórios e cantos).
- Tela inicial que muda com o perfil e mostra primeiro o que pede decisão.

O que a página não pode afirmar:

- Não está em uso em nenhuma paróquia ainda. Não há clientes, depoimentos, números de uso nem preços.
- O aplicativo de celular ainda não está nas lojas. Não há chat, stories nem página pública da paróquia.
- Não há pagamento online do dízimo: a forma é um rótulo manual.

Telas mostradas na página usam dados fictícios e dizem isso.

## Brand Commitments

- Nome: Ambão.
- Cores vinculantes: azul marinho, rosa claro e branco, as mesmas do painel.
- A cruz é o único ornamento da marca.
- O céu da tela de entrada do painel pertence à entrada; o site é a entrada pública.

## Evidence on Hand

- Marca e componentes: `ambao-web/DESIGN.md`, `ambao-web/src/index.css`, `ambao-web/src/components/ui/cross.tsx`.
- Céu: `ambao-web/media/ceu_mar.mp4`, `ambao-web/public/ceu.jpg`.
- Regras do produto: `harness/produto.md`, `ambao-backend/harness/domain/`.
- Autor: Ivan Belshoff. Contato por WhatsApp, e-mail e LinkedIn, configurados no `.env` (`src/config/contato.ts` lê e valida).

## Product Principles

1. Mostrar o sistema trabalhando, não descrevê-lo com adjetivos.
2. Falar a língua da paróquia: escala, dízimo, caixa, matriz, comunidade. Termo técnico só na seção do portfólio.
3. Não inventar prova. O que não existe ainda fica fora da página.
4. O mesmo cuidado do painel: calmo, claro, sem pressa nem grito.
