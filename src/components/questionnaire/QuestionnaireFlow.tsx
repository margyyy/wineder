"use client";

import { useMemo, useState } from "react";
import { questionBank } from "../../lib/domain/matching/questionBank";
import { MatchResultsList } from "../matching/MatchResultsList";
import { QuestionStepCard } from "./QuestionStepCard";
import { QuestionnaireProgress } from "./QuestionnaireProgress";

type SurveyResponse = {
  sessionId: string;
  topMatches: Array<{ id: number; slug: string; name: string; score: number }>;
};

export function QuestionnaireFlow() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<SurveyResponse | null>(null);
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

    const body = (await response.json()) as SurveyResponse;
    setResult(body);
  }

  if (result) {
    return (
      <section style={{ display: "grid", gap: 16 }}>
        <h2 style={{ margin: 0 }}>I tuoi primi match</h2>
        <p style={{ margin: 0, color: "var(--vm-muted)" }}>
          Questo ranking usa cosine similarity e si aggiorna con i tuoi feedback.
        </p>
        <MatchResultsList sessionId={result.sessionId} matches={result.topMatches} />
      </section>
    );
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
            style={{ borderRadius: 10, border: "1px solid var(--vm-accent)", padding: "10px 14px", background: "var(--vm-accent)", color: "white" }}
          >
            Calcola il mio match
          </button>
        )}
      </div>

      {error ? <p style={{ color: "#b00020", margin: 0 }}>{error}</p> : null}
    </section>
  );
}
