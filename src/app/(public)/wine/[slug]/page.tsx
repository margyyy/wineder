import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { WineFeedbackToggle } from "../../../../components/matching/WineFeedbackToggle";
import { listWines } from "../../../../lib/data/repositories/wineRepository";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function WineDetailPage({ params }: Props) {
  const { slug } = await params;
  const wines = await listWines();
  const wine = wines.find((item) => item.slug === slug);

  if (!wine) {
    notFound();
  }

  const cookieStore = await cookies();
  const sessionId = cookieStore.get("survey_session_id")?.value ?? "";

  return (
    <main>
      <section style={{ maxWidth: 760, margin: "0 auto", padding: "24px 16px" }}>
        <h1 style={{ marginTop: 0 }}>{wine.name}</h1>
        <p style={{ color: "var(--vm-muted)" }}>Cantina: {wine.winery.name}</p>
        <p style={{ color: "var(--vm-muted)" }}>Score corpo: {wine.corpo.toFixed(2)}</p>
        {sessionId ? (
          <WineFeedbackToggle sessionId={sessionId} wineId={wine.id} />
        ) : (
          <p style={{ color: "var(--vm-muted)" }}>
            Completa prima il questionario per attivare like/dislike.
          </p>
        )}
      </section>
    </main>
  );
}
