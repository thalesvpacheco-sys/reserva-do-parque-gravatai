"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, Hand } from "lucide-react";
import { lazer } from "@/dados";
import { Rico } from "./Texto";
import { pad, reduz } from "./util";

type Arrasto = { x: number; dx: number; vx: number; lx: number; lt: number };

const N = lazer.itens.length;

/* posição de cada carta na pilha: k = distância até a carta do topo */
const transformaPilha = (k: number) => `translateY(${k * 16}px) scale(${1 - k * 0.05}) rotate(${(k % 2 ? 1 : -1) * k * 2.2}deg)`;
const transformaTopo = (dx: number, tilt: number[]) =>
  `translateX(${dx}px) rotate(${dx * 0.05}deg) rotateX(${tilt[1]}deg) rotateY(${tilt[0]}deg)`;

/* estado inicial (carta 0 no topo), já no HTML do servidor */
const estiloInicial = (i: number): CSSProperties => ({
  zIndex: N - i,
  transform: i === 0 ? transformaTopo(0, [0, 0]) : transformaPilha(i),
  opacity: i > 3 ? 0 : 1,
});

/* pilha de cartas com miniaturas, autoplay, arrasto com impulso e teclado */
export default function Lazer() {
  const { itens } = lazer;
  const [at, setAt] = useState(0);
  const pilha = useRef<HTMLDivElement>(null);
  const cartas = useRef<(HTMLElement | null)[]>([]);
  const barras = useRef<(HTMLElement | null)[]>([]);
  const st = useRef({ at: 0, arr: null as Arrasto | null, pausa: false, naTela: false, acum: 0 });

  const desenhar = useCallback((dx = 0, tilt = [0, 0]) => {
    const a = st.current.at;
    cartas.current.forEach((c, i) => {
      if (!c) return;
      const k = (i - a + N) % N;
      const topo = k === 0;
      c.classList.toggle("topo", topo);
      c.style.zIndex = String(N - k);
      c.style.transform = topo ? transformaTopo(dx, tilt) : transformaPilha(k);
      c.style.opacity = k > 3 ? "0" : "1";
    });
  }, []);

  const ir = useCallback(
    (i: number, dir = 1) => {
      const s = st.current;
      const velho = cartas.current[s.at];
      s.at = (i + N) % N;
      s.acum = 0;
      if (dir && velho && velho !== cartas.current[s.at]) {
        velho.style.transform = `translateX(${dir * -130}%) rotate(${dir * -18}deg)`;
        velho.style.opacity = "0";
      }
      setTimeout(() => desenhar(), dir ? 240 : 0);
      setAt(s.at);
    },
    [desenhar],
  );

  useEffect(() => {
    const p = pilha.current;
    if (!p) return;
    const red = reduz();
    const io = new IntersectionObserver(([e]) => (st.current.naTela = e.isIntersecting), { threshold: 0.4 });
    io.observe(p);
    let ult = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const s = st.current;
      if (!s.pausa && s.naTela && !s.arr && !red) s.acum += t - ult;
      ult = t;
      const k = Math.min(1, s.acum / lazer.intervalo);
      barras.current.forEach((b, j) => b?.style.setProperty("--b", (j === s.at ? k * 100 : 0) + "%"));
      if (k >= 1) ir(s.at + 1, 1);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [ir]);

  const soltar = () => {
    const a = st.current.arr;
    if (!a) return;
    st.current.arr = null;
    pilha.current?.classList.remove("arrastando");
    if (Math.abs(a.dx) > 90 || Math.abs(a.vx) > 600) {
      const d = (a.dx || -a.vx) < 0 ? 1 : -1;
      ir(st.current.at + d, d);
    } else desenhar();
  };

  return (
    <section
      id="lazer"
      className="pilha-sec"
      onMouseEnter={() => (st.current.pausa = true)}
      onMouseLeave={() => (st.current.pausa = false)}
    >
      <div className="wrap pilha-g">
        <div className="pilha-txt">
          <p className="rot">{lazer.rotulo}</p>
          <h2 className="titulo">
            <Rico texto={lazer.titulo} />
          </h2>
          <div className="pilha-info" aria-live="polite">
            <span className="pilha-cont">{`${pad(at + 1)} / ${pad(N)}`}</span>
            {/* a key troca a cada carta para reiniciar a animação de entrada */}
            <h3 key={`t${at}`} className="entra">
              {itens[at].t}
            </h3>
            <p key={`d${at}`} className="entra">
              {itens[at].d}
            </p>
          </div>
          <div className="ctrl">
            <button className="seta" type="button" aria-label={lazer.setas.anterior} onClick={() => ir(st.current.at - 1, -1)}>
              <ArrowLeft aria-hidden="true" />
            </button>
            <button className="seta" type="button" aria-label={lazer.setas.proxima} onClick={() => ir(st.current.at + 1, 1)}>
              <ArrowRight aria-hidden="true" />
            </button>
            <span className="pilha-dica">
              <Hand aria-hidden="true" /> {lazer.dica}
            </span>
          </div>
          <div className="pm-linha">
            {itens.map((it, i) => (
              <button
                key={it.t}
                type="button"
                className="pm-b"
                aria-label={it.t}
                aria-pressed={i === at}
                onClick={() => {
                  if (i !== st.current.at) ir(i, i > st.current.at ? 1 : -1);
                }}
              >
                <img src={it.src} alt="" />
                <i
                  ref={(el) => {
                    barras.current[i] = el;
                  }}
                ></i>
              </button>
            ))}
          </div>
        </div>
        <div
          className="pilha"
          ref={pilha}
          tabIndex={0}
          aria-roledescription="carrossel"
          aria-label={lazer.rotuloPilha}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") ir(st.current.at + 1, 1);
            if (e.key === "ArrowLeft") ir(st.current.at - 1, -1);
          }}
          onPointerDown={(e) => {
            const c = (e.target as Element).closest<HTMLElement>(".pc");
            if (!c || Number(c.dataset.i) !== st.current.at) return;
            st.current.arr = { x: e.clientX, dx: 0, vx: 0, lx: e.clientX, lt: performance.now() };
            e.currentTarget.classList.add("arrastando");
            e.currentTarget.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            const a = st.current.arr;
            if (a) {
              const t = performance.now();
              a.dx = e.clientX - a.x;
              a.vx = ((e.clientX - a.lx) / Math.max(1, t - a.lt)) * 1000;
              a.lx = e.clientX;
              a.lt = t;
              desenhar(a.dx);
              return;
            }
            if (e.pointerType !== "mouse" || reduz()) return;
            const r = e.currentTarget.getBoundingClientRect();
            desenhar(0, [((e.clientX - r.left) / r.width - 0.5) * 10, -((e.clientY - r.top) / r.height - 0.5) * 8]);
          }}
          onMouseLeave={() => {
            if (!st.current.arr) desenhar();
          }}
          onPointerUp={soltar}
          onPointerCancel={soltar}
        >
          {itens.map((it, i) => {
            const Icone = it.icone;
            return (
              <article
                key={it.t}
                className={i === 0 ? "pc topo" : "pc"}
                data-i={i}
                style={estiloInicial(i)}
                ref={(el) => {
                  cartas.current[i] = el;
                }}
              >
                <img src={it.src} alt={it.t} draggable={false} />
                <span className="pc-t">
                  <Icone aria-hidden="true" />
                  {it.t}
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
