/**
 * O que o <head> precisa antes da primeira pintura, sem React: o layout é componente
 * de servidor e não pode importar src/lib/tema.ts. A chave e a regra são as do painel.
 */
export const CHAVE_TEMA = 'ambao_tema'
export const CONSULTA_ESCURO = '(prefers-color-scheme: dark)'

/** Roda como texto dentro do <head>: não pode importar nada. */
export const SCRIPT_TEMA = `(function(){var t='sistema';try{t=localStorage.getItem('${CHAVE_TEMA}')||'sistema'}catch(e){}var e=t==='escuro'||(t!=='claro'&&window.matchMedia&&matchMedia('${CONSULTA_ESCURO}').matches);document.documentElement.dataset.theme=e?'dark':'light'})()`
