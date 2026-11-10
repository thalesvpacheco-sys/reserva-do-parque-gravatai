import Script from "next/script";
import { rdMonitoramento } from "@/dados";

/*
 * Código de monitoramento do RD Station, só nos teasers. Além de rastrear as visitas, é ele
 * que captura os formulários da página e envia a conversão ao RD (ver README, "Lead dos teasers").
 */
export default function MonitoramentoRd() {
  return <Script src={rdMonitoramento} strategy="afterInteractive" />;
}
