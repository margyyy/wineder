import type { Metadata } from "next";
import "../styles/tokens.css";
import "leaflet/dist/leaflet.css";
import { NavBar } from "../components/NavBar";

export const metadata: Metadata = {
  title: "VinoMatch Local MVP",
  description: "Trova vini vicino a te con un questionario rapido",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
