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
      <section style={{ maxWidth: 760, margin: "0 auto", padding: "20px 14px", display: "grid", gap: 12 }}>
        <h1 style={{ margin: 0 }}>Lista vini dal kiosk</h1>
        <p style={{ margin: 0, color: "var(--vm-muted)" }}>Sessione condivisa: {share.code}</p>

        <div style={{ display: "grid", gap: 10 }}>
          {share.wines.map((wine) => (
            <article key={wine.id} style={{ border: "1px solid var(--vm-border)", borderRadius: 14, padding: 12, display: "grid", gap: 4 }}>
              <strong>{wine.name}</strong>
              <span style={{ color: "var(--vm-muted)" }}>{wine.wineryName}</span>
              <span style={{ color: "var(--vm-muted)" }}>
                {wine.color.toUpperCase()} • {wine.alcoholPercent.toFixed(1)}% • {wine.vintage}
              </span>
              <Link href={`/wine/${wine.slug}`} style={{ color: "var(--vm-accent)", fontWeight: 600 }}>
                Apri scheda vino
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
