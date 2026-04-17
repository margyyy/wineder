import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { KioskResultsView } from "../../../../components/kiosk/KioskResultsView";

export default async function KioskResultsPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("survey_session_id")?.value;

  if (!sessionId) {
    redirect("/kiosk");
  }

  return (
    <main>
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px", display: "grid", gap: 14 }}>
        <h1 style={{ margin: 0 }}>Risultati kiosk pronti</h1>
        <KioskResultsView />
      </section>
    </main>
  );
}
