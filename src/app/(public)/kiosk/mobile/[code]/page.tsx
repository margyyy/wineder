import Link from "next/link";
import { notFound } from "next/navigation";
import { getKioskShareByCode } from "../../../../../lib/data/repositories/kioskRepository";

type Props = {
  params: Promise<{ code: string }>;
};

export default async function KioskMobilePage({ params }: Props) {
  const { code } = await params;
  const share = await getKioskShareByCode(code);

  if (!share) {
    notFound();
  }

  return (
    <main>
      <section className="max-w-2xl mx-auto px-4 py-6 grid gap-4">
        <h1 className="m-0 text-2xl font-bold">Lista vini dal kiosk</h1>
        <p className="m-0 text-vm-muted text-sm">Sessione condivisa: {share.code}</p>

        <div className="grid gap-3">
          {share.wines.map((wine) => (
            <article
              key={wine.id}
              className="border border-vm-border rounded-2xl p-4 grid gap-1 bg-vm-surface"
            >
              <strong className="text-base font-bold">{wine.name}</strong>
              <span className="text-vm-muted text-sm">{wine.wineryName}</span>
              <span className="text-vm-muted text-sm">
                {wine.color.toUpperCase()} · {wine.alcoholPercent.toFixed(1)}% · {wine.vintage}
              </span>
              <Link
                href={`/wine/${wine.slug}`}
                className="mt-2 min-h-[44px] flex items-center justify-center rounded-xl bg-vm-accent text-white font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Apri scheda vino
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
