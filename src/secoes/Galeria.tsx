"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Hand, X } from "lucide-react";
import { galeria } from "@/dados";
import { Rico } from "./Texto";
import { pad, reduz } from "./util";
import { useSwipe } from "./useSwipe";

const D = galeria.itens;

/* faixa que corre sozinha, desacelera no hover e arrasta com impulso; um clique sem arrasto abre a caixa */
function Faixa({ vel, itens, abrir }: { vel: number; itens: number[]; abrir: (i: number) => void }) {
  const tr = useRef<HTMLDivElement>(null);
  const st = useRef({ x: 0, v: vel, arr: null as { lx: number } | null, hover: false, mov: 0 });

  useEffect(() => {
    const red = reduz();
    let raf = 0;
    const tick = () => {
      const s = st.current;
      const t = tr.current;
      if (t) {
        if (!s.arr) {
          const alvo = red ? 0 : s.hover ? vel * 0.25 : vel;
          s.v += (alvo - s.v) * 0.05;
          s.x -= s.v;
        }
        /* o conteúdo está repetido 3 vezes: volta um terço para o loop não ter emenda */
        const L = t.scrollWidth / 3;
        if (s.x < -L) s.x += L;
        if (s.x > 0) s.x -= L;
        t.style.transform = `translateX(${s.x}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [vel]);

  const repetidos = [...itens, ...itens, ...itens];

  return (
    <div
      className="gf-linha"
      onMouseEnter={() => (st.current.hover = true)}
      onMouseLeave={() => (st.current.hover = false)}
      onPointerDown={(e) => {
        st.current.arr = { lx: e.clientX };
        st.current.mov = 0;
        e.currentTarget.classList.add("arrastando");
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        const s = st.current;
        if (!s.arr) return;
        const dx = e.clientX - s.arr.lx;
        s.arr.lx = e.clientX;
        s.x += dx;
        s.v = -dx;
        s.mov += Math.abs(dx);
      }}
      onPointerUp={(e) => {
        const s = st.current;
        if (!s.arr) return;
        s.arr = null;
        e.currentTarget.classList.remove("arrastando");
        if (s.mov < 6) {
          const b = document.elementFromPoint(e.clientX, e.clientY)?.closest<HTMLElement>(".gf");
          if (b) abrir(Number(b.dataset.i));
        }
      }}
      onPointerCancel={(e) => {
        st.current.arr = null;
        e.currentTarget.classList.remove("arrastando");
      }}
    >
      <div className="gf-tr" ref={tr}>
        {repetidos.map((i, k) => (
          <button
            key={k}
            type="button"
            className="gf"
            data-i={i}
            aria-label={`${galeria.ampliar} ${D[i].t}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                abrir(i);
              }
            }}
          >
            <img src={galeria.imagem800(D[i].im)} alt="" loading="lazy" draggable={false} />
            <span>
              <small>{D[i].c}</small>
              {D[i].t}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* galeria: duas faixas de fotos e a caixa com a foto grande, setas e miniaturas */
export default function Galeria() {
  /* null até a primeira abertura: a caixa começa vazia, como no protótipo */
  const [at, setAt] = useState<number | null>(null);
  const [foto, setFoto] = useState<number | null>(null);
  const [troca, setTroca] = useState(false);
  const atRef = useRef(0);
  const dl = useRef<HTMLDialogElement>(null);
  const tmbs = useRef<(HTMLButtonElement | null)[]>([]);

  const mostra = useCallback((i: number) => {
    const a = (i + D.length) % D.length;
    atRef.current = a;
    setAt(a);
    setTroca(true);
    setTimeout(() => {
      setFoto(a);
      setTroca(false);
    }, 150);
    tmbs.current[a]?.scrollIntoView({ block: "nearest", inline: "center" });
  }, []);

  const abrir = useCallback(
    (i: number) => {
      mostra(i);
      dl.current?.showModal();
    },
    [mostra],
  );

  const swipe = useSwipe((d) => mostra(atRef.current + d));

  return (
    <section id="galeria" className="gfs">
      <div className="wrap topo-sec">
        <div>
          <p className="rot">{galeria.rotulo}</p>
          <h2 className="titulo">
            <Rico texto={galeria.titulo} />
          </h2>
        </div>
        <p className="dica">
          <Hand aria-hidden="true" /> {galeria.dica}
        </p>
      </div>
      {galeria.linhas.map((l) => (
        <Faixa key={l.vel} vel={l.vel} itens={l.itens} abrir={abrir} />
      ))}
      <dialog
        className="caixa"
        ref={dl}
        onClick={(e) => {
          if (e.target === dl.current) dl.current.close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") mostra(atRef.current + 1);
          if (e.key === "ArrowLeft") mostra(atRef.current - 1);
        }}
      >
        <figure>
          <div className="cx-img" {...swipe}>
            <img
              alt={foto === null ? "" : D[foto].t}
              src={foto === null ? undefined : galeria.imagem(D[foto].im)}
              className={troca ? "troca" : undefined}
            />
          </div>
          <figcaption>
            <span className="cap">{at === null ? "" : D[at].c}</span>
            <strong>{at === null ? "" : D[at].t}</strong>
            <span className="d">{at === null ? "" : D[at].d}</span>
          </figcaption>
        </figure>
        <div className="cx-tmb">
          {D.map((d, j) => (
            <button
              key={d.im}
              type="button"
              aria-label={d.t}
              aria-pressed={at === null ? undefined : j === at}
              onClick={() => mostra(j)}
              ref={(el) => {
                tmbs.current[j] = el;
              }}
            >
              <img src={galeria.imagem800(d.im)} alt="" />
            </button>
          ))}
        </div>
        <button className="seta ant" type="button" aria-label={galeria.setas.anterior} onClick={() => mostra(atRef.current - 1)}>
          <ArrowLeft aria-hidden="true" />
        </button>
        <button className="seta prox" type="button" aria-label={galeria.setas.proxima} onClick={() => mostra(atRef.current + 1)}>
          <ArrowRight aria-hidden="true" />
        </button>
        <button className="fechar" type="button" aria-label={galeria.fechar} onClick={() => dl.current?.close()}>
          <X aria-hidden="true" />
        </button>
        <span className="cont">{at === null ? "" : `${pad(at + 1)} / ${pad(D.length)}`}</span>
      </dialog>
    </section>
  );
}
