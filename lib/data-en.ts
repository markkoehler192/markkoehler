// English sample data. Same shape as lib/data.ts; status values and channel keys stay German
// because the code compares them. They are translated for display via wortFuer() in lib/sprache.ts.
import * as de from "./data";
import type { Asset, Bild, Kanal, Kennzahl, Ordner, PlanPost, Praesentation, Projekt, Tool, Treffer } from "./data";


const kunde = {
  name: "WILDBLATT Natural Cosmetics",
  nutzer: { vorname: "Julia", nachname: "Sommer", initialen: "JS", email: "julia.sommer@wildblatt.de", rolle: "Head of Marketing" },
  ansprechperson: {
    name: "Lena Kurz",
    vorname: "Lena",
    initialen: "LK",
    rolle: "your contact at KURIOS",
  },
  team: [
    { name: "Julia Sommer", rolle: "Head of Marketing", rechte: "Everything, incl. approvals" },
    { name: "Tom Becker", rolle: "Social Media", rechte: "Archive, Studio, Live" },
    { name: "Mara Ilić", rolle: "Product Management", rechte: "Archive, Projects (view only)" },
  ],
};

const offeneAufgaben = [
  { text: "2 assets waiting for your review", href: "/projects?filter=review", wichtig: true },
  { text: "1 post to approve", href: "/live#planung", wichtig: false },
  { text: "Briefing Rose Face Oil: 3 open questions", href: "/projects/briefing", wichtig: false },
];

const bereiche = [
  { titel: "Archive", text: "Campaigns, assets and CI", href: "/archive" },
  { titel: "Studio", text: "Your AI tools", href: "/studio" },
  { titel: "Projects", text: "Ongoing projects and reviews", href: "/projects" },
  { titel: "Live", text: "Performance and social planning", href: "/live" },
];

const ordner: Ordner[] = [
  { slug: "ci", name: "CI", anzahl: "24 files", text: "Logo, colours, fonts, brand guide" },
  { slug: "kampagnen", name: "Campaigns", anzahl: "6 campaigns", text: "All campaigns by year", neu: 1 },
  { slug: "bilder", name: "Images", anzahl: "312 images", text: "Product shots, campaign images, social", neu: 3 },
  { slug: "videos", name: "Videos", anzahl: "18 videos", text: "Spots, reels, raw footage", neu: 1 },
  { slug: "social-media", name: "Social Media", anzahl: "140 files", text: "Posts, stories, templates" },
  { slug: "dokumente", name: "Documents", anzahl: "32 files", text: "Presentations, briefings, contracts" },
];

const zuletztHinzugefuegt = [
  { name: "Key Visual Calendula.jpg", ort: "Campaigns / Calendula 2026" },
  { name: "Cream jar cut out.png", ort: "Images / Product shots" },
  { name: "Logo white.svg", ort: "CI / Logo" },
  { name: "Reel Herb Garden.mp4", ort: "Videos / Reels" },
];

const bilderUnterordner = [
  { name: "Product shots", anzahl: 128 },
  { name: "Campaign images", anzahl: 96 },
  { name: "Social Media", anzahl: 64 },
  { name: "Mood & Inspiration", anzahl: 24 },
];

const bilder: Bild[] = [
  { name: "Calendula Cream.jpg", ordner: "Product shots", format: "hoch", freigestellt: true, neu: true },
  { name: "Rose Face Oil.jpg", ordner: "Product shots", format: "hoch", freigestellt: true, neu: true },
  { name: "Arnica Balm.jpg", ordner: "Product shots", format: "quer", freigestellt: false, neu: true },
  { name: "Oat Lotion.jpg", ordner: "Product shots", format: "hoch", freigestellt: false, neu: false },
  { name: "Lip Care.jpg", ordner: "Product shots", format: "quer", freigestellt: true, neu: false },
  { name: "Gift Set.jpg", ordner: "Campaign images", format: "quer", freigestellt: false, neu: false },
  { name: "Herb Garden.jpg", ordner: "Mood & Inspiration", format: "quer", freigestellt: false, neu: false },
  { name: "Manufactory.jpg", ordner: "Mood & Inspiration", format: "hoch", freigestellt: false, neu: false },
];

const markenwissen = ["CI", "Images", "Brand voice", "Product info"];

