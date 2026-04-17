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
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "24px 16px", display: "grid", gap: 14 }}>
        <h1 style={{ marginTop: 0 }}>{availability.wine.name}</h1>
        <p style={{ margin: 0, color: "var(--vm-muted)" }}>
          {availability.wine.color.toUpperCase()} • {availability.wine.alcoholPercent.toFixed(1)}% • {availability.wine.vintage}
        </p>

        <WineVerifiedBadge isVerified={availability.wine.isVerified} />

        {availability.wine.productionDescription ? (
          <section style={{ display: "grid", gap: 6 }}>
            <h2 style={{ margin: 0 }}>Produzione</h2>
            <p style={{ margin: 0 }}>{availability.wine.productionDescription}</p>
          </section>
        ) : null}

        <section style={{ display: "grid", gap: 6 }}>
          <h2 style={{ margin: 0 }}>Additivi dichiarati</h2>
          <WineAdditiveChips additives={availability.wine.additives} />
        </section>

        {sessionId ? (
          <WineFeedbackToggle sessionId={sessionId} wineId={availability.wine.id} />
        ) : (
          <p style={{ color: "var(--vm-muted)", margin: 0 }}>
            Completa prima il questionario per attivare like/dislike.
          </p>
        )}

        <section style={{ display: "grid", gap: 8 }}>
          <h2 style={{ margin: 0 }}>Dove trovarlo</h2>
          <WineAvailabilityMap points={availability.points} />
        </section>
      </section>
    </main>
  );
}
