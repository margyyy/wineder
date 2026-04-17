type Props = {
  isVerified: boolean;
};

export function WineVerifiedBadge({ isVerified }: Props) {
  if (!isVerified) {
    return null;
  }

  return (
    <span
      style={{
        display: "inline-flex",
        width: "fit-content",
        padding: "6px 10px",
        borderRadius: 999,
        background: "#ddfbe3",
        color: "#126227",
        fontWeight: 700,
        fontSize: 13,
      }}
    >
      Verificato: produzione e additivi disponibili
    </span>
  );
}