const aktiveTools: Tool[] = [
  { slug: "brand-bilder", name: "AI Brand Images", nutzt: "uses CI + images", text: "Create images and key visuals in your brand's look.", href: "/studio/brand-bilder" },
  { slug: "markentexter", name: "AI Brand Writer", nutzt: "uses brand voice", text: "Copy for every channel, written in your brand voice.", href: "/studio/markentexter" },
  { slug: "format-anpasser", name: "AI Format Adapter", nutzt: "uses CI + images", text: "One visual, every format: feed, story, poster, banner." },
  { slug: "marken-chat", name: "AI Brand Chat", nutzt: "uses the whole archive", text: "Ask anything about your brand, campaigns and archive." },
];

const weitereTools: Tool[] = [
  { slug: "ci-check", name: "AI CI Check", nutzt: "on request", text: "Checks drafts for colours, fonts, logo and tone." },
  { slug: "kampagnen-ideen", name: "AI Campaign Ideas", nutzt: "on request", text: "Ideas, claims and first sketches for your next campaign." },
  { slug: "uebersetzer", name: "AI Translator", nutzt: "on request", text: "Translates copy and keeps your tone of voice." },
];

const markentexterVarianten = [
  {
    absaetze: [
      "Your skin knows autumn. So do we. 🌼",
      "Our new Calendula Cream soothes dry, irritated skin with organic calendula from our own garden. No fragrance, lots of calm.",
      "Available today in our shop and at your favourite stores.",
    ],
    hashtags: "#Wildblatt  #NaturalCosmetics  #Calendula  #Skincare",
  },
  {
    absaetze: [
      "New from us: a moment of calm. 🌿",
      "The Calendula Cream is made for skin that needs a little more right now. Organic calendula from our garden, no fragrance, nothing unnecessary.",
      "Available in our shop from today. We can't wait to hear what you think.",
    ],
    hashtags: "#Wildblatt  #Calendula  #NaturalCosmetics  #SensitiveSkin",
  },
];

const assets: Asset[] = [
  { slug: "bluetezeit", projekt: "Calendula 2026", titel: "Campaign image “Bloom”", art: "Bild", meta: "Image · 4:5 · V2", frist: "due Oct 28", tageBisFrist: 3, status: "Review offen" },
  { slug: "social-spot", projekt: "Calendula 2026", titel: "Social spot 15 sec", art: "Video", meta: "Video · 9:16 · 0:15 · V1", frist: "due Oct 30", tageBisFrist: 5, status: "Review offen", dauer: "0:15" },
  { slug: "newsletter-winterpflege", projekt: "Gift Sets", titel: "Newsletter Winter Care", art: "Bild", meta: "Image · 16:9 · V1", frist: "due Nov 2", tageBisFrist: 8, status: "Review offen" },
  { slug: "plakat-drogerie", projekt: "Calendula 2026", titel: "Drugstore poster A1", art: "Bild", meta: "Image · A1 · Draft", frist: "Nov 4", tageBisFrist: 10, status: "In Arbeit" },
  { slug: "story-serie", projekt: "Gift Sets", titel: "Story series How to use", art: "Video", meta: "Video · 9:16 · 0:18 · Draft", frist: "Nov 12", tageBisFrist: 18, status: "In Arbeit", dauer: "0:18" },
];

const praesentationen: Praesentation[] = [
  { projekt: "Calendula 2026", titel: "Campaign presentation", meta: "24 slides · meeting Oct 29, 10 am", status: "Feedback offen" },
  { projekt: "Rose Face Oil", titel: "Concept ideas launch 2027", meta: "12 slides · new from KURIOS", status: "Neu" },
  { projekt: "Annual Planning", titel: "Brand presence 2027", meta: "36 slides · discussed on Sep 12", status: "Abgeschlossen" },
];

const kanaele = de.kanaele;

const kanalInfo: Record<Exclude<Kanal, "Alle">, string> = {
  Meta: "Instagram and Facebook",
  TikTok: "TikTok",
  YouTube: "YouTube and Shorts",
  LinkedIn: "LinkedIn",
};

const kz = (gesehen: string, dGesehen: string, reagiert: string, quote: string, dQuote: string, klicks: string, dKlicks: string, follower: string, dFollower: string): Kennzahl[] => [
  { titel: "This many people saw you", wert: gesehen, delta: dGesehen, info: "Reach: how many different people saw at least one of your posts." },
  { titel: `${reagiert} in 100 people reacted`, wert: quote, delta: `Like, comment or share · ${dQuote}`, info: "Engagement: the share of people who didn't just look, but also reacted." },
  { titel: "Clicks to your shop", wert: klicks, delta: dKlicks, info: "How often your shop was opened from this channel." },
  { titel: "New followers", wert: follower, delta: dFollower, info: "How many people started following you." },
];

