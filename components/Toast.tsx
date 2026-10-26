"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { useSprache } from "./Sprache";

export type ToastInput = {
  titel: string;
  text?: string;
  aktion?: { label: string; href?: string; onClick?: () => void };
};
type ToastItem = ToastInput & { id: number };

const ToastContext = createContext<(t: ToastInput) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

// Bestätigungen nach Aktionen: unten mittig, verschwinden nach 5 Sekunden.
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(1);
  const { t: tx } = useSprache();

  const close = useCallback((id: number) => setToasts((all) => all.filter((t) => t.id !== id)), []);

  const show = useCallback(
    (t: ToastInput) => {
      const id = nextId.current++;
      setToasts((all) => [...all.slice(-2), { ...t, id }]);
      setTimeout(() => close(id), 5000);
    },
    [close],
  );

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div className="toasts" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className="toast" role="status">
            <span className="toast-check" aria-hidden>✓</span>
            <div>
              <div className="toast-title">{t.titel}</div>
              {t.text ? <div className="toast-text">{t.text}</div> : null}
              {t.aktion?.href ? (
                <Link href={t.aktion.href} className="toast-action" onClick={() => close(t.id)}>
                  {t.aktion.label}
                </Link>
              ) : t.aktion ? (
                <button
                  className="toast-action"
                  onClick={() => {
                    t.aktion?.onClick?.();
                    close(t.id);
                  }}
                >
                  {t.aktion.label}
                </button>
              ) : null}
            </div>
            <button className="toast-close" aria-label={tx("Schließen", "Close")} onClick={() => close(t.id)}>×</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
