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
    <form onSubmit={onSubmit} className="grid gap-4">
      <label>
        Nome
        <input
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          required
        />
      </label>
      <label>
        Slug
        <input
          value={form.slug}
          onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
          required
        />
      </label>
      <label>
        Categoria
        <select
          value={form.category}
          onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value as FormState["category"] }))}
        >
          <option value="restaurant">Ristorante</option>
          <option value="bar">Bar</option>
          <option value="club">Club</option>
          <option value="winery">Cantina</option>
        </select>
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label>
          Latitudine
          <input
            value={form.lat}
            onChange={(e) => setForm((prev) => ({ ...prev, lat: e.target.value }))}
            required
          />
        </label>
        <label>
          Longitudine
          <input
            value={form.lng}
            onChange={(e) => setForm((prev) => ({ ...prev, lng: e.target.value }))}
            required
          />
        </label>
      </div>
      <label>
        Profilo
        <textarea
          value={form.profileText}
          onChange={(e) => setForm((prev) => ({ ...prev, profileText: e.target.value }))}
          rows={3}
        />
      </label>
      <label>
        Storia
        <textarea
          value={form.historyText}
          onChange={(e) => setForm((prev) => ({ ...prev, historyText: e.target.value }))}
          rows={3}
        />
      </label>
      <button
        type="submit"
        className="min-h-[48px] px-6 rounded-xl bg-vm-accent text-white font-semibold hover:opacity-90 transition-opacity cursor-pointer"
      >
        Crea workshop
      </button>
      {status && <p className="m-0 text-vm-muted text-sm">{status}</p>}
    </form>
  );
}
