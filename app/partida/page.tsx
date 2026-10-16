import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Multiview } from "@/components/partida/Multiview";
import { lerTelas } from "@/lib/fontes";

export const metadata: Metadata = { title: "Assistindo" };

type SearchParams = Promise<{ t?: string | string[] }>;

async function MultiviewComUrl({ searchParams }: { searchParams: SearchParams }) {
    const { t } = await searchParams;
    const telas = lerTelas(t);
    if (telas.length === 0) redirect("/");

    return <Multiview key={telas.map((tela) => tela.id).join("|")} telas={telas} />;
}

export default function Partida({ searchParams }: { searchParams: SearchParams }) {
    return (
        <Suspense fallback={<div className="h-dvh bg-fundo" />}>
            <MultiviewComUrl searchParams={searchParams} />
        </Suspense>
    );
}