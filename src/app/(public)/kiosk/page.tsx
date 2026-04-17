import { QuestionnaireFlow } from "../../../components/questionnaire/QuestionnaireFlow";

export default function KioskPage() {
  return (
    <main>
      <section className="max-w-3xl mx-auto px-5 py-8 md:py-12 grid gap-5">
        <h1
          className="m-0 font-bold text-vm-ink leading-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
        >
          Kiosk VinoMatch
        </h1>
        <p
          className="m-0 text-vm-muted"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
        >
          Rispondi alle domande sul tablet e ottieni subito la selezione vini con QR per il tuo telefono.
        </p>
        <QuestionnaireFlow onCompleteRedirect="/kiosk/results" />
      </section>
    </main>
  );
}
