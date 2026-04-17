"use client";

import type { MatchingQuestion } from "../../lib/domain/matching/questionBank";

type Props = {
  question: MatchingQuestion;
  selectedOptionId?: string;
  onSelect: (optionId: string) => void;
};

export function QuestionStepCard({ question, selectedOptionId, onSelect }: Props) {
  return (
    <div className="border border-vm-border rounded-2xl bg-vm-surface p-5 md:p-6">
      <h2 className="mt-0 mb-4 text-xl md:text-2xl font-bold">{question.label}</h2>
      <div className="grid gap-3">
        {question.options.map((option) => {
          const selected = selectedOptionId === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={[
                "text-left rounded-xl px-4 min-h-[48px] py-3 cursor-pointer transition-colors w-full text-vm-ink",
                selected
                  ? "border-2 border-vm-accent bg-[#f8e6e9]"
                  : "border border-vm-border bg-white hover:border-vm-accent hover:bg-[#fdf4f5]",
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
