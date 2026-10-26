"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { AnsichtUmschalter, useAnsicht } from "@/components/Ansicht";
import { Chips } from "@/components/Chips";
import { FolderIcon } from "@/components/Icons";
import { EmptyState } from "@/components/States";
import { assets, praesentationen, projekte, type Projekt } from "@/lib/data";

const filter = ["Alle", "Feedback offen", "In Arbeit", "Abgeschlossen"] as const;
type Filter = (typeof filter)[number];

// Kennzahlen pro Projekt aus Assets, Präsentationen und Briefing.
function zahlen(p: Projekt) {
  const a = assets.filter((x) => x.projekt === p.name);
  const pr = praesentationen.filter((x) => x.projekt === p.name);
  const offen = a.filter((x) => x.status === "Review offen");
  const praesOffen = pr.filter((x) => x.status !== "Abgeschlossen").length;
  const naechste = [...offen].sort((x, y) => x.tageBisFrist - y.tageBisFrist)[0];
  const aufgaben = offen.length + praesOffen + (p.briefing ? 1 : 0);
  return { assets: a.length, praes: pr.length, offen: offen.length, praesOffen, naechste, aufgaben };
}

// "3 Assets · 1 Präsentation", Nullen fallen weg.
function umfang(z: ReturnType<typeof zahlen>) {
  return [
    z.assets ? `${z.assets} ${z.assets === 1 ? "Asset" : "Assets"}` : null,
    z.praes ? `${z.praes} ${z.praes === 1 ? "Präsentation" : "Präsentationen"}` : null,
  ].filter(Boolean);
}

function Offen({ p }: { p: Projekt }) {
  const z = zahlen(p);
  const teile = [
    z.offen ? `${z.offen} ${z.offen === 1 ? "Asset" : "Assets"} zum Review` : null,
    z.praesOffen ? `${z.praesOffen} Präsentation` : null,
    p.briefing ? p.briefing.text : null,
  ].filter(Boolean);
  if (!teile.length) return <span className="small muted">Nichts offen</span>;
  return <span className="neu-hinweis" style={{ fontSize: 14 }}>{teile.join(" · ")}</span>;
}

export function ProjektUebersicht() {
  const params = useSearchParams();
  const [f, setF] = useState<Filter>(params.get("filter") === "review" ? "Feedback offen" : "Alle");
  const [ansicht, setAnsicht] = useAnsicht();

  // Projekte mit offenen Aufgaben zuerst, dann nach nächster Frist.
  const liste = projekte
    .filter((p) => f === "Alle" || p.status === f)
    .sort((a, b) => {
      const za = zahlen(a), zb = zahlen(b);
      return zb.aufgaben - za.aufgaben || (za.naechste?.tageBisFrist ?? 99) - (zb.naechste?.tageBisFrist ?? 99);
    });

  return (
    <>
      <div className="row wrap gap-16" style={{ justifyContent: "space-between" }}>
        <Chips options={filter} value={f} onChange={setF} label="Projekte filtern" />
        <AnsichtUmschalter ansicht={ansicht} onChange={setAnsicht} />
      </div>

      {!liste.length ? (
        <EmptyState text="In dieser Auswahl gibt es gerade kein Projekt.">
          <button className="btn btn-primary" onClick={() => setF("Alle")}>Alle Projekte zeigen</button>
        </EmptyState>
      ) : ansicht === "kacheln" ? (
        <div className="grid grid-2">
          {liste.map((p) => {
            const z = zahlen(p);
            return (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="card card-link projekt-karte">
                <div className="row" style={{ justifyContent: "space-between" }}>
                  <span className="tag">{p.art}</span>
                  <span className={`status-text${p.status === "Feedback offen" ? " is-offen" : ""}`}>
                    <span className="dot" />{p.status}
                  </span>
                </div>
                <div className="stack gap-8">
                  <span className="h2" style={{ fontSize: 28 }}>{p.name}</span>
                  <span className="muted">{p.text}</span>
                </div>
                <div className="stack gap-8">
                  <Offen p={p} />
                  <span className="small muted">
                    {[...umfang(z), p.zeitraum].join(" · ")}
                    {z.naechste ? ` · nächste Frist ${z.naechste.frist.replace("bis ", "")}` : ""}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="liste">
          <div className="liste-kopf label">
            <span />
            <span>Projekt</span>
            <span className="nur-breit">Offen für dich</span>
            <span className="nur-breit">Zeitraum</span>
            <span />
          </div>
          {liste.map((p) => {
            const z = zahlen(p);
            return (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="liste-zeile">
                <span className="liste-icon"><FolderIcon size={24} /></span>
                <span className="stack" style={{ minWidth: 0 }}>
                  <span className="liste-name">{p.name}</span>
                  <span className="liste-text">{[p.art, ...umfang(z)].join(" · ")}</span>
                </span>
                <span className="nur-breit" style={{ minWidth: 0 }}><Offen p={p} /></span>
                <span className="liste-text nur-breit">{p.zeitraum}</span>
                <span className="liste-ende">
                  {z.aufgaben ? <span className="badge">{z.aufgaben}</span> : null}
                  <span className="muted" aria-hidden>→</span>
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
