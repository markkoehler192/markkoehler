// Statische Beispieldaten für den Prototyp (Kunde WILDBLATT Naturkosmetik).
// Später kommen diese Daten aus Supabase, OneDrive/SharePoint und Langdock.

export const kunde = {
  name: "WILDBLATT Naturkosmetik",
  nutzer: { vorname: "Julia", nachname: "Sommer", initialen: "JS", email: "julia.sommer@wildblatt.de", rolle: "Marketing-Leitung" },
  ansprechperson: {
    name: "Lena Kurz",
    vorname: "Lena",
    initialen: "LK",
    rolle: "deine Ansprechpartnerin bei KURIOS",
  },
  team: [
    { name: "Julia Sommer", rolle: "Marketing-Leitung", rechte: "Alles, inkl. Freigaben" },
    { name: "Tom Becker", rolle: "Social Media", rechte: "Archive, Studio, Live" },
    { name: "Mara Ilić", rolle: "Produktmanagement", rechte: "Archive, Projects (nur ansehen)" },
  ],
};

export const offeneAufgaben = [
  { text: "2 Assets warten auf dein Review", href: "/projects?filter=review", wichtig: true },
  { text: "1 Post zur Freigabe", href: "/live#planung", wichtig: false },
  { text: "Briefing Rosen-Gesichtsöl: 3 Fragen offen", href: "/projects/briefing", wichtig: false },
];

export const bereiche = [
  { titel: "Archive", text: "Kampagnen, Assets und CI", href: "/archive" },
  { titel: "Studio", text: "Deine Custom Tools", href: "/studio" },
  { titel: "Projects", text: "Laufende Projekte und Reviews", href: "/projects" },
  { titel: "Live", text: "Performance und Social-Planung", href: "/live" },
];

export type Ordner = {
  slug: string;
  name: string;
  anzahl: string;
  text: string;
  neu?: number;
};

export const ordner: Ordner[] = [
  { slug: "ci", name: "CI", anzahl: "24 Dateien", text: "Logo, Farben, Schriften, Brand Guide" },
  { slug: "kampagnen", name: "Kampagnen", anzahl: "6 Kampagnen", text: "Alle Kampagnen nach Jahr", neu: 1 },
  { slug: "bilder", name: "Bilder", anzahl: "312 Bilder", text: "Produktbilder, Kampagnenbilder, Social", neu: 3 },
  { slug: "videos", name: "Videos", anzahl: "18 Videos", text: "Spots, Reels, Rohmaterial", neu: 1 },
  { slug: "social-media", name: "Social Media", anzahl: "140 Dateien", text: "Posts, Stories, Vorlagen" },
  { slug: "dokumente", name: "Dokumente", anzahl: "32 Dateien", text: "Präsentationen, Briefings, Verträge" },
];

export const zuletztHinzugefuegt = [
  { name: "Key Visual Ringelblume.jpg", ort: "Kampagnen / Ringelblume 2026" },
  { name: "Creme-Tiegel freigestellt.png", ort: "Bilder / Produktbilder" },
  { name: "Logo weiß.svg", ort: "CI / Logo" },
  { name: "Reel Kräutergarten.mp4", ort: "Videos / Reels" },
];

export const bilderUnterordner = [
  { name: "Produktbilder", anzahl: 128 },
  { name: "Kampagnenbilder", anzahl: 96 },
  { name: "Social Media", anzahl: 64 },
  { name: "Mood & Inspiration", anzahl: 24 },
];

export type Bild = {
  name: string;
  ordner: string;
  format: "quer" | "hoch";
  freigestellt: boolean;
  neu: boolean;
};

export const bilder: Bild[] = [
  { name: "Ringelblumen-Creme.jpg", ordner: "Produktbilder", format: "hoch", freigestellt: true, neu: true },
  { name: "Rosen-Gesichtsöl.jpg", ordner: "Produktbilder", format: "hoch", freigestellt: true, neu: true },
  { name: "Arnika-Balsam.jpg", ordner: "Produktbilder", format: "quer", freigestellt: false, neu: true },
  { name: "Hafer-Lotion.jpg", ordner: "Produktbilder", format: "hoch", freigestellt: false, neu: false },
  { name: "Lippenpflege.jpg", ordner: "Produktbilder", format: "quer", freigestellt: true, neu: false },
  { name: "Geschenkset.jpg", ordner: "Kampagnenbilder", format: "quer", freigestellt: false, neu: false },
  { name: "Kräutergarten.jpg", ordner: "Mood & Inspiration", format: "quer", freigestellt: false, neu: false },
  { name: "Manufaktur.jpg", ordner: "Mood & Inspiration", format: "hoch", freigestellt: false, neu: false },
];

