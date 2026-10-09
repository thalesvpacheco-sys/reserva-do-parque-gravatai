import { Fragment, type ReactNode } from "react";
import { pendente } from "./util";

/* **negrito** vira <strong> e *itálico* vira <em> */
export function Rico({ texto }: { texto: string }) {
  const partes: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*/g;
  let ult = 0;
  for (const m of texto.matchAll(re)) {
    if (m.index > ult) partes.push(texto.slice(ult, m.index));
    partes.push(m[1] !== undefined ? <strong key={m.index}>{m[1]}</strong> : <em key={m.index}>{m[2]}</em>);
    ult = m.index + m[0].length;
  }
  if (ult < texto.length) partes.push(texto.slice(ult));
  return <Fragment>{partes}</Fragment>;
}

/* valor que pode estar pendente: [PREENCHER] aparece com o tracejado .pend */
export function Valor({ texto }: { texto: string }) {
  return pendente(texto) ? <span className="pend">{texto}</span> : <>{texto}</>;
}
