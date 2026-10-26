"use client";

import { useState } from "react";
import { Chips } from "@/components/Chips";
import { ArrowSend } from "@/components/Icons";
import { ErrorState, LoadingState } from "@/components/States";
import { useToast } from "@/components/Toast";
import { useSprache } from "@/components/Sprache";

const kanaele = ["Instagram", "Newsletter", "Website", "Produkttext"] as const;
const laengen = ["Kurz", "Mittel", "Lang"] as const;
type Zustand = "fertig" | "laedt" | "fehler";

export function Markentexter() {
  const toast = useToast();
  const { t, w, d } = useSprache();
  const { markentexterVarianten } = d;
  const [thema, setThema] = useState(
    t("Launch unserer neuen Ringelblumen-Creme für trockene, gereizte Haut. Ab heute im Shop.", "Launch of our new Calendula Cream for dry, irritated skin. Available in the shop from today."),
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
          <span className="label">{t("Worum geht es?", "What is it about?")}</span>
          <textarea className="field" rows={4} value={thema} onChange={(e) => setThema(e.target.value)} />
        </label>
        <div className="stack gap-12">
          <span className="label">{t("Kanal", "Channel")}</span>
          <Chips options={kanaele} value={kanal} onChange={setKanal} label={t("Kanal", "Channel")} anzeige={w} />
        </div>
        <div className="stack gap-12">
          <span className="label">{t("Länge", "Length")}</span>
          <Chips options={laengen} value={laenge} onChange={setLaenge} label={t("Länge", "Length")} anzeige={w} />
        </div>
        <button className="btn btn-lg btn-block" onClick={erstellen} disabled={zustand === "laedt" || !thema.trim()}>
          {t("Neu erstellen", "Generate again")}
        </button>
      </div>

      {zustand === "laedt" ? (
        <LoadingState titel={t("Dein Text entsteht …", "Writing your copy …")} text={t("Der KI-Markentexter liest eure Markensprache und schreibt. Dauert etwa 10 Sekunden.", "The AI Brand Writer is reading your brand voice and writing. Takes about 10 seconds.")} />
      ) : zustand === "fehler" ? (
        <ErrorState text={t("Der Text konnte gerade nicht erstellt werden. Dein Auftrag ist gespeichert.", "The copy couldn't be created just now. Your request is saved.")} onRetry={erstellen} />
      ) : (
        <div className="card card-pad stack gap-20">
          <div className="row wrap gap-12" style={{ justifyContent: "space-between" }}>
            <div className="stack gap-8">
              <span className="label">
                {t(`${kanal}-${kanal === "Instagram" ? "Post" : "Text"}`, `${w(kanal)} ${kanal === "Instagram" ? "post" : "copy"}`)} ·{" "}
                {t(`Variante ${variante + 1} von ${markentexterVarianten.length}`, `Variant ${variante + 1} of ${markentexterVarianten.length}`)}
              </span>
              <h2 className="h2" style={{ fontSize: 28 }}>{kanal === "Instagram" ? t("Dein Post", "Your post") : t("Dein Text", "Your copy")}</h2>
            </div>
            <div className="row gap-12">
              <div className="varianten" aria-label={t("Varianten", "Variants")}>
                <button aria-label={t("Vorherige Variante", "Previous variant")} disabled={variante === 0} onClick={() => setVariante(variante - 1)}>←</button>
                <button aria-label={t("Nächste Variante", "Next variant")} disabled={variante === markentexterVarianten.length - 1} onClick={() => setVariante(variante + 1)}>→</button>
              </div>
              <span className="hinweis-ki"><span className="dot" />{t("Mit KI erstellt · bitte prüfen", "Made with AI · please check")}</span>
            </div>
          </div>
          <div className="ergebnis-text">
            {v.absaetze.map((a) => <p key={a}>{a}</p>)}
            <p className="bold small muted" style={{ fontSize: 14, fontWeight: 800, color: "var(--muted)" }}>{v.hashtags}</p>
          </div>
          <hr className="hr" />
          <div className="row wrap gap-8" style={{ justifyContent: "space-between" }}>
            <div className="row wrap gap-8">
              {[t("Kürzer", "Shorter"), t("Lockerer", "More casual"), t("Mehr Emojis", "More emojis")].map((x) => (
                <button key={x} className="pill" onClick={erstellen}>{x}</button>
              ))}
            </div>
            <div className="row gap-8">
              <button
                className="btn"
                onClick={() =>
                  toast({
                    titel: t("Ins Archive gelegt", "Saved to the archive"),
                    text: t("Der Post liegt in Archive / Social Media / Entwürfe.", "The post is in Archive / Social Media / Drafts."),
                    aktion: {
                      label: t("Rückgängig", "Undo"),
                      onClick: () => toast({ titel: t("Rückgängig gemacht", "Undone"), text: t("Der Entwurf wurde wieder aus dem Archive entfernt.", "The draft was removed from the archive again.") }),
                    },
                  })
                }
              >
                {t("Ins Archive", "Save to archive")}
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigator.clipboard?.writeText(text).catch(() => {});
                  toast({ titel: t("Kopiert", "Copied"), text: t("Der Text liegt in deiner Zwischenablage.", "The copy is on your clipboard.") });
                }}
              >
                {t("Kopieren", "Copy")}
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
            <input value={nachricht} onChange={(e) => setNachricht(e.target.value)} placeholder={t("Noch etwas ändern? Schreib es einfach …", "Want to change something? Just write it …")} aria-label={t("Änderungswunsch", "Change request")} />
            <button className="circle" type="submit" aria-label={t("Senden", "Send")}><ArrowSend /></button>
          </form>
        </div>
      )}
    </div>
  );
}
