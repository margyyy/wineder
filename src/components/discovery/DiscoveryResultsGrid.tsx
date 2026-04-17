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
    <section className="grid gap-4 md:grid-cols-[280px_1fr] md:items-start">
      {/* Filters — sidebar on md+, collapsible on mobile */}
      <div className="md:sticky md:top-20">
        <DiscoveryFiltersPanel query={query} wineries={wineries} onPatch={patchQuery} onReset={resetFilters} />
      </div>

      {/* Results */}
      <div className="grid gap-4">
        {!hasSession && (
          <p className="m-0 text-vm-muted">
            Nessuna sessione attiva: completa prima il questionario.
          </p>
        )}

        {loading && <p className="m-0 text-vm-muted animate-pulse">Caricamento risultati...</p>}
        {error && <p className="m-0 text-vm-error">{error}</p>}

        {!loading && !error && (
          <>
            <p className="m-0 text-sm text-vm-muted">
              {data?.count ?? 0} vini trovati{" "}
              {data?.useMatchFilter ? "(ordinati per match)" : "(ordinati per distanza)"}
            </p>

            {data?.wines.length ? (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {data.wines.map((wine) => (
                  <WineResultCard key={wine.id} wine={wine} showScore={data.useMatchFilter} />
                ))}
              </div>
            ) : (
              <p className="m-0">Nessun vino trovato con i filtri correnti.</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
