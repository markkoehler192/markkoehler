"use client";

import { useEffect, useRef, useState } from "react";
import { useToast } from "@/components/Toast";
import { useSprache } from "@/components/Sprache";
import type { T } from "@/lib/sprache";

type Nachricht = { von: "agent" | "kunde"; text: string };
type Feld = { name: string; wert: string | null };

// Feste Folge von Rückfragen. Später übernimmt das der Briefing-Agent in Langdock.
const ablaufFuer = (t: T): { feld: string; frage: string; vorschlaege: string[] }[] => [
  {
    feld: t("Zielgruppe", "Audience"),
    frage: t(
      "Schön! Wen wollt ihr erreichen: eure Stammkundinnen oder eine jüngere Zielgruppe? Und gibt es schon einen Launch-Termin oder ein Budget?",
      "Nice! Who do you want to reach: your regular customers or a younger audience? And is there a launch date or budget yet?",
    ),
    vorschlaege: [t("Eher Stammkundinnen", "Mostly regular customers"), t("Jüngere Zielgruppe", "Younger audience"), t("Weiß ich noch nicht", "Not sure yet")],
  },
  {
    feld: "Budget",
    frage: t("Danke! Habt ihr schon einen groben Budgetrahmen im Kopf?", "Thanks! Do you have a rough budget in mind?"),
    vorschlaege: [t("Bis 10.000 €", "Up to €10,000"), t("10.000 bis 25.000 €", "€10,000 to €25,000"), t("Weiß ich noch nicht", "Not sure yet")],
  },
  {
    feld: "Material",
    frage: t("Letzte Frage: Gibt es schon Material, zum Beispiel Produktfotos oder Texte?", "Last question: is there any material yet, like product shots or copy?"),
    vorschlaege: [t("Ja, Produktfotos", "Yes, product shots"), t("Noch nichts", "Nothing yet"), t("Lade ich hoch", "I'll upload it")],
  },
];

export function Briefing() {
  const toast = useToast();
  const { t, d } = useSprache();
  const { kunde } = d;
  const ablauf = ablaufFuer(t);
  const [verlauf, setVerlauf] = useState<Nachricht[]>([
    { von: "agent", text: t(`Moin ${kunde.nutzer.vorname}! Worum geht es? Erzähl einfach drauflos, ich frage nach.`, `Hi ${kunde.nutzer.vorname}! What's it about? Just tell me, I'll ask follow-up questions.`) },
    {
      von: "kunde",
      text: t(
        "Wir bringen im Frühjahr ein neues Rosen-Gesichtsöl raus und brauchen eine Launch-Kampagne. Vor allem Social und am Drogerie-Regal.",
        "We're launching a new Rose Face Oil in spring and need a launch campaign. Mainly social and at the drugstore shelf.",
      ),
    },
    { von: "agent", text: ablauf[0].frage },
  ]);
  const [schritt, setSchritt] = useState(0);
  const [tippt, setTippt] = useState(false);
  const [eingabe, setEingabe] = useState("");
  const [gesendet, setGesendet] = useState(false);
  const [felder, setFelder] = useState<Feld[]>([
    { name: t("Thema", "Topic"), wert: t("Launch Rosen-Gesichtsöl", "Launch Rose Face Oil") },
    { name: t("Kanäle", "Channels"), wert: t("Social, Drogerie-Regal", "Social, drugstore shelf") },
    { name: t("Zeitraum", "Timeframe"), wert: t("Frühjahr 2027", "Spring 2027") },
    { name: t("Zielgruppe", "Audience"), wert: null },
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
      const unklar = text === t("Weiß ich noch nicht", "Not sure yet") || text.toLowerCase().includes("weiß ich noch nicht");
      setFelder((fs) => fs.map((f) => (f.name === aktuell.feld ? { ...f, wert: unklar ? t("klären wir mit Lena", "we'll sort it out with Lena") : text } : f)));
      const naechste = ablauf[schritt + 1];
      setVerlauf((v) => [
        ...v,
        {
          von: "agent",
          text: naechste
            ? naechste.frage
            : t("Super, das Briefing ist komplett. Schau rechts noch einmal drüber und schick es an KURIOS.", "Great, the briefing is complete. Have one more look on the right and send it to KURIOS."),
        },
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
              <span className="label">{n.von === "agent" ? t("Briefing-Agent", "Briefing agent") : kunde.nutzer.vorname}</span>
              <div className={`bubble ${n.von === "agent" ? "bubble-agent" : "bubble-user"}`}>{n.text}</div>
            </div>
          ))}
          {tippt ? (
            <div className="chat-msg">
              <span className="label">{t("Briefing-Agent", "Briefing agent")}</span>
              <div className="bubble bubble-agent typing" aria-label={t("schreibt", "typing")}><span /><span /><span /></div>
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
            placeholder={t("Antworten, Datei anhängen oder Sprachnachricht …", "Reply, attach a file or send a voice message …")}
            aria-label={t("Antwort an den Briefing-Agenten", "Reply to the briefing agent")}
            disabled={schritt >= ablauf.length}
          />
          <button className="circle" type="submit" aria-label={t("Senden", "Send")} style={{ fontWeight: 800, fontSize: 18, color: "#000" }}>→</button>
        </form>
      </div>

      <div className="card card-pad stack gap-16">
        <div className="stack gap-8">
          <h2 className="h2">{t("Dein Briefing", "Your briefing")}</h2>
          <span className="small muted">{t("Füllt sich automatisch beim Gespräch.", "Fills in automatically as you chat.")}</span>
        </div>
        <div className="stack gap-8">
          <span className="bold small" style={{ color: "var(--white)" }}>{t(`${fertig} von ${felder.length} Angaben`, `${fertig} of ${felder.length} details`)}</span>
          <div className="fortschritt"><span style={{ width: `${(fertig / felder.length) * 100}%` }} /></div>
        </div>
        <div className="stack">
          {felder.map((f) => (
            <div key={f.name} className="brief-row">
              <span className={`brief-dot${f.wert ? " is-done" : ""}`} />
              <span className="small muted">{f.name}</span>
              <span style={{ color: f.wert ? "var(--white)" : "var(--muted)" }}>{f.wert ?? t("offen", "open")}</span>
            </div>
          ))}
        </div>
        {gesendet ? (
          <div className="hint-box">{t("Gesendet. Lena meldet sich bis morgen 12 Uhr.", "Sent. Lena will get back to you by noon tomorrow.")}</div>
        ) : (
          <>
            <button
              className={`btn btn-lg btn-block${fertig === felder.length ? " btn-primary" : ""}`}
              onClick={() => {
                setGesendet(true);
                toast({
                  titel: t("Briefing gesendet", "Briefing sent"),
                  text: t("Lena meldet sich bis morgen 12 Uhr. Du findest das Briefing in Projects.", "Lena will get back to you by noon tomorrow. You'll find the briefing in Projects."),
                  aktion: { label: t("Briefing ansehen →", "View briefing →"), href: "/projects" },
                });
              }}
            >
              {t("An KURIOS senden", "Send to KURIOS")}
            </button>
            {fertig < felder.length ? (
              <span className="small muted">{t("Offene Punkte klärt Lena gern mit dir. Du kannst trotzdem schon senden.", "Lena is happy to go through open points with you. You can send it anyway.")}</span>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
