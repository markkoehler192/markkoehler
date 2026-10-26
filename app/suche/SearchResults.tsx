"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowSend } from "@/components/Icons";
import { EmptyState, LoadingState } from "@/components/States";
import { useToast } from "@/components/Toast";
import { useSprache } from "@/components/Sprache";
import type { Treffer } from "@/lib/data";
import type { T } from "@/lib/sprache";

const fuellwoerter = ["für", "und", "als", "mit", "der", "die", "das", "for", "and", "the", "with"];

function suchen(q: string, suchIndex: Treffer[]) {
  const woerter = q.toLowerCase().split(/\s+/).filter((w) => w.length > 2 && !fuellwoerter.includes(w));
  if (!woerter.length) return [];
  return suchIndex
    .map((t) => ({ t, score: woerter.filter((w) => t.stichworte.includes(w) || t.titel.toLowerCase().includes(w)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.t);
}

// Beispiel-Antwort des Marken-Chats. Später kommt sie aus Langdock.
function antwort(q: string, treffer: Treffer[], t: T) {
  const l = q.toLowerCase();
  if (l.includes("logo")) {
    return {
      text: t(
        "Euer weißes Logo liegt im Archive unter CI / Logo. Für Instagram passt das quadratische PNG mit 1080 px. Soll ich es mit dem KI-Format-Anpasser auf euer Profilbild zuschneiden?",
        "Your white logo is in the archive under CI / Logo. For Instagram, the square 1080 px PNG works best. Shall I crop it to your profile picture with the AI Format Adapter?",
      ),
      quelle: t("CI / Brand Guide, Seite 4", "CI / Brand Guide, page 4"),
    };
  }
  if (!treffer.length) return null;
  return {
    text: t(
      `Ich habe ${treffer.length} passende ${treffer.length === 1 ? "Eintrag" : "Einträge"} gefunden. Der beste Treffer ist „${treffer[0].titel}“ (${treffer[0].meta}).`,
      `I found ${treffer.length} matching ${treffer.length === 1 ? "entry" : "entries"}. The best match is “${treffer[0].titel}” (${treffer[0].meta}).`,
    ),
    quelle: treffer[0].meta.split(" · ")[0],
  };
}

export function SearchResults() {
  const params = useSearchParams();
  const router = useRouter();
  const toast = useToast();
  const { t, d } = useSprache();
  const gruppen: { bereich: Treffer["bereich"]; label: string }[] = [
    { bereich: "Archive", label: t("Im Archive", "In the archive") },
    { bereich: "Projects", label: t("In Projects", "In projects") },
    { bereich: "Studio", label: t("Passendes Tool", "Matching tool") },
  ];
  const q = params.get("q") ?? "";
  const [eingabe, setEingabe] = useState(q);
  const [laedt, setLaedt] = useState(true);

  useEffect(() => {
    setEingabe(q);
    setLaedt(true);
    const t = setTimeout(() => setLaedt(false), 900);
    return () => clearTimeout(t);
  }, [q]);

  const treffer = useMemo(() => suchen(q, d.suchIndex), [q, d]);
  const a = antwort(q, treffer, t);

  return (
    <>
      <Link href="/" className="back">← Start</Link>
      <form
        className="search-big"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (eingabe.trim()) router.push(`/suche?q=${encodeURIComponent(eingabe.trim())}`);
        }}
      >
        <input value={eingabe} onChange={(e) => setEingabe(e.target.value)} aria-label={t("Suchen oder fragen", "Search or ask")} placeholder={t("Suchen oder fragen …", "Search or ask …")} />
        <button className="circle" type="submit" aria-label={t("Suchen", "Search")}><ArrowSend /></button>
      </form>

      {!treffer.length && !laedt ? (
        <EmptyState
          titel={t("Nichts gefunden", "Nothing found")}
          text={t(`Zu „${q}“ haben wir nichts gefunden. Probier ein anderes Wort oder frag Lena direkt.`, `We found nothing for “${q}”. Try another word or ask Lena directly.`)}
        >
          <Link href="/archive" className="btn btn-primary">{t("Archive durchstöbern", "Browse the archive")}</Link>
        </EmptyState>
      ) : (
        <div className="result-layout">
          {laedt ? (
            <LoadingState titel={t("Ich suche …", "Searching …")} text={t("Der KI-Marken-Chat liest Archive, Projects und Studio.", "The AI Brand Chat is reading Archive, Projects and Studio.")} />
          ) : (
            <div className="card answer">
              <span className="row gap-8 label"><span className="dot" style={{ color: "var(--lime)" }} />{t("Antwort", "Answer")}</span>
              <p>{a?.text}</p>
              {q.toLowerCase().includes("logo") ? (
                <div className="row gap-8 wrap">
                  <button className="btn btn-primary" onClick={() => toast({ titel: t("Download startet", "Download starting"), text: t("Logo weiß quadratisch.png (1080 × 1080 px)", "Logo white square.png (1080 × 1080 px)") })}>{t("Herunterladen", "Download")}</button>
                  <Link className="btn" href="/studio">{t("Zuschneiden", "Crop")}</Link>
                </div>
              ) : (
                <div className="row gap-8 wrap">
                  <Link className="btn btn-primary" href={treffer[0].href}>{t("Öffnen", "Open")}</Link>
                </div>
              )}
              {a?.quelle ? <span className="small muted">{t("Quelle", "Source")}: {a.quelle}</span> : null}
            </div>
          )}
          <div className="stack gap-28">
            {gruppen.map((g) => {
              const liste = treffer.filter((t) => t.bereich === g.bereich);
              if (!liste.length) return null;
              return (
                <section key={g.bereich} className="stack gap-12">
                  <h2 className="label">{g.label} · {liste.length} {t("Treffer", liste.length === 1 ? "result" : "results")}</h2>
                  {liste.map((t) => (
                    <Link key={t.titel} href={t.href} className="hit">
                      <span className="hit-thumb" />
                      <span className="stack">
                        <span className="hit-title">{t.titel}</span>
                        <span className="hit-meta">{t.meta}</span>
                      </span>
                      <span className="label hit-typ">{t.typ}</span>
                    </Link>
                  ))}
                </section>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
