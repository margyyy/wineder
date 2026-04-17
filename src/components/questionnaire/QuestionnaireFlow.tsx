"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { questionBank } from "../../lib/domain/matching/questionBank";
import { QuestionStepCard } from "./QuestionStepCard";
import { QuestionnaireProgress } from "./QuestionnaireProgress";

type Props = {
  onCompleteRedirect?: string;
};

export function QuestionnaireFlow({ onCompleteRedirect = "/discover" }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const currentQuestion = questionBank[step];
  const selectedOptionId = answers[currentQuestion.id];

  const payloadAnswers = useMemo(
    () =>
      Object.entries(answers).map(([questionId, optionId]) => ({
        questionId,
        optionId,
      })),
    [answers],
  );

  async function submitSurvey() {
    setError(null);
    setSubmitting(true);
    const response = await fetch("/api/matching/survey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: payloadAnswers }),
    });

    if (!response.ok) {
      const body = await response.json();
      setError(body.error ?? "Errore nel calcolo del matching");
      setSubmitting(false);
      return;
    }

    router.push(onCompleteRedirect);
  }

  const isLast = step === questionBank.length - 1;
  const canProceed = Boolean(selectedOptionId);

  return (
    <div className="grid gap-5">
      <QuestionnaireProgress current={step + 1} total={questionBank.length} />

      <QuestionStepCard
        question={currentQuestion}
        selectedOptionId={selectedOptionId}
        onSelect={(optionId) => {
          setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
        }}
      />

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setStep((prev) => Math.max(0, prev - 1))}
          disabled={step === 0}
          className="inline-flex items-center gap-2 min-h-[48px] px-5 rounded-xl border-2 border-vm-border bg-white text-vm-ink text-sm font-semibold disabled:opacity-30 hover:border-vm-muted transition-all cursor-pointer disabled:cursor-default"
        >
          ← Indietro
        </button>

        {!isLast ? (
          <button
            type="button"
            disabled={!canProceed}
            onClick={() => setStep((prev) => Math.min(questionBank.length - 1, prev + 1))}
            className="inline-flex items-center gap-2 min-h-[48px] px-6 rounded-xl bg-vm-ink text-white text-sm font-bold disabled:opacity-30 hover:opacity-80 transition-all cursor-pointer disabled:cursor-default"
          >
            Avanti →
          </button>
        ) : (
          <button
            type="button"
            disabled={payloadAnswers.length !== questionBank.length || submitting}
            onClick={submitSurvey}
            className="inline-flex items-center gap-2 min-h-[48px] px-6 rounded-xl bg-vm-accent text-white text-sm font-bold disabled:opacity-40 hover:opacity-90 transition-all cursor-pointer disabled:cursor-default"
          >
            {submitting ? "Calcolo…" : "✦ Trova i miei vini"}
          </button>
        )}
      </div>

      {error && (
        <p className="text-vm-error text-sm font-medium text-center">{error}</p>
      )}
    </div>
  );
}
