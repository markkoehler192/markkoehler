"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnsichtUmschalter, useAnsicht } from "@/components/Ansicht";
import { ArchiveSearch } from "@/components/ArchiveSearch";
import { Chips } from "@/components/Chips";
import { FolderIcon } from "@/components/Icons";
import { EmptyState } from "@/components/States";
import { useToast } from "@/components/Toast";
import { bilder, bilderUnterordner } from "@/lib/data";

const filter = ["Neueste", "Alle", "Freigestellt", "Querformat", "Hochformat"] as const;
type Filter = (typeof filter)[number];

export function BilderOrdner() {
  const toast = useToast();
  const [f, setF] = useState<Filter>("Neueste");
  const [q, setQ] = useState("");
  const [unterordner, setUnterordner] = useState<string | null>(null);
  const [auswahl, setAuswahl] = useState<string[]>([]);
  const [ansicht, setAnsicht] = useAnsicht();

  const liste = useMemo(
    () =>
      bilder.filter((b) => {
        if (q && !b.name.toLowerCase().includes(q.toLowerCase())) return false;
        if (unterordner && b.ordner !== unterordner) return false;
        if (f === "Freigestellt") return b.freigestellt;
        if (f === "Querformat") return b.format === "quer";
        if (f === "Hochformat") return b.format === "hoch";
        return true;
      })
      // "Neueste" ist die Standardsortierung: neue Bilder zuerst, alle sichtbar.
      .sort((a, b) => (f === "Neueste" ? Number(b.neu) - Number(a.neu) : 0)),
    [f, q, unterordner],
  );

  const toggle = (name: string) =>
    setAuswahl((a) => (a.includes(name) ? a.filter((x) => x !== name) : [...a, name]));

  const download = (namen: string[]) =>
    toast({
      titel: namen.length === 1 ? "Download startet" : `${namen.length} Bilder werden geladen`,
      text: namen.length === 1 ? namen[0] : "Als ZIP-Datei, in Originalgröße.",
    });

  return (
    <>
      <div className="head-row">
        <div className="stack gap-12">
          <Link href="/archive" className="back">← Archive</Link>
          <h1 className="h1">Bilder</h1>
          <p className="sub" style={{ marginTop: 0 }}>312 Bilder in 4 Ordnern</p>
        </div>
        <ArchiveSearch placeholder="In Bilder suchen …" value={q} onSearch={setQ} />
      </div>

      <div className="row wrap gap-16" style={{ justifyContent: "space-between" }}>
        <div className="breadcrumb">
          Archive / {unterordner ? <>Bilder / <b>{unterordner}</b></> : <b>Bilder</b>}
        </div>
        <AnsichtUmschalter ansicht={ansicht} onChange={setAnsicht} />
      </div>

      {ansicht === "kacheln" ? (
        <div className="grid grid-4">
          {bilderUnterordner.map((u) => (
            <button
              key={u.name}
              className="card card-link subfolder"
              aria-pressed={unterordner === u.name}
              style={unterordner === u.name ? { borderColor: "var(--white)" } : undefined}
              onClick={() => setUnterordner(unterordner === u.name ? null : u.name)}
            >
              <FolderIcon size={24} />
              <span className="bold" style={{ color: "var(--white)" }}>{u.name}</span>
              <span className="small muted" style={{ marginLeft: "auto" }}>{u.anzahl}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="liste">
          {bilderUnterordner.map((u) => (
            <button
              key={u.name}
              className={`liste-zeile${unterordner === u.name ? " is-selected" : ""}`}
              aria-pressed={unterordner === u.name}
              onClick={() => setUnterordner(unterordner === u.name ? null : u.name)}
            >
              <span className="liste-icon"><FolderIcon size={24} /></span>
              <span className="liste-name">{u.name}</span>
              <span className="liste-text nur-breit" />
              <span className="liste-text nur-breit">{u.anzahl} Bilder</span>
              <span className="liste-ende muted" aria-hidden>→</span>
            </button>
          ))}
        </div>
      )}

      <div className="row wrap gap-16" style={{ justifyContent: "space-between" }}>
        <Chips options={filter} value={f} onChange={setF} label="Bilder filtern" />
        <div className="row gap-8">
          {auswahl.length ? (
            <button className="btn btn-primary" onClick={() => download(auswahl)}>
              {auswahl.length} herunterladen
            </button>
          ) : null}
          <button className="btn" onClick={() => download(liste.map((b) => b.name))} disabled={!liste.length}>
            Alle herunterladen
          </button>
        </div>
      </div>

      {liste.length && ansicht === "liste" ? (
        <div className="liste">
          <div className="liste-kopf label">
            <span />
            <span>Name</span>
            <span className="nur-breit">Ordner</span>
            <span className="nur-breit">Format</span>
            <span />
          </div>
          {liste.map((b) => (
            <div key={b.name} className="liste-zeile">
              <input
                type="checkbox"
                aria-label={`${b.name} auswählen`}
                checked={auswahl.includes(b.name)}
                onChange={() => toggle(b.name)}
              />
              <span className="row gap-12" style={{ minWidth: 0 }}>
                <span className="liste-thumb" aria-hidden />
                <span className="liste-name">{b.name}</span>
              </span>
              <span className="liste-text nur-breit">{b.ordner}</span>
              <span className="liste-text nur-breit">
                {b.format === "quer" ? "Querformat" : "Hochformat"}{b.freigestellt ? " · freigestellt" : ""}
              </span>
              <span className="liste-ende">
                {b.neu ? <span className="neu-hinweis">neu</span> : null}
                <button className="link-lime" onClick={() => download([b.name])}>Download</button>
              </span>
            </div>
          ))}
        </div>
      ) : liste.length ? (
        <div className="grid grid-4">
          {liste.map((b) => (
            <div key={b.name} className="img-card">
              <div className="ph img-prev">
                <input
                  type="checkbox"
                  aria-label={`${b.name} auswählen`}
                  checked={auswahl.includes(b.name)}
                  onChange={() => toggle(b.name)}
                />
                {b.format === "quer" ? "Querformat" : "Hochformat"}
              </div>
              <div className="row" style={{ justifyContent: "space-between", gap: 8 }}>
                <span className="stack">
                  <span className="bold" style={{ color: "var(--white)" }}>{b.name}</span>
                  <span className="small muted">{b.ordner}</span>
                </span>
                <button className="link-lime" onClick={() => download([b.name])}>Download</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState titel="Keine Treffer" text="Mit diesem Filter oder Suchbegriff gibt es keine Bilder. Probier einen anderen Filter.">
          <button className="btn btn-primary" onClick={() => { setF("Alle"); setQ(""); setUnterordner(null); }}>Filter zurücksetzen</button>
        </EmptyState>
      )}
    </>
  );
}
