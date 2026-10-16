import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Multiview } from "@/components/partida/Multiview";
import { lerTelas } from "@/lib/fontes";

export const metadata: Metadata = { title: "Assistindo" };

export default async function Partida({
    searchParams,
}: {
    searchParams: Promise<{ t?: string | string[] }>;
}) {
    const { t } = await searchParams;
    const telas = lerTelas(t);
    if (telas.length === 0) redirect("/");
    return <Multiview key={telas.map((tela) => tela.id).join("|")} telas={telas} />;
}