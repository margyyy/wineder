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
      <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-vm-ink m-0">
            I vini vicino a te
          </h1>
          <p className="mt-1 text-vm-muted text-sm m-0">
            Selezionati in base al tuo profilo gusto.
          </p>
        </div>
        <DiscoveryResultsGrid hasSession={Boolean(sessionId)} />
      </div>
    </main>
  );
}
