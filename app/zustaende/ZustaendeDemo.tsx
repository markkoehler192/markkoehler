"use client";

import Link from "next/link";
import { useSprache } from "@/components/Sprache";
import { EmptyState, ErrorState, LoadingState } from "@/components/States";
import { useToast, type ToastInput } from "@/components/Toast";

export function ZustaendeDemo() {
  const toast = useToast();
  const { t } = useSprache();

  const bestaetigungen: ToastInput[] = [
    {
      titel: t("Freigegeben", "Approved"),
      text: t(
        "Lena weiß Bescheid. Das finale Bild liegt jetzt in Archive / Kampagnen / Ringelblume 2026.",
        "Lena has been told. The final image is now in Archive / Campaigns / Calendula 2026.",
      ),
      aktion: { label: t("Im Archive ansehen →", "View in archive →"), href: "/archive/kampagnen" },
    },
    {
      titel: t("Briefing gesendet", "Briefing sent"),
      text: t("Lena meldet sich bis morgen 12 Uhr. Du findest das Briefing in Projects.", "Lena will get back to you by noon tomorrow. You'll find the briefing in Projects."),
      aktion: { label: t("Briefing ansehen →", "View briefing →"), href: "/projects" },
    },
    {
      titel: t("Ins Archive gelegt", "Saved to the archive"),
      text: t("Der Post liegt in Archive / Social Media / Entwürfe.", "The post is in Archive / Social Media / Drafts."),
      aktion: { label: t("Rückgängig", "Undo") },
    },
  ];

  return (
    <>
      <section className="stack gap-20">
        <h2 className="label">{t("Bestätigungen nach Aktionen (unten mittig, 5 Sekunden). Zum Ausprobieren anklicken.", "Confirmations after actions (bottom centre, 5 seconds). Click to try.")}</h2>
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
        <h2 className="label">{t("Leer · lädt · Fehler", "Empty · loading · error")}</h2>
        <div className="grid grid-3">
          <EmptyState text={t("Sobald wir ein Asset für euch fertig haben, landet es in diesem Ordner.", "As soon as we finish an asset for you, it lands in this folder.")}>
            <Link href="/projects/briefing" className="btn btn-primary">{t("Briefing starten", "Start a briefing")}</Link>
          </EmptyState>
          <LoadingState
            titel={t("Dein Text entsteht …", "Writing your copy …")}
            text={t("Der KI-Markentexter liest eure Markensprache und schreibt. Dauert etwa 10 Sekunden.", "The AI Brand Writer is reading your brand voice and writing. Takes about 10 seconds.")}
          />
          <ErrorState
            text={t("Der Text konnte gerade nicht erstellt werden. Dein Auftrag ist gespeichert.", "The copy couldn't be created just now. Your request is saved.")}
            onRetry={() => toast({ titel: t("Neuer Versuch läuft", "Trying again") })}
          />
        </div>
      </section>
    </>
  );
}
