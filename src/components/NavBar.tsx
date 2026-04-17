"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function NavBar() {
  const pathname = usePathname();
  const isQuestionnaire = pathname === "/questionnaire";
  const isKiosk = pathname.startsWith("/kiosk");
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    setHasSession(document.cookie.includes("survey_session_id"));
  }, [pathname]);

  if (isKiosk) return null;

  return (
    <nav className="bg-vm-surface/90 backdrop-blur-sm border-b border-vm-border sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-vm-accent text-base tracking-tight"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/corkscrew.svg" alt="" width={28} height={15} />
          WINEDER
        </Link>

        {!isQuestionnaire && (
          <div className="flex items-center gap-3">
            <Link
              href="/discover"
              className="text-sm font-semibold text-vm-muted hover:text-vm-ink transition-colors hidden sm:block"
            >
              Scopri
            </Link>
            {hasSession && (
              <Link
                href="/passport"
                className="min-h-[36px] px-4 flex items-center rounded-full bg-vm-accent text-white text-sm font-bold hover:opacity-90 transition-opacity"
              >
                🗺 Passport
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
