"use client";

import Link from "next/link";
import { PlayIcon } from "@/components/Icons";
import { useToast } from "@/components/Toast";
import type { Asset, Praesentation } from "@/lib/data";

export function AssetKarte({ a }: { a: Asset }) {
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
        <span className="asset-title">{a.titel}</span>
        <span className="small muted">{a.meta}</span>
        <span className={`frist${knapp ? " is-knapp" : ""}`}>
          {knapp ? `Noch ${a.tageBisFrist} Tage · ${a.frist}` : a.frist}
        </span>
        <div style={{ marginTop: "auto", paddingTop: 12 }}>
          <Link href={`/projects/review/${a.slug}`} className={`btn btn-block${offen ? " btn-primary" : ""}`}>
            {offen ? "Jetzt reviewen" : "Vorschau"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export function PraesentationKarte({ p }: { p: Praesentation }) {
  const toast = useToast();
  return (
    <div className="card asset-card">
      <div className="ph slides" style={{ position: "relative" }}>
        <span className={`status${p.status !== "Abgeschlossen" ? " is-offen" : ""}`}><span className="dot" />{p.status}</span>
        <span className="slides-label">16:9</span>
      </div>
      <div className="asset-body">
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
  );
}

export function AssetZeile({ a }: { a: Asset }) {
  const offen = a.status === "Review offen";
  const knapp = offen && a.tageBisFrist <= 3;
  return (
    <Link href={`/projects/review/${a.slug}`} className="liste-zeile">
      <span className="liste-thumb" aria-hidden />
      <span className="stack" style={{ minWidth: 0 }}>
        <span className="liste-name">{a.titel}</span>
        <span className="liste-text">{a.meta}</span>
      </span>
      <span className={`status-text nur-breit${offen ? " is-offen" : ""}`}><span className="dot" />{a.status}</span>
      <span className={`frist nur-breit${knapp ? " is-knapp" : ""}`}>{knapp ? `Noch ${a.tageBisFrist} Tage` : a.frist}</span>
      <span className="liste-ende bold small" style={{ color: offen ? "var(--lime)" : "var(--white)" }}>
        {offen ? "Reviewen →" : "Vorschau →"}
      </span>
    </Link>
  );
}

export function PraesentationZeile({ p }: { p: Praesentation }) {
  const toast = useToast();
  return (
    <div className="liste-zeile">
      <span className="liste-thumb" aria-hidden />
      <span className="stack" style={{ minWidth: 0 }}>
        <span className="liste-name">{p.titel}</span>
        <span className="liste-text">{p.meta}</span>
      </span>
      <span className={`status-text nur-breit${p.status !== "Abgeschlossen" ? " is-offen" : ""}`}><span className="dot" />{p.status}</span>
      <span className="nur-breit">
        <button className="link-lime" onClick={() => toast({ titel: "Download startet", text: `${p.titel}.pdf` })}>PDF</button>
      </span>
      <span className="liste-ende">
        <button
          className="bold small"
          style={{ color: "var(--white)" }}
          onClick={() => toast({ titel: "Präsentation öffnet in Figma", text: "Kommentieren geht mit einem kostenlosen Figma-Konto." })}
        >
          {p.status === "Abgeschlossen" ? "Ansehen →" : "Kommentieren →"}
        </button>
      </span>
    </div>
  );
}
