"use client";

import { useState } from "react";
import { Link2, Tv } from "lucide-react";
import { cn } from "@/lib/cn";
import { MAX_TELAS, type Adicionar, type Tela } from "@/lib/fontes";
import { BandejaTelas } from "./BandejaTelas";
import { FormularioLink } from "./FormularioLink";
import { GradeCanais } from "./GradeCanais";

const ABAS = [
    { id: "canais", rotulo: "Canais", Icone: Tv },
    { id: "link", rotulo: "Link / YouTube", Icone: Link2 },
] as const;

type Aba = (typeof ABAS)[number]["id"];

export function Seletor({ inicial }: { inicial: Tela[] }) {
    const [aba, setAba] = useState<Aba>("canais");
    const [telas, setTelas] = useState<Tela[]>(inicial);

    const cheio = telas.length >= MAX_TELAS;

    const adicionar: Adicionar = (tela) => {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        setTelas((atual) => (atual.length >= MAX_TELAS ? atual : [...atual, { ...tela, id }]));
    };

    const remover = (id: string) => setTelas((atual) => atual.filter((t) => t.id !== id));

    return (
        <>
            <div
                role="tablist"
                className="mb-8 flex w-full gap-1 overflow-x-auto rounded-2xl border border-white/10 bg-white/5 p-1 sm:w-fit"
            >
                {ABAS.map(({ id, rotulo, Icone }) => (
                    <button
                        key={id}
                        role="tab"
                        type="button"
                        aria-selected={aba === id}
                        onClick={() => setAba(id)}
                        className={cn(
                            "flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition",
                            aba === id ? "bg-marca text-white shadow-lg shadow-marca/30" : "text-white/60 hover:text-white hover:cursor-pointer",
                        )}
                    >
                        <Icone className="size-4" />
                        {rotulo}
                    </button>
                ))}
            </div>

            {aba === "canais" ? (
                <GradeCanais cheio={cheio} onAdicionar={adicionar} />
            ) : (
                <FormularioLink cheio={cheio} onAdicionar={adicionar} />
            )}

            <BandejaTelas telas={telas} onRemover={remover} />
        </>
    );
}