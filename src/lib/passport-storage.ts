const KEY = "wineder_passport";

export type PassportEntry = {
  wineId: number;
  slug: string;
  name: string;
  color: string;
  vintage: number;
  wineryId: number;
  wineryName: string;
  wineryLat: number;
  wineryLng: number;
};

function read(): PassportEntry[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

function write(entries: PassportEntry[]) {
  localStorage.setItem(KEY, JSON.stringify(entries));
}

export function saveLike(entry: PassportEntry) {
  const entries = read().filter((e) => e.wineId !== entry.wineId);
  write([...entries, entry]);
}

export function removeLike(wineId: number) {
  write(read().filter((e) => e.wineId !== wineId));
}

export function getLikedWines(): PassportEntry[] {
  return read();
}
