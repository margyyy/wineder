import { WorkshopCreateForm } from "../../../components/management/WorkshopCreateForm";

export default function AddWorkshopPage() {
  return (
    <main>
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px", display: "grid", gap: 16 }}>
        <h1 style={{ margin: 0 }}>Nuovo workshop</h1>
        <p style={{ margin: 0, color: "var(--vm-muted)" }}>
          Inserisci i dati principali del punto vendita o della cantina pubblica.
        </p>
        <WorkshopCreateForm />
      </section>
    </main>
  );
}
