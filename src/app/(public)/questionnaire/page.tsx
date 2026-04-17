import { QuestionnaireFlow } from "../../../components/questionnaire/QuestionnaireFlow";

export default function QuestionnairePage() {
  return (
    <main>
      <section style={{ maxWidth: 760, margin: "0 auto", padding: "24px 16px" }}>
        <h1 style={{ marginTop: 0 }}>Troviamo il vino giusto per te</h1>
        <p style={{ color: "var(--vm-muted)" }}>
          Rispondi a poche domande semplici: in meno di un minuto avrai i primi suggerimenti.
        </p>
        <QuestionnaireFlow />
      </section>
    </main>
  );
}
