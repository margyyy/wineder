import type { Metadata } from "next";
import "../styles/tokens.css";
import "leaflet/dist/leaflet.css";
import { NavBar } from "../components/NavBar";

export const metadata: Metadata = {
  title: "WINEDER",
  description: "Trova i vini fatti per te — in 2 minuti",
  icons: { icon: "/favicon.svg" },
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
