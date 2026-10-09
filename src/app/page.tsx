import BairroBento from "@/secoes/BairroBento";
import BarraMovel from "@/secoes/BarraMovel";
import Cadastro from "@/secoes/Cadastro";
import ComoConstruimos from "@/secoes/ComoConstruimos";
import Faq from "@/secoes/Faq";
import Fitas from "@/secoes/Fitas";
import Galeria from "@/secoes/Galeria";
import Grupo from "@/secoes/Grupo";
import Header from "@/secoes/Header";
import HeroPainel from "@/secoes/HeroPainel";
import Imersivo from "@/secoes/Imersivo";
import Infraestrutura from "@/secoes/Infraestrutura";
import Lazer from "@/secoes/Lazer";
import Legal from "@/secoes/Legal";
import Localizacao from "@/secoes/Localizacao";
import MapaBairro from "@/secoes/MapaBairro";
import Outros from "@/secoes/Outros";
import Rodape from "@/secoes/Rodape";

/* mesma ordem do prototipo/index.html */
export default function Home() {
  return (
    <div className="lp">
      <Header />
      <main>
        <HeroPainel />
        <Fitas />
        <BairroBento />
        <Infraestrutura />
        <ComoConstruimos />
        <Imersivo qual="ciclofaixa" />
        <Lazer />
        <Cadastro />
        <Galeria />
        <Localizacao />
        <MapaBairro />
        <Grupo />
        <Outros />
        <Faq />
        <Imersivo qual="fim" />
        <Legal />
        <Rodape />
        <BarraMovel />
      </main>
    </div>
  );
}
