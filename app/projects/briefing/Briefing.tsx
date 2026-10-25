"use client";

import { useEffect, useRef, useState } from "react";
import { useToast } from "@/components/Toast";
import { kunde } from "@/lib/data";

type Nachricht = { von: "agent" | "kunde"; text: string };
type Feld = { name: string; wert: string | null };

// Feste Folge von Rückfragen. Später übernimmt das der Briefing-Agent in Langdock.
const ablauf: { feld: string; frage: string; vorschlaege: string[] }[] = [
  {
    feld: "Zielgruppe",
    frage: "Schön! Wen wollt ihr erreichen: eure Stammkundinnen oder eine jüngere Zielgruppe? Und gibt es schon einen Launch-Termin oder ein Budget?",
    vorschlaege: ["Eher Stammkundinnen", "Jüngere Zielgruppe", "Weiß ich noch nicht"],
  },
  {
    feld: "Budget",
    frage: "Danke! Habt ihr schon einen groben Budgetrahmen im Kopf?",
    vorschlaege: ["Bis 10.000 €", "10.000 bis 25.000 €", "Weiß ich noch nicht"],
  },
  {
    feld: "Material",
    frage: "Letzte Frage: Gibt es schon Material, zum Beispiel Produktfotos oder Texte?",
    vorschlaege: ["Ja, Produktfotos", "Noch nichts", "Lade ich hoch"],
  },
];

export function Briefing() {
  const toast = useToast();
  const [verlauf, setVerlauf] = useState<Nachricht[]>([
    { von: "agent", text: `Moin ${kunde.nutzer.vorname}! Worum geht es? Erzähl einfach drauflos, ich frage nach.` },
    { von: "kunde", text: "Wir bringen im Frühjahr ein neues Rosen-Gesichtsöl raus und brauchen eine Launch-Kampagne. Vor allem Social und am Drogerie-Regal." },
    { von: "agent", text: ablauf[0].frage },
  ]);
  const [schritt, setSchritt] = useState(0);
  const [tippt, setTippt] = useState(false);
  const [eingabe, setEingabe] = useState("");
  const [gesendet, setGesendet] = useState(false);
  const [felder, setFelder] = useState<Feld[]>([
    { name: "Thema", wert: "Launch Rosen-Gesichtsöl" },
    { name: "Kanäle", wert: "Social, Drogerie-Regal" },
    { name: "Zeitraum", wert: "Frühjahr 2027" },
    { name: "Zielgruppe", wert: null },
    { name: "Budget", wert: null },
    { name: "Material", wert: null },
  ]);
  const ende = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ende.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [verlauf, tippt]);

  const fertig = felder.filter((f) => f.wert).length;

  const antworten = (text: string) => {
    if (!text.trim() || tippt || schritt >= ablauf.length) return;
    const aktuell = ablauf[schritt];
    setVerlauf((v) => [...v, { von: "kunde", text }]);
    setEingabe("");
    setTippt(true);
    setTimeout(() => {
      const unklar = text.toLowerCase().includes("weiß ich noch nicht");
      setFelder((fs) => fs.map((f) => (f.name === aktuell.feld ? { ...f, wert: unklar ? "klären wir mit Lena" : text } : f)));
      const naechste = ablauf[schritt + 1];
      setVerlauf((v) => [
        ...v,
        { von: "agent", text: naechste ? naechste.frage : "Super, das Briefing ist komplett. Schau rechts noch einmal drüber und schick es an KURIOS." },
      ]);
      setSchritt((s) => s + 1);
      setTippt(false);
    }, 1100);
  };

  const vorschlaege = schritt < ablauf.length && !tippt ? ablauf[schritt].vorschlaege : [];

  return (
    <div className="review-layout">
      <div className="stack gap-20">
        <div className="chat">
          {verlauf.map((n, i) => (
            <div key={i} className={`chat-msg${n.von === "kunde" ? " is-user" : ""}`}>
              <span className="label">{n.von === "agent" ? "Briefing-Agent" : kunde.nutzer.vorname}</span>
              <div className={`bubble ${n.von === "agent" ? "bubble-agent" : "bubble-user"}`}>{n.text}</div>
            </div>
          ))}
          {tippt ? (
            <div className="chat-msg">
              <span className="label">Briefing-Agent</span>
              <div className="bubble bubble-agent typing" aria-label="schreibt"><span /><span /><span /></div>
            </div>
          ) : null}
          <div ref={ende} />
        </div>
        {vorschlaege.length ? (
          <div className="row wrap gap-8">
            {vorschlaege.map((v) => (
              <button key={v} className="pill" onClick={() => antworten(v)}>{v}</button>
            ))}
          </div>
        ) : null}
        <form className="followup" onSubmit={(e) => { e.preventDefault(); antworten(eingabe); }}>
          <input
            value={eingabe}
            onChange={(e) => setEingabe(e.target.value)}
            placeholder="Antworten, Datei anhängen oder Sprachnachricht …"
            aria-label="Antwort an den Briefing-Agenten"
            disabled={schritt >= ablauf.length}
          />
          <button className="circle" type="submit" aria-label="Senden" style={{ fontWeight: 800, fontSize: 18, color: "#000" }}>→</button>
        </form>
      </div>

      <div className="card card-pad stack gap-16">
        <div className="stack gap-8">
          <h2 className="h2">Dein Briefing</h2>
          <span className="small muted">Füllt sich automatisch beim Gespräch.</span>
        </div>
        <div className="stack gap-8">
          <span className="bold small" style={{ color: "var(--white)" }}>{fertig} von {felder.length} Angaben</span>
          <div className="fortschritt"><span style={{ width: `${(fertig / felder.length) * 100}%` }} /></div>
        </div>
        <div className="stack">
          {felder.map((f) => (
            <div key={f.name} className="brief-row">
              <span className={`brief-dot${f.wert ? " is-done" : ""}`} />
              <span className="small muted">{f.name}</span>
              <span style={{ color: f.wert ? "var(--white)" : "var(--muted)" }}>{f.wert ?? "offen"}</span>
            </div>
          ))}
        </div>
        {gesendet ? (
          <div className="hint-box">Gesendet. Lena meldet sich bis morgen 12 Uhr.</div>
        ) : (
          <>
            <button
              className={`btn btn-lg btn-block${fertig === felder.length ? " btn-primary" : ""}`}
              onClick={() => {
                setGesendet(true);
                toast({
                  titel: "Briefing gesendet",
                  text: "Lena meldet sich bis morgen 12 Uhr. Du findest das Briefing in Projects.",
                  aktion: { label: "Briefing ansehen →", href: "/projects" },
                });
              }}
            >
              An KURIOS senden
            </button>
            {fertig < felder.length ? (
              <span className="small muted">Offene Punkte klärt Lena gern mit dir. Du kannst trotzdem schon senden.</span>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
