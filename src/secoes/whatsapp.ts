import { contato } from "@/dados";
import { pendente } from "./util";

/* enquanto o telefone for [PREENCHER], os botões de WhatsApp levam ao cadastro, como no protótipo */
export const temWhatsApp = () => !pendente(contato.telefone) && contato.telefone.replace(/\D/g, "").length >= 10;

export function linkWhatsApp(mensagem = contato.whatsappMensagem) {
  if (!temWhatsApp()) return { href: "#cadastro" };
  const numero = contato.telefone.replace(/\D/g, "");
  return {
    href: `https://wa.me/55${numero}?text=${encodeURIComponent(mensagem)}`,
    target: "_blank",
    rel: "noopener",
  };
}
