import { PassportMapLoader } from "../../../components/passport/PassportMapLoader";

export default function PassportPage() {
  return (
    <main>
      <section className="max-w-3xl mx-auto px-4 py-8 grid gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-vm-ink m-0">Il mio Passport</h1>
          <p className="text-vm-muted mt-1 mb-0">
            Le cantine dei vini che hai assaggiato e amato — sulla mappa di tutto il mondo.
          </p>
        </div>

        <PassportMapLoader />

        <button
          type="button"
          disabled
          className="flex items-center justify-center gap-2 min-h-[48px] rounded-xl border-2 border-vm-border text-vm-muted text-sm font-semibold cursor-not-allowed opacity-60"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
          </svg>
          Esporta per i social — Coming soon
        </button>
      </section>
    </main>
  );
}
