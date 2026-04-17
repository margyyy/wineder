import QRCode from "qrcode";

export default async function KioskPage() {
  const qrSvg = await QRCode.toString("https://wineder.it/questionnaire", {
    type: "svg",
    margin: 2,
    color: { dark: "#1a1410", light: "#fffdf9" },
  });

  return (
    <main
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "linear-gradient(135deg, #f5efe6 0%, #ede0ce 100%)" }}
    >
      {/* Outer card */}
      <div
        className="w-full max-w-4xl bg-vm-surface rounded-3xl p-10 flex flex-col md:flex-row items-center gap-10 border border-vm-border"
        style={{ boxShadow: "0 16px 64px rgba(26,20,16,0.10)" }}
      >
        {/* Left: branding + CTA */}
        <div className="flex-1 flex flex-col items-center md:items-start gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/corkscrew.svg" alt="" width={48} height={38} />
            <span className="text-3xl font-bold text-vm-accent tracking-tight">WINEDER</span>
          </div>

          <div>
            <h1
              className="font-bold text-vm-ink leading-tight m-0"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
            >
              Trova il vino<br />fatto per te.
            </h1>
            <p className="text-vm-muted mt-3 m-0" style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)" }}>
              In 2 minuti scopri i vini vicino a te<br />che corrispondono al tuo gusto.
            </p>
          </div>

          <button
            type="button"
            className="min-h-[64px] px-8 rounded-2xl bg-vm-accent text-white font-bold cursor-default"
            style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", boxShadow: "0 8px 32px rgba(139,26,42,0.28)" }}
          >
            Inizia il tuo match →
          </button>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px self-stretch bg-vm-border" />

        {/* Right: QR code */}
        <div className="flex flex-col items-center gap-4">
          <div
            className="rounded-2xl overflow-hidden bg-vm-bg border-2 border-vm-border p-3"
            style={{ width: 240, height: 240 }}
            dangerouslySetInnerHTML={{ __html: qrSvg }}
          />
          <p
            className="text-vm-ink font-bold text-center m-0"
            style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)" }}
          >
            Scansiona per importare<br />i tuoi match
          </p>
        </div>
      </div>
    </main>
  );
}
