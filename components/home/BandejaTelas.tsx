"use client";

import Image from "next/image";
import Link from "next/link";
import { Link2, Play, Tv, X } from "lucide-react";
import { emissoraDoCanal } from "@/lib/canais";
import { MAX_TELAS, rotuloDaFonte, serializar, type Fonte, type Tela } from "@/lib/fontes";

function Miniatura({ fonte }: { fonte: Fonte }) {
    const base = "size-10 shrink-0 rounded-xl object-cover";

    if (fonte.tipo === "canal") {
        const emissora = emissoraDoCanal(fonte.canal);
        if (emissora) return <Image src={emissora.logo} alt="" width={80} height={80} className={base} />;
    }
    if (fonte.tipo === "youtube" && !fonte.aoVivo) {
        return (
            <Image
                src={`https://i.ytimg.com/vi/${fonte.id}/mqdefault.jpg`}
                alt=""
                width={80}
                height={80}
                unoptimized
                className={base}
            />
        );
    }

    const Icone = fonte.tipo === "link" ? Link2 : Tv;
    return (
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10">
            <Icone className="size-5 text-white/60" />
        </span>
    );
}

export function BandejaTelas({ telas, onRemover }: { telas: Tela[]; onRemover: (id: string) => void }) {
    const params = new URLSearchParams();
    telas.forEach((t) => params.append("t", serializar(t)));

    const classeBotao =
        "inline-flex h-14 items-center justify-center gap-2 rounded-2xl px-7 font-semibold transition";
    const rotuloBotao = (
        <>
            <Play className="size-5 fill-current" />
            Assistir{telas.length > 0 && ` (${telas.length})`}
        </>
    );

    return (
        <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-6 sm:pb-5">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 rounded-3xl border border-white/10 bg-superficie/85 p-3 shadow-2xl shadow-black/60 backdrop-blur-xl sm:flex-row sm:items-center sm:p-4">
                <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4">
                    {Array.from({ length: MAX_TELAS }, (_, i) => {
                        const tela = telas[i];
                        if (!tela) {
                            return (
                                <div
                                    key={`vazio-${i}`}
                                    className="flex h-14 items-center justify-center rounded-2xl border border-dashed border-white/15 text-xs text-white/30"
                                >
                                    Tela {i + 1}
                                </div>
                            );
                        }
                        return (
                            <div
                                key={tela.id}
                                className="flex h-14 items-center gap-2 rounded-2xl border border-white/10 bg-white/6 p-2 pr-1"
                            >
                                <Miniatura fonte={tela.fonte} />
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-xs font-semibold">{tela.titulo || rotuloDaFonte(tela.fonte)}</p>
                                    {tela.titulo && <p className="truncate text-[11px] text-white/50">{rotuloDaFonte(tela.fonte)}</p>}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => onRemover(tela.id)}
                                    aria-label="Remover tela"
                                    className="grid size-7 shrink-0 place-items-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
                                >
                                    <X className="size-4" />
                                </button>
                            </div>
                        );
                    })}
                </div>

                {telas.length > 0 ? (
                    <Link
                        href={`/partida?${params}`}
                        className={`${classeBotao} bg-linear-to-r from-marca to-destaque shadow-lg shadow-marca/30 hover:brightness-110`}
                    >
                        {rotuloBotao}
                    </Link>
                ) : (
                    <span aria-disabled className={`${classeBotao} cursor-not-allowed bg-white/10 text-white/40`}>
                        {rotuloBotao}
                    </span>
                )}
            </div>
        </div>
    );
}