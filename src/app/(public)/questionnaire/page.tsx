import { QuestionnaireFlow } from "../../../components/questionnaire/QuestionnaireFlow";

export default function QuestionnairePage() {
  return (
    <main>
      <section className="max-w-2xl mx-auto px-4 py-6 md:py-10 grid gap-4">
        <h1 className="mt-0 text-2xl md:text-3xl font-bold">Troviamo il vino giusto per te</h1>
        <p className="text-vm-muted m-0">
          Rispondi a poche domande semplici: in meno di un minuto avrai i primi suggerimenti.
        </p>
        <QuestionnaireFlow />
      </section>
    </main>
  );
}
