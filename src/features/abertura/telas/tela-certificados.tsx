import { Icone } from '@/components/ui/icone'
import { meusCertificados } from '@/features/certificados/certificados-demo'
import { Passo } from '@/features/certificados/certificados'

/** Meus certificados: o que a paróquia guardou da pessoa, do batismo à crisma. */
export function TelaCertificados() {
  return (
    <>
      <p className="text-[13px] text-muted">Certificados</p>
      <h2 className="mt-1 pr-28 text-[1.625rem] leading-tight font-medium tracking-tight">Meus certificados</h2>
      <p className="mt-1 flex items-center gap-1.5 text-[13px] text-muted">
        <Icone nome="info" className="h-3.5 w-3.5 text-blue" />
        Cópia digital. Para fins oficiais, peça a certidão na secretaria.
      </p>

      <ol className="relative mt-4 grid gap-2.5">
        <span aria-hidden className="absolute top-3 bottom-3 left-[1.375rem] w-px bg-line" />
        {meusCertificados.map((certificado) => (
          <Passo key={certificado.tipo} certificado={certificado} />
        ))}
      </ol>
    </>
  )
}
