"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { cadastro, empreendimento } from "@/dados";
import { aoDigitarTelefone, guardarRastreio, lerRastreio, reduz } from "./util";

/* formulário em 2 etapas: nome e WhatsApp, depois e-mail e aceite. Envia para /api/lead/ */
export default function LeadForm() {
  const { form } = cadastro;
  const [passo, setPasso] = useState(1);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    guardarRastreio();
    /* o cadastro rápido do hero preenche a etapa 1 e envia */
    const rapido = (e: Event) => {
      const f = ref.current;
      if (!f) return;
      const { nome, telefone } = (e as CustomEvent<{ nome: string; telefone: string }>).detail;
      (f.elements.namedItem("nome") as HTMLInputElement).value = nome;
      (f.elements.namedItem("telefone") as HTMLInputElement).value = telefone;
      document.getElementById("cadastro")?.scrollIntoView({ behavior: reduz() ? "auto" : "smooth" });
      setTimeout(() => f.requestSubmit(), 500);
    };
    addEventListener("lead-rapido", rapido);
    return () => removeEventListener("lead-rapido", rapido);
  }, []);

  const enviar = (f: HTMLFormElement) => {
    const campo = (n: string) => (f.elements.namedItem(n) as HTMLInputElement).value;
    fetch("/api/lead/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: campo("nome"),
        email: campo("email"),
        telefone: campo("telefone"),
        website: campo("website"),
        consentimento: (f.elements.namedItem("consentimento") as HTMLInputElement).checked,
        ...lerRastreio(),
      }),
      keepalive: true,
    }).catch(() => {});
  };

  const submeter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const atual = f.querySelector(".passo:not([hidden])");
    if (!atual) return;
    const inv = [...atual.querySelectorAll("input")].find((i) => !i.checkValidity());
    if (inv) {
      inv.reportValidity();
      return;
    }
    if (passo === 2) enviar(f);
    setPasso(passo + 1);
  };

  return (
    <form className="etapas" noValidate ref={ref} onSubmit={submeter}>
      <p className="passo-txt" aria-live="polite">
        <span>{passo < 3 ? form.etapa(passo) : form.pronto}</span>
        <i style={{ "--p": passo === 1 ? "50%" : "100%" } as CSSProperties}></i>
      </p>
      <div className="passo" hidden={passo !== 1}>
        <label htmlFor="cad-nome">
          {form.nome.rotulo}
          <input id="cad-nome" name="nome" type="text" autoComplete="name" placeholder={form.nome.placeholder} required minLength={2} />
        </label>
        <label htmlFor="cad-tel">
          {form.telefone.rotulo}
          <input
            id="cad-tel"
            name="telefone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={form.telefone.placeholder}
            required
            minLength={14}
            onInput={aoDigitarTelefone}
          />
        </label>
        <button className="bt bt-verde" type="submit">
          {form.continuar} <ArrowRight aria-hidden="true" />
        </button>
      </div>
      <div className="passo" hidden={passo !== 2}>
        <label htmlFor="cad-email">
          {form.email.rotulo}
          <input id="cad-email" name="email" type="email" autoComplete="email" placeholder={form.email.placeholder} required />
        </label>
        <label className="aceite" htmlFor="cad-ok">
          <input id="cad-ok" name="consentimento" type="checkbox" required />
          <span>
            {form.aceite.antes}
            <a href={empreendimento.privacidade} target="_blank" rel="noopener">
              {form.aceite.link}
            </a>
            {form.aceite.depois}
          </span>
        </label>
        <div className="linha-bt">
          <button className="bt bt-linha" type="button" onClick={() => setPasso(1)}>
            {form.voltar}
          </button>
          <button className="bt bt-verde" type="submit">
            {form.enviar}
          </button>
        </div>
      </div>
      <p className="ok" role="status" hidden={passo !== 3}>
        {form.ok}
      </p>
      {/* campo isca: pessoas não veem, robôs preenchem */}
      <div hidden aria-hidden="true">
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
    </form>
  );
}
