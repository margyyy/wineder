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
    <div className="flex gap-3">
      <button
        type="button"
        onClick={async () => {
          await submitFeedback(sessionId, wineId, "LIKE");
          onDone?.();
        }}
        className="min-h-[44px] px-5 rounded-xl border border-vm-border bg-vm-surface text-vm-ink hover:border-vm-accent2 hover:text-vm-accent2 transition-colors cursor-pointer"
      >
        👍 Like
      </button>
      <button
        type="button"
        onClick={async () => {
          await submitFeedback(sessionId, wineId, "DISLIKE");
          onDone?.();
        }}
        className="min-h-[44px] px-5 rounded-xl border border-vm-border bg-vm-surface text-vm-ink hover:border-vm-accent hover:text-vm-accent transition-colors cursor-pointer"
      >
        👎 Dislike
      </button>
    </div>
  );
}
