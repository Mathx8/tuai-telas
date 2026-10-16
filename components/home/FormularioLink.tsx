import type { Adicionar } from "@/lib/fontes";
import { CampoLink } from "./CampoLink";

const FORMATOS = [
    "youtube.com/watch?v=…",
    "youtu.be/…",
    "youtube.com/live/…",
    "youtube.com/channel/UC… (ao vivo)",
];

export function FormularioLink({ cheio, onAdicionar }: { cheio: boolean; onAdicionar: Adicionar }) {
    return (
        <div className="max-w-2xl rounded-3xl border border-white/10 bg-white/4 p-6 sm:p-8">
            <h2 className="text-xl font-semibold">Adicionar por link</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
                Cole um link do YouTube (vídeo, live ou canal ao vivo) ou o endereço de qualquer player que permita ser
                incorporado em outra página.
            </p>

            <div className="mt-6">
                <CampoLink desabilitado={cheio} onFonte={(fonte) => onAdicionar({ fonte, titulo: "" })} />
            </div>

            {cheio && <p className="mt-3 text-sm text-ao-vivo">Você já escolheu 4 telas. Remova uma para adicionar outra.</p>}

            <ul className="mt-6 flex flex-wrap gap-2 text-xs text-white/50">
                {FORMATOS.map((f) => (
                    <li key={f} className="rounded-full border border-white/10 px-3 py-1">
                        {f}
                    </li>
                ))}
            </ul>
            <p className="mt-4 text-xs text-white/40">
                Alguns sites e vídeos bloqueiam a reprodução dentro de outras páginas. Nesses casos a tela fica em branco.
            </p>
        </div>
    );
}