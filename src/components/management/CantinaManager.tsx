"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type WineItem = {
  id: number;
  name: string;
  productionDescription: string | null;
  isVerified: boolean;
  wineAdditives: Array<{ additive: { id: number; name: string } }>;
};

type CantinaPayload = {
  winery: {
    name: string;
    lat: number;
    lng: number;
    workshops: Array<{ slug: string; historyText: string | null; workshopWines: Array<{ wine: { id: number } }> }>;
    wines: WineItem[];
  };
};

type Props = { slug: string };

export function CantinaManager({ slug }: Props) {
  const [data, setData] = useState<CantinaPayload | null>(null);
  const [status, setStatus] = useState("");
  const [historyText, setHistoryText] = useState("");
  const [selectedWineIds, setSelectedWineIds] = useState<number[]>([]);

  const workshopSlug = `${slug}-workshop`;
  const workshop = useMemo(() => data?.winery.workshops.find((item) => item.slug === workshopSlug), [data, workshopSlug]);

  useEffect(() => {
    async function load() {
      const response = await fetch(`/api/manage/cantina/${slug}`);
      const payload = (await response.json()) as CantinaPayload & { error?: string };
      if (!response.ok) {
        setStatus(payload.error ?? "Impossibile caricare la cantina");
        return;
      }

      setData(payload);
      setHistoryText(payload.winery.workshops.find((item) => item.slug === workshopSlug)?.historyText ?? "");
      setSelectedWineIds(
        payload.winery.workshops
          .find((item) => item.slug === workshopSlug)
          ?.workshopWines.map((entry) => entry.wine.id) ?? [],
      );
    }

    void load();
  }, [slug, workshopSlug]);

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Salvataggio profilo...");

    const response = await fetch(`/api/manage/cantina/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profile: { historyText },
        workshop: { wineIds: selectedWineIds },
      }),
    });

    const payload = (await response.json()) as CantinaPayload & { error?: string };
    if (!response.ok) {
      setStatus(payload.error ?? "Errore salvataggio");
      return;
    }

    setData(payload);
    setStatus("Profilo cantina aggiornato.");
  }

  async function saveWine(wine: WineItem, additiveIds: number[]) {
    setStatus(`Aggiorno ${wine.name}...`);
    const response = await fetch(`/api/manage/cantina/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        wines: [
          {
            wineId: wine.id,
            productionDescription: wine.productionDescription ?? "",
            additiveIds,
          },
        ],
      }),
    });

    const payload = (await response.json()) as CantinaPayload & { error?: string };
    if (!response.ok) {
      setStatus(payload.error ?? "Errore aggiornamento vino");
      return;
    }

    setData(payload);
    setStatus(`Vino ${wine.name} aggiornato.`);
  }

  if (!data) {
    return <p style={{ margin: 0 }}>Caricamento dati cantina...</p>;
  }

  return (
    <section style={{ display: "grid", gap: 20 }}>
      <form onSubmit={saveProfile} style={{ display: "grid", gap: 10 }}>
        <h2 style={{ margin: 0 }}>Profilo cantina</h2>
        <label>
          Storytelling
          <textarea value={historyText} onChange={(event) => setHistoryText(event.target.value)} rows={4} />
        </label>
        <fieldset style={{ display: "grid", gap: 6 }}>
          <legend>Vini mostrati nel profilo pubblico</legend>
          {data.winery.wines.map((wine) => {
            const checked = selectedWineIds.includes(wine.id);
            return (
              <label key={wine.id} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(event) => {
                    setSelectedWineIds((prev) => {
                      if (event.target.checked) {
                        return [...prev, wine.id];
                      }
                      return prev.filter((id) => id !== wine.id);
                    });
                  }}
                />
                {wine.name}
              </label>
            );
          })}
        </fieldset>
        <button type="submit">Salva profilo</button>
      </form>

      <div style={{ display: "grid", gap: 14 }}>
        <h2 style={{ margin: 0 }}>Schede vino</h2>
        {data.winery.wines.map((wine) => (
          <article key={wine.id} style={{ border: "1px solid var(--vm-border)", borderRadius: 12, padding: 12, display: "grid", gap: 8 }}>
            <strong>{wine.name}</strong>
            <label>
              Produzione
              <textarea
                value={wine.productionDescription ?? ""}
                rows={3}
                onChange={(event) => {
                  setData((prev) => {
                    if (!prev) {
                      return prev;
                    }
                    return {
                      winery: {
                        ...prev.winery,
                        wines: prev.winery.wines.map((item) =>
                          item.id === wine.id ? { ...item, productionDescription: event.target.value } : item,
                        ),
                      },
                    };
                  });
                }}
              />
            </label>
            <label>
              Additivi (ID separati da virgola)
              <input
                defaultValue={wine.wineAdditives.map((item) => item.additive.id).join(",")}
                onBlur={(event) => {
                  const ids = event.target.value
                    .split(",")
                    .map((value) => Number(value.trim()))
                    .filter((value) => Number.isFinite(value));
                  void saveWine(wine, ids);
                }}
              />
            </label>
            <small style={{ color: "var(--vm-muted)" }}>
              Verificato: {wine.isVerified ? "SI" : "NO"}
            </small>
          </article>
        ))}
      </div>

      {workshop ? <p style={{ margin: 0, color: "var(--vm-muted)" }}>Workshop collegato: {workshop.slug}</p> : null}
      {status ? <p style={{ margin: 0, color: "var(--vm-muted)" }}>{status}</p> : null}
    </section>
  );
}
