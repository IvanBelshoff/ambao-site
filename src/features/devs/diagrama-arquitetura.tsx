'use client'

import '@xyflow/react/dist/base.css'
import {
  BaseEdge,
  type Edge,
  type EdgeProps,
  Handle,
  MarkerType,
  type Node,
  type NodeProps,
  Position,
  ReactFlow,
  getBezierPath,
} from '@xyflow/react'
import { useEffect, useRef, useState } from 'react'
import { Icone } from '@/components/ui/icone'
import estilo from './diagrama-arquitetura.module.css'
import { type Parte, api, banco, clientes } from './partes'

type Sentido = 'horizontal' | 'vertical'
type DadosDaParte = Parte & { sentido: Sentido; entradas: string[]; saida: boolean }
type NoDaParte = Node<DadosDaParte, 'parte'>
type DadosDaLigacao = { futuro?: boolean }
type Ligacao = Edge<DadosDaLigacao, 'ligacao'>

const tons = {
  comum: 'border-line bg-paper',
  centro: 'border-blue/30 bg-blue-wash',
  futuro: 'border-dashed border-field bg-paper',
} as const

/** Entradas espalhadas no lado de chegada: no meio quando há uma, a 35% e 65% quando há duas. */
function posicaoDaEntrada(sentido: Sentido, indice: number, total: number) {
  const fracao = total === 1 ? 50 : 35 + (30 * indice) / (total - 1)
  return sentido === 'horizontal' ? { top: `${fracao}%` } : { left: `${fracao}%` }
}

/**
 * O ponto de onde cada ligação sai, na borda da caixa: um disco de papel com contorno,
 * azul marinho no caminho que existe e cinza no do aplicativo, que ainda não existe.
 */
const ponto = (futuro: boolean) =>
  `size-2! min-h-0! min-w-0! rounded-full! border-[1.5px]! bg-paper! ${futuro ? 'border-field!' : 'border-blue!'}`

/** A caixa de cada parte: o papel com fio do site, o rótulo em azul marinho e o detalhe em tinta suave. */
function CaixaDaParte({ data }: NodeProps<NoDaParte>) {
  const entrada = data.sentido === 'horizontal' ? Position.Left : Position.Top
  const saida = data.sentido === 'horizontal' ? Position.Right : Position.Bottom
  return (
    <div className={`flex h-full flex-col justify-center gap-1 rounded-field border px-4 py-3 ${tons[data.tom ?? 'comum']}`}>
      {/* A API recebe os dois clientes: uma entrada para cada, para as setas não se cobrirem. */}
      {data.entradas.map((entradaId, indice) => (
        <Handle
          key={entradaId}
          id={entradaId}
          type="target"
          position={entrada}
          isConnectable={false}
          style={posicaoDaEntrada(data.sentido, indice, data.entradas.length)}
          // A entrada não tem ponto: quem marca a chegada é a seta.
          className="size-px! min-h-0! min-w-0! border-0! bg-transparent!"
        />
      ))}
      <span className="flex items-center gap-2 text-[15px] font-medium text-blue">
        <Icone nome={data.icone} className="h-[18px] w-[18px]" />
        {data.rotulo}
      </span>
      <span className="pl-[26px] text-[13px] leading-snug text-muted">{data.detalhe}</span>
      {data.saida ? <Handle type="source" position={saida} isConnectable={false} className={ponto(data.tom === 'futuro')} /> : null}
    </div>
  )
}

/**
 * A ligação, como no mapa de acesso do painel: curva, tracejada em azul marinho e
 * com o traço andando da origem ao destino. O aplicativo, em desenvolvimento,
 * liga com um tracejado cinza e parado.
 */
function LigacaoEntrePartes({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, markerEnd, data }: EdgeProps<Ligacao>) {
  const [caminho] = getBezierPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition })
  return (
    <BaseEdge
      id={id}
      path={caminho}
      markerEnd={markerEnd}
      className={data?.futuro ? undefined : estilo.fluxo}
      style={
        data?.futuro
          ? { stroke: 'var(--color-field)', strokeWidth: 1.4, strokeDasharray: '3 4' }
          : { stroke: 'var(--color-blue)', strokeWidth: 1.6, strokeDasharray: '6 5' }
      }
    />
  )
}

const tiposDeNo = { parte: CaixaDaParte }
const tiposDeLigacao = { ligacao: LigacaoEntrePartes }

