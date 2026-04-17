import { WorkshopCreateForm } from "../../../components/management/WorkshopCreateForm";

export default function AddWorkshopPage() {
  return (
    <main>
      <section className="max-w-xl mx-auto px-4 py-6 md:py-10 grid gap-4">
        <h1 className="m-0 text-2xl font-bold">Nuovo workshop</h1>
        <p className="m-0 text-vm-muted">
          Inserisci i dati principali del punto vendita o della cantina pubblica.
        </p>
        <WorkshopCreateForm />
      </section>
    </main>
  );
}
