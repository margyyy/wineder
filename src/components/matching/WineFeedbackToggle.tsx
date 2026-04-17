"use client";

type Props = {
  sessionId: string;
  wineId: number;
  onDone?: () => void;
};

async function submitFeedback(sessionId: string, wineId: number, feedback: "LIKE" | "DISLIKE") {
  const response = await fetch("/api/matching/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, wineId, feedback }),
  });

  if (!response.ok) {
    throw new Error("Feedback request failed");
  }

  return response.json();
}

export function WineFeedbackToggle({ sessionId, wineId, onDone }: Props) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button
        type="button"
        onClick={async () => {
          await submitFeedback(sessionId, wineId, "LIKE");
          onDone?.();
        }}
        style={{ borderRadius: 10, border: "1px solid var(--vm-border)", padding: "8px 12px", cursor: "pointer" }}
      >
        Like
      </button>
      <button
        type="button"
        onClick={async () => {
          await submitFeedback(sessionId, wineId, "DISLIKE");
          onDone?.();
        }}
        style={{ borderRadius: 10, border: "1px solid var(--vm-border)", padding: "8px 12px", cursor: "pointer" }}
      >
        Dislike
      </button>
    </div>
  );
}
