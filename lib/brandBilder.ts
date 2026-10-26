// Beispieldaten für das Studio-Tool "Brand-Bilder" (Kunde WILDBLATT).
// Die Vorschläge sind gezeichnete Platzhalter. Später liefert sie ein
// Bildmodell über Langdock, mit CI und Produktbildern aus dem Archive.

export type ProduktForm = "tiegel" | "flasche" | "dose" | "tube";

export type Produkt = {
  name: string;
  nameEn: string;
  datei: string;
  form: ProduktForm;
  farbe: string; // Verpackung
  akzent: string; // Etikett
};

export const produkte: Produkt[] = [
  { name: "Ringelblumen-Creme", nameEn: "Calendula Cream", datei: "Ringelblumen-Creme.jpg", form: "tiegel", farbe: "#f3ede2", akzent: "#e8962e" },
  { name: "Rosen-Gesichtsöl", nameEn: "Rose Face Oil", datei: "Rosen-Gesichtsöl.jpg", form: "flasche", farbe: "#b9786f", akzent: "#f3e4dc" },
  { name: "Arnika-Balsam", nameEn: "Arnica Balm", datei: "Arnika-Balsam.jpg", form: "dose", farbe: "#d9b440", akzent: "#3f4a2e" },
  { name: "Hafer-Lotion", nameEn: "Oat Lotion", datei: "Hafer-Lotion.jpg", form: "tube", farbe: "#ece3d0", akzent: "#8a9a6b" },
];

export const stimmungen = ["Natürlich hell", "Warm & herbstlich", "Ruhig & klar"] as const;
export type Stimmung = (typeof stimmungen)[number];
export const stimmungenEn: Record<Stimmung, string> = {
  "Natürlich hell": "Natural & light",
  "Warm & herbstlich": "Warm & autumnal",
  "Ruhig & klar": "Calm & clear",
};

export const formate = [
  { label: "Feed 1:1", ratio: "1 / 1", kurz: "1:1" },
  { label: "Post 4:5", ratio: "4 / 5", kurz: "4:5" },
  { label: "Story 9:16", ratio: "9 / 16", kurz: "9:16" },
  { label: "Banner 16:9", ratio: "16 / 9", kurz: "16:9" },
] as const;
export type FormatLabel = (typeof formate)[number]["label"];

// Farbwelt je Stimmung: Hintergrund oben/unten, Tischfläche, Blüten.
export const farbwelten: Record<Stimmung, { oben: string; unten: string; flaeche: string; bluete: string; licht: string }> = {
  "Natürlich hell": { oben: "#efe9dc", unten: "#dfe6d3", flaeche: "#c9b48f", bluete: "#f0a63a", licht: "rgba(255,255,240,.55)" },
  "Warm & herbstlich": { oben: "#c98a4b", unten: "#6b4327", flaeche: "#4a2f1d", bluete: "#f2a12c", licht: "rgba(255,210,140,.45)" },
  "Ruhig & klar": { oben: "#dfe3e1", unten: "#b9c4bd", flaeche: "#9fae9f", bluete: "#e9c46a", licht: "rgba(255,255,255,.5)" },
};

// Vier Bildaufbauten pro Durchgang. x = Position des Produkts in Prozent.
export const aufbauten = [
  { titel: "Auf dem Holztisch", titelEn: "On the wooden table", x: 50, horizont: 62, blueten: [[18, 74], [80, 70], [70, 86]] },
  { titel: "Mit Blüten im Vordergrund", titelEn: "Flowers in front", x: 62, horizont: 58, blueten: [[14, 82], [28, 90], [40, 84], [86, 88]] },
  { titel: "Viel Platz für Text", titelEn: "Room for copy", x: 74, horizont: 66, blueten: [[60, 80]] },
  { titel: "Nah dran", titelEn: "Close-up", x: 46, horizont: 72, blueten: [[10, 60], [88, 64], [20, 88], [82, 90]] },
  { titel: "Im Kräutergarten", titelEn: "In the herb garden", x: 36, horizont: 54, blueten: [[62, 70], [76, 78], [90, 72]] },
  { titel: "Morgenlicht am Fenster", titelEn: "Morning light by the window", x: 56, horizont: 64, blueten: [[22, 78], [34, 86]] },
] as const;

export const archiveQuellen = [
  ["Farbwelt aus dem Brand Guide", "Colour palette from the brand guide"],
  ["Bildstil Kampagne Ringelblume 2026", "Image style of the Calendula 2026 campaign"],
  ["128 Produktbilder", "128 product shots"],
] as const;

// Interner Schlüssel (deutsch) und englische Anzeige.
export const bildAnpassungen = [
  ["Heller", "Lighter"],
  ["Mehr Blüten", "More flowers"],
  ["Mehr Platz für Text", "More room for copy"],
  ["Ohne Produkt", "Without product"],
] as const;
