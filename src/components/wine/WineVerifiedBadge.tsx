type Props = {
  isVerified: boolean;
};

export function WineVerifiedBadge({ isVerified }: Props) {
  if (!isVerified) {
    return null;
  }

  return (
    <span className="inline-flex w-fit px-3 py-1.5 rounded-full bg-vm-success-bg text-vm-success-ink font-bold text-sm">
      Verificato: produzione e additivi disponibili
    </span>
  );
}
