import type { ReactNode } from "react";

// Leer, lädt, Fehler: aus Figma "7 · Zustände".
export function EmptyState({ titel = "Noch nichts hier", text, children }: { titel?: string; text: string; children?: ReactNode }) {
  return (
    <div className="card state">
      <div className="state-icon" aria-hidden>+</div>
      <h3 className="h2">{titel}</h3>
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

export function ErrorState({ titel = "Hat nicht geklappt", text, onRetry }: { titel?: string; text: string; onRetry?: () => void }) {
  return (
    <div className="card state" role="alert">
      <div className="state-icon is-fehler" aria-hidden>!</div>
      <h3 className="h2">{titel}</h3>
      <p>{text}</p>
      {onRetry ? <button className="btn btn-primary" onClick={onRetry}>Nochmal versuchen</button> : null}
    </div>
  );
}
