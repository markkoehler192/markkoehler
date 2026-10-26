import type { CSSProperties } from "react";
import { aufbauten, farbwelten, type Produkt, type Stimmung } from "@/lib/brandBilder";

// Gezeichneter Platzhalter für ein generiertes Bild: Farbwelt der Stimmung,
// Tischfläche, Blüten und das gewählte Produkt aus dem Archive.
export function Szene({
  produkt,
  stimmung,
  aufbau,
  ratio,
  heller = false,
  mehrBlueten = false,
}: {
  produkt: Produkt | null;
  stimmung: Stimmung;
  aufbau: number;
  ratio: string;
  heller?: boolean;
  mehrBlueten?: boolean;
}) {
  const fw = farbwelten[stimmung];
  const a = aufbauten[aufbau % aufbauten.length];
  const blueten = mehrBlueten
    ? [...a.blueten, ...a.blueten.map(([x, y]) => [(x + 37) % 96, Math.min(94, y + 6)])]
    : a.blueten;

  return (
    <div
      className="bb-szene"
      style={{
        aspectRatio: ratio,
        background: `linear-gradient(180deg, ${fw.oben}, ${fw.unten})`,
        filter: heller ? "brightness(1.12) saturate(0.95)" : undefined,
      }}
    >
      <span className="bb-licht" style={{ background: `radial-gradient(circle at 75% 15%, ${fw.licht}, transparent 55%)` }} />
      <span className="bb-flaeche" style={{ top: `${a.horizont}%`, background: fw.flaeche }} />
      {blueten.map(([x, y], i) => (
        <span
          key={i}
          className="bb-bluete"
          style={{ left: `${x}%`, top: `${y}%`, "--bluete": fw.bluete } as CSSProperties}
        />
      ))}
      {produkt ? (
        <span className="bb-produkt" style={{ left: `${a.x}%`, top: `${a.horizont + 6}%` }}>
          <span
            className={`bb-${produkt.form}`}
            style={{ "--farbe": produkt.farbe, "--akzent": produkt.akzent } as CSSProperties}
          >
            <i />
          </span>
          <span className="bb-schatten" />
        </span>
      ) : null}
    </div>
  );
}
