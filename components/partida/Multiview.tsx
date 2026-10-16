"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
    ArrowLeftRight,
    Check,
    ChevronLeft,
    LayoutGrid,
    Maximize,
    Minimize,
    PictureInPicture2,
    Share2,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { serializar, type Tela } from "@/lib/fontes";
import { TelaVideo } from "./TelaVideo";

type Modo = "principal" | "dividido";

const GRADES: Record<number, string> = {
    1: "grid-cols-1 grid-rows-1",
    2: "grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1",
    3: "grid-cols-1 grid-rows-3 sm:grid-cols-2 sm:grid-rows-2",
    4: "grid-cols-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-2",
};

function classeDaTela(modo: Modo, total: number, posicao: number) {
    if (modo === "principal") {
        return posicao === 0
            ? "col-start-1 row-start-1"
            : "col-start-1 row-start-1 z-10 m-3 w-2/5 max-w-md self-start justify-self-end aspect-video ring-2 ring-white/30 shadow-2xl shadow-black/60";
    }
    return total === 3 && posicao === 0 ? "sm:col-span-2" : "";
}

function BotaoIcone({
    titulo,
    ativo,
    desabilitado,
    onClick,
    children,
}: {
    titulo: string;
    ativo?: boolean;
    desabilitado?: boolean;
    onClick: () => void;
    children: ReactNode;
}) {
    return (
        <button
            type="button"
            title={titulo}
            aria-label={titulo}
            disabled={desabilitado}
            onClick={onClick}
            className={cn(
                "grid size-9 place-items-center rounded-xl transition disabled:cursor-not-allowed disabled:opacity-30 [&_svg]:size-[18px]",
                ativo
                    ? "bg-marca text-white shadow-md shadow-marca/30"
                    : "text-white/70 enabled:hover:bg-white/10 enabled:hover:text-white",
            )}
        >
            {children}
        </button>
    );
}

export function Multiview({ telas }: { telas: Tela[] }) {
    const raiz = useRef<HTMLDivElement>(null);
    const [modo, setModo] = useState<Modo>(telas.length === 2 ? "principal" : "dividido");
    const [invertido, setInvertido] = useState(false);
    const [telaCheia, setTelaCheia] = useState(false);
    const [copiado, setCopiado] = useState(false);

    const total = telas.length;
    const duas = total === 2;
    const modoEfetivo: Modo = duas ? modo : "dividido";

    const params = new URLSearchParams();
    telas.forEach((t) => params.append("t", serializar(t)));

    useEffect(() => {
        const aoMudar = () => setTelaCheia(Boolean(document.fullscreenElement));
        document.addEventListener("fullscreenchange", aoMudar);
        return () => document.removeEventListener("fullscreenchange", aoMudar);
    }, []);

    const alternarTelaCheia = () => {
        if (document.fullscreenElement) document.exitFullscreen();
        else raiz.current?.requestFullscreen?.().catch(() => { });
    };

    const copiarLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopiado(true);
            setTimeout(() => setCopiado(false), 2000);
        } catch {
            /* clipboard indisponível (http): ignora */
        }
    };

    return (
        <div ref={raiz} className="flex h-dvh flex-col bg-fundo">
            <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-superficie/80 px-3 backdrop-blur-xl sm:px-5">
                <Link
                    href={`/?${params}`}
                    className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                    <ChevronLeft className="size-4" />
                    <span className="hidden sm:inline">Editar telas</span>
                </Link>

                <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/5 p-1">
                    <BotaoIcone
                        titulo="Tela principal com miniatura"
                        ativo={modoEfetivo === "principal"}
                        desabilitado={!duas}
                        onClick={() => setModo("principal")}
                    >
                        <PictureInPicture2 />
                    </BotaoIcone>
                    <BotaoIcone titulo="Inverter telas" desabilitado={!duas} onClick={() => setInvertido((v) => !v)}>
                        <ArrowLeftRight />
                    </BotaoIcone>
                    <BotaoIcone
                        titulo="Telas divididas"
                        ativo={modoEfetivo === "dividido"}
                        desabilitado={!duas}
                        onClick={() => setModo("dividido")}
                    >
                        <LayoutGrid />
                    </BotaoIcone>
                </div>

                <div className="flex items-center gap-1">
                    <BotaoIcone titulo="Copiar link desta sessão" onClick={copiarLink}>
                        {copiado ? <Check /> : <Share2 />}
                    </BotaoIcone>
                    <BotaoIcone titulo="Tela cheia" onClick={alternarTelaCheia}>
                        {telaCheia ? <Minimize /> : <Maximize />}
                    </BotaoIcone>
                </div>
            </header>

            <main className={cn("grid min-h-0 flex-1 gap-2 p-2", modoEfetivo === "principal" ? GRADES[1] : GRADES[total])}>
                {telas.map((tela, i) => {
                    const posicao = invertido ? total - 1 - i : i;
                    return (
                        <TelaVideo
                            key={tela.id}
                            tela={tela}
                            ordem={posicao}
                            className={classeDaTela(modoEfetivo, total, posicao)}
                        />
                    );
                })}
            </main>
        </div>
    );
}