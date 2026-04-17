"use client";

import Link from "next/link";
import { Menu, X, Wine } from "lucide-react";
import { useState } from "react";

export function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-vm-surface border-b border-vm-border sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-vm-accent tracking-tight flex items-center gap-2">
          <Wine size={20} />
          VinoMatch
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/questionnaire" className="text-vm-ink hover:text-vm-accent transition-colors">
            Questionario
          </Link>
          <Link href="/discover" className="text-vm-ink hover:text-vm-accent transition-colors">
            Scopri
          </Link>
          <Link
            href="/kiosk"
            className="bg-vm-accent text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Kiosk
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-vm-ink"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Chiudi menu" : "Apri menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-vm-border bg-vm-surface">
          <div className="flex flex-col px-4 py-2">
            <Link
              href="/questionnaire"
              className="min-h-[44px] flex items-center text-vm-ink font-medium border-b border-vm-border"
              onClick={() => setOpen(false)}
            >
              Questionario
            </Link>
            <Link
              href="/discover"
              className="min-h-[44px] flex items-center text-vm-ink font-medium border-b border-vm-border"
              onClick={() => setOpen(false)}
            >
              Scopri
            </Link>
            <Link
              href="/kiosk"
              className="min-h-[44px] flex items-center text-vm-accent font-bold"
              onClick={() => setOpen(false)}
            >
              Kiosk
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
