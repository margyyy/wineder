"use client";

type Props = {
  additive: { name: string; description: string } | null;
  onClose: () => void;
};

export function AdditiveModal({ additive, onClose }: Props) {
  if (!additive) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black/45 grid place-items-center p-5 z-50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-vm-surface rounded-2xl border border-vm-border p-5 grid gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="m-0 text-lg font-bold">{additive.name}</h3>
        <p className="m-0 text-vm-muted">{additive.description}</p>
        <button
          type="button"
          onClick={onClose}
          className="self-start min-h-[44px] px-5 rounded-xl border border-vm-border bg-vm-bg text-vm-ink font-medium hover:border-vm-accent transition-colors cursor-pointer"
        >
          Chiudi
        </button>
      </div>
    </div>
  );
}
