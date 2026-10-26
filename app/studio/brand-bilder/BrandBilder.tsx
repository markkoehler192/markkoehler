"use client";

import { useState } from "react";
import { Chips } from "@/components/Chips";
import { ArrowSend } from "@/components/Icons";
import { ErrorState, LoadingState } from "@/components/States";
import { useSprache } from "@/components/Sprache";
import { useToast } from "@/components/Toast";
import {
  archiveQuellen,
  aufbauten,
  bildAnpassungen,
  formate,
  produkte,
  stimmungen,
  stimmungenEn,
  type FormatLabel,
  type Stimmung,
} from "@/lib/brandBilder";
import { Szene } from "./Szene";

const ohneProdukt = "Kein Produkt";
const produktOptionen = [...produkte.map((p) => p.name), ohneProdukt] as const;
type Zustand = "fertig" | "laedt" | "fehler";

export function BrandBilder() {
  const toast = useToast();
  const { s, t } = useSprache();
  const [motiv, setMotiv] = useState(
    t(
      "Unsere Ringelblumen-Creme auf einem Holztisch, daneben frische Ringelblüten. Für den Launch-Post im Herbst.",
      "Our Calendula Cream on a wooden table, with fresh calendula flowers next to it. For the autumn launch post.",
    ),
  );
  const [produktName, setProduktName] = useState<string>(produkte[0].name);
  const [stimmung, setStimmung] = useState<Stimmung>("Warm & herbstlich");
  const [format, setFormat] = useState<FormatLabel>("Post 4:5");
  const [satz, setSatz] = useState(0);
  const [auswahl, setAuswahl] = useState(0);
  const [heller, setHeller] = useState(false);
  const [mehrBlueten, setMehrBlueten] = useState(false);
  const [zustand, setZustand] = useState<Zustand>("fertig");
  const [versuche, setVersuche] = useState(0);
  const [nachricht, setNachricht] = useState("");

  const produkt = produkte.find((p) => p.name === produktName) ?? null;
  const fmt = formate.find((f) => f.label === format)!;
  const vorschlaege = [0, 1, 2, 3].map((i) => satz * 2 + i);

  // Simuliert den Aufruf ans Bildmodell. Der dritte Versuch schlägt absichtlich
  // fehl, damit der Fehlerzustand im Prototyp sichtbar ist.
  const erstellen = (anpassen?: () => void) => {
    const n = versuche + 1;
    setVersuche(n);
    setZustand("laedt");
    setTimeout(() => {
      if (n === 3) return setZustand("fehler");
      if (anpassen) anpassen();
      else {
        setSatz((s) => s + 1);
        setAuswahl(0);
      }
      setZustand("fertig");
    }, 1800);
  };

  const anpassung = (a: string) =>
    erstellen(() => {
      if (a === "Heller") setHeller(true);
      if (a === "Mehr Blüten") setMehrBlueten(true);
      if (a === "Ohne Produkt") setProduktName(ohneProdukt);
      if (a === "Mehr Platz für Text") setSatz(1); // Vorschlag 1 = "Viel Platz für Text"
    });

  const gewaehlt = vorschlaege[auswahl];
  const dateiname = `WILDBLATT_${((s === "en" ? produkt?.nameEn : produkt?.name) ?? t("Motiv", "Image")).replace(/\s/g, "-")}_${fmt.kurz.replace(":", "x")}_V${auswahl + 1}.jpg`;

  return (
    <div className="mt-layout">
      <div className="card card-pad stack gap-28">
        <label className="stack gap-12">
          <span className="label">{t("Was soll zu sehen sein?", "What should the image show?")}</span>
          <textarea className="field" rows={4} value={motiv} onChange={(e) => setMotiv(e.target.value)} />
        </label>
        <div className="stack gap-12">
          <span className="label">{t("Produkt aus dem Archive", "Product from the archive")}</span>
          <Chips
            options={produktOptionen}
            value={produktName}
            onChange={setProduktName}
            label={t("Produkt", "Product")}
            anzeige={(o) => (s === "en" ? produkte.find((p) => p.name === o)?.nameEn ?? "No product" : o)}
          />
        </div>
        <div className="stack gap-12">
          <span className="label">{t("Stimmung", "Mood")}</span>
          <Chips options={stimmungen} value={stimmung} onChange={setStimmung} label={t("Stimmung", "Mood")} anzeige={(o) => t(o, stimmungenEn[o])} />
        </div>
        <div className="stack gap-12">
          <span className="label">Format</span>
          <Chips options={formate.map((f) => f.label)} value={format} onChange={setFormat} label="Format" />
        </div>
        <button
          className="btn btn-lg btn-block"
          onClick={() => {
            setHeller(false);
            setMehrBlueten(false);
            erstellen();
          }}
          disabled={zustand === "laedt" || !motiv.trim()}
        >
          {t("4 neue Bilder erstellen", "Create 4 new images")}
        </button>
        <div className="stack gap-8">
          <span className="label">{t("Nutzt aus dem Archive", "Uses from the archive")}</span>
          {archiveQuellen.map(([de, en]) => (
            <span key={de} className="small muted"><span className="bb-check">✓</span> {t(de, en)}</span>
          ))}
        </div>
      </div>

      {zustand === "laedt" ? (
        <LoadingState
          titel={t("Deine Bilder entstehen …", "Creating your images …")}
          text={t(
            "KI-Brand-Bilder nimmt eure Farbwelt und eure Produktbilder und baut 4 Vorschläge. Dauert etwa 30 Sekunden.",
            "AI Brand Images takes your colour palette and product shots and builds 4 suggestions. Takes about 30 seconds.",
          )}
        />
      ) : zustand === "fehler" ? (
        <ErrorState
          text={t("Die Bilder konnten gerade nicht erstellt werden. Dein Auftrag ist gespeichert.", "The images couldn't be created just now. Your request is saved.")}
          onRetry={() => erstellen()}
        />
      ) : (
        <div className="card card-pad stack gap-20">
          <div className="row wrap gap-12" style={{ justifyContent: "space-between" }}>
            <div className="stack gap-8">
              <span className="label">{fmt.label} · {t(stimmung, stimmungenEn[stimmung])} · {t("Vorschlag", "Suggestion")} {auswahl + 1} {t("von", "of")} 4</span>
              <h2 className="h2" style={{ fontSize: 28 }}>{t("Deine Bilder", "Your images")}</h2>
            </div>
            <span className="hinweis-ki"><span className="dot" />{t("Mit KI erstellt · bitte prüfen", "Made with AI · please check")}</span>
          </div>

          <div className="bb-gross">
            <div className="bb-gross-bild" style={{ maxWidth: `calc(520px * ${fmt.ratio})` }}>
              <Szene produkt={produkt} stimmung={stimmung} aufbau={gewaehlt} ratio={fmt.ratio} heller={heller} mehrBlueten={mehrBlueten} />
              <span className="bb-titel">{t(aufbauten[gewaehlt % aufbauten.length].titel, aufbauten[gewaehlt % aufbauten.length].titelEn)}</span>
            </div>
          </div>

          <div className="bb-auswahl" role="radiogroup" aria-label={t("Vorschläge", "Suggestions")}>
            {vorschlaege.map((v, i) => (
              <button
                key={v}
                role="radio"
                aria-checked={i === auswahl}
                aria-label={`${t("Vorschlag", "Suggestion")} ${i + 1}: ${t(aufbauten[v % aufbauten.length].titel, aufbauten[v % aufbauten.length].titelEn)}`}
                className={`bb-thumb${i === auswahl ? " is-selected" : ""}`}
                onClick={() => setAuswahl(i)}
              >
                <Szene produkt={produkt} stimmung={stimmung} aufbau={v} ratio={fmt.ratio} heller={heller} mehrBlueten={mehrBlueten} />
              </button>
            ))}
          </div>

          <hr className="hr" />
          <div className="row wrap gap-8" style={{ justifyContent: "space-between" }}>
            <div className="row wrap gap-8">
              {bildAnpassungen.map(([de, en]) => (
                <button key={de} className="pill" onClick={() => anpassung(de)}>{t(de, en)}</button>
              ))}
            </div>
            <div className="row wrap gap-8">
              <button
                className="btn"
                onClick={() =>
                  toast({
                    titel: t("An Lena geschickt", "Sent to Lena"),
                    text: t("KURIOS macht den Feinschliff und meldet sich in Projects.", "KURIOS will polish it and get back to you in Projects."),
                  })
                }
              >
                {t("An KURIOS zum Feinschliff", "Send to KURIOS for polish")}
              </button>
              <button
                className="btn"
                onClick={() =>
                  toast({
                    titel: t("Ins Archive gelegt", "Saved to the archive"),
                    text: t("Das Bild liegt in Archive / Bilder / KI-Entwürfe.", "The image is in Archive / Images / AI drafts."),
                    aktion: {
                      label: t("Rückgängig", "Undo"),
                      onClick: () => toast({ titel: t("Rückgängig gemacht", "Undone"), text: t("Das Bild wurde wieder aus dem Archive entfernt.", "The image was removed from the archive again.") }),
                    },
                  })
                }
              >
                {t("Ins Archive", "Save to archive")}
              </button>
              <button className="btn btn-primary" onClick={() => toast({ titel: t("Download startet", "Download starting"), text: dateiname })}>
                {t("Herunterladen", "Download")}
              </button>
            </div>
          </div>
          <form
            className="followup"
            onSubmit={(e) => {
              e.preventDefault();
              if (!nachricht.trim()) return;
              setNachricht("");
              erstellen(() => {});
            }}
          >
            <input value={nachricht} onChange={(e) => setNachricht(e.target.value)} placeholder={t("Noch etwas ändern? Zum Beispiel: mehr Herbstlaub …", "Want to change something? For example: more autumn leaves …")} aria-label={t("Änderungswunsch", "Change request")} />
            <button className="circle" type="submit" aria-label={t("Senden", "Send")}><ArrowSend /></button>
          </form>
        </div>
      )}
    </div>
  );
}
