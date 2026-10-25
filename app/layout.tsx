import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { ToastProvider } from "@/components/Toast";
import { TopBar } from "@/components/TopBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "WILDBLATT · KURIOS KI",
  description: "Kundenoberfläche von KURIOS (Prototyp mit Beispieldaten)",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <head>
        {/* Ersatzschriften, bis die Weblizenzen für Haben Grotesk und Area Normal da sind */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@800&family=Inter:wght@300;400;800&display=swap"
        />
      </head>
      <body>
        <ToastProvider>
          <TopBar />
          {children}
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
