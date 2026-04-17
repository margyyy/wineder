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
      className="bg-vm-surface rounded-2xl border border-vm-border p-6 md:p-7"
      style={{ boxShadow: "var(--vm-shadow-card)" }}
    >
      <h2 className="text-lg md:text-xl font-bold text-vm-ink mb-5 leading-snug">
        {question.label}
      </h2>
      <div className="grid gap-2.5">
        {question.options.map((option) => {
          const selected = selectedOptionId === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={[
                "w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all duration-150 cursor-pointer font-medium text-sm min-h-[48px]",
                selected
                  ? "border-vm-accent bg-vm-accent text-white shadow-sm"
                  : "border-vm-border bg-white text-vm-ink hover:border-vm-accent/60 hover:bg-[#fdf5f6]",
              ].join(" ")}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
