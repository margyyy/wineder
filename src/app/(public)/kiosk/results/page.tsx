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
      <section className="max-w-5xl mx-auto px-4 py-6 md:py-10 grid gap-5">
        <h1 className="m-0 text-2xl md:text-3xl font-bold">Risultati kiosk pronti</h1>
        <KioskResultsView />
      </section>
    </main>
  );
}
