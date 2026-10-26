"use client";

import { useState } from "react";
import { Chips } from "@/components/Chips";
import { ArrowSend } from "@/components/Icons";
import { ErrorState, LoadingState } from "@/components/States";
import { useToast } from "@/components/Toast";
import {
  archiveQuellen,
  aufbauten,
  bildAnpassungen,
  formate,
  produkte,
  stimmungen,
  type FormatLabel,
  type Stimmung,
} from "@/lib/brandBilder";
import { Szene } from "./Szene";

const ohneProdukt = "Kein Produkt";
const produktOptionen = [...produkte.map((p) => p.name), ohneProdukt] as const;
type Zustand = "fertig" | "laedt" | "fehler";

export function BrandBilder() {
  const toast = useToast();
  const [motiv, setMotiv] = useState(
    "Unsere Ringelblumen-Creme auf einem Holztisch, daneben frische Ringelblüten. Für den Launch-Post im Herbst.",
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
  const dateiname = `WILDBLATT_${(produkt?.name ?? "Motiv").replace(/\s/g, "-")}_${fmt.kurz.replace(":", "x")}_V${auswahl + 1}.jpg`;

  return (
    <div className="mt-layout">
      <div className="card card-pad stack gap-28">
        <label className="stack gap-12">
          <span className="label">Was soll zu sehen sein?</span>
          <textarea className="field" rows={4} value={motiv} onChange={(e) => setMotiv(e.target.value)} />
        </label>
        <div className="stack gap-12">
          <span className="label">Produkt aus dem Archive</span>
          <Chips options={produktOptionen} value={produktName} onChange={setProduktName} label="Produkt" />
        </div>
        <div className="stack gap-12">
          <span className="label">Stimmung</span>
          <Chips options={stimmungen} value={stimmung} onChange={setStimmung} label="Stimmung" />
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
          4 neue Bilder erstellen
        </button>
        <div className="stack gap-8">
          <span className="label">Nutzt aus dem Archive</span>
          {archiveQuellen.map((q) => (
            <span key={q} className="small muted"><span className="bb-check">✓</span> {q}</span>
          ))}
        </div>
      </div>

      {zustand === "laedt" ? (
        <LoadingState titel="Deine Bilder entstehen …" text="KI-Brand-Bilder nimmt eure Farbwelt und eure Produktbilder und baut 4 Vorschläge. Dauert etwa 30 Sekunden." />
      ) : zustand === "fehler" ? (
        <ErrorState text="Die Bilder konnten gerade nicht erstellt werden. Dein Auftrag ist gespeichert." onRetry={() => erstellen()} />
      ) : (
        <div className="card card-pad stack gap-20">
          <div className="row wrap gap-12" style={{ justifyContent: "space-between" }}>
            <div className="stack gap-8">
              <span className="label">{fmt.label} · {stimmung} · Vorschlag {auswahl + 1} von 4</span>
              <h2 className="h2" style={{ fontSize: 28 }}>Deine Bilder</h2>
            </div>
            <span className="hinweis-ki"><span className="dot" />Mit KI erstellt · bitte prüfen</span>
          </div>

          <div className="bb-gross">
            <div className="bb-gross-bild" style={{ maxWidth: `calc(520px * ${fmt.ratio})` }}>
              <Szene produkt={produkt} stimmung={stimmung} aufbau={gewaehlt} ratio={fmt.ratio} heller={heller} mehrBlueten={mehrBlueten} />
              <span className="bb-titel">{aufbauten[gewaehlt % aufbauten.length].titel}</span>
            </div>
          </div>

          <div className="bb-auswahl" role="radiogroup" aria-label="Vorschläge">
            {vorschlaege.map((v, i) => (
              <button
                key={v}
                role="radio"
                aria-checked={i === auswahl}
                aria-label={`Vorschlag ${i + 1}: ${aufbauten[v % aufbauten.length].titel}`}
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
              {bildAnpassungen.map((x) => (
                <button key={x} className="pill" onClick={() => anpassung(x)}>{x}</button>
              ))}
            </div>
            <div className="row wrap gap-8">
              <button
                className="btn"
                onClick={() =>
                  toast({
                    titel: "An Lena geschickt",
                    text: "KURIOS macht den Feinschliff und meldet sich in Projects.",
                  })
                }
              >
                An KURIOS zum Feinschliff
              </button>
              <button
                className="btn"
                onClick={() =>
                  toast({
                    titel: "Ins Archive gelegt",
                    text: "Das Bild liegt in Archive / Bilder / KI-Entwürfe.",
                    aktion: { label: "Rückgängig", onClick: () => toast({ titel: "Rückgängig gemacht", text: "Das Bild wurde wieder aus dem Archive entfernt." }) },
                  })
                }
              >
                Ins Archive
              </button>
              <button className="btn btn-primary" onClick={() => toast({ titel: "Download startet", text: dateiname })}>
                Herunterladen
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
            <input value={nachricht} onChange={(e) => setNachricht(e.target.value)} placeholder="Noch etwas ändern? Zum Beispiel: mehr Herbstlaub …" aria-label="Änderungswunsch" />
            <button className="circle" type="submit" aria-label="Senden"><ArrowSend /></button>
          </form>
        </div>
      )}
    </div>
  );
}
