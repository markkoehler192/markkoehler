"use client";

import Link from "next/link";
import { AnsichtUmschalter, useAnsicht } from "@/components/Ansicht";
import { ArrowTool } from "@/components/Icons";
import { useToast } from "@/components/Toast";
import { ToolAnfragen } from "@/components/ToolAnfragen";
import { aktiveTools, weitereTools, type Tool } from "@/lib/data";

export function StudioTools() {
  const [ansicht, setAnsicht] = useAnsicht();
  const toast = useToast();

  const oeffnen = (t: Tool) => toast({ titel: `${t.name} öffnet bald`, text: "Dieses Tool ist im Prototyp noch nicht ausgebaut." });
  const anfragen = (name: string) =>
    toast({ titel: "Anfrage gesendet", text: `Lena meldet sich zu „${name}“ und bespricht mit euch, was das Tool können soll.` });

  return (
    <>
      <section className="stack gap-20">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <h2 className="label">Eure Tools · {aktiveTools.length}</h2>
          <AnsichtUmschalter ansicht={ansicht} onChange={setAnsicht} />
        </div>
        {ansicht === "kacheln" ? (
          <div className="grid grid-4">
            {aktiveTools.map((t) => {
              const inhalt = (
                <>
                  <span className="tag" style={{ alignSelf: "flex-start" }}>{t.nutzt}</span>
                  <span className="circle"><ArrowTool /></span>
                  <div className="stack gap-8">
                    <span className="h3">{t.name}</span>
                    <span className="muted">{t.text}</span>
                  </div>
                </>
              );
              return t.href ? (
                <Link key={t.slug} href={t.href} className="card card-link tool">{inhalt}</Link>
              ) : (
                <ToolAnfragen key={t.slug} tool={t} modus="vorschau">{inhalt}</ToolAnfragen>
              );
            })}
          </div>
        ) : (
          <div className="liste">
            <div className="liste-kopf label">
              <span />
              <span>Tool</span>
              <span className="nur-breit">Wofür</span>
              <span className="nur-breit">Nutzt</span>
              <span />
            </div>
            {aktiveTools.map((t) => {
              const zeile = (
                <>
                  <span className="liste-icon"><span className="circle" style={{ width: 32, height: 32 }}><ArrowTool size={16} /></span></span>
                  <span className="liste-name">{t.name}</span>
                  <span className="liste-text nur-breit">{t.text}</span>
                  <span className="liste-text nur-breit">{t.nutzt.replace("nutzt ", "")}</span>
                  <span className="liste-ende bold small" style={{ color: "var(--white)" }}>Öffnen →</span>
                </>
              );
              return t.href ? (
                <Link key={t.slug} href={t.href} className="liste-zeile">{zeile}</Link>
              ) : (
                <button key={t.slug} className="liste-zeile" onClick={() => oeffnen(t)}>{zeile}</button>
              );
            })}
          </div>
        )}
      </section>

      <section className="stack gap-20">
        <h2 className="label">Weitere Tools, die wir für euch bauen können</h2>
        {ansicht === "kacheln" ? (
          <div className="grid grid-4">
            {weitereTools.map((t) => (
              <div key={t.slug} className="card tool">
                <span className="tag" style={{ alignSelf: "flex-start" }}>auf Anfrage</span>
                <div className="stack gap-8">
                  <span className="h3">{t.name}</span>
                  <span className="muted">{t.text}</span>
                  <ToolAnfragen tool={t} modus="anfrage" />
                </div>
              </div>
            ))}
            <ToolAnfragen modus="neu" />
          </div>
        ) : (
          <div className="liste">
            {weitereTools.map((t) => (
              <div key={t.slug} className="liste-zeile">
                <span className="liste-icon"><span className="state-icon" style={{ width: 32, height: 32, fontSize: 16 }}>+</span></span>
                <span className="liste-name">{t.name}</span>
                <span className="liste-text nur-breit">{t.text}</span>
                <span className="liste-text nur-breit">auf Anfrage</span>
                <span className="liste-ende"><button className="pill" onClick={() => anfragen(t.name)}>Anfragen</button></span>
              </div>
            ))}
            <button
              className="liste-zeile"
              onClick={() => toast({ titel: "Danke für die Idee", text: "Lena meldet sich bei dir, um zu klären, was euch fehlt." })}
            >
              <span className="liste-icon"><span className="state-icon" style={{ width: 32, height: 32, fontSize: 16, borderStyle: "dashed" }}>+</span></span>
              <span className="liste-name">Tool anfragen</span>
              <span className="liste-text nur-breit">Euch fehlt etwas? Wir bauen es.</span>
              <span className="nur-breit" />
              <span className="liste-ende muted" aria-hidden>→</span>
            </button>
          </div>
        )}
      </section>
    </>
  );
}
