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
      body: JSON.stringify({
        profile: {
          profileText,
          historyText,
        },
        wineIds: selectedIds,
      }),
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
    return <p style={{ margin: 0 }}>Caricamento dati azienda...</p>;
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
      <h2 style={{ margin: 0 }}>{data.workshop.name}</h2>
      <label>
        Profilo
        <textarea value={profileText} onChange={(event) => setProfileText(event.target.value)} rows={4} />
      </label>
      <label>
        Storia
        <textarea value={historyText} onChange={(event) => setHistoryText(event.target.value)} rows={4} />
      </label>

      <fieldset style={{ display: "grid", gap: 6 }}>
        <legend>Catalogo vini collegati</legend>
        {data.catalog.map((wine) => (
          <label key={wine.id} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="checkbox"
              checked={selectedIds.includes(wine.id)}
              onChange={(event) => {
                setSelectedIds((prev) => {
                  if (event.target.checked) {
                    return [...prev, wine.id];
                  }
                  return prev.filter((id) => id !== wine.id);
                });
              }}
            />
            {wine.name}
          </label>
        ))}
      </fieldset>

      <button type="submit">Salva modifiche</button>
      {status ? <p style={{ margin: 0, color: "var(--vm-muted)" }}>{status}</p> : null}
    </form>
  );
}
