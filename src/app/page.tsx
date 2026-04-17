export default function HomePage() {
  return (
    <main>
      <section
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "32px 16px",
        }}
      >
        <div
          style={{
            background: "var(--vm-surface)",
            border: "1px solid var(--vm-border)",
            borderRadius: "20px",
            padding: "24px",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "var(--vm-muted)",
              fontSize: "14px",
            }}
          >
            Foundation ready
          </p>
          <h1 style={{ margin: "8px 0 0", fontSize: "32px" }}>
            VinoMatch Local MVP
          </h1>
        </div>
      </section>
    </main>
  );
}
