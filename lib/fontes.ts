import { nomeDoCanal } from "./canais";

export const MAX_TELAS = 4;

const PLAYER = "https://meuplayeronlinehd.com/myplay/watch.html?id=";
const ID_VIDEO = /^[\w-]{11}$/;
const ID_CANAL = /^UC[\w-]{22}$/;

/** De onde vem o vídeo de uma tela. */
export type Fonte =
    | { tipo: "canal"; canal: string }
    | { tipo: "youtube"; id: string; aoVivo?: boolean }
    | { tipo: "link"; url: string };

export interface Tela {
    id: string;
    fonte: Fonte;
    titulo: string;
}

export type Adicionar = (tela: Omit<Tela, "id">) => void;

function lerUrl(texto: string): URL | null {
    const t = texto.trim();
    if (!t) return null;
    try {
        return new URL(/^https?:\/\//i.test(t) ? t : `https://${t}`);
    } catch {
        return null;
    }
}

/** Interpreta um link colado pelo usuário (YouTube ou genérico). */
export function interpretarLink(texto: string): Fonte | null {
    const url = lerUrl(texto);
    if (!url || !url.hostname.includes(".")) return null;
    const host = url.hostname.replace(/^(www\.|m\.|music\.)/, "");

    if (host === "youtu.be") {
        const id = url.pathname.slice(1).split("/")[0];
        return ID_VIDEO.test(id) ? { tipo: "youtube", id } : null;
    }

    if (host === "youtube.com" || host === "youtube-nocookie.com") {
        const [a, b] = url.pathname.split("/").filter(Boolean);
        const v = url.searchParams.get("v");
        if (v && ID_VIDEO.test(v)) return { tipo: "youtube", id: v };
        if (["embed", "live", "shorts", "v"].includes(a) && ID_VIDEO.test(b ?? "")) {
            return { tipo: "youtube", id: b };
        }
        if (a === "channel" && ID_CANAL.test(b ?? "")) {
            return { tipo: "youtube", id: b, aoVivo: true };
        }
        return null;
    }

    return { tipo: "link", url: url.toString() };
}

export function urlDoEmbed(fonte: Fonte): string {
    switch (fonte.tipo) {
        case "canal":
            return `${PLAYER}${encodeURIComponent(fonte.canal)}`;
        case "youtube": {
            const base = "https://www.youtube-nocookie.com/embed";
            const extra = "autoplay=1&mute=1&rel=0&playsinline=1";
            return fonte.aoVivo
                ? `${base}/live_stream?channel=${fonte.id}&${extra}`
                : `${base}/${fonte.id}?${extra}`;
        }
        case "link":
            return fonte.url;
    }
}

export function rotuloDaFonte(fonte: Fonte): string {
    if (fonte.tipo === "canal") return nomeDoCanal(fonte.canal);
    if (fonte.tipo === "youtube") return fonte.aoVivo ? "YouTube ao vivo" : "YouTube";
    return new URL(fonte.url).hostname.replace(/^www\./, "");
}

/* ---- Telas na URL (/partida?t=...), assim dá para recarregar e compartilhar ---- */

export function serializar({ fonte, titulo }: Tela): string {
    const valor =
        fonte.tipo === "canal"
            ? `c:${fonte.canal}`
            : fonte.tipo === "youtube"
                ? `${fonte.aoVivo ? "l" : "y"}:${fonte.id}`
                : `u:${encodeURIComponent(fonte.url)}`;
    return titulo ? `${valor}|${titulo.replace(/\|/g, " ")}` : valor;
}

export function desserializar(token: string, indice: number): Tela | null {
    const [valor, ...resto] = token.split("|");
    const titulo = resto.join("|");
    const i = valor.indexOf(":");
    if (i < 0) return null;
    const tipo = valor.slice(0, i);
    const dado = valor.slice(i + 1);
    if (!dado) return null;

    let fonte: Fonte | null = null;
    if (tipo === "c") fonte = { tipo: "canal", canal: dado };
    else if (tipo === "y" && ID_VIDEO.test(dado)) fonte = { tipo: "youtube", id: dado };
    else if (tipo === "l" && ID_CANAL.test(dado)) fonte = { tipo: "youtube", id: dado, aoVivo: true };
    else if (tipo === "u") {
        try {
            const u = new URL(decodeURIComponent(dado));
            if (u.protocol === "http:" || u.protocol === "https:") fonte = { tipo: "link", url: u.toString() };
        } catch {
            /* link inválido: ignora */
        }
    }
    return fonte ? { id: `${indice}-${valor}`, fonte, titulo } : null;
}

export function lerTelas(t?: string | string[]): Tela[] {
    const tokens = Array.isArray(t) ? t : t ? [t] : [];
    return tokens
        .slice(0, MAX_TELAS)
        .map(desserializar)
        .filter((tela): tela is Tela => tela !== null);
}