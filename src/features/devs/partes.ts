import type { NomeIcone } from '@/components/ui/icone'

/** As partes do sistema. Só o que existe: o aplicativo aparece como em desenvolvimento. */
export type Parte = { id: string; rotulo: string; detalhe: string; icone: NomeIcone; tom?: 'centro' | 'futuro' }

export const clientes: [Parte, Parte] = [
  { id: 'painel', rotulo: 'Painel web', detalhe: 'React · no ar', icone: 'monitor' },
  { id: 'aplicativo', rotulo: 'Aplicativo', detalhe: 'React Native · em desenvolvimento', icone: 'celular', tom: 'futuro' },
]
export const api: Parte = { id: 'api', rotulo: 'API', detalhe: 'NestJS', icone: 'codigo', tom: 'centro' }
export const banco: Parte = { id: 'banco', rotulo: 'PostgreSQL', detalhe: 'TypeORM', icone: 'banco' }
