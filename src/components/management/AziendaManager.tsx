"use client";

import { FormEvent, useEffect, useState } from "react";

type CatalogWine = { id: number; name: string };

type Payload = {
  workshop: {
    name: string;
    profileText: string | null;
    historyText: string | null;
    workshopWines: Array<{ wine: { id: number } }>;
  };
  catalog: CatalogWine[];
};

type Props = { slug: string };

export function AziendaManager({ slug }: Props) {
  const [data, setData] = useState<Payload | null>(null);
  const [profileText, setProfileText] = useState("");
  const [historyText, setHistoryText] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function load() {
      const response = await fetch(`/api/manage/azienda/${slug}`);
      const payload = (await response.json()) as Payload & { error?: string };
      if (!response.ok) {
        setStatus(payload.error ?? "Impossibile caricare azienda");
        return;
      }
      setData(payload);
      setProfileText(payload.workshop.profileText ?? "");
      setHistoryText(payload.workshop.historyText ?? "");
      setSelectedIds(payload.workshop.workshopWines.map((entry) => entry.wine.id));
    }

    void load();
  }, [slug]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Salvataggio...");

    const response = await fetch(`/api/manage/azienda/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile: { profileText, historyText }, wineIds: selectedIds }),
    });

    const payload = (await response.json()) as Payload & { error?: string };
    if (!response.ok) {
      setStatus(payload.error ?? "Errore salvataggio");
      return;
    }

    setData(payload);
    setStatus("Azienda aggiornata.");
  }

  if (!data) {
    return <p className="m-0 text-vm-muted animate-pulse">Caricamento dati azienda...</p>;
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <h2 className="m-0 text-xl font-bold">{data.workshop.name}</h2>

      <label>
        Profilo
        <textarea value={profileText} onChange={(e) => setProfileText(e.target.value)} rows={4} />
      </label>
      <label>
        Storia
        <textarea value={historyText} onChange={(e) => setHistoryText(e.target.value)} rows={4} />
      </label>

      <fieldset className="border border-vm-border rounded-xl p-4 grid gap-3">
        <legend className="px-1 font-semibold text-sm">Catalogo vini collegati</legend>
        {data.catalog.map((wine) => (
          <label key={wine.id} className="flex items-center gap-3 min-h-[44px] cursor-pointer text-sm">
            <input
              type="checkbox"
              className="w-4 h-4 accent-[var(--vm-accent)]"
              checked={selectedIds.includes(wine.id)}
              onChange={(e) => {
                setSelectedIds((prev) =>
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
        Salva modifiche
      </button>
      {status && <p className="m-0 text-vm-muted text-sm">{status}</p>}
    </form>
  );
}
