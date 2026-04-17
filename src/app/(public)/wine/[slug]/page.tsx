import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { WineFeedbackToggle } from "../../../../components/matching/WineFeedbackToggle";
import { WineLocationPicker } from "../../../../components/wine/WineLocationPicker";
import { WineAdditiveDetail } from "../../../../components/wine/WineAdditiveDetail";
import { WineVerifiedBadge } from "../../../../components/wine/WineVerifiedBadge";
import { WineSensoryProfile } from "../../../../components/wine/WineSensoryProfile";
import { WineProductionAccordion } from "../../../../components/wine/WineProductionAccordion";
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
        {/* Wine hero image */}
        <div className="rounded-2xl overflow-hidden h-56 md:h-72 bg-vm-bg -mx-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={availability.wine.imageUrl}
            alt={availability.wine.name}
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="mt-0 text-2xl md:text-3xl font-bold">{availability.wine.name}</h1>
        <p className="m-0 text-vm-muted">
          {availability.wine.wineryName} · {availability.wine.color.toUpperCase()} · {availability.wine.alcoholPercent.toFixed(1)}% · {availability.wine.vintage}
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          <WineVerifiedBadge isVerified={availability.wine.isVerified} />
          {availability.wine.wineryWebsite && (
            <a
              href={availability.wine.wineryWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-vm-accent hover:underline"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              Scopri la cantina
            </a>
          )}
        </div>

        {availability.wine.productionDescription ? (
          <WineProductionAccordion description={availability.wine.productionDescription} />
        ) : null}

        <section className="grid gap-3">
          <h2 className="m-0 text-lg font-bold">Additivi dichiarati</h2>
          <WineAdditiveDetail additives={availability.wine.additives} />
        </section>

        {sessionId ? (
          <WineFeedbackToggle
            sessionId={sessionId}
            wineId={availability.wine.id}
            passportEntry={{
              slug: availability.wine.slug,
              name: availability.wine.name,
              color: availability.wine.color,
              vintage: availability.wine.vintage,
              wineryId: availability.points[0]?.id ?? 0,
              wineryName: availability.wine.wineryName,
              wineryLat: availability.points[0]?.lat ?? 0,
              wineryLng: availability.points[0]?.lng ?? 0,
            }}
          />
        ) : (
          <p className="text-vm-muted m-0">
            Completa prima il questionario per attivare like/dislike.
          </p>
        )}

        <WineSensoryProfile wine={availability.wine} />

        <section className="grid gap-3">
          <h2 className="m-0 text-lg font-bold">Dove trovarlo</h2>
          <WineLocationPicker points={availability.points} />
        </section>
      </section>
    </main>
  );
}
