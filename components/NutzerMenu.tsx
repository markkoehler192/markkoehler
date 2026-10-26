"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Sprache } from "@/lib/sprache";
import { useSprache } from "./Sprache";
import { useToast } from "./Toast";

const sprachen: { wert: Sprache; label: string }[] = [
  { wert: "de", label: "Deutsch" },
  { wert: "en", label: "English" },
];

// Klick auf den Namen oben rechts: Account, Einstellungen, Sprache, Abmelden.
export function NutzerMenu() {
  const { s, t, d, setzen } = useSprache();
  const toast = useToast();
  const [offen, setOffen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const { nutzer } = d.kunde;

  useEffect(() => {
    if (!offen) return;
    const klick = (e: MouseEvent) => {
      if (!box.current?.contains(e.target as Node)) setOffen(false);
    };
    const taste = (e: KeyboardEvent) => e.key === "Escape" && setOffen(false);
    document.addEventListener("mousedown", klick);
    document.addEventListener("keydown", taste);
    return () => {
      document.removeEventListener("mousedown", klick);
      document.removeEventListener("keydown", taste);
    };
  }, [offen]);

  return (
    <div className="nutzer" ref={box}>
      <button className="nutzer-knopf" aria-haspopup="menu" aria-expanded={offen} onClick={() => setOffen(!offen)}>
        <span className="user-name" style={{ fontSize: 15 }}>{nutzer.vorname}</span>
        <span className="avatar avatar-user">{nutzer.initialen}</span>
      </button>
      {offen ? (
        <div className="nutzer-menu" role="menu">
          <div className="nutzer-kopf">
            <span className="bold" style={{ color: "var(--white)" }}>{nutzer.vorname} {nutzer.nachname}</span>
            <span className="small muted">{nutzer.email}</span>
          </div>
          <Link href="/konto" role="menuitem" className="nutzer-eintrag" onClick={() => setOffen(false)}>
            {t("Account", "Account")}
          </Link>
          <Link href="/einstellungen" role="menuitem" className="nutzer-eintrag" onClick={() => setOffen(false)}>
            {t("Einstellungen", "Settings")}
          </Link>
          <div className="nutzer-sprache">
            <span className="label">{t("Sprache", "Language")}</span>
            <div className="row gap-8" role="radiogroup" aria-label={t("Sprache", "Language")}>
              {sprachen.map((x) => (
                <button
                  key={x.wert}
                  role="radio"
                  aria-checked={s === x.wert}
                  lang={x.wert}
                  className={`pill${s === x.wert ? " is-selected" : ""}`}
                  onClick={() => setzen(x.wert)}
                >
                  {x.label}
                </button>
              ))}
            </div>
          </div>
          <button
            role="menuitem"
            className="nutzer-eintrag nutzer-abmelden"
            onClick={() => {
              setOffen(false);
              toast({ titel: t("Abmelden", "Sign out"), text: t("Im fertigen Produkt wirst du hier abgemeldet.", "In the finished product, this signs you out.") });
            }}
          >
            {t("Abmelden", "Sign out")}
          </button>
        </div>
      ) : null}
    </div>
  );
}
