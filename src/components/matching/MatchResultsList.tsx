"use client";

import { WineFeedbackToggle } from "./WineFeedbackToggle";

type MatchItem = {
  id: number;
  slug: string;
  name: string;
  score: number;
};

type Props = {
  sessionId: string;
  matches: MatchItem[];
  onFeedbackDone?: () => void;
};

export function MatchResultsList({ sessionId, matches, onFeedbackDone }: Props) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {matches.map((match) => (
        <article
          key={match.id}
          style={{
            border: "1px solid var(--vm-border)",
            borderRadius: 16,
            padding: 14,
            background: "var(--vm-surface)",
          }}
        >
          <h3 style={{ margin: "0 0 8px" }}>{match.name}</h3>
          <p style={{ margin: "0 0 10px", color: "var(--vm-muted)" }}>
            Score match: {match.score.toFixed(3)}
          </p>
          <WineFeedbackToggle sessionId={sessionId} wineId={match.id} onDone={onFeedbackDone} />
        </article>
      ))}
    </div>
  );
}
