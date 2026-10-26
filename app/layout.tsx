import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { SpracheProvider } from "@/components/Sprache";
import { ToastProvider } from "@/components/Toast";
import { TopBar } from "@/components/TopBar";
import { getSprache } from "@/lib/sprache-server";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getSprache();
  return {
    title: t("WILDBLATT · KURIOS KI", "WILDBLATT · KURIOS AI"),
    description: t("Kundenoberfläche von KURIOS (Prototyp mit Beispieldaten)", "KURIOS client portal (prototype with sample data)"),
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const { s } = await getSprache();
  return (
    <html lang={s}>
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
        <SpracheProvider sprache={s}>
          <ToastProvider>
            <TopBar />
            {children}
            <Footer />
          </ToastProvider>
        </SpracheProvider>
      </body>
    </html>
  );
}
