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
        if (fetchError instanceof Error && fetchError.name === "AbortError") return;
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
    <div className="grid gap-5">
      {!hasSession && (
        <p className="text-vm-muted text-sm">
          Nessuna sessione attiva — completa prima il questionario.
        </p>
      )}

      <DiscoveryFiltersPanel
        query={query}
        wineries={wineries}
        onPatch={patchQuery}
        onReset={resetFilters}
      />

      {loading && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-vm-surface rounded-2xl h-80 animate-pulse border border-vm-border"
            />
          ))}
        </div>
      )}

      {error && (
        <p className="text-vm-error text-sm font-medium">{error}</p>
      )}

      {!loading && !error && (
        <>
          <p className="text-xs font-semibold uppercase tracking-widest text-vm-muted">
            {data?.count ?? 0} vini trovati
            {data?.useMatchFilter ? " · ordinati per match" : ""}
          </p>

          {data?.wines.length ? (
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {data.wines.map((wine) => (
                <WineResultCard key={wine.id} wine={wine} showScore={data.useMatchFilter} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-vm-muted">
              <p className="text-2xl mb-2">🍷</p>
              <p className="font-semibold">Nessun vino trovato</p>
              <p className="text-sm mt-1">Prova ad ampliare i filtri</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
