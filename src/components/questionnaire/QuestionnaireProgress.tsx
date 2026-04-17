"use client";

type Props = {
  current: number;
  total: number;
};

export function QuestionnaireProgress({ current, total }: Props) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="mb-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-vm-muted">
          Domanda {current} di {total}
        </span>
        <span className="text-xs font-bold text-vm-accent">{percent}%</span>
      </div>
      <div className="h-1.5 bg-vm-border rounded-full overflow-hidden">
        <div
          className="h-full bg-vm-accent rounded-full transition-[width] duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
