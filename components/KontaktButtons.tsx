"use client";

import { useSprache } from "./Sprache";
import { useToast } from "./Toast";

export function KontaktButtons() {
  const toast = useToast();
  const { t, d } = useSprache();
  const lena = d.kunde.ansprechperson.vorname;
  return (
    <div className="row gap-8">
      <button
        className="pill is-selected"
        onClick={() => toast({ titel: t("Nachricht an ", "Message to ") + lena, text: t("Im fertigen Produkt öffnet sich hier ein Chat oder Teams.", "In the finished product, this opens a chat or Teams.") })}
      >
        {t("Nachricht", "Message")}
      </button>
      <button
        className="pill"
        onClick={() => toast({ titel: t("Termin mit ", "Meeting with ") + lena, text: t("Im fertigen Produkt öffnet sich hier Lenas Kalender.", "In the finished product, this opens Lena's calendar.") })}
      >
        {t("Termin", "Meeting")}
      </button>
    </div>
  );
}
