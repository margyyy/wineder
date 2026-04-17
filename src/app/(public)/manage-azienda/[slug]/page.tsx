import { AziendaManager } from "../../../../components/management/AziendaManager";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ManageAziendaPage({ params }: Props) {
  const { slug } = await params;

  return (
    <main>
      <section className="max-w-3xl mx-auto px-4 py-6 md:py-10 grid gap-5">
        <h1 className="m-0 text-2xl font-bold">Gestione azienda</h1>
        <AziendaManager slug={slug} />
      </section>
    </main>
  );
}
