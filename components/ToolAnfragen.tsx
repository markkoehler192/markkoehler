"use client";

import type { ReactNode } from "react";
import type { Tool } from "@/lib/data";
import { useSprache } from "./Sprache";
import { useToast } from "./Toast";

export function ToolAnfragen({ tool, modus, children }: { tool?: Tool; modus: "vorschau" | "anfrage" | "neu"; children?: ReactNode }) {
  const toast = useToast();
  const { t } = useSprache();

  if (modus === "vorschau") {
    return (
      <button
        className="card card-link tool"
        style={{ textAlign: "left" }}
        onClick={() => toast({ titel: t(`${tool?.name} öffnet bald`, `${tool?.name} is coming soon`), text: t("Im Prototyp ist nur der KI-Markentexter ausgebaut.", "In the prototype, only the AI Brand Writer is built out.") })}
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
        onClick={() => toast({ titel: t("Anfrage gesendet", "Request sent"), text: t(`Lena meldet sich zu „${tool?.name}“ und bespricht mit euch, was das Tool können soll.`, `Lena will get in touch about “${tool?.name}” and talk through what the tool should do.`) })}
      >
        {t("Anfragen", "Request")}
      </button>
    );
  }

  return (
    <button
      className="card card-link tool tool-dashed"
      style={{ textAlign: "left" }}
      onClick={() => toast({ titel: t("Danke für die Idee", "Thanks for the idea"), text: t("Lena meldet sich bei dir, um zu klären, was euch fehlt.", "Lena will get in touch to find out what you're missing.") })}
    >
      <span className="h1" style={{ fontSize: 36, color: "var(--muted)" }}>+</span>
      <div className="stack gap-8">
        <span className="h3">{t("Tool anfragen", "Request a tool")}</span>
        <span className="muted">{t("Euch fehlt etwas? Wir bauen es.", "Missing something? We'll build it.")}</span>
      </div>
    </button>
  );
}
