export interface Time {
    id: number;
    nome: string;
}

export interface Jogo {
    id: number;
    competicao: { id: number; nome: string };
    casa: Time;
    fora: Time;
    aoVivo: boolean;
    minuto: string | null;
    /** timestamp em segundos */
    inicio: number;
    placar: { casa: number; fora: number } | null;
}

export interface Competicao {
    id: number;
    nome: string;
    jogos: Jogo[];
}

export interface CanalDoJogo {
    id: string;
    nome: string;
}