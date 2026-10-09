import { fitas } from "@/dados";

/* cada fita repete o texto 4 vezes para o loop não ter emenda */
const repetir = (itens: string[]) => Array.from({ length: 4 }, () => itens).flat();

export default function Fitas() {
  return (
    <div className="fitas" aria-hidden="true">
      <div className="fita fita-amarela">
        <div>
          {repetir(fitas.amarela).map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>
      <div className="fita fita-verde">
        <div>
          {repetir(fitas.verde).map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