const mehr = (p: string) => `+${p} % more than last month`;
const kennzahlenJeKanal: Record<Kanal, Kennzahl[]> = {
  Alle: kz("248K", mehr("18"), "5", "5.2 %", "+0.8 points", "3,410", mehr("24"), "1,180", mehr("9")),
  Meta: kz("131K", mehr("12"), "5", "4.9 %", "+0.4 points", "2,150", mehr("19"), "540", mehr("6")),
  TikTok: kz("82K", mehr("41"), "7", "7.1 %", "+1.9 points", "690", mehr("52"), "470", mehr("28")),
  YouTube: kz("24K", mehr("6"), "3", "3.4 %", "+0.2 points", "320", mehr("8"), "95", mehr("4")),
  LinkedIn: kz("11K", "−3 % less than last month", "4", "3.8 %", "−0.1 points", "250", mehr("2"), "75", mehr("11")),
};

const reichweiteJeKanal = de.reichweiteJeKanal;

const topPostsJeKanal: Record<Kanal, { titel: string; wert: string; kanal: Exclude<Kanal, "Alle"> }[]> = {
  Alle: [
    { titel: "Reel “Bloom”", wert: "92K people saw it", kanal: "Meta" },
    { titel: "TikTok “Moisturise in 15 sec”", wert: "7.9 % reacted", kanal: "TikTok" },
    { titel: "Story Herb Garden", wert: "1,240 clicks to the shop", kanal: "Meta" },
  ],
  Meta: [
    { titel: "Reel “Bloom”", wert: "92K people saw it", kanal: "Meta" },
    { titel: "Post Calendula Cream", wert: "6.8 % reacted", kanal: "Meta" },
    { titel: "Story Herb Garden", wert: "1,240 clicks to the shop", kanal: "Meta" },
  ],
  TikTok: [
    { titel: "TikTok “Moisturise in 15 sec”", wert: "7.9 % reacted", kanal: "TikTok" },
    { titel: "TikTok “Harvesting calendula”", wert: "38K people saw it", kanal: "TikTok" },
    { titel: "TikTok “Skincare myths”", wert: "410 clicks to the shop", kanal: "TikTok" },
  ],
  YouTube: [
    { titel: "Short “Manufactory in 60 sec”", wert: "11K people saw it", kanal: "YouTube" },
    { titel: "Video “How the cream is made”", wert: "4:12 min watched on average", kanal: "YouTube" },
    { titel: "Short “Calendula explained”", wert: "160 clicks to the shop", kanal: "YouTube" },
  ],
  LinkedIn: [
    { titel: "Post “Sustainable supply chain”", wert: "4.6 % reacted", kanal: "LinkedIn" },
    { titel: "Post “New colleagues in the manufactory”", wert: "3,800 people saw it", kanal: "LinkedIn" },
    { titel: "Article “20 years of WILDBLATT”", wert: "90 clicks to the website", kanal: "LinkedIn" },
  ],
};

const topHinweisJeKanal: Record<Kanal, string> = {
  Alle: "The reel did 3x better than usual. Turn it into a series?",
  Meta: "The reel did 3x better than usual. Turn it into a series?",
  TikTok: "TikTok is growing fastest. Worth a second video per week?",
  YouTube: "Shorts reach more people than long videos. More Shorts from the reel footage?",
  LinkedIn: "Stories from the manufactory do well here. A small series on that?",
};

const socialPlanung: { tag: string; posts: PlanPost[] }[] = [
  { tag: "Mon 27", posts: [{ kanal: "Meta", art: "Reel", titel: "How to use the cream", status: "Geplant" }] },
  { tag: "Tue 28", posts: [{ kanal: "LinkedIn", art: "Post", titel: "A day in the manufactory", status: "Geplant" }] },
  {
    tag: "Wed 29",
    posts: [
      { kanal: "Meta", art: "Post", titel: "Ingredient calendula", status: "Vorschlag" },
      { kanal: "TikTok", art: "Video", titel: "Calendula in 15 sec", status: "Vorschlag" },
    ],
  },
  { tag: "Thu 30", posts: [{ kanal: "Meta", art: "Story", titel: "Inside the manufactory", status: "Geplant" }] },
  {
    tag: "Fri 31",
    posts: [
      { kanal: "Meta", art: "Post", titel: "Gift set giveaway", status: "Vorschlag" },
      { kanal: "YouTube", art: "Short", titel: "Unboxing the gift set", status: "Geplant" },
    ],
  },
  { tag: "Sat 1", posts: [{ kanal: "TikTok", art: "Video", titel: "Weekend routine", status: "Geplant" }] },
  { tag: "Sun 2", posts: [{ kanal: "Meta", art: "Story", titel: "Sunday ritual", status: "Vorschlag" }] },
];

