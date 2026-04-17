"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DiscoveryFiltersPanel } from "./DiscoveryFiltersPanel";
import { WineResultCard, type DiscoveryCardWine } from "./WineResultCard";

type ApiResponse = {
  useMatchFilter: boolean;
  count: number;
  wines: DiscoveryCardWine[];
};

type Props = {
  hasSession: boolean;
};

export function DiscoveryResultsGrid({ hasSession }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ApiResponse | null>(null);

  const query = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams]);

  useEffect(() => {
    const controller = new AbortController();

    async function run() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/discovery?${query.toString()}`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          const body = await response.json();
          throw new Error(body.error ?? "Errore nel caricamento risultati");
        }

        const body = (await response.json()) as ApiResponse;
        setData(body);
      } catch (fetchError) {
        if (fetchError instanceof Error && fetchError.name === "AbortError") {
          return;
        }
        setError(fetchError instanceof Error ? fetchError.message : "Errore imprevisto");
      } finally {
        setLoading(false);
      }
    }

    run();
    return () => controller.abort();
  }, [query]);

  function patchQuery(patch: Record<string, string | undefined>) {
    const next = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(patch)) {
      if (value === undefined || value.length === 0) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    }
    router.replace(`${pathname}?${next.toString()}`);
  }

  function resetFilters() {
    router.replace(pathname);
  }

  const wineries = useMemo(() => {
    const source = data?.wines ?? [];
    const byId = new Map<number, { id: number; name: string }>();
    for (const wine of source) {
      if (!byId.has(wine.wineryId)) {
        byId.set(wine.wineryId, { id: wine.wineryId, name: wine.wineryName });
      }
    }
    return Array.from(byId.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [data]);

  return (
    <section style={{ display: "grid", gap: 16 }}>
      {!hasSession ? (
        <p style={{ margin: 0, color: "var(--vm-muted)" }}>
          Nessuna sessione attiva: completa prima il questionario.
        </p>
      ) : null}

      <DiscoveryFiltersPanel query={query} wineries={wineries} onPatch={patchQuery} onReset={resetFilters} />

      {loading ? <p style={{ margin: 0 }}>Caricamento risultati...</p> : null}
      {error ? <p style={{ margin: 0, color: "#b00020" }}>{error}</p> : null}

      {!loading && !error ? (
        <>
          <p style={{ margin: 0, color: "var(--vm-muted)" }}>
            {data?.count ?? 0} vini trovati {data?.useMatchFilter ? "(ordinati per match)" : "(ordinati per distanza)"}
          </p>

          {data?.wines.length ? (
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
              {data.wines.map((wine) => (
                <WineResultCard key={wine.id} wine={wine} showScore={data.useMatchFilter} />
              ))}
            </div>
          ) : (
            <p style={{ margin: 0 }}>Nessun vino trovato con i filtri correnti.</p>
          )}
        </>
      ) : null}
    </section>
  );
}
