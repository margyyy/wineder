type SensoryFields = {
  dolcezza: number;
  acidita: number;
  tannini: number;
  corpo: number;
  alcol: number;
  effervescenza: number;
  fruttato: number;
  floreale: number;
  speziato: number;
  terroso: number;
  legnoso: number;
  minerale: number;
};

type Props = {
  wine: SensoryFields;
};

const STRUCTURE = [
  { key: "dolcezza", label: "Dolcezza", emoji: "🍯" },
  { key: "acidita", label: "Acidità", emoji: "🍋" },
  { key: "tannini", label: "Tannini", emoji: "🍂" },
  { key: "corpo", label: "Corpo", emoji: "⚖️" },
  { key: "alcol", label: "Alcol", emoji: "🔥" },
  { key: "effervescenza", label: "Effervescenza", emoji: "✨" },
] as const;

const AROMAS = [
  { key: "fruttato", label: "Fruttato", emoji: "🍒" },
  { key: "floreale", label: "Floreale", emoji: "🌸" },
  { key: "speziato", label: "Speziato", emoji: "🌶️" },
  { key: "terroso", label: "Terroso", emoji: "🌿" },
  { key: "legnoso", label: "Legnoso", emoji: "🪵" },
  { key: "minerale", label: "Minerale", emoji: "🪨" },
] as const;

function SensoryBar({ label, emoji, value }: { label: string; emoji: string; value: number }) {
  const pct = Math.min(100, Math.max(0, value * 100));
  const dots = Math.round(value * 5);
  return (
    <div className="flex items-center gap-2 min-w-0">
      <span className="text-base w-5 flex-shrink-0">{emoji}</span>
      <span className="text-xs font-semibold text-vm-ink w-20 flex-shrink-0 truncate">{label}</span>
      <div className="flex-1 h-1.5 bg-vm-border rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-vm-accent transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="flex gap-0.5 flex-shrink-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`w-1.5 h-1.5 rounded-full ${i < dots ? "bg-vm-accent" : "bg-vm-border"}`}
          />
        ))}
      </span>
    </div>
  );
}

export function WineSensoryProfile({ wine }: Props) {
  const hasAnyStructure = STRUCTURE.some(({ key }) => wine[key] > 0);
  const hasAnyAroma = AROMAS.some(({ key }) => wine[key] > 0);

  if (!hasAnyStructure && !hasAnyAroma) return null;

  return (
    <section className="bg-vm-surface border border-vm-border rounded-2xl p-4 grid gap-4">
      {hasAnyStructure && (
        <div className="grid gap-2">
          <p className="text-xs font-bold uppercase tracking-widest text-vm-muted m-0">Struttura</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {STRUCTURE.map(({ key, label, emoji }) => (
              <SensoryBar key={key} label={label} emoji={emoji} value={wine[key]} />
            ))}
          </div>
        </div>
      )}

      {hasAnyStructure && hasAnyAroma && (
        <div className="h-px bg-vm-border" />
      )}

      {hasAnyAroma && (
        <div className="grid gap-2">
          <p className="text-xs font-bold uppercase tracking-widest text-vm-muted m-0">Aromi</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {AROMAS.map(({ key, label, emoji }) => (
              <SensoryBar key={key} label={label} emoji={emoji} value={wine[key]} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
