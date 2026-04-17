"use client";

import Link from "next/link";
import { Wine } from "lucide-react";

export function NavBar() {
  return (
    <nav className="bg-vm-surface/90 backdrop-blur-sm border-b border-vm-border sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-vm-accent text-base tracking-tight"
        >
          <Wine size={18} strokeWidth={2.5} />
          VinoMatch
        </Link>

        <Link
          href="/discover"
          className="text-sm font-semibold text-vm-muted hover:text-vm-ink transition-colors hidden sm:block"
        >
          Scopri vini
        </Link>
      </div>
    </nav>
  );
}
