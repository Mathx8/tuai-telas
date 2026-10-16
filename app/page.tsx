import { Cabecalho } from "@/components/Cabecalho";
import { Seletor } from "@/components/home/Seletor";
import { lerTelas } from "@/lib/fontes";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ t?: string | string[] }>;
}) {
  const { t } = await searchParams;

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
        <Seletor inicial={lerTelas(t)} />
      </main>
    </>
  );
}