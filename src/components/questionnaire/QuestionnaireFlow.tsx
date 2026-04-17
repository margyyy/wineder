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
    const response = await fetch("/api/matching/survey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: payloadAnswers }),
    });

    if (!response.ok) {
      const body = await response.json();
      setError(body.error ?? "Errore nel calcolo del matching");
      return;
    }

    router.push(onCompleteRedirect);
  }

  return (
    <section style={{ display: "grid", gap: 12 }}>
      <QuestionnaireProgress current={step + 1} total={questionBank.length} />
      <QuestionStepCard
        question={currentQuestion}
        selectedOptionId={selectedOptionId}
        onSelect={(optionId) => {
          setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
        }}
      />

      <div style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
        <button
          type="button"
          onClick={() => setStep((prev) => Math.max(0, prev - 1))}
          disabled={step === 0}
          style={{ borderRadius: 10, border: "1px solid var(--vm-border)", padding: "10px 14px" }}
        >
          Indietro
        </button>

        {step < questionBank.length - 1 ? (
          <button
            type="button"
            disabled={!selectedOptionId}
            onClick={() => setStep((prev) => Math.min(questionBank.length - 1, prev + 1))}
            style={{ borderRadius: 10, border: "1px solid var(--vm-border)", padding: "10px 14px" }}
          >
            Avanti
          </button>
        ) : (
          <button
            type="button"
            disabled={payloadAnswers.length !== questionBank.length}
            onClick={submitSurvey}
            style={{
              borderRadius: 10,
              border: "1px solid var(--vm-accent)",
              padding: "10px 14px",
              background: "var(--vm-accent)",
              color: "white",
            }}
          >
            Calcola il mio match
          </button>
        )}
      </div>

      {error ? <p style={{ color: "#b00020", margin: 0 }}>{error}</p> : null}
    </section>
  );
}
