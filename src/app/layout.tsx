import type { Metadata } from "next";
import "../styles/tokens.css";

export const metadata: Metadata = {
  title: "VinoMatch Local MVP",
  description: "Foundation app shell for local wine matching MVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body style={{ fontFamily: '"Space Grotesk", "Manrope", sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