export const markenwissen = ["CI", "Bilder", "Markensprache", "Produktinfos"];

export type Tool = { slug: string; name: string; nutzt: string; text: string; href?: string };

export const aktiveTools: Tool[] = [
  { slug: "brand-bilder", name: "KI-Brand-Bilder", nutzt: "nutzt CI + Bilder", text: "Bilder und Key Visuals im Look eurer Marke erstellen.", href: "/studio/brand-bilder" },
  { slug: "markentexter", name: "KI-Markentexter", nutzt: "nutzt Markensprache", text: "Texte für jeden Kanal, direkt in eurer Markensprache.", href: "/studio/markentexter" },
  { slug: "format-anpasser", name: "KI-Format-Anpasser", nutzt: "nutzt CI + Bilder", text: "Ein Motiv, alle Formate: Feed, Story, Plakat, Banner." },
  { slug: "marken-chat", name: "KI-Marken-Chat", nutzt: "nutzt ganzes Archive", text: "Frag alles zu Marke, Kampagnen und Archiv." },
];

export const weitereTools: Tool[] = [
  { slug: "ci-check", name: "KI-CI-Check", nutzt: "auf Anfrage", text: "Prüft Entwürfe auf Farben, Schrift, Logo und Ton." },
  { slug: "kampagnen-ideen", name: "KI-Kampagnen-Ideen", nutzt: "auf Anfrage", text: "Ideen, Claims und erste Skizzen für eure nächste Aktion." },
  { slug: "uebersetzer", name: "KI-Übersetzer", nutzt: "auf Anfrage", text: "Übersetzt Texte und bleibt dabei in eurer Tonalität." },
];

export const markentexterVarianten = [
  {
    absaetze: [
      "Deine Haut kennt den Herbst. Wir auch. 🌼",
      "Unsere neue Ringelblumen-Creme pflegt trockene, gereizte Haut mit Bio-Calendula aus eigenem Anbau. Ohne Duftstoffe, mit ganz viel Ruhe.",
      "Ab heute im Shop und bei euren Lieblingshändlern.",
    ],
    hashtags: "#Wildblatt  #Naturkosmetik  #Ringelblume  #Hautpflege",
  },
  {
    absaetze: [
      "Neu bei uns: Ruhe zum Eincremen. 🌿",
      "Die Ringelblumen-Creme ist für Haut gemacht, die gerade etwas mehr braucht. Bio-Calendula aus unserem Garten, keine Duftstoffe, nichts Überflüssiges.",
      "Ab heute im Shop. Wir sind gespannt, wie sie euch gefällt.",
    ],
    hashtags: "#Wildblatt  #Ringelblume  #Naturkosmetik  #SensibleHaut",
  },
];

export type AssetStatus = "Review offen" | "In Arbeit" | "Freigegeben";

export type Asset = {
  slug: string;
  projekt: string;
  titel: string;
  art: "Bild" | "Video";
  meta: string;
  frist: string;
  tageBisFrist: number;
  status: AssetStatus;
  dauer?: string;
};

export const assets: Asset[] = [
  { slug: "bluetezeit", projekt: "Ringelblume 2026", titel: "Kampagnenbild „Blütezeit“", art: "Bild", meta: "Bild · 4:5 · V2", frist: "bis 28.10.", tageBisFrist: 3, status: "Review offen" },
  { slug: "social-spot", projekt: "Ringelblume 2026", titel: "Social-Spot 15 Sek", art: "Video", meta: "Video · 9:16 · 0:15 · V1", frist: "bis 30.10.", tageBisFrist: 5, status: "Review offen", dauer: "0:15" },
  { slug: "newsletter-winterpflege", projekt: "Geschenksets", titel: "Newsletter Winterpflege", art: "Bild", meta: "Bild · 16:9 · V1", frist: "bis 02.11.", tageBisFrist: 8, status: "Review offen" },
  { slug: "plakat-drogerie", projekt: "Ringelblume 2026", titel: "Plakat Drogerie A1", art: "Bild", meta: "Bild · A1 · Entwurf", frist: "04.11.", tageBisFrist: 10, status: "In Arbeit" },
  { slug: "story-serie", projekt: "Geschenksets", titel: "Story-Serie Anwendung", art: "Video", meta: "Video · 9:16 · 0:18 · Entwurf", frist: "12.11.", tageBisFrist: 18, status: "In Arbeit", dauer: "0:18" },
];

export type Praesentation = {
  projekt: string;
  titel: string;
  meta: string;
  status: "Feedback offen" | "Neu" | "Abgeschlossen";
};

