"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Chips } from "@/components/Chips";
import { PlayIcon } from "@/components/Icons";
import { EmptyState } from "@/components/States";
import { useToast } from "@/components/Toast";
import { assets, praesentationen, type Asset } from "@/lib/data";

const filter = ["Alle", "Review offen", "In Arbeit", "Freigegeben", "Präsentationen"] as const;
type Filter = (typeof filter)[number];

function AssetKarte({ a }: { a: Asset }) {
  const offen = a.status === "Review offen";
  const knapp = offen && a.tageBisFrist <= 3;
  return (
    <div className="card asset-card">
      <div className="ph asset-prev">
        <span className={`status${offen ? " is-offen" : ""}`}><span className="dot" />{a.status}</span>
        {a.art === "Video" ? <PlayIcon /> : a.art}
        {a.dauer ? <span className="dauer">{a.dauer}</span> : null}
      </div>
      <div className="asset-body">
        <span className="label">{a.projekt}</span>
        <span className="asset-title">{a.titel}</span>
        <span className="small muted">{a.meta}</span>
        <span className={`frist${knapp ? " is-knapp" : ""}`}>
          {knapp ? `Noch ${a.tageBisFrist} Tage · ${a.frist}` : a.frist}
        </span>
        <div style={{ marginTop: "auto", paddingTop: 12 }}>
          {offen ? (
            <Link href={`/projects/review/${a.slug}`} className="btn btn-primary btn-block">Jetzt reviewen</Link>
          ) : (
            <Link href={`/projects/review/${a.slug}`} className="btn btn-block">Vorschau</Link>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProjectsListe() {
  const params = useSearchParams();
  const toast = useToast();
  const [f, setF] = useState<Filter>(params.get("filter") === "review" ? "Review offen" : "Alle");

  // Nach Frist sortiert, offene Reviews zuerst.
  const liste = [...assets]
    .filter((a) => f === "Alle" || a.status === f)
    .sort((a, b) => Number(b.status === "Review offen") - Number(a.status === "Review offen") || a.tageBisFrist - b.tageBisFrist);

  const zeigeAssets = f !== "Präsentationen";
  const zeigePraes = f === "Alle" || f === "Präsentationen";

  return (
    <>
      <div className="row wrap gap-16" style={{ justifyContent: "space-between" }}>
        <Chips options={filter} value={f} onChange={setF} label="Projekte filtern" />
        <Link href="/projects/briefing" className="btn btn-primary">+ Neues Briefing</Link>
      </div>

      {zeigeAssets ? (
        <section className="stack gap-20">
          <h2 className="label">Briefing und Assets im Review</h2>
          {liste.length || f === "Alle" ? (
            <div className="grid grid-3">
              {f === "Alle" ? (
                <div className="card card-pad stack" style={{ justifyContent: "space-between", gap: 24 }}>
                  <div className="row" style={{ justifyContent: "space-between" }}>
                    <span className="circle" style={{ background: "var(--lime)", fontSize: 30, fontWeight: 800, color: "#000" }}>+</span>
                    <span className="tag">Briefing-Agent</span>
                  </div>
                  <div className="stack gap-12">
                    <span className="h2" style={{ fontSize: 24 }}>Neues Briefing</span>
                    <span className="muted">Kampagne, Asset oder Idee? Erzähl uns davon. Der Briefing-Agent stellt die richtigen Rückfragen.</span>
                  </div>
                  <Link href="/projects/briefing" className="btn btn-primary btn-block">Briefing starten →</Link>
                </div>
              ) : null}
              {liste.map((a) => <AssetKarte key={a.slug} a={a} />)}
            </div>
          ) : (
            <EmptyState
              text={f === "Freigegeben" ? "Hier landet alles, was du freigegeben hast. Die finalen Dateien liegen dann auch im Archive." : "Gerade gibt es hier nichts. Sobald KURIOS etwas fertig hat, siehst du es hier."}
            >
              <Link href="/projects/briefing" className="btn btn-primary">Briefing starten</Link>
            </EmptyState>
          )}
        </section>
      ) : null}

      {zeigePraes ? (
        <section className="stack gap-20">
          <h2 className="label">Präsentationen</h2>
          <div className="grid grid-3">
            {praesentationen.map((p) => (
              <div key={p.titel} className="card asset-card">
                <div className="ph slides" style={{ position: "relative" }}>
                  <span className={`status${p.status !== "Abgeschlossen" ? " is-offen" : ""}`}><span className="dot" />{p.status}</span>
                  <span className="slides-label">16:9</span>
                </div>
                <div className="asset-body">
                  <span className="label">{p.projekt}</span>
                  <span className="asset-title">{p.titel}</span>
                  <span className="small muted">{p.meta}</span>
                  <div className="praes-actions">
                    <button
                      className={`btn${p.status === "Abgeschlossen" ? "" : " btn-primary"}`}
                      onClick={() => toast({ titel: "Präsentation öffnet in Figma", text: "Kommentieren geht mit einem kostenlosen Figma-Konto." })}
                    >
                      {p.status === "Abgeschlossen" ? "Ansehen" : "Ansehen + kommentieren"}
                    </button>
                    <button className="btn" onClick={() => toast({ titel: "Download startet", text: `${p.titel}.pdf` })}>PDF</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
