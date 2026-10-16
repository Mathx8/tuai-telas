import { Suspense } from "react";
import { Cabecalho } from "@/components/Cabecalho";
import { Seletor } from "@/components/home/Seletor";
import { lerTelas } from "@/lib/fontes";

type SearchParams = Promise<{ t?: string | string[] }>;

async function SeletorComUrl({ searchParams }: { searchParams: SearchParams }) {
  const { t } = await searchParams;
  return <Seletor inicial={lerTelas(t)} />;
}

export default function Home({ searchParams }: { searchParams: SearchParams }) {
  return (
    <>
      <Cabecalho />
      <main className="mx-auto max-w-6xl px-4 pb-72 pt-10 sm:px-6 sm:pb-40">
        <section className="mb-10 max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Todos os jogos,{" "}
            <span className="bg-linear-to-r from-marca-clara to-destaque bg-clip-text text-transparent">
              uma só tela.
            </span>
          </h1>
          <p className="mt-4 text-lg text-white/60">
            Escolha até 4 transmissões, entre canais ou links do YouTube, e assista tudo lado a lado.
          </p>
        </section>

        <Suspense fallback={<div className="h-12 w-72 animate-pulse rounded-2xl bg-white/5" />}>
          <SeletorComUrl searchParams={searchParams} />
        </Suspense>
      </main>
    </>
  );
}