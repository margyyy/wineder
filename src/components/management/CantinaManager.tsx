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
  const workshop = useMemo(
    () => data?.winery.workshops.find((item) => item.slug === workshopSlug),
    [data, workshopSlug],
  );

  useEffect(() => {
    async function load() {
      const response = await fetch(`/api/manage/cantina/${slug}`);
      const payload = (await response.json()) as CantinaPayload & { error?: string };
      if (!response.ok) {
        setStatus(payload.error ?? "Impossibile caricare la cantina");
        return;
      }

      setData(payload);
      setHistoryText(
        payload.winery.workshops.find((item) => item.slug === workshopSlug)?.historyText ?? "",
      );
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
      body: JSON.stringify({ profile: { historyText }, workshop: { wineIds: selectedWineIds } }),
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
        wines: [{ wineId: wine.id, productionDescription: wine.productionDescription ?? "", additiveIds }],
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
    return <p className="m-0 text-vm-muted animate-pulse">Caricamento dati cantina...</p>;
  }

  return (
    <section className="grid gap-6">
      <form onSubmit={saveProfile} className="grid gap-4">
        <h2 className="m-0 text-xl font-bold">Profilo cantina</h2>
        <label>
          Storytelling
          <textarea value={historyText} onChange={(e) => setHistoryText(e.target.value)} rows={4} />
        </label>

        <fieldset className="border border-vm-border rounded-xl p-4 grid gap-3">
          <legend className="px-1 font-semibold text-sm">Vini mostrati nel profilo pubblico</legend>
          {data.winery.wines.map((wine) => (
            <label key={wine.id} className="flex items-center gap-3 min-h-[44px] cursor-pointer text-sm">
              <input
                type="checkbox"
                className="w-4 h-4 accent-[var(--vm-accent)]"
                checked={selectedWineIds.includes(wine.id)}
                onChange={(e) => {
                  setSelectedWineIds((prev) =>
                    e.target.checked ? [...prev, wine.id] : prev.filter((id) => id !== wine.id),
                  );
                }}
              />
              {wine.name}
            </label>
          ))}
        </fieldset>

        <button
          type="submit"
          className="min-h-[48px] px-6 rounded-xl bg-vm-accent text-white font-semibold hover:opacity-90 transition-opacity cursor-pointer"
        >
          Salva profilo
        </button>
      </form>

      <div className="grid gap-4">
        <h2 className="m-0 text-xl font-bold">Schede vino</h2>
        {data.winery.wines.map((wine) => (
          <article
            key={wine.id}
            className="border border-vm-border rounded-xl p-4 grid gap-3 bg-vm-surface"
          >
            <strong className="font-bold">{wine.name}</strong>
            <label>
              Produzione
              <textarea
                value={wine.productionDescription ?? ""}
                rows={3}
                onChange={(e) => {
                  setData((prev) => {
                    if (!prev) return prev;
                    return {
                      winery: {
                        ...prev.winery,
                        wines: prev.winery.wines.map((item) =>
                          item.id === wine.id
                            ? { ...item, productionDescription: e.target.value }
                            : item,
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
                onBlur={(e) => {
                  const ids = e.target.value
                    .split(",")
                    .map((v) => Number(v.trim()))
                    .filter((v) => Number.isFinite(v));
                  void saveWine(wine, ids);
                }}
              />
            </label>
            <small className="text-vm-muted text-xs">
              Verificato: {wine.isVerified ? "SI" : "NO"}
            </small>
          </article>
        ))}
      </div>

      {workshop && (
        <p className="m-0 text-vm-muted text-sm">Workshop collegato: {workshop.slug}</p>
      )}
      {status && <p className="m-0 text-vm-muted text-sm">{status}</p>}
    </section>
  );
}
