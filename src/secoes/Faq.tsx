"use client";

import { useRef, type MouseEvent } from "react";
import { MessageCircle, Plus } from "lucide-react";
import { faq } from "@/dados";
import { pad, reduz } from "./util";

const C = "cubic-bezier(.2,.75,.15,1)";

/* acordeão com uma pergunta aberta por vez e altura animada */
export default function Faq() {
  const lista = useRef<HTMLDivElement>(null);
  const anims = useRef(new WeakMap<HTMLDetailsElement, Animation>());

  const clique = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const d = e.currentTarget.parentElement as HTMLDetailsElement;
    const A = anims.current;
    const duracao = reduz() ? 0 : 420;
    const fechar = (d: HTMLDetailsElement) => {
      if (!d.open || A.get(d)) return;
      d.style.overflow = "hidden";
      const a = d.animate(
        { height: [d.offsetHeight + "px", (d.querySelector("summary")?.offsetHeight ?? 0) + 1 + "px"] },
        { duration: duracao, easing: C },
      );
      A.set(d, a);
      a.onfinish = () => {
        d.open = false;
        d.style.overflow = "";
        A.delete(d);
      };
    };
    if (d.open) return fechar(d);
    lista.current?.querySelectorAll("details[open]").forEach((x) => fechar(x as HTMLDetailsElement));
    const h0 = d.offsetHeight;
    d.open = true;
    const h1 = d.offsetHeight;
    d.style.overflow = "hidden";
    const a = d.animate({ height: [h0 + "px", h1 + "px"] }, { duration: duracao, easing: C });
    A.set(d, a);
    a.onfinish = () => {
      d.style.overflow = "";
      A.delete(d);
    };
  };

  return (
    <section id="duvidas" className="faq">
      <div className="wrap">
        <div className="faq-topo">
          <div>
            <p className="rot">{faq.rotulo}</p>
            <h2 className="titulo">{faq.titulo}</h2>
          </div>
          <div className="faq-cta">
            <p>{faq.cta.pergunta}</p>
            <a className="bt bt-verde" href={faq.cta.href}>
              <MessageCircle aria-hidden="true" /> {faq.cta.t}
            </a>
          </div>
        </div>
        <div className="faq-lista" ref={lista}>
          {faq.itens.map((q, i) => (
            <details key={q.p}>
              <summary onClick={clique}>
                <span className="n">{pad(i + 1)}</span>
                <span>{q.p}</span>
                <span className="faq-ic" aria-hidden="true">
                  <Plus aria-hidden="true" />
                </span>
              </summary>
              <p>{q.r}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