export const praesentationen: Praesentation[] = [
  { projekt: "Ringelblume 2026", titel: "Kampagnen-Präsentation", meta: "24 Folien · Termin 29.10., 10 Uhr", status: "Feedback offen" },
  { projekt: "Rosen-Gesichtsöl", titel: "Konzept-Ideen Launch 2027", meta: "12 Folien · neu von KURIOS", status: "Neu" },
  { projekt: "Jahresplanung", titel: "Markenauftritt 2027", meta: "36 Folien · besprochen am 12.09.", status: "Abgeschlossen" },
];

// LIVE: Kennzahlen, Verlauf und Top-Posts je Channel. "Alle" ist die Summe über alle Channels.
export const kanaele = ["Alle", "Meta", "TikTok", "YouTube", "LinkedIn"] as const;
export type Kanal = (typeof kanaele)[number];

export const kanalInfo: Record<Exclude<Kanal, "Alle">, string> = {
  Meta: "Instagram und Facebook",
  TikTok: "TikTok",
  YouTube: "YouTube und Shorts",
  LinkedIn: "LinkedIn",
};

export type Kennzahl = { titel: string; wert: string; delta: string; info: string };

const kz = (gesehen: string, dGesehen: string, reagiert: string, quote: string, dQuote: string, klicks: string, dKlicks: string, follower: string, dFollower: string): Kennzahl[] => [
  { titel: "So viele haben euch gesehen", wert: gesehen, delta: dGesehen, info: "Reichweite: so viele verschiedene Leute haben mindestens einen eurer Beiträge gesehen." },
  { titel: `Von 100 Leuten haben ${reagiert} reagiert`, wert: quote, delta: `Like, Kommentar oder Teilen · ${dQuote}`, info: "Engagement: der Anteil der Leute, die nicht nur geschaut, sondern auch reagiert haben." },
  { titel: "Klicks in euren Shop", wert: klicks, delta: dKlicks, info: "So oft wurde von diesem Channel aus euer Shop geöffnet." },
  { titel: "Neue Follower", wert: follower, delta: dFollower, info: "So viele Leute folgen euch neu." },
];

export const kennzahlenJeKanal: Record<Kanal, Kennzahl[]> = {
  Alle: kz("248 Tsd.", "+18 % mehr als letzten Monat", "5", "5,2 %", "+0,8 Punkte", "3.410", "+24 % mehr als letzten Monat", "1.180", "+9 % mehr als letzten Monat"),
  Meta: kz("131 Tsd.", "+12 % mehr als letzten Monat", "5", "4,9 %", "+0,4 Punkte", "2.150", "+19 % mehr als letzten Monat", "540", "+6 % mehr als letzten Monat"),
  TikTok: kz("82 Tsd.", "+41 % mehr als letzten Monat", "7", "7,1 %", "+1,9 Punkte", "690", "+52 % mehr als letzten Monat", "470", "+28 % mehr als letzten Monat"),
  YouTube: kz("24 Tsd.", "+6 % mehr als letzten Monat", "3", "3,4 %", "+0,2 Punkte", "320", "+8 % mehr als letzten Monat", "95", "+4 % mehr als letzten Monat"),
  LinkedIn: kz("11 Tsd.", "−3 % weniger als letzten Monat", "4", "3,8 %", "−0,1 Punkte", "250", "+2 % mehr als letzten Monat", "75", "+11 % mehr als letzten Monat"),
};

// Reichweite pro Woche in Tausend (KW 33 bis 44)
const wochen = (werte: number[]) => werte.map((wert, i) => ({ kw: 33 + i, wert }));
export const reichweiteJeKanal: Record<Kanal, { kw: number; wert: number }[]> = {
  Alle: wochen([12, 16.8, 15.2, 22, 19.2, 28, 25.6, 36, 32.8, 41, 30.4, 35.2]),
  Meta: wochen([7.4, 9.6, 8.8, 12.4, 10.8, 15, 13.6, 19.2, 17, 21.4, 16.2, 18.6]),
  TikTok: wochen([2, 3.6, 3.2, 5.4, 4.8, 8, 7.6, 11.4, 10.6, 14, 9.8, 11.8]),
  YouTube: wochen([1.6, 2.4, 2.2, 2.8, 2.4, 3.4, 3, 3.8, 3.6, 3.9, 3, 3.2]),
  LinkedIn: wochen([1, 1.2, 1, 1.4, 1.2, 1.6, 1.4, 1.6, 1.6, 1.7, 1.4, 1.6]),
};

