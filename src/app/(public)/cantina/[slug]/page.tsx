import { notFound } from "next/navigation";
import { getPublicWineryProfile } from "../../../../lib/data/repositories/managementRepository";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PublicCantinaPage({ params }: Props) {
  const { slug } = await params;
  const profile = await getPublicWineryProfile(slug);

  if (!profile || !profile.workshop.winery) {
    notFound();
  }

  return (
    <main>
      <section style={{ maxWidth: 920, margin: "0 auto", padding: "24px 16px", display: "grid", gap: 14 }}>
        <h1 style={{ margin: 0 }}>{profile.workshop.winery.name}</h1>
        <p style={{ margin: 0, color: "var(--vm-muted)" }}>{profile.workshop.profileText ?? "Profilo non disponibile."}</p>
        <p style={{ margin: 0 }}>{profile.workshop.historyText ?? "Nessuna storia disponibile."}</p>

        <section style={{ display: "grid", gap: 8 }}>
          <h2 style={{ margin: 0 }}>Vini collegati</h2>
          {profile.wines.length === 0 ? (
            <p style={{ margin: 0, color: "var(--vm-muted)" }}>Nessun vino collegato.</p>
          ) : (
            <ul style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 4 }}>
              {profile.wines.map((wine) => (
                <li key={wine.id}>{wine.name}</li>
              ))}
            </ul>
          )}
        </section>
      </section>
    </main>
  );
}
