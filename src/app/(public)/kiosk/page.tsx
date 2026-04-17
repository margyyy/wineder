import { QuestionnaireFlow } from "../../../components/questionnaire/QuestionnaireFlow";

export default function KioskPage() {
  return (
    <main>
      <section style={{ maxWidth: 980, margin: "0 auto", padding: "28px 20px", display: "grid", gap: 16 }}>
        <h1 style={{ margin: 0, fontSize: 42 }}>Kiosk VinoMatch</h1>
        <p style={{ margin: 0, color: "var(--vm-muted)", fontSize: 20 }}>
          Rispondi alle domande sul tablet e ottieni subito la selezione vini con QR per il tuo telefono.
        </p>
        <QuestionnaireFlow onCompleteRedirect="/kiosk/results" />
      </section>
    </main>
  );
}
