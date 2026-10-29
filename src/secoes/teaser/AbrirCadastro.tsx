"use client";

import { ArrowRight } from "lucide-react";

/* o botão só avisa o CadastroTeaser (evento "abrir-cadastro"), com o texto dele como título do diálogo */
export default function AbrirCadastro({ texto, cor }: { texto: string; cor: "verde" | "ipe" }) {
  return (
    <button
      className={`tz-bt tz-bt-${cor}`}
      type="button"
      onClick={() => dispatchEvent(new CustomEvent("abrir-cadastro", { detail: { titulo: texto } }))}
    >
      {texto} <ArrowRight aria-hidden="true" />
    </button>
  );
}
