/**
 * Monta a paróquia de demonstração do Ambão numa API vazia, só pelas rotas HTTP,
 * com as mesmas regras do painel. Tudo é fictício: nomes, valores e avisos.
 * As fotos são de domínio público ou CC0 (ver fotos.json).
 *
 * Uso (API de demonstração já de pé, com banco próprio):
 *   node ferramentas/demo/semear.mjs
 *
 * Variáveis: AMBAO_API (padrão http://localhost:3100), AMBAO_ADMIN, AMBAO_SENHA_ADMIN,
 * AMBAO_SENHA (senha de todos os logins de demonstração).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const API = process.env.AMBAO_API ?? 'http://localhost:3100'
const ADMIN = process.env.AMBAO_ADMIN ?? 'admin@demo.ambao'
const SENHA_ADMIN = process.env.AMBAO_SENHA_ADMIN ?? 'Demo1234'
const SENHA = process.env.AMBAO_SENHA ?? 'Demo1234'
const AQUI = dirname(fileURLToPath(import.meta.url))
const PASTA_FOTOS = join(AQUI, 'fotos')

async function chamar(caminho, { token, metodo = 'GET', corpo, form } = {}) {
  const headers = {}
  if (token) headers.Authorization = `Bearer ${token}`
  if (corpo !== undefined) headers['Content-Type'] = 'application/json'
  const res = await fetch(`${API}${caminho}`, {
    method: metodo,
    headers,
    body: form ?? (corpo !== undefined ? JSON.stringify(corpo) : undefined),
  })
  if (!res.ok) throw new Error(`${metodo} ${caminho}: ${res.status} ${await res.text()}`)
  if (res.status === 204) return undefined
  const texto = await res.text()
  return texto ? JSON.parse(texto) : undefined
}

async function entrar(email, senha) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  })
  if (!res.ok) throw new Error(`login ${email}: ${res.status} ${await res.text()}`)
  return (await res.json()).access_token
}

/** Instante de Brasília (UTC-3) em ISO com Z, como a API pede. */
const brasilia = (data, hora) => new Date(`${data}T${hora}:00-03:00`).toISOString()

async function foto(nome) {
  const lista = JSON.parse(readFileSync(join(AQUI, 'fotos.json'), 'utf8'))
  const item = lista.find((f) => f.arquivo === nome)
  if (!item) throw new Error(`foto ${nome} fora de fotos.json`)
  mkdirSync(PASTA_FOTOS, { recursive: true })
  const local = join(PASTA_FOTOS, nome)
  if (!existsSync(local)) {
    const res = await fetch(item.baixar, { headers: { 'User-Agent': 'AmbaoDemo/1.0' } })
    if (!res.ok) throw new Error(`baixar ${nome}: ${res.status}`)
    writeFileSync(local, Buffer.from(await res.arrayBuffer()))
  }
  return new Blob([readFileSync(local)], { type: 'image/jpeg' })
}

async function enviarFoto(caminho, campo, nome, token) {
  const form = new FormData()
  form.append(campo, await foto(nome), nome)
  return chamar(caminho, { metodo: 'POST', form, token })
}

