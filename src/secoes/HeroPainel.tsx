"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { hero } from "@/dados";
import { Rico } from "./Texto";
import { aoDigitarTelefone, pad, reduz } from "./util";
import { useSwipe } from "./useSwipe";

export default function HeroPainel() {
  const { slides } = hero;
  const N = slides.length;
  const [at, setAt] = useState(0);
  const sec = useRef<HTMLElement>(null);
  const barras = useRef<(HTMLElement | null)[]>([]);
  const st = useRef({ at: 0, acum: 0, pausa: false });

  const ir = useCallback(
    (i: number) => {
      st.current.at = (i + N) % N;
      st.current.acum = 0;
      setAt(st.current.at);
    },
    [N],
  );

  useEffect(() => {
    const s = sec.current;
    if (!s) return;
    const red = reduz();
    /* troca automática com barra de progresso na aba ativa */
    let ult = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const e = st.current;
      if (!e.pausa && !red) e.acum += t - ult;
      ult = t;
      const p = Math.min(1, e.acum / hero.intervalo);
      barras.current.forEach((b, j) => b?.style.setProperty("--b", (j === e.at ? p * 100 : 0) + "%"));
      if (p >= 1) ir(e.at + 1);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    /* header claro enquanto o hero escuro está atrás dele */
    const raiz = document.documentElement;
    const esc = () => {
      if (s.getBoundingClientRect().bottom > 80) raiz.dataset.heroEscuro = "";
      else delete raiz.dataset.heroEscuro;
    };
    esc();
    addEventListener("scroll", esc, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", esc);
    };
  }, [ir]);

  const swipe = useSwipe((d) => ir(st.current.at + d));

  const teclas = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") ir(st.current.at + 1);
    if (e.key === "ArrowLeft") ir(st.current.at - 1);
  };

  /* cadastro rápido: leva nome e WhatsApp para o formulário completo, que envia a etapa 1 */
  const rapido = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputs = [...e.currentTarget.querySelectorAll("input")];
    const inv = inputs.find((i) => !i.checkValidity());
    if (inv) {
      inv.reportValidity();
      return;
    }
    dispatchEvent(new CustomEvent("lead-rapido", { detail: { nome: inputs[0].value, telefone: inputs[1].value } }));
  };

  return (
    <section
      className="hero3 hp"
      ref={sec}
      onKeyDown={teclas}
      onMouseEnter={() => (st.current.pausa = true)}
      onMouseLeave={() => (st.current.pausa = false)}
      {...swipe}
    >
      <div className="hp-painel">
        <div className="hp-in">
          <p className="rot">{hero.rotulo}</p>
          <h1>
            <Rico texto={hero.titulo} />
          </h1>
          <p className="hp-sub">{hero.sub}</p>
          <form className="hp-form" noValidate onSubmit={rapido}>
            <label htmlFor="r-nome" className="sr">
              {hero.form.nome.rotulo}
            </label>
            <input id="r-nome" placeholder={hero.form.nome.placeholder} required minLength={2} autoComplete="name" />
            <label htmlFor="r-tel" className="sr">
              {hero.form.telefone.rotulo}
            </label>
            <input
              id="r-tel"
              type="tel"
              placeholder={hero.form.telefone.placeholder}
              required
              minLength={14}
              autoComplete="tel"
              onInput={aoDigitarTelefone}
            />
            <button className="bt bt-areia" type="submit">
              {hero.form.botao} <ArrowRight aria-hidden="true" />
            </button>
          </form>
          <ol className="hp-lista">
            {slides.map((s, i) => (
              <li key={s.src}>
                <button type="button" className="hp-i" aria-pressed={i === at} onClick={() => ir(i)}>
                  <b>{pad(i + 1)}</b>
                  <span>{s.t}</span>
                  <i
                    ref={(el) => {
                      barras.current[i] = el;
                    }}
                  ></i>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className="hp-foto">
        {slides.map((s, i) => (
          <figure key={s.src} className={`hs${i === at ? " on" : ""}`}>
            <img src={s.src} alt={s.t} />
          </figure>
        ))}
        <div className="hp-leg">
          {/* a key troca a cada slide para reiniciar a animação da legenda */}
          <span className="hp-cap" key={at}>
            {slides[at].t}
          </span>
          <div className="ctrl">
            <span className="cont">{`${pad(at + 1)} / ${pad(N)}`}</span>
            <button className="seta" type="button" aria-label={hero.setas.anterior} onClick={() => ir(st.current.at - 1)}>
              <ArrowLeft aria-hidden="true" />
            </button>
            <button className="seta" type="button" aria-label={hero.setas.proxima} onClick={() => ir(st.current.at + 1)}>
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
        <span className="selo-ref">{hero.selo}</span>
      </div>
    </section>
  );
}
