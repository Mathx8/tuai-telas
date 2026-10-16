export interface CanalPlayer {
    id: string;
    rotulo: string;
}

export interface Emissora {
    id: string;
    nome: string;
    logo: string;
    canais: CanalPlayer[];
}

function numerados(prefixo: string, qtd: number, primeiroSemNumero = false): CanalPlayer[] {
    return Array.from({ length: qtd }, (_, i) => ({
        id: primeiroSemNumero && i === 0 ? prefixo : `${prefixo}${i + 1}`,
        rotulo: String(i + 1),
    }));
}

export const EMISSORAS: Emissora[] = [
    {
        id: "globo",
        nome: "Globo",
        logo: "/logos/globo.jpg",
        canais: [
            { id: "globosp", rotulo: "SP" },
            { id: "globorj", rotulo: "RJ" },
            { id: "globomg", rotulo: "MG" },
        ],
    },
    { id: "sportv", nome: "SporTV", logo: "/logos/sportv.jpg", canais: numerados("sportv", 4, true) },
    { id: "espn", nome: "ESPN", logo: "/logos/espn.jpg", canais: numerados("espn", 6, true) },
    { id: "max", nome: "HBO Max", logo: "/logos/max.jpeg", canais: numerados("max", 8) },
    { id: "premiere", nome: "Premiere", logo: "/logos/premiere.jpg", canais: numerados("premiere", 8, true) },
    { id: "primevideo", nome: "Prime Video", logo: "/logos/primevideo.jpg", canais: numerados("primevideo", 4) },
    { id: "ds", nome: "Disney+", logo: "/logos/Disney+.jpg", canais: numerados("ds", 4) },
    { id: "paramount", nome: "Paramount+", logo: "/logos/paramount.jpeg", canais: numerados("paramount", 2) },
];

export function emissoraDoCanal(id: string) {
    return EMISSORAS.find((e) => e.canais.some((c) => c.id === id));
}

export function nomeDoCanal(id: string): string {
    const emissora = emissoraDoCanal(id);
    const canal = emissora?.canais.find((c) => c.id === id);
    if (!emissora || !canal) return id;
    return emissora.canais.length === 1 ? emissora.nome : `${emissora.nome} ${canal.rotulo}`;
}