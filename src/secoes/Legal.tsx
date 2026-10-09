import { legal } from "@/dados";
import { Valor } from "./Texto";

export default function Legal() {
  return (
    <section id="legal" className="wrap legal">
      <details>
        <summary>{legal.titulo}</summary>
        <div>
          {legal.textos.map((t) => (
            <p key={t}>
              <Valor texto={t} />
            </p>
          ))}
        </div>
      </details>
    </section>
  );
}
