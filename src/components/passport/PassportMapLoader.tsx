"use client";

import dynamic from "next/dynamic";

const WinePassportMap = dynamic(
  () => import("./WinePassportMap").then((m) => m.WinePassportMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="rounded-2xl bg-vm-bg animate-pulse"
        style={{ height: 480 }}
      />
    ),
  },
);

export function PassportMapLoader() {
  return <WinePassportMap />;
}