const suchIndex: Treffer[] = [
  { bereich: "Archive", titel: "Logo white.svg", meta: "CI / Logo · Vector", typ: "File", href: "/archive/ci", stichworte: "logo white svg vector ci" },
  { bereich: "Archive", titel: "Logo white square.png", meta: "CI / Logo · 1080 × 1080 px", typ: "File", href: "/archive/ci", stichworte: "logo white png square instagram profile picture ci" },
  { bereich: "Archive", titel: "Logo white with claim.png", meta: "CI / Logo · 2400 × 800 px", typ: "File", href: "/archive/ci", stichworte: "logo white png claim ci" },
  { bereich: "Archive", titel: "Brand Guide.pdf", meta: "CI · 32 pages", typ: "File", href: "/archive/ci", stichworte: "brand guide ci colours colors fonts" },
  { bereich: "Archive", titel: "Key Visual Calendula.jpg", meta: "Campaigns / Calendula 2026", typ: "File", href: "/archive/kampagnen", stichworte: "key visual calendula cream campaign image" },
  { bereich: "Archive", titel: "Cream jar cut out.png", meta: "Images / Product shots", typ: "File", href: "/archive/bilder", stichworte: "cream jar cut out png product shot" },
  { bereich: "Archive", titel: "Calendula Cream.jpg", meta: "Images / Product shots", typ: "File", href: "/archive/bilder", stichworte: "calendula cream product shot image" },
  { bereich: "Archive", titel: "Reel Herb Garden.mp4", meta: "Videos / Reels", typ: "File", href: "/archive/videos", stichworte: "reel herb garden video" },
  { bereich: "Projects", titel: "Social spot 15 sec", meta: "Calendula 2026 · logo in the end card · review open", typ: "Asset", href: "/projects", stichworte: "social spot video logo calendula cream reel instagram" },
  { bereich: "Projects", titel: "Campaign image “Bloom”", meta: "Calendula 2026 · review open", typ: "Asset", href: "/projects/review/bluetezeit", stichworte: "campaign image bloom calendula cream post" },
  { bereich: "Projects", titel: "Briefing Rose Face Oil", meta: "3 open questions", typ: "Briefing", href: "/projects/briefing", stichworte: "briefing rose face oil launch" },
  { bereich: "Studio", titel: "AI Format Adapter", meta: "One visual, every format: feed, story, profile picture", typ: "Studio", href: "/studio", stichworte: "format adapter instagram profile picture story feed logo crop" },
  { bereich: "Studio", titel: "AI Brand Writer", meta: "Copy for every channel, in your brand voice", typ: "Studio", href: "/studio/markentexter", stichworte: "brand writer copy text post cream instagram newsletter" },
];

const projekte: Projekt[] = [
  { slug: "ringelblume-2026", name: "Calendula 2026", art: "Campaign", text: "Launch of the Calendula Cream: social, poster, drugstore.", zeitraum: "Oct to Dec 2026", status: "Feedback offen" },
  { slug: "geschenksets", name: "Gift Sets", art: "Campaign", text: "Holiday season: newsletter and story series.", zeitraum: "Nov to Dec 2026", status: "Feedback offen" },
  {
    slug: "rosen-gesichtsoel",
    name: "Rose Face Oil",
    art: "Launch",
    text: "New Rose Face Oil, launching in spring.",
    zeitraum: "Spring 2027",
    status: "In Arbeit",
    briefing: { text: "Briefing in progress, 3 open questions", offen: 3 },
  },
  { slug: "jahresplanung", name: "Annual Planning", art: "Strategy", text: "Brand presence and campaign plan for 2027.", zeitraum: "2027", status: "Abgeschlossen" },
];

const projektVonName = (name: string) => projekte.find((p) => p.name === name);

export const en: typeof de = {
  kunde,
  offeneAufgaben,
  bereiche,
  ordner,
  zuletztHinzugefuegt,
  bilderUnterordner,
  bilder,
  markenwissen,
  aktiveTools,
  weitereTools,
  markentexterVarianten,
  assets,
  praesentationen,
  kanaele,
  kanalInfo,
  kennzahlenJeKanal,
  reichweiteJeKanal,
  topPostsJeKanal,
  topHinweisJeKanal,
  socialPlanung,
  suchIndex,
  projekte,
  projektVonName,
};
