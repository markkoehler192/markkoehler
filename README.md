# KURIOS KI · Kundenoberfläche

Klickbarer Prototyp der Kundenoberfläche, nachgebaut aus der Figma-Skizze
[„Kunde · Skizze“](https://www.figma.com/design/3PjMPLy1GKVkfRtRWMskTG/261024_KURIOS_KI?node-id=17-313).
Alle Inhalte sind statische Beispieldaten für den Kunden **WILDBLATT Naturkosmetik**
(`lib/data.ts`). Login, Datenbank und KI-Anbindung kommen in den nächsten Schritten.

## Starten

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Produktions-Build
```

Next.js 15 (App Router), TypeScript, eigenes CSS ohne UI-Bibliothek (`app/globals.css`).

## Seiten

| Route | Screen in Figma |
| --- | --- |
| `/` | 1 · Start |
| `/suche?q=Logo weiß für Instagram` | 1a · Start / Suchergebnis |
| `/archive` | 3 · Archive |
| `/archive/bilder` | 3a · Archive / Bilder (andere Ordner zeigen den Leer-Zustand) |
| `/studio` | 4 · Studio |
| `/studio/markentexter` | 2 · Studio / Markentexter |
| `/projects` | 5 · Projects |
| `/projects/review/bluetezeit` | 5a · Projects / Review |
| `/projects/briefing` | 5b · Projects / Neues Briefing |
| `/live` | 6 · Live |
| `/zustaende` | 7 · Zustände (nicht in der Navigation, zum Abstimmen) |

## Was klickbar ist

- Suche auf der Startseite und in der Navigation mit Ergebnisseite (Antwort + Treffer, Lade- und Leer-Zustand)
- Filter in Archive / Bilder, Projects und LIVE; Mehrfachauswahl und „Alle herunterladen“ bei Bildern
- Markentexter: Kanal, Länge, Varianten blättern, Neu erstellen mit Lade-Zustand
  (der zweite Versuch schlägt absichtlich fehl, um den Fehler-Zustand zu zeigen)
- Review: Version wählen, ins Bild klicken für einen Kommentar-Pin, Freigeben / Änderungen anfragen
- Briefing-Agent: Antworten per Vorschlag oder Eingabe, Briefing füllt sich mit, Senden auch mit Lücken
- LIVE: Infos zu den Kennzahlen, Vorschläge im Social-Plan freigeben
- Nach jeder Aktion erscheint eine Bestätigung unten mittig (5 Sekunden)

## Schriften

Haben Grotesk (Extra) und Area Normal (Thin, ExtraBold) sind in `app/globals.css` als
erste Wahl eingetragen. Ist eine Schrift lokal installiert, wird sie genutzt. Sonst greifen
Archivo und Inter von Google Fonts als Ersatz. Sobald die Weblizenzen da sind, die
`.woff2`-Dateien nach `public/fonts/` legen und die `url()`-Zeilen in den `@font-face`-Regeln
einkommentieren.

## Vorschau

Am einfachsten über Vercel: Repository unter vercel.com importieren, Framework „Next.js“
wird erkannt, Region `fra1` (Frankfurt). Danach bekommt jeder Pull Request automatisch
einen eigenen Vorschau-Link.

## Nächste Schritte

1. Login und Rechte (Supabase, Frankfurt)
2. Studio-Tools an die Langdock Agents API anbinden
3. Archive aus OneDrive / SharePoint (Microsoft Graph)
4. Benachrichtigungen per Outlook / Teams
