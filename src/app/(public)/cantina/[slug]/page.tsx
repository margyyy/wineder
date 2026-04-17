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
      <section className="max-w-3xl mx-auto px-4 py-6 md:py-10 grid gap-5">
        <h1 className="m-0 text-2xl md:text-3xl font-bold">{profile.workshop.winery.name}</h1>
        <p className="m-0 text-vm-muted">{profile.workshop.profileText ?? "Profilo non disponibile."}</p>
        <p className="m-0">{profile.workshop.historyText ?? "Nessuna storia disponibile."}</p>

        <section className="grid gap-3">
          <h2 className="m-0 text-lg font-bold">Vini collegati</h2>
          {profile.wines.length === 0 ? (
            <p className="m-0 text-vm-muted">Nessun vino collegato.</p>
          ) : (
            <ul className="m-0 pl-5 grid gap-2">
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
