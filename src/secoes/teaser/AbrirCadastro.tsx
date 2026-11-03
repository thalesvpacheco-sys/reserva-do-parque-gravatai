import { ArrowRight } from "lucide-react";

/* os botões rolam até o formulário de cadastro, que fica aberto no fim da página (id="cadastro") */
export default function AbrirCadastro({ texto, cor }: { texto: string; cor: "verde" | "ipe" }) {
  return (
    <a className={`tz-bt tz-bt-${cor}`} href="#cadastro">
      {texto} <ArrowRight aria-hidden="true" />
    </a>
  );
}
