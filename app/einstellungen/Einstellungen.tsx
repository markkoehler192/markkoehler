"use client";

import { useState } from "react";
import { AnsichtUmschalter, useAnsicht } from "@/components/Ansicht";
import { useSprache } from "@/components/Sprache";
import { useToast } from "@/components/Toast";
import type { Sprache } from "@/lib/sprache";

const sprachen: { wert: Sprache; label: string }[] = [
  { wert: "de", label: "Deutsch" },
  { wert: "en", label: "English" },
];

export function Einstellungen() {
  const { s, t, setzen } = useSprache();
  const toast = useToast();
  const [ansicht, setAnsicht] = useAnsicht();
  // Im Prototyp nur lokal. Später in Supabase je Nutzer gespeichert.
  const [hinweise, setHinweise] = useState({ review: true, teams: false, bericht: true });

  const benachrichtigungen: { key: keyof typeof hinweise; titel: string; text: string }[] = [
    { key: "review", titel: t("E-Mail bei neuen Reviews", "Email for new reviews"), text: t("Sobald ein Asset auf deine Freigabe wartet.", "As soon as an asset is waiting for your approval.") },
    { key: "teams", titel: t("Nachricht in Teams", "Message in Teams"), text: t("Dieselben Hinweise zusätzlich in Microsoft Teams.", "The same notifications in Microsoft Teams as well.") },
    { key: "bericht", titel: t("Wochenbericht LIVE", "Weekly LIVE report"), text: t("Montags die wichtigsten Zahlen per E-Mail.", "The key numbers by email every Monday.") },
  ];

  return (
    <div className="stack gap-20" style={{ maxWidth: 760 }}>
      <section className="card card-pad stack gap-16">
        <div className="stack gap-8">
          <h2 className="label">{t("Sprache", "Language")}</h2>
          <span className="small muted">{t("Gilt für die ganze Oberfläche.", "Applies to the whole interface.")}</span>
        </div>
        <div className="row gap-8" role="radiogroup" aria-label={t("Sprache", "Language")}>
          {sprachen.map((x) => (
            <button
              key={x.wert}
              role="radio"
              aria-checked={s === x.wert}
              lang={x.wert}
              className={`pill${s === x.wert ? " is-selected" : ""}`}
              onClick={() => {
                setzen(x.wert);
                toast({ titel: x.wert === "en" ? "Language: English" : "Sprache: Deutsch" });
              }}
            >
              {x.label}
            </button>
          ))}
        </div>
      </section>

      <section className="card card-pad stack gap-16">
        <h2 className="label">{t("Benachrichtigungen", "Notifications")}</h2>
        <div className="stack">
          {benachrichtigungen.map((b) => (
            <label key={b.key} className="schalter-zeile">
              <span className="stack">
                <span className="bold small" style={{ color: "var(--white)" }}>{b.titel}</span>
                <span className="small muted">{b.text}</span>
              </span>
              <input
                type="checkbox"
                role="switch"
                className="schalter"
                checked={hinweise[b.key]}
                onChange={() => {
                  const an = !hinweise[b.key];
                  setHinweise({ ...hinweise, [b.key]: an });
                  toast({ titel: an ? t("Eingeschaltet", "Turned on") : t("Ausgeschaltet", "Turned off"), text: b.titel });
                }}
              />
            </label>
          ))}
        </div>
      </section>

      <section className="card card-pad row wrap gap-16" style={{ justifyContent: "space-between" }}>
        <div className="stack gap-8">
          <h2 className="label">{t("Standardansicht für Ordner", "Default view for folders")}</h2>
          <span className="small muted">{t("Kacheln oder Liste in Archive, Studio und Projects.", "Tiles or list in Archive, Studio and Projects.")}</span>
        </div>
        <AnsichtUmschalter ansicht={ansicht} onChange={setAnsicht} />
      </section>
    </div>
  );
}
