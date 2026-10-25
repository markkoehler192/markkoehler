"use client";

import Link from "next/link";
import { EmptyState, ErrorState, LoadingState } from "@/components/States";
import { useToast, type ToastInput } from "@/components/Toast";

const bestaetigungen: ToastInput[] = [
  {
    titel: "Freigegeben",
    text: "Lena weiß Bescheid. Das finale Bild liegt jetzt in Archive / Kampagnen / Ringelblume 2026.",
    aktion: { label: "Im Archive ansehen →", href: "/archive/kampagnen" },
  },
  {
    titel: "Briefing gesendet",
    text: "Lena meldet sich bis morgen 12 Uhr. Du findest das Briefing in Projects.",
    aktion: { label: "Briefing ansehen →", href: "/projects" },
  },
  {
    titel: "Ins Archive gelegt",
    text: "Der Post liegt in Archive / Social Media / Entwürfe.",
    aktion: { label: "Rückgängig" },
  },
];

export function ZustaendeDemo() {
  const toast = useToast();
  return (
    <>
      <section className="stack gap-20">
        <h2 className="label">Bestätigungen nach Aktionen (unten mittig, 5 Sekunden). Zum Ausprobieren anklicken.</h2>
        <div className="grid grid-3">
          {bestaetigungen.map((b) => (
            <button key={b.titel} className="card card-link toast" style={{ textAlign: "left", animation: "none", boxShadow: "none" }} onClick={() => toast(b)}>
              <span className="toast-check" aria-hidden>✓</span>
              <span>
                <span className="toast-title" style={{ display: "block" }}>{b.titel}</span>
                <span className="toast-text" style={{ display: "block" }}>{b.text}</span>
                <span className="toast-action">{b.aktion?.label}</span>
              </span>
              <span />
            </button>
          ))}
        </div>
      </section>
      <section className="stack gap-20">
        <h2 className="label">Leer · lädt · Fehler</h2>
        <div className="grid grid-3">
          <EmptyState text="Sobald wir ein Asset für euch fertig haben, landet es in diesem Ordner.">
            <Link href="/projects/briefing" className="btn btn-primary">Briefing starten</Link>
          </EmptyState>
          <LoadingState titel="Dein Text entsteht …" text="Der Markentexter liest eure Markensprache und schreibt. Dauert etwa 10 Sekunden." />
          <ErrorState text="Der Text konnte gerade nicht erstellt werden. Dein Auftrag ist gespeichert." onRetry={() => toast({ titel: "Neuer Versuch läuft" })} />
        </div>
      </section>
    </>
  );
}
