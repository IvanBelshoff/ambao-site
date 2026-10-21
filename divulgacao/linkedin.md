# Post do LinkedIn

Rascunho para publicar com o vídeo ou o carrossel das telas. O link do site vai no primeiro comentário.

---

Em muita paróquia, a organização roda em cima de três coisas: um caderno, uma planilha e um grupo de WhatsApp.

Sábado à noite, a coordenação ainda confere quem vai ler na missa de domingo. O dízimo vai do envelope para o caderno, do caderno para a planilha, e o recibo fica para depois. O mesmo aviso sai em cinco grupos, cada um com um texto diferente.

Foi para isso que eu construí o Ambão, o sistema de uma paróquia e das suas igrejas:

→ Escalas das celebrações: cada pessoa responde se pode ir e já recebe a leitura do dia para se preparar.
→ Dízimo com recibo numerado, que entra sozinho no caixa da igreja.
→ Caixa de cada igreja, com fechamento de mês e relatório em Excel.
→ Avisos da paróquia para todas as igrejas, ou só para uma.
→ Cada igreja conduz o que é dela, e a paróquia acompanha tudo de perto.

Por trás: API em NestJS com TypeORM e PostgreSQL, painel em React 19 com Vite, Tailwind e TanStack. Toda a regra de negócio mora na API, e um mesmo modelo de "dono" (paróquia ou igreja) atende eventos, lançamentos, rifas e publicações.

O Ambão ainda não está em uso em nenhuma paróquia. Se você participa da organização de uma, ou conhece quem participa, eu adoraria mostrar o sistema por dentro.

Montei uma página com as telas (todas com dados fictícios). O link está no primeiro comentário.

#igrejacatolica #paroquia #desenvolvimentoweb #react #nestjs

---

## Primeiro comentário

O site do Ambão, com as telas do sistema: https://ambao-site.vercel.app

## Para acompanhar o post

- **Vídeo** (melhor alcance): 30 a 60 segundos, sem som, com legenda. Escala, recibo do dízimo, caixa e um aviso. Grave na paróquia de demonstração.
- **Ou carrossel em PDF**: 5 a 7 páginas, uma tela por página, com a dor em uma linha em cima ("Quem lê amanhã na missa das 9h?") e a tela embaixo.
- Nenhuma captura com nome, foto, telefone ou valor de pessoa real.
