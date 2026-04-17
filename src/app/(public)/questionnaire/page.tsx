import { QuestionnaireFlow } from "../../../components/questionnaire/QuestionnaireFlow";

export default function QuestionnairePage() {
  return (
    <main className="min-h-[calc(100vh-56px)] bg-vm-bg flex flex-col">
      {/* Announcement bar */}
      <div className="bg-vm-accent text-white text-center py-2 text-xs font-semibold tracking-widest uppercase">
        Scopri il vino perfetto vicino a te — gratis, in 2 minuti
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="mb-8 text-center max-w-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-vm-ink leading-tight">
            Quale vino fa per te?
          </h1>
          <p className="mt-3 text-vm-muted text-base">
            Rispondi a poche domande — ti troviamo i vini giusti vicino a te.
          </p>
        </div>

        <div className="w-full max-w-xl">
          <QuestionnaireFlow />
        </div>
      </div>
    </main>
  );
}
