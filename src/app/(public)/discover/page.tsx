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
      <section className="max-w-5xl mx-auto px-4 py-6 md:py-8 grid gap-4">
        <h1 className="m-0 text-2xl md:text-3xl font-bold">Vini vicino a te</h1>
        <p className="m-0 text-vm-muted">
          Regola i filtri per trovare velocemente i vini più adatti al tuo profilo.
        </p>
        <DiscoveryResultsGrid hasSession={Boolean(sessionId)} />
      </section>
    </main>
  );
}