export const topPostsJeKanal: Record<Kanal, { titel: string; wert: string; kanal: Exclude<Kanal, "Alle"> }[]> = {
  Alle: [
    { titel: "Reel „Blütezeit“", wert: "92 Tsd. Leute gesehen", kanal: "Meta" },
    { titel: "TikTok „Eincremen in 15 Sek“", wert: "7,9 % haben reagiert", kanal: "TikTok" },
    { titel: "Story Kräutergarten", wert: "1.240 Klicks in den Shop", kanal: "Meta" },
  ],
  Meta: [
    { titel: "Reel „Blütezeit“", wert: "92 Tsd. Leute gesehen", kanal: "Meta" },
    { titel: "Post Ringelblumen-Creme", wert: "6,8 % haben reagiert", kanal: "Meta" },
    { titel: "Story Kräutergarten", wert: "1.240 Klicks in den Shop", kanal: "Meta" },
  ],
  TikTok: [
    { titel: "TikTok „Eincremen in 15 Sek“", wert: "7,9 % haben reagiert", kanal: "TikTok" },
    { titel: "TikTok „Ringelblume ernten“", wert: "38 Tsd. Leute gesehen", kanal: "TikTok" },
    { titel: "TikTok „Hautpflege-Mythen“", wert: "410 Klicks in den Shop", kanal: "TikTok" },
  ],
  YouTube: [
    { titel: "Short „Manufaktur in 60 Sek“", wert: "11 Tsd. Leute gesehen", kanal: "YouTube" },
    { titel: "Video „So entsteht die Creme“", wert: "4:12 Min. im Schnitt geschaut", kanal: "YouTube" },
    { titel: "Short „Calendula erklärt“", wert: "160 Klicks in den Shop", kanal: "YouTube" },
  ],
  LinkedIn: [
    { titel: "Post „Nachhaltige Lieferkette“", wert: "4,6 % haben reagiert", kanal: "LinkedIn" },
    { titel: "Post „Neue Kolleg:innen in der Manufaktur“", wert: "3.800 Leute gesehen", kanal: "LinkedIn" },
    { titel: "Artikel „20 Jahre WILDBLATT“", wert: "90 Klicks auf die Website", kanal: "LinkedIn" },
  ],
};

export const topHinweisJeKanal: Record<Kanal, string> = {
  Alle: "Das Reel lief 3x besser als üblich. Daraus eine Serie machen?",
  Meta: "Das Reel lief 3x besser als üblich. Daraus eine Serie machen?",
  TikTok: "TikTok wächst am schnellsten. Lohnt sich ein zweites Video pro Woche?",
  YouTube: "Shorts holen mehr Leute als lange Videos. Mehr Shorts aus dem Reel-Material?",
  LinkedIn: "Themen aus der Manufaktur kommen hier gut an. Eine kleine Serie dazu?",
};

export type PlanPost = {
  kanal: Exclude<Kanal, "Alle">;
  art: "Reel" | "Post" | "Story" | "Video" | "Short";
  titel: string;
  status: "Geplant" | "Vorschlag";
};

export const socialPlanung: { tag: string; posts: PlanPost[] }[] = [
  { tag: "Mo 27.", posts: [{ kanal: "Meta", art: "Reel", titel: "Anwendung Creme", status: "Geplant" }] },
  { tag: "Di 28.", posts: [{ kanal: "LinkedIn", art: "Post", titel: "Ein Tag in der Manufaktur", status: "Geplant" }] },
  {
    tag: "Mi 29.",
    posts: [
      { kanal: "Meta", art: "Post", titel: "Inhaltsstoff Calendula", status: "Vorschlag" },
      { kanal: "TikTok", art: "Video", titel: "Calendula in 15 Sek", status: "Vorschlag" },
    ],
  },
  { tag: "Do 30.", posts: [{ kanal: "Meta", art: "Story", titel: "Blick in die Manufaktur", status: "Geplant" }] },
  {
    tag: "Fr 31.",
    posts: [
      { kanal: "Meta", art: "Post", titel: "Gewinnspiel Geschenkset", status: "Vorschlag" },
      { kanal: "YouTube", art: "Short", titel: "Geschenkset auspacken", status: "Geplant" },
    ],
  },
  { tag: "Sa 1.", posts: [{ kanal: "TikTok", art: "Video", titel: "Wochenend-Routine", status: "Geplant" }] },
  { tag: "So 2.", posts: [{ kanal: "Meta", art: "Story", titel: "Sonntagsritual", status: "Vorschlag" }] },
];

// Durchsuchbarer Index für die globale Suche (Prototyp).
export type Treffer = {
  bereich: "Archive" | "Projects" | "Studio";
  titel: string;
  meta: string;
  typ: string;
  href: string;
  stichworte: string;
};

