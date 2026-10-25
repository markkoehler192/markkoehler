"use client";

import { useState, type MouseEvent } from "react";
import { PlayIcon } from "@/components/Icons";
import { useToast } from "@/components/Toast";
import { kunde, type Asset } from "@/lib/data";

type Kommentar = { autor: string; text: string; pin?: { x: number; y: number }; kurios?: boolean };

export function Review({ asset }: { asset: Asset }) {
  const toast = useToast();
  const [version, setVersion] = useState<"V1" | "V2" | "Vergleichen">("V2");
  const [kommentare, setKommentare] = useState<Kommentar[]>(
    asset.slug === "bluetezeit"
      ? [
          { autor: kunde.nutzer.vorname, text: "Kann der Tiegel etwas größer? Und die Blüten bitte noch frischer, weniger orange.", pin: { x: 62, y: 36 } },
          { autor: "KURIOS · Lena", text: "Klar, machen wir in V3. Passt der Claim so?", kurios: true },
        ]
      : [],
  );
  const [neuerPin, setNeuerPin] = useState<{ x: number; y: number } | null>(null);
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"offen" | "freigegeben" | "aenderungen">("offen");

  const pins = kommentare.filter((k) => k.pin);

  const klickInsBild = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setNeuerPin({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  const senden = () => {
    if (!text.trim()) return;
    setKommentare((k) => [...k, { autor: kunde.nutzer.vorname, text: text.trim(), pin: neuerPin ?? undefined }]);
    setText("");
    setNeuerPin(null);
    toast({ titel: "Kommentar gespeichert", text: "Lena sieht ihn sofort." });
  };

  return (
    <div className="review-layout">
      <div className="stack gap-16">
        <p className="small muted" style={{ margin: 0 }}>
          Tipp: Klick ins {asset.art === "Video" ? "Video" : "Bild"}, um eine Stelle zu markieren und dazu zu kommentieren.
        </p>
        <div className="row gap-8" role="radiogroup" aria-label="Version">
          {(["V1", "V2", "Vergleichen"] as const).map((v) => (
            <button key={v} role="radio" aria-checked={version === v} className={`pill${version === v ? " is-selected" : ""}`} onClick={() => setVersion(v)}>
              {v}
            </button>
          ))}
        </div>
        <div className="ph review-bild" onClick={klickInsBild} role="img" aria-label={`${asset.titel}, ${version}`}>
          <span className="bild-label">{asset.titel} · {version === "Vergleichen" ? "V1 | V2" : version}</span>
          {asset.art === "Video" ? <PlayIcon /> : null}
          {version === "Vergleichen" ? (
            <span style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 2, background: "var(--lime)" }} />
          ) : null}
          {pins.map((k, i) => (
            <span key={i} className="pin" style={{ left: `${k.pin!.x}%`, top: `${k.pin!.y}%` }}>{i + 1}</span>
          ))}
          {neuerPin ? (
            <span className="pin" style={{ left: `${neuerPin.x}%`, top: `${neuerPin.y}%`, background: "var(--white)" }}>{pins.length + 1}</span>
          ) : null}
        </div>
      </div>

      <div className="card card-pad stack gap-20">
        <h2 className="h2">Feedback</h2>
        {kommentare.length ? (
          kommentare.map((k, i) => {
            const pinNr = pins.indexOf(k) + 1;
            return (
              <div key={i} className="kommentar">
                <span className="row gap-8">
                  {k.pin ? <span className="pin pin-sm">{pinNr}</span> : null}
                  <span className="bold small" style={{ color: k.kurios ? "var(--muted)" : "var(--white)" }}>{k.autor}</span>
                </span>
                <p>{k.text}</p>
              </div>
            );
          })
        ) : (
          <p className="muted" style={{ margin: 0 }}>Noch kein Feedback. Schreib einfach los oder klick ins Bild.</p>
        )}
        <form className="stack gap-8" onSubmit={(e) => { e.preventDefault(); senden(); }}>
          <textarea
            className="field"
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={neuerPin ? `Kommentar zu Punkt ${pins.length + 1} …` : "Kommentar schreiben …"}
            aria-label="Kommentar"
          />
          {text.trim() ? <button className="pill" type="submit" style={{ alignSelf: "flex-end" }}>Kommentar senden</button> : null}
        </form>

        {status === "offen" ? (
          <>
            <p className="small muted" style={{ margin: 0 }}>
              Nach der Freigabe liegt das finale Asset automatisch in Archive / Kampagnen / {asset.projekt}.
            </p>
            <div className="stack gap-12">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => {
                  setStatus("freigegeben");
                  toast({
                    titel: "Freigegeben",
                    text: `Lena weiß Bescheid. Das finale ${asset.art === "Video" ? "Video" : "Bild"} liegt jetzt in Archive / Kampagnen / ${asset.projekt}.`,
                    aktion: { label: "Im Archive ansehen →", href: "/archive/kampagnen" },
                  });
                }}
              >
                Freigeben + ins Archive
              </button>
              <button
                className="btn btn-lg"
                onClick={() => {
                  setStatus("aenderungen");
                  toast({ titel: "Änderungen angefragt", text: `Lena bekommt eure ${kommentare.length} Kommentare und meldet sich mit der nächsten Version.` });
                }}
              >
                Änderungen anfragen
              </button>
            </div>
          </>
        ) : (
          <div className="hint-box">
            {status === "freigegeben"
              ? "Freigegeben. Das finale Asset liegt im Archive."
              : "Änderungen angefragt. Ihr bekommt eine Nachricht, sobald die nächste Version da ist."}
            <button className="link-lime" style={{ display: "block", marginTop: 8 }} onClick={() => setStatus("offen")}>Rückgängig</button>
          </div>
        )}
      </div>
    </div>
  );
}
