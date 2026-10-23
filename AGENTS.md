# ambao-site

Site público do Ambão: Next.js com exportação estática. Não chama a API, não tem login e não guarda dado de ninguém.

O mapa dos repositórios está em `../harness/README.md`.

## Antes de implementar

1. Leia `harness/README.md`.
2. Siga `harness/estrutura.md` para a pasta, o componente e o estilo.
3. Mudança visual passa pela skill `impeccable`. `PRODUCT.md`, `DESIGN.md` e `.impeccable/` são o contexto dela.
4. Momento novo segue a skill `novo-momento`. Painel mudou: skill `atualizar-telas`.

## O que a página pode dizer

`PRODUCT.md` lista o que existe no sistema e o que não pode ser afirmado. Em resumo:

- Só o que o painel e a API já fazem. Confira em `../harness/produto.md` e `../ambao-backend/harness/domain/` antes de acrescentar um recurso.
- Sem clientes, depoimentos, números de uso nem preços. O Ambão ainda não está em uso em nenhuma paróquia.
- O aplicativo está em desenvolvimento: aparece só na área de devs, sem data nem recurso prometido. Sem pagamento online do dízimo, chat ou página pública da paróquia.
- Toda tela mostrada usa dados fictícios e diz isso.

## Marca

A mesma do painel: azul marinho, rosa claro, branco, Inter e a cruz como único ornamento. Os tokens em `src/app/globals.css` copiam `../ambao-web/src/index.css`; mudou lá, mude aqui. O céu da entrada do painel abre e fecha a página.

## O que não se improvisa

- Cada seção do folheto é um `Momento`: a dor como pergunta no título, a hora em rubrica corrida no começo da leitura (nunca rótulo acima do título), o R. na faixa rosa e a tela na `Vitrine`.
- Vídeo, véu e sombra moram no céu. Do primeiro momento em diante, profundidade é rosa claro ou azul lavado.
- Azul marinho é a única cor de ação. Nunca dois botões cheios lado a lado.
- Os números das telas recriadas batem entre si: dízimo e caixa vêm de `src/dados/financeiro-demo.ts`, com teste.
- O formulário de contato só monta a mensagem e abre o WhatsApp ou o e-mail. Nada vai para servidor.
- A única coisa que sai do navegador é a contagem do Umami (`UMAMI_WEBSITE_ID`, em `src/config/umami.ts`): visitas e eventos de contato por `src/lib/rastrear.ts` e `data-umami-event`. Evento nunca leva nome, paróquia, cidade nem mensagem.
- Canal de contato vazio esconde o botão no site publicado. Os canais vêm do `.env` (`WHATSAPP_NUMBER`, `EMAIL_USER`, `PROFILE_LINKEDIN`, `PROFILE_GITHUB`), lidos e validados com Zod em `src/config/contato.ts` e levados ao navegador pelo `env` de `next.config.ts`.
