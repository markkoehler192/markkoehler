"use client";

import Link from "next/link";
import { AnsichtUmschalter, useAnsicht } from "@/components/Ansicht";
import { ArrowTool } from "@/components/Icons";
import { useToast } from "@/components/Toast";
import { ToolAnfragen } from "@/components/ToolAnfragen";
import { useSprache } from "@/components/Sprache";
import type { Tool } from "@/lib/data";

// Geschützter Bindestrich bzw. Leerzeichen, damit „KI-“/„AI“ in den Kacheln nicht allein in der ersten Zeile steht.
const titel = (name: string) => name.replace(/^KI-/, "KI\u2011").replace(/^AI /, "AI\u00a0");

export function StudioTools() {
  const [ansicht, setAnsicht] = useAnsicht();
  const toast = useToast();
  const { t: tx, d } = useSprache();
  const { aktiveTools, weitereTools } = d;

  const oeffnen = (t: Tool) =>
    toast({ titel: tx(`${t.name} öffnet bald`, `${t.name} is coming soon`), text: tx("Dieses Tool ist im Prototyp noch nicht ausgebaut.", "This tool isn't built out in the prototype yet.") });
  const anfragen = (name: string) =>
    toast({
      titel: tx("Anfrage gesendet", "Request sent"),
      text: tx(`Lena meldet sich zu „${name}“ und bespricht mit euch, was das Tool können soll.`, `Lena will get in touch about “${name}” and talk through what the tool should do.`),
    });

  return (
    <>
      <section className="stack gap-20">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <h2 className="label">{tx("Eure Tools", "Your tools")} · {aktiveTools.length}</h2>
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
                    <span className="h3">{titel(t.name)}</span>
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
              <span className="nur-breit">{tx("Wofür", "What for")}</span>
              <span className="nur-breit">{tx("Nutzt", "Uses")}</span>
              <span />
            </div>
            {aktiveTools.map((t) => {
              const zeile = (
                <>
                  <span className="liste-icon"><span className="circle" style={{ width: 32, height: 32 }}><ArrowTool size={16} /></span></span>
                  <span className="liste-name">{t.name}</span>
                  <span className="liste-text nur-breit">{t.text}</span>
                  <span className="liste-text nur-breit">{t.nutzt.replace(/^(nutzt|uses) /, "")}</span>
                  <span className="liste-ende bold small" style={{ color: "var(--white)" }}>{tx("Öffnen →", "Open →")}</span>
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
        <h2 className="label">{tx("Weitere Tools, die wir für euch bauen können", "More tools we can build for you")}</h2>
        {ansicht === "kacheln" ? (
          <div className="grid grid-4">
            {weitereTools.map((t) => (
              <div key={t.slug} className="card tool">
                <span className="tag" style={{ alignSelf: "flex-start" }}>{t.nutzt}</span>
                <div className="stack gap-8">
                  <span className="h3">{titel(t.name)}</span>
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
                <span className="liste-text nur-breit">{t.nutzt}</span>
                <span className="liste-ende"><button className="pill" onClick={() => anfragen(t.name)}>{tx("Anfragen", "Request")}</button></span>
              </div>
            ))}
            <button
              className="liste-zeile"
              onClick={() => toast({ titel: tx("Danke für die Idee", "Thanks for the idea"), text: tx("Lena meldet sich bei dir, um zu klären, was euch fehlt.", "Lena will get in touch to find out what you're missing.") })}
            >
              <span className="liste-icon"><span className="state-icon" style={{ width: 32, height: 32, fontSize: 16, borderStyle: "dashed" }}>+</span></span>
              <span className="liste-name">{tx("Tool anfragen", "Request a tool")}</span>
              <span className="liste-text nur-breit">{tx("Euch fehlt etwas? Wir bauen es.", "Missing something? We'll build it.")}</span>
              <span className="nur-breit" />
              <span className="liste-ende muted" aria-hidden>→</span>
            </button>
          </div>
        )}
      </section>
    </>
  );
}
