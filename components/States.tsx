"use client";

import type { ReactNode } from "react";
import { useSprache } from "./Sprache";

// Leer, lädt, Fehler: aus Figma "7 · Zustände".
export function EmptyState({ titel, text, children }: { titel?: string; text: string; children?: ReactNode }) {
  const { t } = useSprache();
  return (
    <div className="card state">
      <div className="state-icon" aria-hidden>+</div>
      <h3 className="h2">{titel ?? t("Noch nichts hier", "Nothing here yet")}</h3>
      <p>{text}</p>
      {children}
    </div>
  );
}

export function LoadingState({ titel, text }: { titel: string; text: string }) {
  return (
    <div className="card state" role="status" aria-live="polite">
      <div className="loader" aria-hidden><span /><span /><span /></div>
      <h3 className="h2">{titel}</h3>
      <p>{text}</p>
    </div>
  );
}

export function ErrorState({ titel, text, onRetry }: { titel?: string; text: string; onRetry?: () => void }) {
  const { t } = useSprache();
  return (
    <div className="card state" role="alert">
      <div className="state-icon is-fehler" aria-hidden>!</div>
      <h3 className="h2">{titel ?? t("Hat nicht geklappt", "That didn't work")}</h3>
      <p>{text}</p>
      {onRetry ? <button className="btn btn-primary" onClick={onRetry}>{t("Nochmal versuchen", "Try again")}</button> : null}
    </div>
  );
}
