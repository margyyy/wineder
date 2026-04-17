import { PassportMapLoader } from "../../../components/passport/PassportMapLoader";
import { TemporaryPassportShelf } from "../../../components/passport/TemporaryPassportShelf";

export default function PassportPage() {
  return (
    <main>
      <section className="max-w-3xl mx-auto px-4 py-8 grid gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-vm-ink m-0">
            Il mio Passport
          </h1>
          <p className="text-vm-muted mt-1 mb-0">
            Mappa in alto e il tuo scaffale vini sempre disponibile qui sotto.
          </p>
        </div>

        <PassportMapLoader />

        <details className="rounded-2xl border border-vm-border bg-vm-surface group">
          <summary className="list-none cursor-pointer min-h-[52px] px-4 md:px-5 flex items-center justify-between gap-3 text-vm-ink font-semibold">
            <span>Apri il tuo scaffale</span>
            <span className="text-vm-muted text-xs group-open:hidden">
              Mostra
            </span>
            <span className="text-vm-muted text-xs hidden group-open:inline">
              Chiudi
            </span>
          </summary>

          <div className="border-t border-vm-border px-4 md:px-5 py-4 md:py-5 grid gap-4">
            <div>
              <h2 className="m-0 text-lg md:text-xl font-bold text-vm-ink">
                I vini che hai collezionato
              </h2>
              <p className="m-0 mt-1 text-sm text-vm-muted">
                Cerca per cantina e scorri i vini: quelli bevuti sono in
                evidenza.
              </p>
            </div>

            <TemporaryPassportShelf />
          </div>
        </details>

        <button
          type="button"
          disabled
          className="flex items-center justify-center gap-2 min-h-[48px] rounded-xl border-2 border-vm-border text-vm-muted text-sm font-semibold cursor-not-allowed opacity-60"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          Esporta per i social — Coming soon
        </button>
      </section>
    </main>
  );
}
