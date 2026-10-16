import Image from "next/image";
import Link from "next/link";

export function Cabecalho() {
    return (
        <header className="sticky top-0 z-30 border-b border-white/10 bg-fundo/70 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6">
                <Link href="/" className="flex items-center gap-3">
                    <Image src="/logoT.png" alt="" width={36} height={36} priority />
                    <span className="text-lg font-semibold tracking-tight">
                        Multi Telas {" "}
                        <span className="bg-linear-to-r from-marca-clara to-destaque bg-clip-text text-transparent">
                            Tuai
                        </span>
                    </span>
                </Link>
            </div>
        </header>
    );
}