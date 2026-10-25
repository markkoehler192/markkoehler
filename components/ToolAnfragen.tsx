"use client";

import type { ReactNode } from "react";
import type { Tool } from "@/lib/data";
import { useToast } from "./Toast";

export function ToolAnfragen({ tool, modus, children }: { tool?: Tool; modus: "vorschau" | "anfrage" | "neu"; children?: ReactNode }) {
  const toast = useToast();

  if (modus === "vorschau") {
    return (
      <button
        className="card card-link tool"
        style={{ textAlign: "left" }}
        onClick={() => toast({ titel: `${tool?.name} öffnet bald`, text: "Im Prototyp ist nur der Markentexter ausgebaut." })}
      >
        {children}
      </button>
    );
  }

  if (modus === "anfrage") {
    return (
      <button
        className="pill"
        style={{ alignSelf: "flex-start", marginTop: 8 }}
        onClick={() => toast({ titel: "Anfrage gesendet", text: `Lena meldet sich zu „${tool?.name}“ und bespricht mit euch, was das Tool können soll.` })}
      >
        Anfragen
      </button>
    );
  }

  return (
    <button
      className="card card-link tool tool-dashed"
      style={{ textAlign: "left" }}
      onClick={() => toast({ titel: "Danke für die Idee", text: "Lena meldet sich bei dir, um zu klären, was euch fehlt." })}
    >
      <span className="h1" style={{ fontSize: 36, color: "var(--muted)" }}>+</span>
      <div className="stack gap-8">
        <span className="h3">Tool anfragen</span>
        <span className="muted">Euch fehlt etwas? Wir bauen es.</span>
      </div>
    </button>
  );
}
