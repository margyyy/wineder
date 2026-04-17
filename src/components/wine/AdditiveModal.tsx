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
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "grid",
        placeItems: "center",
        padding: 20,
        zIndex: 50,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "min(520px, 100%)",
          background: "var(--vm-surface)",
          borderRadius: 14,
          border: "1px solid var(--vm-border)",
          padding: 16,
          display: "grid",
          gap: 10,
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <h3 style={{ margin: 0 }}>{additive.name}</h3>
        <p style={{ margin: 0, color: "var(--vm-muted)" }}>{additive.description}</p>
        <button type="button" onClick={onClose} style={{ justifySelf: "start" }}>
          Chiudi
        </button>
      </div>
    </div>
  );
}