export const suchIndex: Treffer[] = [
  { bereich: "Archive", titel: "Logo weiß.svg", meta: "CI / Logo · Vektor", typ: "Datei", href: "/archive/ci", stichworte: "logo weiß svg vektor ci" },
  { bereich: "Archive", titel: "Logo weiß quadratisch.png", meta: "CI / Logo · 1080 × 1080 px", typ: "Datei", href: "/archive/ci", stichworte: "logo weiß png quadratisch instagram profilbild ci" },
  { bereich: "Archive", titel: "Logo weiß mit Claim.png", meta: "CI / Logo · 2400 × 800 px", typ: "Datei", href: "/archive/ci", stichworte: "logo weiß png claim ci" },
  { bereich: "Archive", titel: "Brand Guide.pdf", meta: "CI · 32 Seiten", typ: "Datei", href: "/archive/ci", stichworte: "brand guide ci farben schriften" },
  { bereich: "Archive", titel: "Key Visual Ringelblume.jpg", meta: "Kampagnen / Ringelblume 2026", typ: "Datei", href: "/archive/kampagnen", stichworte: "key visual ringelblume creme kampagne bild" },
  { bereich: "Archive", titel: "Creme-Tiegel freigestellt.png", meta: "Bilder / Produktbilder", typ: "Datei", href: "/archive/bilder", stichworte: "creme tiegel freigestellt png produktbild" },
  { bereich: "Archive", titel: "Ringelblumen-Creme.jpg", meta: "Bilder / Produktbilder", typ: "Datei", href: "/archive/bilder", stichworte: "ringelblume creme produktbild bild" },
  { bereich: "Archive", titel: "Reel Kräutergarten.mp4", meta: "Videos / Reels", typ: "Datei", href: "/archive/videos", stichworte: "reel kräutergarten video" },
  { bereich: "Projects", titel: "Social-Spot 15 Sek", meta: "Ringelblume 2026 · Logo im Abspann · Review offen", typ: "Asset", href: "/projects", stichworte: "social spot video logo ringelblume creme reel instagram" },
  { bereich: "Projects", titel: "Kampagnenbild „Blütezeit“", meta: "Ringelblume 2026 · Review offen", typ: "Asset", href: "/projects/review/bluetezeit", stichworte: "kampagnenbild blütezeit ringelblume creme post" },
  { bereich: "Projects", titel: "Briefing Rosen-Gesichtsöl", meta: "3 Fragen offen", typ: "Briefing", href: "/projects/briefing", stichworte: "briefing rosen gesichtsöl launch" },
  { bereich: "Studio", titel: "KI-Format-Anpasser", meta: "Ein Motiv, alle Formate: Feed, Story, Profilbild", typ: "Studio", href: "/studio", stichworte: "format anpasser instagram profilbild story feed logo zuschneiden" },
  { bereich: "Studio", titel: "KI-Markentexter", meta: "Texte für jeden Kanal, in eurer Markensprache", typ: "Studio", href: "/studio/markentexter", stichworte: "markentexter text post creme instagram newsletter" },
];

// Projekte als erste Ebene in Projects. Assets und Präsentationen hängen über den Projektnamen dran.
export type Projekt = {
  slug: string;
  name: string;
  art: string;
  text: string;
  zeitraum: string;
  status: "Feedback offen" | "In Arbeit" | "Abgeschlossen";
  briefing?: { text: string; offen: number };
};

export const projekte: Projekt[] = [
  { slug: "ringelblume-2026", name: "Ringelblume 2026", art: "Kampagne", text: "Launch der Ringelblumen-Creme: Social, Plakat, Drogerie.", zeitraum: "Okt. bis Dez. 2026", status: "Feedback offen" },
  { slug: "geschenksets", name: "Geschenksets", art: "Kampagne", text: "Weihnachtsgeschäft: Newsletter und Story-Serie.", zeitraum: "Nov. bis Dez. 2026", status: "Feedback offen" },
  {
    slug: "rosen-gesichtsoel",
    name: "Rosen-Gesichtsöl",
    art: "Launch",
    text: "Neues Rosen-Gesichtsöl, Launch im Frühjahr.",
    zeitraum: "Frühjahr 2027",
    status: "In Arbeit",
    briefing: { text: "Briefing läuft, 3 Fragen offen", offen: 3 },
  },
  { slug: "jahresplanung", name: "Jahresplanung", art: "Strategie", text: "Markenauftritt und Kampagnenplan für 2027.", zeitraum: "2027", status: "Abgeschlossen" },
];

export const projektVonName = (name: string) => projekte.find((p) => p.name === name);
