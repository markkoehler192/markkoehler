"use client";

import Link from "next/link";
import { AnsichtUmschalter, useAnsicht } from "@/components/Ansicht";
import { FolderIcon } from "@/components/Icons";
import { useToast } from "@/components/Toast";
import { useSprache } from "@/components/Sprache";

const dateityp = (name: string) => name.split(".").pop()?.toUpperCase() ?? "";

export function ArchiveInhalt() {
  const [ansicht, setAnsicht] = useAnsicht();
  const toast = useToast();
  const { t, d } = useSprache();
  const { ordner, zuletztHinzugefuegt } = d;

  return (
    <>
      <section className="stack gap-20">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <h2 className="label">{t("Ordner", "Folders")}</h2>
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
                    {o.neu ? <span className="neu-hinweis">{o.neu} {t("neu", "new")}</span> : null}
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
              <span className="nur-breit">{t("Inhalt", "Contents")}</span>
              <span className="nur-breit">{t("Umfang", "Size")}</span>
              <span />
            </div>
            {ordner.map((o) => (
              <Link key={o.slug} href={`/archive/${o.slug}`} className="liste-zeile">
                <span className="liste-icon"><FolderIcon size={24} /></span>
                <span className="liste-name">{o.name}</span>
                <span className="liste-text nur-breit">{o.text}</span>
                <span className="liste-text nur-breit">{o.anzahl}</span>
                <span className="liste-ende">
                  {o.neu ? <span className="neu-hinweis">{o.neu} {t("neu", "new")}</span> : null}
                  <span className="muted" aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="stack gap-20">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <h2 className="h2">{t("Zuletzt hinzugefügt", "Recently added")}</h2>
          <Link href="/archive/bilder" className="label" style={{ color: "var(--white)" }}>{t("Alle anzeigen →", "Show all →")}</Link>
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
              <span className="nur-breit">{t("Ort", "Location")}</span>
              <span className="nur-breit">{t("Typ", "Type")}</span>
              <span />
            </div>
            {zuletztHinzugefuegt.map((f) => (
              <div key={f.name} className="liste-zeile">
                <span className="liste-thumb" aria-hidden />
                <span className="liste-name">{f.name}</span>
                <span className="liste-text nur-breit">{f.ort}</span>
                <span className="liste-text nur-breit">{dateityp(f.name)}</span>
                <span className="liste-ende">
                  <button className="link-lime" onClick={() => toast({ titel: t("Download startet", "Download starting"), text: f.name })}>Download</button>
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
