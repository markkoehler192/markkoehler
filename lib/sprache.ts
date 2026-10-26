// Sprachwahl Deutsch/Englisch. Die Wahl liegt im Cookie, damit Server und Browser sie kennen.
import * as de from "./data";
import { en } from "./data-en";

export type Sprache = "de" | "en";
export const SPRACH_COOKIE = "kurios-sprache";

export type Daten = typeof de;
export type T = (de: string, en: string) => string;

export const alsSprache = (wert?: string): Sprache => (wert === "en" ? "en" : "de");
export const uebersetzer = (s: Sprache): T => (d, e) => (s === "en" ? e : d);
export const datenFuer = (s: Sprache): Daten => (s === "en" ? en : de);

// Feste Werte aus den Daten (Status, Filter, Formate) bleiben intern deutsch und werden nur für die Anzeige übersetzt.
const woerter: Record<string, string> = {
  Alle: "All",
  "Review offen": "Review open",
  "In Arbeit": "In progress",
  Freigegeben: "Approved",
  "Feedback offen": "Feedback open",
  Neu: "New",
  Abgeschlossen: "Done",
  Geplant: "Scheduled",
  Vorschlag: "Suggestion",
  Bild: "Image",
  Neueste: "Newest",
  Freigestellt: "Cut out",
  Querformat: "Landscape",
  Hochformat: "Portrait",
  Kurz: "Short",
  Mittel: "Medium",
  Lang: "Long",
  Produkttext: "Product copy",
  Vergleichen: "Compare",
  "7 Tage": "7 days",
  "30 Tage": "30 days",
  Kampagne: "Campaign",
};

export const wortFuer = (s: Sprache) => (wort: string) => (s === "en" ? (woerter[wort] ?? wort) : wort);
