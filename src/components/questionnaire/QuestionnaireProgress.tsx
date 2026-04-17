"use client";

type Props = {
  current: number;
  total: number;
};

export function QuestionnaireProgress({ current, total }: Props) {
  const percent = Math.round((current / total) * 100);

  return (
    <div style={{ marginBottom: 16 }}>
      <p style={{ margin: "0 0 8px", fontSize: 14, color: "var(--vm-muted)" }}>
        Domanda {current} di {total}
      </p>
      <div style={{ height: 8, background: "#e8e0d8", borderRadius: 999 }}>
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background: "var(--vm-accent)",
            borderRadius: 999,
            transition: "width 160ms ease",
          }}
        />
      </div>
    </div>
  );
}
