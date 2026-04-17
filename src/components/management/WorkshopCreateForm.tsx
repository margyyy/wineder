"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  slug: string;
  category: "restaurant" | "bar" | "club" | "winery";
  lat: string;
  lng: string;
  profileText: string;
  historyText: string;
};

const initialState: FormState = {
  name: "",
  slug: "",
  category: "bar",
  lat: "45.4384",
  lng: "10.9916",
  profileText: "",
  historyText: "",
};

export function WorkshopCreateForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<string>("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Salvataggio...");

    try {
      const response = await fetch("/api/workshops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          lat: Number(form.lat),
          lng: Number(form.lng),
        }),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error ?? "Errore creazione workshop");
      }

      setStatus("Workshop creato con successo.");
      setForm(initialState);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Errore inaspettato");
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 10 }}>
      <label>
        Nome
        <input value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} required />
      </label>
      <label>
        Slug
        <input value={form.slug} onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))} required />
      </label>
      <label>
        Categoria
        <select
          value={form.category}
          onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value as FormState["category"] }))}
        >
          <option value="restaurant">Ristorante</option>
          <option value="bar">Bar</option>
          <option value="club">Club</option>
          <option value="winery">Cantina</option>
        </select>
      </label>
      <label>
        Latitudine
        <input value={form.lat} onChange={(event) => setForm((prev) => ({ ...prev, lat: event.target.value }))} required />
      </label>
      <label>
        Longitudine
        <input value={form.lng} onChange={(event) => setForm((prev) => ({ ...prev, lng: event.target.value }))} required />
      </label>
      <label>
        Profilo
        <textarea value={form.profileText} onChange={(event) => setForm((prev) => ({ ...prev, profileText: event.target.value }))} />
      </label>
      <label>
        Storia
        <textarea value={form.historyText} onChange={(event) => setForm((prev) => ({ ...prev, historyText: event.target.value }))} />
      </label>
      <button type="submit">Crea workshop</button>
      {status ? <p style={{ margin: 0, color: "var(--vm-muted)" }}>{status}</p> : null}
    </form>
  );
}