async function main() {
  const admin = await entrar(ADMIN, SENHA_ADMIN)

  // Paróquia e igrejas
  let paroquia
  try {
    paroquia = await chamar('/paroquia', { token: admin })
  } catch {
    paroquia = await chamar('/paroquia', {
      token: admin,
      metodo: 'POST',
      corpo: {
        nome: 'Paróquia Sagrada Família',
        cidade: 'Vila Esperança',
        ano_fundacao: 1958,
        historia:
          '<p>A Paróquia Sagrada Família reúne quatro comunidades. Esta é uma paróquia de demonstração do Ambão: nomes, valores e avisos são fictícios.</p>',
      },
    })
  }
  if ((await chamar('/igrejas', { token: admin })).length > 0) {
    console.log('A demonstração já foi semeada. Use um banco vazio para semear de novo.')
    return
  }
  await enviarFoto('/paroquia/capa', 'capa', 'fachada.jpg', admin)

  const criarIgreja = (nome, extra = {}) =>
    chamar('/igrejas', { token: admin, metodo: 'POST', corpo: { nome, ...extra } })
  const matriz = await criarIgreja('Matriz Sagrada Família', { matriz: true })
  const sj = await criarIgreja('São José Operário')
  const sr = await criarIgreja('Santa Rita de Cássia')
  const sp = await criarIgreja('São Pedro Pescador')
  await enviarFoto(`/igrejas/${sj.id}/capa`, 'capa', 'nave.jpg', admin).catch((e) => console.warn('capa da igreja:', e.message))

  const membro = (igreja, nome, extra = {}) =>
    chamar(`/igrejas/${igreja}/membros`, { token: admin, metodo: 'POST', corpo: { nome, ...extra } })
  const contas = {}
  async function comLogin(igreja, nome, email, concessoes = []) {
    const m = await membro(igreja, nome)
    const acesso = await chamar(`/membros/${m.id}/acesso`, { token: admin, metodo: 'POST', corpo: { email, senha: SENHA } })
    if (concessoes.length) {
      await chamar(`/usuarios/${acesso.id}/concessoes`, { token: admin, metodo: 'PUT', corpo: { concessoes } })
    }
    contas[email] = await entrar(email, SENHA)
    return m
  }
  const coordenacao = (igreja) => [{ regra: 'REGRA_COORDENADOR', permissoes: [], escopo_tipo: 'igreja', escopo_id: igreja }]

  // Coordenação de cada igreja e o padre, que é da matriz
  await comLogin(matriz.id, 'Teresa Gomes', 'teresa@demo.ambao', coordenacao(matriz.id))
  const roberto = await comLogin(sj.id, 'Roberto Campos', 'roberto@demo.ambao', coordenacao(sj.id))
  await comLogin(sr.id, 'Márcia Lopes', 'marcia@demo.ambao', coordenacao(sr.id))
  await comLogin(sp.id, 'Jorge Batista', 'jorge@demo.ambao', coordenacao(sp.id))
  const padre = await comLogin(matriz.id, 'Pe. Antônio Vieira', 'padre@demo.ambao', [
    { regra: 'REGRA_PADRE', permissoes: [], escopo_tipo: 'paroquia', escopo_id: paroquia.id },
  ])
  const coord = contas['roberto@demo.ambao']

  // Pessoas da São José Operário: quem serve na missa tem login para responder
  const helena = await comLogin(sj.id, 'Helena Duarte', 'helena@demo.ambao')
  const ana = await comLogin(sj.id, 'Ana Lúcia Prado', 'ana@demo.ambao')
  const rafael = await comLogin(sj.id, 'Rafael Nunes', 'rafael@demo.ambao')
  const joana = await comLogin(sj.id, 'Joana Prado', 'joana@demo.ambao')
  const claudio = await comLogin(sj.id, 'Cláudio Reis', 'claudio@demo.ambao')
  const sonia = await comLogin(sj.id, 'Sônia Melo', 'sonia@demo.ambao')
  const beatriz = await membro(sj.id, 'Beatriz Lima')
  const marcos = await membro(sj.id, 'Marcos Teixeira')
  const pedro = await membro(sj.id, 'Pedro Henrique Alves')

  const dizimistas = {}
  for (const nome of [
    'Maria das Graças Souza', 'José Carlos Ferreira', 'Antônia Ribeiro', 'Francisco Almeida', 'Luzia Martins',
    'Sebastião Rocha', 'Aparecida Moura', 'João Batista Lemos', 'Rita de Cássia Pinto', 'Geraldo Nogueira',
    'Conceição Barros', 'Raimundo Freitas', 'Fátima Cardoso', 'Benedito Araújo', 'Terezinha Castro',
    'Manoel Siqueira', 'Lourdes Monteiro', 'Vicente Pereira', 'Rosângela Dias', 'Edson Matos',
  ]) {
    dizimistas[nome] = await membro(sj.id, nome)
  }
  for (const [igreja, nomes] of [
    [matriz.id, ['Vera Lúcia Santos', 'Osvaldo Brandão', 'Cecília Ramos']],
    [sr.id, ['Daniela Fonseca', 'Paulo Sérgio Leite']],
    [sp.id, ['Wilson Tavares', 'Eliane Cunha']],
  ]) {
    for (const nome of nomes) await membro(igreja, nome)
  }

  // Escala do domingo: 30º Domingo do Tempo Comum, Ano A
  const papeis = Object.fromEntries((await chamar('/papeis', { token: coord })).map((p) => [p.nome, p.id]))
  const missa = await chamar(`/igrejas/${sj.id}/escalacoes`, {
    token: coord,
    metodo: 'POST',
    corpo: {
      titulo: '30º Domingo do Tempo Comum',
      data: '2026-10-25',
      hora_inicio: '09:00',
      hora_fim: '10:15',
      tipo: 'missa',
      responder_ate: '2026-10-24',
      data_liturgia: '2026-10-25',
      status: 'rascunho',
    },
  })
  const alocar = [
    ['Comentários', helena], ['Presidir', padre], ['Primeira leitura', ana], ['Salmo', rafael],
    ['Segunda leitura', beatriz], ['Homilia', padre], ['Preces', joana], ['Preces', marcos],
    ['Equipe musical', pedro], ['Limpeza da igreja', claudio], ['Limpeza da igreja', sonia],
  ]
  const ordem = {}
  await chamar(`/escalacoes/${missa.id}/alocacoes`, {
    token: coord,
    metodo: 'PUT',
    corpo: {
      alocacoes: alocar.map(([papel, m]) => {
        ordem[papel] = (ordem[papel] ?? 0) + 1
        return { papel_id: papeis[papel], membro_id: m.id, ordem: ordem[papel] }
      }),
    },
  })

  const liturgia = await chamar('/liturgia/dia?data=2026-10-25', { token: coord })
  const leituras = liturgia.formularios[0].leituras
  const leitura = (chave) => leituras.find((l) => l.chave === chave)
  const salmo = leitura('salmo')
  await chamar(`/escalacoes/${missa.id}/textos`, {
    token: coord,
    metodo: 'PUT',
    corpo: {
      textos: [
        {
          papel_id: papeis['Comentários'],
          conteudo: [
            { tipo: 'Acolhida', texto: 'Irmãos e irmãs, sejam bem-vindos. Neste domingo, Jesus nos lembra que o amor a Deus e o amor ao próximo caminham juntos.' },
            { tipo: 'Antes das leituras', texto: 'Ouçamos com atenção a Palavra que nos chama a cuidar do estrangeiro, da viúva e do órfão.' },
          ],
        },
        { papel_id: papeis['Primeira leitura'], referencia: leitura('primeira').referencia, conteudo: leitura('primeira').html },
        { papel_id: papeis['Salmo'], referencia: salmo.referencia, conteudo: { resposta: salmo.resposta, texto: salmo.html } },
        { papel_id: papeis['Segunda leitura'], referencia: leitura('segunda').referencia, conteudo: leitura('segunda').html },
        { papel_id: papeis['Homilia'], referencia: leitura('evangelho').referencia, conteudo: leitura('evangelho').html },
        {
          papel_id: papeis['Preces'],
          conteudo: {
            resposta: 'Senhor, escutai a nossa prece.',
            preces: [
              { ordem: 1, texto: 'Pela Igreja, para que seja sinal do amor de Deus no meio do povo, rezemos ao Senhor.' },
              { ordem: 2, texto: 'Pelos que vivem sozinhos, doentes ou longe de casa, rezemos ao Senhor.' },
              { ordem: 3, texto: 'Pela nossa comunidade, que se prepara para rezar por seus falecidos, rezemos ao Senhor.' },
            ],
          },
        },
      ],
    },
  })
  await chamar(`/escalacoes/${missa.id}/repertorio`, {
    token: coord,
    metodo: 'PUT',
    corpo: {
      momentos: [
        { tipo: 'musica', nome: 'Entrada', cantos: [{ titulo: 'Ó Pai, somos nós o povo eleito' }] },
        { tipo: 'salmo', nome: 'Salmo', cantos: [] },
        { tipo: 'musica', nome: 'Aclamação ao Evangelho', cantos: [{ titulo: 'Aleluia, a minha alma abrirei' }] },
        { tipo: 'preces', nome: 'Preces', cantos: [] },
        { tipo: 'musica', nome: 'Ofertório', cantos: [{ titulo: 'Sabes, Senhor, o que temos' }] },
        { tipo: 'musica', nome: 'Comunhão', cantos: [{ titulo: 'Eu vim para que todos tenham vida' }] },
        { tipo: 'musica', nome: 'Final', cantos: [{ titulo: 'Maria de Nazaré' }] },
      ],
    },
  }).catch((e) => console.warn('repertório:', e.message))
  await chamar(`/escalacoes/${missa.id}`, { token: coord, metodo: 'PATCH', corpo: { status: 'publicada' } })

  const responder = (email, papel, resposta, motivo) =>
    chamar(`/me/participacoes/${missa.id}/alocacoes/${papeis[papel]}`, {
      token: contas[email],
      metodo: 'PATCH',
      corpo: motivo ? { resposta, motivo } : { resposta },
    })
  await responder('helena@demo.ambao', 'Comentários', 'aceito')
  await responder('padre@demo.ambao', 'Presidir', 'aceito')
  await responder('padre@demo.ambao', 'Homilia', 'aceito')
  await responder('ana@demo.ambao', 'Primeira leitura', 'recusado', 'Vou estar viajando neste fim de semana.')
  await responder('rafael@demo.ambao', 'Salmo', 'aceito')
  await responder('joana@demo.ambao', 'Preces', 'aceito')
  await responder('claudio@demo.ambao', 'Limpeza da igreja', 'aceito')
  await responder('sonia@demo.ambao', 'Limpeza da igreja', 'aceito')

  // Outras celebrações da semana e a de Finados, ainda em rascunho
  for (const [titulo, data, inicio, fim, status] of [
    ['Missa do sábado', '2026-10-24', '19:00', '20:00', 'publicada'],
    ['30º Domingo do Tempo Comum, noite', '2026-10-25', '19:00', '20:00', 'publicada'],
    ['Missa de Finados', '2026-11-02', '09:00', '10:00', 'rascunho'],
  ]) {
    await chamar(`/igrejas/${sj.id}/escalacoes`, {
      token: coord,
      metodo: 'POST',
      corpo: { titulo, data, hora_inicio: inicio, hora_fim: fim, tipo: 'missa', status },
    })
  }

  // O domingo passado, com fotos na galeria da celebração
  const passado = await chamar(`/igrejas/${sj.id}/escalacoes`, {
    token: coord,
    metodo: 'POST',
    corpo: { titulo: '29º Domingo do Tempo Comum', data: '2026-10-18', hora_inicio: '09:00', hora_fim: '10:15', tipo: 'missa', status: 'publicada' },
  })
  const albumMissa = await chamar(`/escalacoes/${passado.id}/galeria/albuns`, {
    token: coord,
    metodo: 'POST',
    corpo: { titulo: 'Missa do 29º Domingo' },
  })
  for (const nome of ['lecionario.jpg', 'velas.jpg']) {
    await enviarFoto(`/escalacoes/${passado.id}/galeria/albuns/${albumMissa.id}/itens`, 'arquivo', nome, coord)
  }
  await chamar(`/galerias/albuns/${albumMissa.id}/liberacao`, { token: coord, metodo: 'PATCH', corpo: { liberado: true } })

  // Galerias da paróquia e da igreja
  async function album(token, donoTipo, donoId, titulo, fotos) {
    const a = await chamar(`/galerias/geral/albuns?dono_tipo=${donoTipo}&dono_id=${donoId}`, {
      token,
      metodo: 'POST',
      corpo: { titulo },
    })
    const itens = []
    for (const nome of fotos) itens.push(await enviarFoto(`/galerias/albuns/${a.id}/itens`, 'arquivo', nome, token))
    await chamar(`/galerias/albuns/${a.id}/liberacao`, { token, metodo: 'PATCH', corpo: { liberado: true } })
    return { ...a, itens }
  }
  const quermesse = await album(admin, 'paroquia', paroquia.id, 'Quermesse de outubro', ['praca.jpg', 'fachada.jpg'])
  await album(coord, 'igreja', sj.id, 'Nossa igreja', ['nave.jpg', 'bancos.jpg', 'rosacea.jpg', 'vitral.jpg'])

  // Dízimo de outubro: 38 recebimentos, R$ 6.420,00
  const dizimo = (nome, valor, data, forma, competencias = ['2026-10']) =>
    chamar(`/igrejas/${sj.id}/dizimos`, {
      token: coord,
      metodo: 'POST',
      corpo: { membro_id: dizimistas[nome].id, valor, competencias, data, forma },
    })
  const outros = [
    ['Sebastião Rocha', 200, 'pix'], ['Aparecida Moura', 150, 'dinheiro'], ['João Batista Lemos', 350, 'transferencia'],
    ['Rita de Cássia Pinto', 120, 'pix'], ['Geraldo Nogueira', 400, 'transferencia'], ['Conceição Barros', 80, 'dinheiro'],
    ['Raimundo Freitas', 180, 'pix'], ['Fátima Cardoso', 100, 'dinheiro'], ['Benedito Araújo', 220, 'pix'],
    ['Terezinha Castro', 90, 'dinheiro'], ['Manoel Siqueira', 400, 'transferencia'], ['Lourdes Monteiro', 150, 'pix'],
    ['Vicente Pereira', 130, 'dinheiro'], ['Rosângela Dias', 330, 'pix'], ['Edson Matos', 160, 'cartao'],
    ['Sebastião Rocha', 50, 'dinheiro'], ['Aparecida Moura', 100, 'pix'], ['Rita de Cássia Pinto', 140, 'pix'],
    ['Conceição Barros', 200, 'cheque'], ['Fátima Cardoso', 180, 'pix'], ['Terezinha Castro', 110, 'dinheiro'],
    ['Lourdes Monteiro', 200, 'transferencia'], ['Vicente Pereira', 170, 'pix'], ['Edson Matos', 240, 'pix'],
    ['Benedito Araújo', 160, 'dinheiro'], ['Raimundo Freitas', 210, 'pix'], ['Manoel Siqueira', 150, 'dinheiro'],
    ['Geraldo Nogueira', 230, 'pix'], ['João Batista Lemos', 120, 'dinheiro'], ['Rosângela Dias', 170, 'pix'],
    ['Antônia Ribeiro', 100, 'dinheiro'], ['Francisco Almeida', 150, 'pix'], ['José Carlos Ferreira', 120, 'dinheiro'],
  ]
  const soma = outros.reduce((t, [, v]) => t + v, 0)
  if (soma !== 5860) throw new Error(`os outros dízimos somam ${soma}, não 5860`)
  const diasDeOutubro = ['2026-10-04', '2026-10-05', '2026-10-11', '2026-10-12', '2026-10-13']
  for (const [i, [nome, valor, forma]] of outros.entries()) {
    await dizimo(nome, valor, diasDeOutubro[i % diasDeOutubro.length], forma)
  }
  await dizimo('Luzia Martins', 30, '2026-10-18', 'dinheiro')
  await dizimo('Francisco Almeida', 200, '2026-10-18', 'transferencia')
  await dizimo('Antônia Ribeiro', 120, '2026-10-18', 'pix')
  await dizimo('José Carlos Ferreira', 50, '2026-10-18', 'dinheiro')
  await dizimo('Maria das Graças Souza', 160, '2026-10-18', 'pix', ['2026-10', '2026-11'])

  // Caixa de outubro da São José Operário
  const lancar = (data, valor, tipo, categoria, descricao) =>
    chamar('/lancamentos', {
      token: coord,
      metodo: 'POST',
      corpo: { dono_tipo: 'igreja', dono_id: sj.id, data, valor, tipo, categoria, descricao },
    })
  await lancar('2026-10-04', 920, 'entrada', 'Oferta', 'Ofertas das missas de domingo')
  await lancar('2026-10-11', 860, 'entrada', 'Oferta', 'Ofertas das missas de domingo')
  await lancar('2026-10-12', 850, 'entrada', 'Oferta', 'Festa de Nossa Senhora Aparecida')
  await lancar('2026-10-18', 790, 'entrada', 'Oferta', 'Ofertas das missas de domingo')
  await lancar('2026-10-08', 1640, 'saida', 'Manutenção', 'Conserto do telhado da sacristia')
  await lancar('2026-10-10', 312.4, 'saida', 'Água e luz', 'Conta de água de setembro')
  await lancar('2026-10-14', 871.9, 'saida', 'Água e luz', 'Conta de luz de setembro')
  await lancar('2026-10-15', 388.3, 'saida', 'Material', 'Velas, hóstias e vinho')

  // Eventos
  const evento = (token, donoTipo, donoId, titulo, inicio, fim, local, descricao) =>
    chamar('/eventos', {
      token,
      metodo: 'POST',
      corpo: { dono_tipo: donoTipo, dono_id: donoId, titulo, inicio, fim, local, descricao },
    })
  await evento(admin, 'paroquia', paroquia.id, 'Missa de Finados nas quatro igrejas', brasilia('2026-11-02', '07:00'), brasilia('2026-11-02', '20:00'), 'Todas as igrejas', 'Horários no mural.')
  await evento(admin, 'paroquia', paroquia.id, 'Retiro dos coordenadores', brasilia('2026-11-14', '08:00'), brasilia('2026-11-14', '17:00'), 'Matriz Sagrada Família')
  await evento(coord, 'igreja', sj.id, 'Mutirão de limpeza', brasilia('2026-10-31', '08:00'), brasilia('2026-10-31', '12:00'), 'Igreja São José Operário')
  await evento(coord, 'igreja', sj.id, 'Reunião da Pastoral do Dízimo', brasilia('2026-10-28', '19:30'), brasilia('2026-10-28', '21:00'), 'Salão paroquial')

  // Publicações
  const publicar = (token, campos) => {
    const form = new FormData()
    for (const [k, v] of Object.entries(campos)) form.append(k, String(v))
    return chamar('/publicacoes', { token, metodo: 'POST', form })
  }
  const agradecimento = await publicar(admin, {
    dono_tipo: 'paroquia',
    dono_id: paroquia.id,
    texto: 'Obrigado a cada pessoa que trabalhou na quermesse de outubro. As fotos já estão na galeria da paróquia.',
    album_midia_id: quermesse.itens[0].id,
    categoria: 'agradecimento',
    status: 'publicada',
  }).catch(async (e) => {
    console.warn('publicação com foto do álbum:', e.message)
    return publicar(admin, {
      dono_tipo: 'paroquia', dono_id: paroquia.id, categoria: 'agradecimento', status: 'publicada',
      texto: 'Obrigado a cada pessoa que trabalhou na quermesse de outubro. As fotos já estão na galeria da paróquia.',
    })
  })
  const mutirao = await publicar(coord, {
    dono_tipo: 'igreja',
    dono_id: sj.id,
    visibilidade: 'interno',
    categoria: 'convite',
    status: 'publicada',
    texto: 'Mutirão de limpeza no sábado, 31, às 8h, para deixar a igreja pronta para Finados. Quem puder, traga luvas e balde.',
    enquete: JSON.stringify({ pergunta: 'Você vem?', multipla: false, opcoes: ['Venho', 'Não consigo'] }),
  })
  const finados = await publicar(admin, {
    dono_tipo: 'paroquia',
    dono_id: paroquia.id,
    categoria: 'aviso',
    status: 'publicada',
    texto:
      'Missa de Finados na segunda, 2 de novembro. As quatro igrejas celebram: Matriz às 7h e às 19h, São José Operário às 9h, Santa Rita às 15h e São Pedro às 17h.',
  })

  const fieis = ['helena@demo.ambao', 'ana@demo.ambao', 'rafael@demo.ambao', 'joana@demo.ambao', 'claudio@demo.ambao', 'sonia@demo.ambao', 'roberto@demo.ambao', 'teresa@demo.ambao', 'marcia@demo.ambao', 'jorge@demo.ambao', 'padre@demo.ambao']
  for (const [i, email] of fieis.entries()) {
    await chamar(`/publicacoes/${finados.id}/reacao`, { token: contas[email], metodo: 'PUT', corpo: { tipo: i % 3 === 2 ? 'rezando' : 'amem' } })
    if (i < 7) await chamar(`/publicacoes/${agradecimento.id}/reacao`, { token: contas[email], metodo: 'PUT', corpo: { tipo: i % 2 ? 'gratidao' : 'amei' } })
  }
  await chamar(`/publicacoes/${finados.id}/comentarios`, { token: contas['helena@demo.ambao'], metodo: 'POST', corpo: { texto: 'Vou levar a minha mãe na das 9h. Obrigada pelo aviso!' } })
  await chamar(`/publicacoes/${finados.id}/comentarios`, { token: contas['marcia@demo.ambao'], metodo: 'POST', corpo: { texto: 'Na Santa Rita teremos terço às 14h30, antes da missa.' } })

  const enquete = (await chamar(`/publicacoes/${mutirao.id}`, { token: coord })).enquete
  const [venho, naoConsigo] = enquete.opcoes.map((o) => o.id)
  for (const email of ['helena@demo.ambao', 'rafael@demo.ambao', 'joana@demo.ambao', 'claudio@demo.ambao', 'sonia@demo.ambao']) {
    await chamar(`/publicacoes/${mutirao.id}/voto`, { token: contas[email], metodo: 'PUT', corpo: { opcoes: [venho] } })
  }
  await chamar(`/publicacoes/${mutirao.id}/voto`, { token: contas['ana@demo.ambao'], metodo: 'PUT', corpo: { opcoes: [naoConsigo] } })

  // Leitura do dia de quem foi escalado para o salmo
  for (const data of ['2026-10-19', '2026-10-20']) {
    await chamar(`/me/leitura/${data}`, { token: contas['rafael@demo.ambao'], metodo: 'PUT' })
  }

  // Rifa, cantina e treinamento
  const rifa = await chamar('/rifas', {
    token: admin,
    metodo: 'POST',
    corpo: { dono_tipo: 'paroquia', dono_id: paroquia.id, titulo: 'Rifa de Natal', premio: 'Cesta de Natal', valor_numero: 10, data_sorteio: brasilia('2026-12-13', '18:00') },
  })
  for (const [numero, nome, igreja] of [[7, 'Helena Duarte', sj.id], [12, 'Osvaldo Brandão', matriz.id], [23, 'Daniela Fonseca', sr.id], [31, 'Wilson Tavares', sp.id], [44, 'Joana Prado', sj.id]]) {
    await chamar(`/rifas/${rifa.id}/numeros`, { token: admin, metodo: 'POST', corpo: { numero, comprador_nome: nome, igreja_id: igreja } }).catch((e) => console.warn('rifa:', e.message))
  }
  for (const [nome, descricao, custo] of [['Pastel', 'De carne ou de queijo', 2], ['Caldo de feijão', 'Copo de 300 ml', 3], ['Refrigerante', 'Lata', 1], ['Bolo de fubá', 'Fatia', 1]]) {
    await chamar(`/igrejas/${sj.id}/cantina/produtos`, { token: coord, metodo: 'POST', corpo: { nome, descricao, custo_fichas: custo } })
  }
  await chamar('/treinamentos', {
    token: admin,
    metodo: 'POST',
    corpo: { titulo: 'Formação de leitores', descricao: 'Para quem lê nas celebrações das quatro igrejas.', data: brasilia('2026-11-07', '14:00'), local: 'Matriz Sagrada Família' },
  }).catch((e) => console.warn('treinamento:', e.message))

  writeFileSync(
    join(AQUI, 'logins.json'),
    JSON.stringify(
      {
        senha: SENHA,
        admin: ADMIN,
        coordenacao: 'roberto@demo.ambao',
        padre: 'padre@demo.ambao',
        membro: 'rafael@demo.ambao',
        escala: missa.id,
        igreja: sj.id,
        roberto: roberto.id,
      },
      null,
      2,
    ),
  )
  console.log('Paróquia de demonstração pronta.')
}

main().catch((erro) => {
  console.error(erro.message ?? erro)
  process.exitCode = 1
})
