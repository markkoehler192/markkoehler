"use client";

import { useState, type MouseEvent } from "react";
import { PlayIcon } from "@/components/Icons";
import { useToast } from "@/components/Toast";
import { useSprache } from "@/components/Sprache";
import type { Asset } from "@/lib/data";

type Kommentar = { autor: string; text: string; pin?: { x: number; y: number }; kurios?: boolean };

export function Review({ asset }: { asset: Asset }) {
  const toast = useToast();
  const { t, w, d } = useSprache();
  const { kunde } = d;
  const [version, setVersion] = useState<"V1" | "V2" | "Vergleichen">("V2");
  const [kommentare, setKommentare] = useState<Kommentar[]>(
    asset.slug === "bluetezeit"
      ? [
          {
            autor: kunde.nutzer.vorname,
            text: t("Kann der Tiegel etwas größer? Und die Blüten bitte noch frischer, weniger orange.", "Can the jar be a bit bigger? And the flowers a bit fresher, less orange please."),
            pin: { x: 62, y: 36 },
          },
          { autor: "KURIOS · Lena", text: t("Klar, machen wir in V3. Passt der Claim so?", "Sure, we'll do that in V3. Is the claim OK like this?"), kurios: true },
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
    toast({ titel: t("Kommentar gespeichert", "Comment saved"), text: t("Lena sieht ihn sofort.", "Lena sees it right away.") });
  };

  return (
    <div className="review-layout">
      <div className="stack gap-16">
        <p className="small muted" style={{ margin: 0 }}>
          {asset.art === "Video"
            ? t("Tipp: Klick ins Video, um eine Stelle zu markieren und dazu zu kommentieren.", "Tip: click into the video to mark a spot and comment on it.")
            : t("Tipp: Klick ins Bild, um eine Stelle zu markieren und dazu zu kommentieren.", "Tip: click into the image to mark a spot and comment on it.")}
        </p>
        <div className="row gap-8" role="radiogroup" aria-label={t("Version", "Version")}>
          {(["V1", "V2", "Vergleichen"] as const).map((v) => (
            <button key={v} role="radio" aria-checked={version === v} className={`pill${version === v ? " is-selected" : ""}`} onClick={() => setVersion(v)}>
              {w(v)}
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
        <h2 className="h2">{t("Feedback", "Feedback")}</h2>
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
          <p className="muted" style={{ margin: 0 }}>{t("Noch kein Feedback. Schreib einfach los oder klick ins Bild.", "No feedback yet. Just start writing or click into the image.")}</p>
        )}
        <form className="stack gap-8" onSubmit={(e) => { e.preventDefault(); senden(); }}>
          <textarea
            className="field"
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={neuerPin ? t(`Kommentar zu Punkt ${pins.length + 1} …`, `Comment on point ${pins.length + 1} …`) : t("Kommentar schreiben …", "Write a comment …")}
            aria-label={t("Kommentar", "Comment")}
          />
          {text.trim() ? <button className="pill" type="submit" style={{ alignSelf: "flex-end" }}>{t("Kommentar senden", "Send comment")}</button> : null}
        </form>

        {status === "offen" ? (
          <>
            <p className="small muted" style={{ margin: 0 }}>
              {t(`Nach der Freigabe liegt das finale Asset automatisch in Archive / Kampagnen / ${asset.projekt}.`, `Once approved, the final asset is saved automatically to Archive / Campaigns / ${asset.projekt}.`)}
            </p>
            <div className="stack gap-12">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => {
                  setStatus("freigegeben");
                  toast({
                    titel: t("Freigegeben", "Approved"),
                    text: t(
                      `Lena weiß Bescheid. Das finale ${asset.art === "Video" ? "Video" : "Bild"} liegt jetzt in Archive / Kampagnen / ${asset.projekt}.`,
                      `Lena has been told. The final ${asset.art === "Video" ? "video" : "image"} is now in Archive / Campaigns / ${asset.projekt}.`,
                    ),
                    aktion: { label: t("Im Archive ansehen →", "View in archive →"), href: "/archive/kampagnen" },
                  });
                }}
              >
                {t("Freigeben + ins Archive", "Approve + save to archive")}
              </button>
              <button
                className="btn btn-lg"
                onClick={() => {
                  setStatus("aenderungen");
                  toast({
                    titel: t("Änderungen angefragt", "Changes requested"),
                    text: t(`Lena bekommt eure ${kommentare.length} Kommentare und meldet sich mit der nächsten Version.`, `Lena gets your ${kommentare.length} comments and will come back with the next version.`),
                  });
                }}
              >
                {t("Änderungen anfragen", "Request changes")}
              </button>
            </div>
          </>
        ) : (
          <div className="hint-box">
            {status === "freigegeben"
              ? t("Freigegeben. Das finale Asset liegt im Archive.", "Approved. The final asset is in the archive.")
              : t("Änderungen angefragt. Ihr bekommt eine Nachricht, sobald die nächste Version da ist.", "Changes requested. You'll get a message as soon as the next version is ready.")}
            <button className="link-lime" style={{ display: "block", marginTop: 8 }} onClick={() => setStatus("offen")}>{t("Rückgängig", "Undo")}</button>
          </div>
        )}
      </div>
    </div>
  );
}
