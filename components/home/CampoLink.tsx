"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { interpretarLink, type Fonte } from "@/lib/fontes";

export function CampoLink({
    onFonte,
    desabilitado,
}: {
    onFonte: (fonte: Fonte) => void;
    desabilitado?: boolean;
}) {
    const [valor, setValor] = useState("");
    const [erro, setErro] = useState("");

    const enviar = () => {
        const fonte = interpretarLink(valor);
        if (!fonte) {
            setErro("Link inválido. Cole um link do YouTube ou o endereço de um player.");
            return;
        }
        onFonte(fonte);
        setValor("");
        setErro("");
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                enviar();
            }}
        >
            <div className="flex gap-2">
                <input
                    value={valor}
                    onChange={(e) => {
                        setValor(e.target.value);
                        setErro("");
                    }}
                    disabled={desabilitado}
                    aria-label="Link do vídeo"
                    placeholder="https://www.youtube.com/watch?v=…"
                    className={cn(
                        "min-w-0 flex-1 rounded-xl border bg-black/30 px-4 py-3 text-sm outline-none transition placeholder:text-white/30 focus:border-marca disabled:opacity-40",
                        erro ? "border-ao-vivo" : "border-white/10",
                    )}
                />
                <button
                    type="submit"
                    disabled={desabilitado || !valor.trim()}
                    className="inline-flex items-center gap-2 rounded-xl bg-marca px-4 py-3 text-sm font-semibold transition enabled:hover:bg-marca-clara disabled:opacity-40"
                >
                    <Plus className="size-4" /> Adicionar
                </button>
            </div>
            {erro && <p className="mt-2 text-sm text-ao-vivo">{erro}</p>}
        </form>
    );
}