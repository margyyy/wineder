import { CantinaManager } from "../../../../components/management/CantinaManager";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ManageCantinaPage({ params }: Props) {
  const { slug } = await params;

  return (
    <main>
      <section style={{ maxWidth: 920, margin: "0 auto", padding: "24px 16px", display: "grid", gap: 16 }}>
        <h1 style={{ margin: 0 }}>Gestione cantina</h1>
        <CantinaManager slug={slug} />
      </section>
    </main>
  );
}
