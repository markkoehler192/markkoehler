"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowSend } from "@/components/Icons";
import { EmptyState, LoadingState } from "@/components/States";
import { useToast } from "@/components/Toast";
import { suchIndex, type Treffer } from "@/lib/data";

const gruppen: { bereich: Treffer["bereich"]; label: string }[] = [
  { bereich: "Archive", label: "Im Archive" },
  { bereich: "Projects", label: "In Projects" },
  { bereich: "Studio", label: "Passendes Tool" },
];

function suchen(q: string) {
  const woerter = q.toLowerCase().split(/\s+/).filter((w) => w.length > 2 && !["für", "und", "als", "mit", "der", "die", "das"].includes(w));
  if (!woerter.length) return [];
  return suchIndex
    .map((t) => ({ t, score: woerter.filter((w) => t.stichworte.includes(w) || t.titel.toLowerCase().includes(w)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.t);
}

// Beispiel-Antwort des Marken-Chats. Später kommt sie aus Langdock.
function antwort(q: string, treffer: Treffer[]) {
  const l = q.toLowerCase();
  if (l.includes("logo")) {
    return {
      text: "Euer weißes Logo liegt im Archive unter CI / Logo. Für Instagram passt das quadratische PNG mit 1080 px. Soll ich es mit dem KI-Format-Anpasser auf euer Profilbild zuschneiden?",
      quelle: "CI / Brand Guide, Seite 4",
    };
  }
  if (!treffer.length) return null;
  return {
    text: `Ich habe ${treffer.length} passende ${treffer.length === 1 ? "Eintrag" : "Einträge"} gefunden. Der beste Treffer ist „${treffer[0].titel}“ (${treffer[0].meta}).`,
    quelle: treffer[0].meta.split(" · ")[0],
  };
}

export function SearchResults() {
  const params = useSearchParams();
  const router = useRouter();
  const toast = useToast();
  const q = params.get("q") ?? "";
  const [eingabe, setEingabe] = useState(q);
  const [laedt, setLaedt] = useState(true);

  useEffect(() => {
    setEingabe(q);
    setLaedt(true);
    const t = setTimeout(() => setLaedt(false), 900);
    return () => clearTimeout(t);
  }, [q]);

  const treffer = useMemo(() => suchen(q), [q]);
  const a = antwort(q, treffer);

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
        <input value={eingabe} onChange={(e) => setEingabe(e.target.value)} aria-label="Suchen oder fragen" placeholder="Suchen oder fragen …" />
        <button className="circle" type="submit" aria-label="Suchen"><ArrowSend /></button>
      </form>

      {!treffer.length && !laedt ? (
        <EmptyState
          titel="Nichts gefunden"
          text={`Zu „${q}“ haben wir nichts gefunden. Probier ein anderes Wort oder frag Lena direkt.`}
        >
          <Link href="/archive" className="btn btn-primary">Archive durchstöbern</Link>
        </EmptyState>
      ) : (
        <div className="result-layout">
          {laedt ? (
            <LoadingState titel="Ich suche …" text="Der Marken-Chat liest Archive, Projects und Studio." />
          ) : (
            <div className="card answer">
              <span className="row gap-8 label"><span className="dot" style={{ color: "var(--lime)" }} />Antwort</span>
              <p>{a?.text}</p>
              {q.toLowerCase().includes("logo") ? (
                <div className="row gap-8 wrap">
                  <button className="btn btn-primary" onClick={() => toast({ titel: "Download startet", text: "Logo weiß quadratisch.png (1080 × 1080 px)" })}>Herunterladen</button>
                  <Link className="btn" href="/studio">Zuschneiden</Link>
                </div>
              ) : (
                <div className="row gap-8 wrap">
                  <Link className="btn btn-primary" href={treffer[0].href}>Öffnen</Link>
                </div>
              )}
              {a?.quelle ? <span className="small muted">Quelle: {a.quelle}</span> : null}
            </div>
          )}
          <div className="stack gap-28">
            {gruppen.map((g) => {
              const liste = treffer.filter((t) => t.bereich === g.bereich);
              if (!liste.length) return null;
              return (
                <section key={g.bereich} className="stack gap-12">
                  <h2 className="label">{g.label} · {liste.length} Treffer</h2>
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
