"use client";

import { useEffect, useState } from "react";

export type Ansicht = "kacheln" | "liste";

const KEY = "kurios-ansicht";

// Gemerkte Ansicht (Kacheln oder Liste), gilt für alle Ordner-Seiten.
export function useAnsicht(): [Ansicht, (a: Ansicht) => void] {
  const [ansicht, setAnsicht] = useState<Ansicht>("kacheln");

  useEffect(() => {
    try {
      const gespeichert = localStorage.getItem(KEY);
      if (gespeichert === "liste" || gespeichert === "kacheln") setAnsicht(gespeichert);
    } catch {}
  }, []);

  const setzen = (a: Ansicht) => {
    setAnsicht(a);
    try {
      localStorage.setItem(KEY, a);
    } catch {}
  };

  return [ansicht, setzen];
}

const KachelIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
    <rect x="2" y="2" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
    <rect x="10.5" y="2" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
    <rect x="2" y="10.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
    <rect x="10.5" y="10.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const ListeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
    <path d="M6 4.5H16M6 9H16M6 13.5H16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="2.75" cy="4.5" r="1" fill="currentColor" />
    <circle cx="2.75" cy="9" r="1" fill="currentColor" />
    <circle cx="2.75" cy="13.5" r="1" fill="currentColor" />
  </svg>
);

export function AnsichtUmschalter({ ansicht, onChange }: { ansicht: Ansicht; onChange: (a: Ansicht) => void }) {
  return (
    <div className="ansicht" role="radiogroup" aria-label="Ansicht">
      <button role="radio" aria-checked={ansicht === "kacheln"} aria-label="Kachelansicht" title="Kacheln" className={ansicht === "kacheln" ? "is-selected" : ""} onClick={() => onChange("kacheln")}>
        <KachelIcon />
      </button>
      <button role="radio" aria-checked={ansicht === "liste"} aria-label="Listenansicht" title="Liste" className={ansicht === "liste" ? "is-selected" : ""} onClick={() => onChange("liste")}>
        <ListeIcon />
      </button>
    </div>
  );
}
