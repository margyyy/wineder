"use client";

type Props = {
  current: number;
  total: number;
};

export function QuestionnaireProgress({ current, total }: Props) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="mb-4">
      <p className="text-sm text-vm-muted mb-2">
        Domanda {current} di {total}
      </p>
      <div className="h-2 bg-[#e8e0d8] rounded-full">
        <div
          className="h-full bg-vm-accent rounded-full transition-[width] duration-150 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
