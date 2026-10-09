"use client";

import { useEffect, useState } from "react";
import { barraMovel } from "@/dados";

/* barra fixa no celular: aparece depois do hero e some enquanto o cadastro está na tela */
export default function BarraMovel() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    let cadNaTela = false;
    const atu = () => setOn(scrollY > innerHeight * 0.8 && !cadNaTela);
    const cad = document.getElementById("cadastro");
    const io = new IntersectionObserver(([e]) => {
      cadNaTela = e.isIntersecting;
      atu();
    });
    if (cad) io.observe(cad);
    addEventListener("scroll", atu, { passive: true });
    return () => {
      io.disconnect();
      removeEventListener("scroll", atu);
    };
  }, []);

  return (
    <div className={`barra-movel${on ? " on" : ""}`}>
      <span>{barraMovel.texto}</span>
      <a className="bt bt-areia" href={barraMovel.cta.href}>
        {barraMovel.cta.t}
      </a>
    </div>
  );
}
