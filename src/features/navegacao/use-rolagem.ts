import { useEffect, useState } from 'react'

/**
 * Quanto a página já rolou, lido uma vez por quadro. `rolada` vira a navegação em
 * placa branca; `alemDoCeu` mostra o botão de voltar ao início.
 */
export function useRolagem() {
  const [estado, setEstado] = useState({ rolada: false, alemDoCeu: false })

  useEffect(() => {
    let agendado = false
    const atualizar = () => {
      agendado = false
      const rolada = window.scrollY > 24
      const alemDoCeu = window.scrollY > window.innerHeight * 0.9
      setEstado((antes) => (antes.rolada === rolada && antes.alemDoCeu === alemDoCeu ? antes : { rolada, alemDoCeu }))
    }
    const aoRolar = () => {
      if (agendado) return
      agendado = true
      requestAnimationFrame(atualizar)
    }
    window.addEventListener('scroll', aoRolar, { passive: true })
    atualizar()
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  return estado
}
