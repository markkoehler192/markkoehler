"use client";

import Link from "next/link";
import { AnsichtUmschalter, useAnsicht } from "@/components/Ansicht";
import { FolderIcon } from "@/components/Icons";
import { useToast } from "@/components/Toast";
import { ordner, zuletztHinzugefuegt } from "@/lib/data";

const dateityp = (name: string) => name.split(".").pop()?.toUpperCase() ?? "";

export function ArchiveInhalt() {
  const [ansicht, setAnsicht] = useAnsicht();
  const toast = useToast();

  return (
    <>
      <section className="stack gap-20">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <h2 className="label">Ordner</h2>
          <AnsichtUmschalter ansicht={ansicht} onChange={setAnsicht} />
        </div>

        {ansicht === "kacheln" ? (
          <div className="grid grid-3">
            {ordner.map((o) => (
              <Link key={o.slug} href={`/archive/${o.slug}`} className="card card-link folder">
                <div className="folder-top">
                  <FolderIcon />
                  <span className="stack" style={{ alignItems: "flex-end", gap: 4 }}>
                    <span className="small muted">{o.anzahl}</span>
                    {o.neu ? <span className="neu-hinweis">{o.neu} neu</span> : null}
                  </span>
                </div>
                <div className="stack gap-8">
                  <span className="h3">{o.name}</span>
                  <span className="muted">{o.text}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="liste">
            <div className="liste-kopf label">
              <span />
              <span>Name</span>
              <span className="nur-breit">Inhalt</span>
              <span className="nur-breit">Umfang</span>
              <span />
            </div>
            {ordner.map((o) => (
              <Link key={o.slug} href={`/archive/${o.slug}`} className="liste-zeile">
                <span className="liste-icon"><FolderIcon size={24} /></span>
                <span className="liste-name">{o.name}</span>
                <span className="liste-text nur-breit">{o.text}</span>
                <span className="liste-text nur-breit">{o.anzahl}</span>
                <span className="liste-ende">
                  {o.neu ? <span className="neu-hinweis">{o.neu} neu</span> : null}
                  <span className="muted" aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="stack gap-20">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <h2 className="h2">Zuletzt hinzugefügt</h2>
          <Link href="/archive/bilder" className="label" style={{ color: "var(--white)" }}>Alle anzeigen →</Link>
        </div>
        {ansicht === "kacheln" ? (
          <div className="grid grid-4">
            {zuletztHinzugefuegt.map((f) => (
              <div key={f.name} className="stack gap-12">
                <div className="ph file-prev" aria-hidden />
                <div className="stack">
                  <span className="bold" style={{ color: "var(--white)" }}>{f.name}</span>
                  <span className="small muted">{f.ort}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="liste">
            <div className="liste-kopf label">
              <span />
              <span>Name</span>
              <span className="nur-breit">Ort</span>
              <span className="nur-breit">Typ</span>
              <span />
            </div>
            {zuletztHinzugefuegt.map((f) => (
              <div key={f.name} className="liste-zeile">
                <span className="liste-thumb" aria-hidden />
                <span className="liste-name">{f.name}</span>
                <span className="liste-text nur-breit">{f.ort}</span>
                <span className="liste-text nur-breit">{dateityp(f.name)}</span>
                <span className="liste-ende">
                  <button className="link-lime" onClick={() => toast({ titel: "Download startet", text: f.name })}>Download</button>
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
