"use client";

import { kunde } from "@/lib/data";
import { useToast } from "./Toast";

export function KontaktButtons() {
  const toast = useToast();
  const lena = kunde.ansprechperson.vorname;
  return (
    <div className="row gap-8">
      <button
        className="pill is-selected"
        onClick={() => toast({ titel: "Nachricht an " + lena, text: "Im fertigen Produkt öffnet sich hier ein Chat oder Teams." })}
      >
        Nachricht
      </button>
      <button
        className="pill"
        onClick={() => toast({ titel: "Termin mit " + lena, text: "Im fertigen Produkt öffnet sich hier Lenas Kalender." })}
      >
        Termin
      </button>
    </div>
  );
}