const ALTURA = 72
/** Na coluna, as caixas do topo dividem a largura e o detalhe quebra em mais linhas. */
const ALTURA_ESTREITA = 104
const VAO = 12

/** As posições pela largura real: em linha a partir de 640px, em coluna abaixo disso. */
function montar(largura: number) {
  const sentido: Sentido = largura >= 640 ? 'horizontal' : 'vertical'
  const no = (parte: Parte, x: number, y: number, w: number, h = ALTURA): NoDaParte => ({
    id: parte.id,
    type: 'parte',
    position: { x, y },
    // Pontos só onde há ligação: os clientes só saem, o banco só recebe.
    data: {
      ...parte,
      sentido,
      entradas: parte.id === api.id ? clientes.map((c) => c.id) : parte.id === banco.id ? ['entrada'] : [],
      saida: parte.id !== banco.id,
    },
    width: w,
    height: h,
    draggable: false,
    selectable: false,
  })

  let nos: NoDaParte[]
  let altura: number
  if (sentido === 'horizontal') {
    const corredor = 72
    const util = largura - corredor * 2
    const [w1, w2, w3] = [util * 0.36, util * 0.33, util * 0.31]
    const meio = (ALTURA * 2 + VAO) / 2 - ALTURA / 2
    nos = [
      no(clientes[0], 0, 0, w1),
      no(clientes[1], 0, ALTURA + VAO, w1),
      no(api, w1 + corredor, meio, w2),
      no(banco, w1 + w2 + corredor * 2, meio, w3),
    ]
    altura = ALTURA * 2 + VAO
  } else {
    const corredor = 44
    const metade = (largura - VAO) / 2
    const largo = Math.min(largura, 320)
    const centro = (largura - largo) / 2
    const segunda = ALTURA_ESTREITA + corredor
    nos = [
      no(clientes[0], 0, 0, metade, ALTURA_ESTREITA),
      no(clientes[1], metade + VAO, 0, metade, ALTURA_ESTREITA),
      no(api, centro, segunda, largo),
      no(banco, centro, segunda + ALTURA + corredor, largo),
    ]
    altura = segunda + ALTURA * 2 + corredor
  }

  const seta = (cor: string) => ({ type: MarkerType.ArrowClosed, width: 16, height: 16, color: cor })
  const ligacao = (de: string, para: string, dados: DadosDaLigacao = {}): Ligacao => ({
    id: `${de}-${para}`,
    source: de,
    target: para,
    targetHandle: para === api.id ? de : 'entrada',
    type: 'ligacao',
    markerEnd: seta(dados.futuro ? 'var(--color-field)' : 'var(--color-blue)'),
    data: dados,
    selectable: false,
    focusable: false,
  })
  const ligacoes = [
    ligacao(clientes[0].id, api.id),
    ligacao(clientes[1].id, api.id, { futuro: true }),
    ligacao(api.id, banco.id),
  ]
  return { nos, ligacoes, altura }
}

/** O diagrama em si. Só lê: sem arrastar, sem zoom, e a rolagem da página passa por cima. */
export default function DiagramaArquitetura() {
  const caixa = useRef<HTMLDivElement>(null)
  const [largura, setLargura] = useState(0)

  useEffect(() => {
    const elemento = caixa.current
    if (!elemento) return
    const observador = new ResizeObserver(([entrada]) => setLargura(Math.round(entrada.contentRect.width)))
    observador.observe(elemento)
    return () => observador.disconnect()
  }, [])

  const montado = largura > 0 ? montar(largura) : null

  return (
    <div ref={caixa} className="w-full" aria-hidden="true" style={{ height: montado ? montado.altura + 4 : ALTURA * 2 + VAO + 4 }}>
      {montado ? (
        <ReactFlow
          key={largura >= 640 ? 'horizontal' : 'vertical'}
          nodes={montado.nos}
          edges={montado.ligacoes}
          nodeTypes={tiposDeNo}
          edgeTypes={tiposDeLigacao}
          defaultViewport={{ x: 0, y: 2, zoom: 1 }}
          nodesDraggable={false}
          nodesConnectable={false}
          nodesFocusable={false}
          edgesFocusable={false}
          elementsSelectable={false}
          panOnDrag={false}
          panOnScroll={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          preventScrolling={false}
          proOptions={{ hideAttribution: true }}
          className="bg-transparent!"
        />
      ) : null}
    </div>
  )
}
