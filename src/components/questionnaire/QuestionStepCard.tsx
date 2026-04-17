"use client";

import type { MatchingQuestion } from "../../lib/domain/matching/questionBank";

type Props = {
  question: MatchingQuestion;
  selectedOptionId?: string;
  onSelect: (optionId: string) => void;
};

export function QuestionStepCard({ question, selectedOptionId, onSelect }: Props) {
  return (
    <div
      style={{
        border: "1px solid var(--vm-border)",
        borderRadius: 20,
        background: "var(--vm-surface)",
        padding: 20,
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: 16, fontSize: 24 }}>{question.label}</h2>
      <div style={{ display: "grid", gap: 10 }}>
        {question.options.map((option) => {
          const selected = selectedOptionId === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              style={{
                textAlign: "left",
                borderRadius: 12,
                border: selected ? "2px solid var(--vm-accent)" : "1px solid var(--vm-border)",
                padding: "12px 14px",
                background: selected ? "#f8e6e9" : "white",
                color: "var(--vm-ink)",
                cursor: "pointer",
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
