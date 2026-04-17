"use client";

type Props = {
  query: URLSearchParams;
  wineries: Array<{ id: number; name: string }>;
  onPatch: (patch: Record<string, string | undefined>) => void;
  onReset: () => void;
};

function valueOrEmpty(value: string | null) {
  return value ?? "";
}

export function DiscoveryFiltersPanel({ query, wineries, onPatch, onReset }: Props) {
  return (
    <section
      style={{
        border: "1px solid var(--vm-border)",
        borderRadius: 16,
        background: "var(--vm-surface)",
        padding: 12,
        display: "grid",
        gap: 10,
      }}
    >
      <h2 style={{ margin: 0, fontSize: 18 }}>Filtri</h2>

      <label style={{ display: "grid", gap: 4 }}>
        Distanza massima (km)
        <input
          type="range"
          min={2}
          max={60}
          step={1}
          value={valueOrEmpty(query.get("maxDistanceKm")) || "20"}
          onChange={(event) => onPatch({ maxDistanceKm: event.target.value })}
        />
      </label>

      <label style={{ display: "grid", gap: 4 }}>
        Cantina
        <select
          value={valueOrEmpty(query.get("wineryId"))}
          onChange={(event) =>
            onPatch({ wineryId: event.target.value.length > 0 ? event.target.value : undefined })
          }
        >
          <option value="">Tutte</option>
          {wineries.map((winery) => (
            <option key={winery.id} value={String(winery.id)}>
              {winery.name}
            </option>
          ))}
        </select>
      </label>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <label style={{ display: "grid", gap: 4 }}>
          Vintage
          <input
            type="number"
            min={1990}
            max={2035}
            value={valueOrEmpty(query.get("vintage"))}
            onChange={(event) =>
              onPatch({ vintage: event.target.value.length > 0 ? event.target.value : undefined })
            }
          />
        </label>

        <label style={{ display: "grid", gap: 4 }}>
          Colore
          <select
            value={valueOrEmpty(query.get("color"))}
            onChange={(event) =>
              onPatch({ color: event.target.value.length > 0 ? event.target.value : undefined })
            }
          >
            <option value="">Tutti</option>
            <option value="red">Rosso</option>
            <option value="white">Bianco</option>
            <option value="rose">Rosato</option>
          </select>
        </label>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <label style={{ display: "grid", gap: 4 }}>
          Alcol min (%)
          <input
            type="number"
            min={0}
            max={25}
            step={0.1}
            value={valueOrEmpty(query.get("minAlcohol"))}
            onChange={(event) =>
              onPatch({ minAlcohol: event.target.value.length > 0 ? event.target.value : undefined })
            }
          />
        </label>

        <label style={{ display: "grid", gap: 4 }}>
          Alcol max (%)
          <input
            type="number"
            min={0}
            max={25}
            step={0.1}
            value={valueOrEmpty(query.get("maxAlcohol"))}
            onChange={(event) =>
              onPatch({ maxAlcohol: event.target.value.length > 0 ? event.target.value : undefined })
            }
          />
        </label>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <label style={{ display: "grid", gap: 4 }}>
          Prezzo min (EUR)
          <input
            type="number"
            min={0}
            value={valueOrEmpty(query.get("priceMin"))}
            onChange={(event) =>
              onPatch({ priceMin: event.target.value.length > 0 ? event.target.value : undefined })
            }
          />
        </label>

        <label style={{ display: "grid", gap: 4 }}>
          Prezzo max (EUR)
          <input
            type="number"
            min={0}
            value={valueOrEmpty(query.get("priceMax"))}
            onChange={(event) =>
              onPatch({ priceMax: event.target.value.length > 0 ? event.target.value : undefined })
            }
          />
        </label>
      </div>

      <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          type="checkbox"
          checked={query.get("useMatchFilter") !== "false"}
          onChange={(event) => onPatch({ useMatchFilter: event.target.checked ? "true" : "false" })}
        />
        Usa filtro match (disattiva per vedere tutti i vini in zona)
      </label>

      <button type="button" onClick={onReset} style={{ width: "fit-content" }}>
        Reset filtri
      </button>
    </section>
  );
}
