import Image from "next/image";
import { EMISSORAS } from "@/lib/canais";
import type { Adicionar } from "@/lib/fontes";

export function GradeCanais({ cheio, onAdicionar }: { cheio: boolean; onAdicionar: Adicionar }) {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            {EMISSORAS.map((e) => (
                <section key={e.id} className="rounded-2xl border border-white/10 bg-white/4 p-4">
                    <div className="mb-4 flex items-center gap-3">
                        <Image src={e.logo} alt="" width={88} height={88} className="size-11 rounded-xl object-cover" />
                        <h3 className="font-semibold">{e.nome}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {e.canais.map((c) => (
                            <button
                                key={c.id}
                                type="button"
                                disabled={cheio}
                                onClick={() => onAdicionar({ fonte: { tipo: "canal", canal: c.id }, titulo: "" })}
                                className="min-w-12 rounded-xl border border-white/10 bg-white/6 px-4 py-2 text-sm font-semibold transition enabled:hover:border-marca enabled:hover:bg-marca disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                            >
                                {c.rotulo}
                            </button>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}