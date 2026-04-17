"use client";

import { useEffect, useState } from "react";
import { WineResultCard, type DiscoveryCardWine } from "../discovery/WineResultCard";

type DiscoveryResponse = {
  wines: DiscoveryCardWine[];
};

type ShareResponse = {
  code: string;
  shareUrl: string;
  qrDataUrl: string;
};

export function KioskResultsView() {
  const [wines, setWines] = useState<DiscoveryCardWine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [share, setShare] = useState<ShareResponse | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadResults() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/discovery?useMatchFilter=true", {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          const payload = (await response.json()) as { error?: string };
          throw new Error(payload.error ?? "Errore caricamento risultati kiosk");
        }

        const payload = (await response.json()) as DiscoveryResponse;
        setWines(payload.wines);
      } catch (fetchError) {
        if (fetchError instanceof Error && fetchError.name === "AbortError") return;
        setError(fetchError instanceof Error ? fetchError.message : "Errore imprevisto");
      } finally {
        setLoading(false);
      }
    }

    void loadResults();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (loading || error || wines.length === 0 || share) return;

    async function createShare() {
      try {
        const response = await fetch("/api/kiosk/share", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ wines }),
        });

        if (!response.ok) {
          const payload = (await response.json()) as { error?: string };
          throw new Error(payload.error ?? "Errore creazione QR");
        }

        const payload = (await response.json()) as ShareResponse;
        setShare(payload);
      } catch (shareError) {
        setError(shareError instanceof Error ? shareError.message : "Errore QR");
      }
    }

    void createShare();
  }, [loading, error, wines, share]);

  if (loading) {
    return <p className="m-0 text-vm-muted animate-pulse">Sto preparando i risultati kiosk...</p>;
  }

  if (error) {
    return <p className="m-0 text-vm-error">{error}</p>;
  }

  return (
    <section className="grid gap-6">
      <h2
        className="m-0 font-bold text-vm-ink"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
      >
        I tuoi match principali
      </h2>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {wines.map((wine) => (
          <WineResultCard key={wine.id} wine={wine} showScore />
        ))}
      </div>

      <section className="grid gap-3 justify-items-center border border-vm-border rounded-2xl p-5 bg-vm-surface">
        <h3 className="m-0 text-lg font-bold">Porta la lista sul telefono</h3>
        <p className="m-0 text-vm-muted text-center text-sm">
          Scansiona il QR per aprire la stessa lista su mobile.
        </p>
        {share ? (
          <>
            <img
              src={share.qrDataUrl}
              alt="QR risultati kiosk"
              className="w-full max-w-[240px] h-auto rounded-xl"
            />
            <a
              href={share.shareUrl}
              className="min-h-[44px] flex items-center px-6 rounded-xl bg-vm-accent text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Apri link mobile
            </a>
          </>
        ) : (
          <p className="m-0 text-vm-muted animate-pulse">Generazione QR in corso...</p>
        )}
      </section>
    </section>
  );
}
