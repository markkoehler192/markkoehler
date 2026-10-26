"use client";

import { useState } from "react";
import { Chips } from "@/components/Chips";
import { ArrowSend } from "@/components/Icons";
import { ErrorState, LoadingState } from "@/components/States";
import { useToast } from "@/components/Toast";
import { markentexterVarianten } from "@/lib/data";

const kanaele = ["Instagram", "Newsletter", "Website", "Produkttext"] as const;
const laengen = ["Kurz", "Mittel", "Lang"] as const;
type Zustand = "fertig" | "laedt" | "fehler";

export function Markentexter() {
  const toast = useToast();
  const [thema, setThema] = useState(
    "Launch unserer neuen Ringelblumen-Creme für trockene, gereizte Haut. Ab heute im Shop.",
  );
  const [kanal, setKanal] = useState<(typeof kanaele)[number]>("Instagram");
  const [laenge, setLaenge] = useState<(typeof laengen)[number]>("Mittel");
  const [variante, setVariante] = useState(0);
  const [zustand, setZustand] = useState<Zustand>("fertig");
  const [versuche, setVersuche] = useState(0);
  const [nachricht, setNachricht] = useState("");

  // Simuliert den Aufruf an den Langdock-Agenten. Der zweite Versuch schlägt
  // absichtlich fehl, damit der Fehlerzustand im Prototyp sichtbar ist.
  const erstellen = () => {
    const n = versuche + 1;
    setVersuche(n);
    setZustand("laedt");
    setTimeout(() => {
      if (n === 2) return setZustand("fehler");
      setVariante((v) => (v + 1) % markentexterVarianten.length);
      setZustand("fertig");
    }, 1600);
  };

  const v = markentexterVarianten[variante];
  const text = [...v.absaetze, v.hashtags].join("\n\n");

  return (
    <div className="mt-layout">
      <div className="card card-pad stack gap-28">
        <label className="stack gap-12">
          <span className="label">Worum geht es?</span>
          <textarea className="field" rows={4} value={thema} onChange={(e) => setThema(e.target.value)} />
        </label>
        <div className="stack gap-12">
          <span className="label">Kanal</span>
          <Chips options={kanaele} value={kanal} onChange={setKanal} label="Kanal" />
        </div>
        <div className="stack gap-12">
          <span className="label">Länge</span>
          <Chips options={laengen} value={laenge} onChange={setLaenge} label="Länge" />
        </div>
        <button className="btn btn-lg btn-block" onClick={erstellen} disabled={zustand === "laedt" || !thema.trim()}>
          Neu erstellen
        </button>
      </div>

      {zustand === "laedt" ? (
        <LoadingState titel="Dein Text entsteht …" text="Der KI-Markentexter liest eure Markensprache und schreibt. Dauert etwa 10 Sekunden." />
      ) : zustand === "fehler" ? (
        <ErrorState text="Der Text konnte gerade nicht erstellt werden. Dein Auftrag ist gespeichert." onRetry={erstellen} />
      ) : (
        <div className="card card-pad stack gap-20">
          <div className="row wrap gap-12" style={{ justifyContent: "space-between" }}>
            <div className="stack gap-8">
              <span className="label">{kanal}-{kanal === "Instagram" ? "Post" : "Text"} · Variante {variante + 1} von {markentexterVarianten.length}</span>
              <h2 className="h2" style={{ fontSize: 28 }}>Dein {kanal === "Instagram" ? "Post" : "Text"}</h2>
            </div>
            <div className="row gap-12">
              <div className="varianten" aria-label="Varianten">
                <button aria-label="Vorherige Variante" disabled={variante === 0} onClick={() => setVariante(variante - 1)}>←</button>
                <button aria-label="Nächste Variante" disabled={variante === markentexterVarianten.length - 1} onClick={() => setVariante(variante + 1)}>→</button>
              </div>
              <span className="hinweis-ki"><span className="dot" />Mit KI erstellt · bitte prüfen</span>
            </div>
          </div>
          <div className="ergebnis-text">
            {v.absaetze.map((a) => <p key={a}>{a}</p>)}
            <p className="bold small muted" style={{ fontSize: 14, fontWeight: 800, color: "var(--muted)" }}>{v.hashtags}</p>
          </div>
          <hr className="hr" />
          <div className="row wrap gap-8" style={{ justifyContent: "space-between" }}>
            <div className="row wrap gap-8">
              {["Kürzer", "Lockerer", "Mehr Emojis"].map((x) => (
                <button key={x} className="pill" onClick={erstellen}>{x}</button>
              ))}
            </div>
            <div className="row gap-8">
              <button
                className="btn"
                onClick={() =>
                  toast({
                    titel: "Ins Archive gelegt",
                    text: "Der Post liegt in Archive / Social Media / Entwürfe.",
                    aktion: { label: "Rückgängig", onClick: () => toast({ titel: "Rückgängig gemacht", text: "Der Entwurf wurde wieder aus dem Archive entfernt." }) },
                  })
                }
              >
                Ins Archive
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigator.clipboard?.writeText(text).catch(() => {});
                  toast({ titel: "Kopiert", text: "Der Text liegt in deiner Zwischenablage." });
                }}
              >
                Kopieren
              </button>
            </div>
          </div>
          <form
            className="followup"
            onSubmit={(e) => {
              e.preventDefault();
              if (!nachricht.trim()) return;
              setNachricht("");
              erstellen();
            }}
          >
            <input value={nachricht} onChange={(e) => setNachricht(e.target.value)} placeholder="Noch etwas ändern? Schreib es einfach …" aria-label="Änderungswunsch" />
            <button className="circle" type="submit" aria-label="Senden"><ArrowSend /></button>
          </form>
        </div>
      )}
    </div>
  );
}
