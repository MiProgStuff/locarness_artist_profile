import { ThreeBackground } from "@/components/ThreeBackground";

export default function HomePage() {
  return (
    <>
      <ThreeBackground />
      <section className="mx-auto flex min-h-[80vh] max-w-4xl flex-col items-center justify-center gap-4 px-6 py-24 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400">
          electronic · organic
        </p>
        <h1 className="text-4xl font-semibold text-white sm:text-5xl">
          Locarness
        </h1>
        <p className="max-w-xl text-neutral-400">
          Sons eletrónicos e orgânicos — e o ecossistema $LCRN, que liga a
          música aos apoiantes na rede Solana.
        </p>
      </section>
    </>
  );
}
