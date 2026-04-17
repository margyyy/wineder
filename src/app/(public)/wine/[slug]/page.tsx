import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { WineFeedbackToggle } from "../../../../components/matching/WineFeedbackToggle";
import { WineAvailabilityMap } from "../../../../components/maps/WineAvailabilityMap";
import { WineAdditiveChips } from "../../../../components/wine/WineAdditiveChips";
import { WineVerifiedBadge } from "../../../../components/wine/WineVerifiedBadge";
import { listWineAvailabilityPoints } from "../../../../lib/data/repositories/discoveryRepository";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function WineDetailPage({ params }: Props) {
  const { slug } = await params;
  const availability = await listWineAvailabilityPoints(slug);

  if (!availability) {
    notFound();
  }

  const cookieStore = await cookies();
  const sessionId = cookieStore.get("survey_session_id")?.value ?? "";

  return (
    <main>
      <section className="max-w-3xl mx-auto px-4 py-6 md:py-10 grid gap-5">
        <h1 className="mt-0 text-2xl md:text-3xl font-bold">{availability.wine.name}</h1>
        <p className="m-0 text-vm-muted">
          {availability.wine.color.toUpperCase()} · {availability.wine.alcoholPercent.toFixed(1)}% · {availability.wine.vintage}
        </p>

        <WineVerifiedBadge isVerified={availability.wine.isVerified} />

        {availability.wine.productionDescription ? (
          <section className="grid gap-2">
            <h2 className="m-0 text-lg font-bold">Produzione</h2>
            <p className="m-0">{availability.wine.productionDescription}</p>
          </section>
        ) : null}

        <section className="grid gap-3">
          <h2 className="m-0 text-lg font-bold">Additivi dichiarati</h2>
          <WineAdditiveChips additives={availability.wine.additives} />
        </section>

        {sessionId ? (
          <WineFeedbackToggle sessionId={sessionId} wineId={availability.wine.id} />
        ) : (
          <p className="text-vm-muted m-0">
            Completa prima il questionario per attivare like/dislike.
          </p>
        )}

        <section className="grid gap-3">
          <h2 className="m-0 text-lg font-bold">Dove trovarlo</h2>
          <WineAvailabilityMap points={availability.points} />
        </section>
      </section>
    </main>
  );
}
