import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DiscoveryResultsGrid } from "../../../components/discovery/DiscoveryResultsGrid";

export default async function DiscoverPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("survey_session_id")?.value;

  if (!sessionId) {
    redirect("/questionnaire");
  }

  return (
    <main>
      <section style={{ maxWidth: 980, margin: "0 auto", padding: "24px 16px", display: "grid", gap: 14 }}>
        <h1 style={{ margin: 0 }}>Vini vicino a te</h1>
        <p style={{ margin: 0, color: "var(--vm-muted)" }}>
          Regola i filtri per trovare velocemente i vini piu adatti al tuo profilo.
        </p>
        <DiscoveryResultsGrid hasSession={Boolean(sessionId)} />
      </section>
    </main>
  );
}
