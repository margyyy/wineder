"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getLikedWines, type PassportEntry } from "../../lib/passport-storage";

type CatalogWine = {
  id: number;
  slug: string;
  name: string;
  wineryId: number;
  wineryName: string;
  vintage: number;
};

type WineryShelf = {
  wineryId: number;
  wineryName: string;
  wines: CatalogWine[];
};

function byNameAsc(a: { name: string }, b: { name: string }) {
  return a.name.localeCompare(b.name, "it");
}

function buildFallbackShelf(liked: PassportEntry[]): WineryShelf[] {
  const grouped = liked.reduce<Record<number, WineryShelf>>((acc, wine) => {
    if (!acc[wine.wineryId]) {
      acc[wine.wineryId] = {
        wineryId: wine.wineryId,
        wineryName: wine.wineryName,
        wines: [],
      };
    }

    acc[wine.wineryId].wines.push({
      id: wine.wineId,
      slug: wine.slug,
      name: wine.name,
      wineryId: wine.wineryId,
      wineryName: wine.wineryName,
      vintage: wine.vintage,
    });

    return acc;
  }, {});

  return Object.values(grouped)
    .map((shelf) => ({
      ...shelf,
      wines: shelf.wines.sort(byNameAsc),
    }))
    .sort((a, b) => a.wineryName.localeCompare(b.wineryName, "it"));
}

export function TemporaryPassportShelf() {
  const [liked, setLiked] = useState<PassportEntry[]>([]);
  const [catalog, setCatalog] = useState<CatalogWine[]>([]);
  const [winerySearch, setWinerySearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const likedEntries = getLikedWines();
    setLiked(likedEntries);

    const controller = new AbortController();

    async function loadCatalog() {
      try {
        const res = await fetch("/api/discovery?useMatchFilter=false", {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!res.ok) {
          setCatalog([]);
          return;
        }

        const payload = (await res.json()) as {
          wines?: Array<{
            id: number;
            slug: string;
            name: string;
            wineryId: number;
            wineryName: string;
            vintage: number;
          }>;
        };

        setCatalog(payload.wines ?? []);
      } catch {
        setCatalog([]);
      } finally {
        setLoading(false);
      }
    }

    void loadCatalog();

    return () => controller.abort();
  }, []);

  const likedById = useMemo(
    () => new Set(liked.map((wine) => wine.wineId)),
    [liked],
  );

  const shelves = useMemo(() => {
    if (liked.length === 0) return [];

    const likedWineryIds = new Set(liked.map((wine) => wine.wineryId));
    const likedOrder = [...liked].reverse();

    if (catalog.length === 0) {
      return buildFallbackShelf(liked);
    }

    const groupedCatalog = catalog
      .filter((wine) => likedWineryIds.has(wine.wineryId))
      .reduce<Record<number, WineryShelf>>((acc, wine) => {
        if (!acc[wine.wineryId]) {
          acc[wine.wineryId] = {
            wineryId: wine.wineryId,
            wineryName: wine.wineryName,
            wines: [],
          };
        }

        acc[wine.wineryId].wines.push(wine);
        return acc;
      }, {});

    const wineryRank = likedOrder.reduce<Record<number, number>>(
      (acc, wine, index) => {
        if (acc[wine.wineryId] === undefined) {
          acc[wine.wineryId] = index;
        }
        return acc;
      },
      {},
    );

    return Object.values(groupedCatalog)
      .map((shelf) => ({
        ...shelf,
        wines: shelf.wines.sort(byNameAsc),
      }))
      .sort(
        (a, b) =>
          (wineryRank[a.wineryId] ?? 9999) - (wineryRank[b.wineryId] ?? 9999),
      );
  }, [catalog, liked]);

  const filteredShelves = useMemo(() => {
    const query = winerySearch.trim().toLocaleLowerCase("it");
    if (!query) return shelves;

    return shelves.filter((shelf) =>
      shelf.wineryName.toLocaleLowerCase("it").includes(query),
    );
  }, [shelves, winerySearch]);

  if (loading) {
    return (
      <div
        className="flex items-center justify-center rounded-2xl bg-vm-bg border border-vm-border"
        style={{ minHeight: 220 }}
      >
        <span className="text-vm-muted text-sm">
          Caricamento Passport…
        </span>
      </div>
    );
  }

  if (shelves.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-vm-bg text-center px-4 border border-vm-border"
        style={{ minHeight: 260 }}
      >
        <span className="text-4xl">🍷</span>
        <p className="text-vm-ink font-semibold m-0">
          Ancora nessun vino bevuto
        </p>
        <p className="text-vm-muted text-sm m-0">
          Quando segni un vino come bevuto/piaciuto, qui vedrai la cantina e gli
          altri vini in penombra.
        </p>
        <Link
          href="/discover"
          className="mt-1 min-h-[44px] px-5 flex items-center rounded-xl bg-vm-accent text-white font-bold text-sm hover:opacity-90 transition-opacity"
        >
          Scopri vini →
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-2">
        <label
          htmlFor="passport-winery-search"
          className="text-sm font-semibold text-vm-ink"
        >
          Ricerca cantine
        </label>
        <input
          id="passport-winery-search"
          type="search"
          value={winerySearch}
          onChange={(e) => setWinerySearch(e.target.value)}
          placeholder="Es. Cantina Monteverde"
          className="min-h-[44px] rounded-xl border border-vm-border bg-white px-3 text-sm text-vm-ink placeholder:text-vm-muted focus:outline-none focus:ring-2 focus:ring-vm-accent/60"
        />
      </div>

      {filteredShelves.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-vm-border bg-vm-bg px-4 py-6 text-center">
          <p className="m-0 text-sm text-vm-muted">
            Nessuna cantina trovata con questa ricerca.
          </p>
        </div>
      ) : null}

      {filteredShelves.map((shelf) => (
        <section
          key={shelf.wineryId}
          className="rounded-2xl border border-vm-border bg-vm-surface p-4 md:p-5 grid gap-3"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="m-0 text-lg font-bold text-vm-ink">
              {shelf.wineryName}
            </h2>
            <span className="text-xs text-vm-muted whitespace-nowrap">
              {shelf.wines.filter((wine) => likedById.has(wine.id)).length}/
              {shelf.wines.length} bevuti
            </span>
          </div>

          <div className="overflow-x-auto pb-1">
            <div className="flex gap-3 min-w-max">
              {shelf.wines.map((wine) => {
                const isDrunk = likedById.has(wine.id);

                return (
                  <Link
                    key={wine.id}
                    href={`/wine/${wine.slug}`}
                    className={[
                      "w-[148px] rounded-2xl border p-3 flex-shrink-0 transition-all duration-200",
                      "focus:outline-none focus:ring-2 focus:ring-vm-accent/60",
                      isDrunk
                        ? "border-vm-accent/50 bg-white shadow-sm"
                        : "border-vm-border bg-vm-bg opacity-45",
                    ].join(" ")}
                    aria-label={`${wine.name} ${isDrunk ? "bevuto" : "non ancora bevuto"}`}
                  >
                    <div className="rounded-xl border border-vm-border/80 overflow-hidden bg-[#f8f5f1]">
                      {/* Bottle visual using shared wine image wrapped in SVG */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/wine-bottle-placeholder.svg"
                        alt="Bottiglia vino"
                        className="w-full h-[132px] object-contain"
                      />
                    </div>
                    <p className="m-0 mt-2 text-sm font-semibold text-vm-ink leading-tight line-clamp-2">
                      {wine.name}
                    </p>
                    <p className="m-0 mt-1 text-xs text-vm-muted">
                      {wine.vintage}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
