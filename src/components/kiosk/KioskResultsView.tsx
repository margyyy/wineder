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
        if (fetchError instanceof Error && fetchError.name === "AbortError") {
          return;
        }
        setError(fetchError instanceof Error ? fetchError.message : "Errore imprevisto");
      } finally {
        setLoading(false);
      }
    }

    void loadResults();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (loading || error || wines.length === 0 || share) {
      return;
    }

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
    return <p style={{ margin: 0 }}>Sto preparando i risultati kiosk...</p>;
  }

  if (error) {
    return <p style={{ margin: 0, color: "#b00020" }}>{error}</p>;
  }

  return (
    <section style={{ display: "grid", gap: 18 }}>
      <h2 style={{ margin: 0, fontSize: 28 }}>I tuoi match principali</h2>
      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        {wines.map((wine) => (
          <WineResultCard key={wine.id} wine={wine} showScore />
        ))}
      </div>

      <section
        style={{
          display: "grid",
          gap: 10,
          justifyItems: "center",
          border: "1px solid var(--vm-border)",
          borderRadius: 16,
          padding: 18,
          background: "var(--vm-surface)",
        }}
      >
        <h3 style={{ margin: 0 }}>Porta la lista sul telefono</h3>
        <p style={{ margin: 0, color: "var(--vm-muted)", textAlign: "center" }}>
          Scansiona il QR per aprire la stessa lista su mobile.
        </p>
        {share ? (
          <>
            <img src={share.qrDataUrl} alt="QR risultati kiosk" width={220} height={220} />
            <a href={share.shareUrl} style={{ color: "var(--vm-accent)", fontWeight: 600 }}>
              Apri link mobile
            </a>
          </>
        ) : (
          <p style={{ margin: 0 }}>Generazione QR in corso...</p>
        )}
      </section>
    </section>
  );
}
