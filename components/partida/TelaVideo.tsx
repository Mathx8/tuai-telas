"use client";

import { useRef, useState } from "react";
import { Loader2, Maximize2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { rotuloDaFonte, urlDoEmbed, type Tela } from "@/lib/fontes";

export function TelaVideo({
    tela,
    ordem,
    className,
}: {
    tela: Tela;
    ordem: number;
    className?: string;
}) {
    const caixa = useRef<HTMLDivElement>(null);
    const [carregado, setCarregado] = useState(false);
    const rotulo = rotuloDaFonte(tela.fonte);

    return (
        // `order` troca a posição só no CSS, então inverter telas não recarrega os iframes
        <div
            ref={caixa}
            style={{ order: ordem }}
            className={cn("group relative min-h-0 overflow-hidden rounded-2xl bg-black ring-1 ring-white/10", className)}
        >
            {!carregado && (
                <div className="absolute inset-0 grid place-items-center text-white/30">
                    <Loader2 className="size-8 animate-spin" />
                </div>
            )}

            <iframe
                title={tela.titulo || rotulo}
                src={urlDoEmbed(tela.fonte)}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                onLoad={() => setCarregado(true)}
                className="absolute inset-0 size-full border-0"
            />

            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 bg-linear-to-b from-black/70 to-transparent p-3 opacity-0 transition group-hover:opacity-100">
                <span className="truncate rounded-full bg-black/60 px-3 py-1 text-xs font-medium backdrop-blur">
                    {tela.titulo ? `${tela.titulo} · ${rotulo}` : rotulo}
                </span>
                <button
                    type="button"
                    onClick={() => caixa.current?.requestFullscreen?.().catch(() => { })}
                    aria-label="Esta tela em tela cheia"
                    title="Esta tela em tela cheia"
                    className="pointer-events-auto grid size-8 shrink-0 place-items-center rounded-full bg-black/60 text-white/80 backdrop-blur transition hover:bg-black/80 hover:text-white"
                >
                    <Maximize2 className="size-4" />
                </button>
            </div>
        </div>
    );
}