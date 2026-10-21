import { Abertura } from '@/features/abertura/abertura'
import { Acervo } from '@/features/acervo/acervo'
import { Avisos } from '@/features/avisos/avisos'
import { Calendario } from '@/features/calendario/calendario'
import { Encerramento } from '@/features/contato/encerramento'
import { ComoFoiFeito } from '@/features/devs/como-foi-feito'
import { Dizimo } from '@/features/dizimo/dizimo'
import { Escalas } from '@/features/escalas/escalas'
import { Leitura } from '@/features/leitura/leitura'
import { Musica } from '@/features/musica/musica'
import { AoTopo, Navegacao } from '@/features/navegacao/navegacao'
import { Paroquia } from '@/features/paroquia/paroquia'
import { Recursos } from '@/features/recursos/recursos'
import { Rodape } from '@/features/rodape/rodape'
import { Telas } from '@/features/telas/telas'

/**
 * A página é a entrada do Ambão: abre no céu com o painel aberto, conta o resto
 * como um folheto dominical e fecha de novo no céu. A rota só compõe as seções.
 */
export default function Pagina() {
  return (
    <>
      <Navegacao />
      <Abertura />
      <main id="conteudo">
        <Escalas />
        <Musica />
        <Calendario />
        <Leitura />
        <Dizimo />
        <Avisos />
        <Acervo />
        <Paroquia />
        <Recursos />
        <Telas />
        <ComoFoiFeito />
      </main>
      <Encerramento />
      <AoTopo />
      <Rodape />
    </>
  )
}
