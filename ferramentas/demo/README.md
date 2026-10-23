# Paróquia de demonstração

Os prints de `public/telas/` saem do painel de verdade, rodando contra uma API com banco próprio e uma paróquia fictícia, a Paróquia Sagrada Família. Nada aqui toca o banco de desenvolvimento.

## Subir o ambiente

1. Banco vazio no Postgres local (o container do projeto):

   ```bash
   docker exec <container> psql -U postgres -c "CREATE DATABASE ambao_demo"
   cd ../ambao-backend && DB_NAME=ambao_demo npm run migration:run
   ```

2. API de demonstração na porta 3100, a partir de `ambao-backend`:

   ```bash
   DB_NAME=ambao_demo PORT=3100 UPLOAD_DIR=src/shared/data/uploads/demo \
   THROTTLING_ENABLED=false CORS_ORIGIN=http://localhost:5180 \
   EMAIL_USER_DEFAULT=admin@demo.ambao SENHA_USER_DEFAULT=Demo1234 \
   NAME_USER_DEFAULT=Cláudia SOBRENOME_USER_DEFAULT=Moreira npx nest start
   ```

3. Painel na porta 5180, a partir de `ambao-web`:

   ```bash
   VITE_DEV_PORT=5180 VITE_API_URL=http://localhost:3100 npx vite
   ```

## Semear e capturar

```bash
npm run demo:semear   # paróquia, quatro igrejas, escala, dízimo, caixa, mural, galeria
npm run capturas      # 8 telas em computador, tablet e celular, no tema claro e no escuro (-escuro.webp), em public/telas/
npm run capturas -- escala   # só uma tela
```

A semeadura só usa as rotas HTTP. A exceção é o histórico da leitura do dia, porque a API só aceita marcar até 6 dias atrás. Para a sequência de semanas aparecer, insira as semanas antigas do Rafael direto no `ambao_demo` (tabela `leituras_diarias`).

Todos os logins de demonstração usam a senha `Demo1234`. A coordenação é `roberto@demo.ambao`, o membro escalado é `rafael@demo.ambao` e o padre é `padre@demo.ambao`.

## Fotos

As fotos da galeria vêm do Wikimedia Commons, todas em domínio público ou CC0. Autor, licença e endereço de cada uma estão em `fotos.json`. São só arquitetura e objetos, sem rosto de ninguém.

Depois de refazer os prints, registre a procedência de cada arquivo novo:

```bash
for f in public/telas/*.webp; do .claude/skills/impeccable/scripts/impeccable embed-prompt "$f" --prompt "Origem: print do painel com a paróquia de demonstração."; done
```
