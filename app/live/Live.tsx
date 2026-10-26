"use client";

import { useState } from "react";
import { Chips } from "@/components/Chips";
import { KanalLogo } from "@/components/KanalLogo";
import { useSprache } from "@/components/Sprache";
import { useToast } from "@/components/Toast";
import type { Kanal } from "@/lib/data";

const zeitraeume = ["7 Tage", "30 Tage", "Kampagne"] as const;

function Info({ text }: { text: string }) {
  const [offen, setOffen] = useState(false);
  const { t } = useSprache();
  return (
    <span className="info">
      <button className="info-btn" aria-label={t("Was heißt das?", "What does this mean?")} aria-expanded={offen} onClick={() => setOffen(!offen)} onBlur={() => setOffen(false)}>i</button>
      {offen ? <span className="info-pop" role="tooltip">{text}</span> : null}
    </span>
  );
}

export function Live() {
  const toast = useToast();
  const { t, w, d } = useSprache();
  const { kanaele, kanalInfo, kennzahlenJeKanal, reichweiteJeKanal, socialPlanung, topHinweisJeKanal, topPostsJeKanal } = d;
  const [zeitraum, setZeitraum] = useState<(typeof zeitraeume)[number]>("30 Tage");
  const [kanal, setKanal] = useState<Kanal>("Alle");
  const [plan, setPlan] = useState(socialPlanung);

  const kennzahlen = kennzahlenJeKanal[kanal];
  const wochen = reichweiteJeKanal[kanal];
  const max = Math.max(...wochen.map((w) => w.wert));
  const top = wochen.find((w) => w.wert === max)!;
  const wochenwert = (x: number) => {
    const zahl = x < 10 ? x.toLocaleString(t("de-DE", "en-GB")) : String(Math.round(x));
    return t(`${zahl} Tsd.`, `${zahl}K`);
  };

  const freigeben = (tagIndex: number, titel: string) => {
    setPlan((p) =>
      p.map((t, i) => (i === tagIndex ? { ...t, posts: t.posts.map((x) => (x.titel === titel ? { ...x, status: "Geplant" as const } : x)) } : t)),
    );
    toast({
      titel: t("Post freigegeben", "Post approved"),
      text: t(`„${titel}“ geht am ${plan[tagIndex].tag} raus. Lena kümmert sich um den Rest.`, `“${titel}” goes out on ${plan[tagIndex].tag}. Lena takes care of the rest.`),
    });
  };

  const sichtbar = (k: string) => kanal === "Alle" || k === kanal;

  return (
    <>
      <div className="head-row">
        <div>
          <h1 className="h1">Live</h1>
          <p className="sub">{t("Was gerade läuft, wie es ankommt und was als Nächstes kommt.", "What's running, how it's landing and what's coming next.")}</p>
        </div>
        <Chips options={zeitraeume} value={zeitraum} onChange={setZeitraum} label={t("Zeitraum", "Period")} anzeige={w} />
      </div>

      <div className="kanal-leiste">
        <span className="label">Channel</span>
        <div className="row wrap gap-8" role="radiogroup" aria-label={t("Channel", "Channel")}>
          {kanaele.map((k) => (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={k === kanal}
              className={`pill${k === kanal ? " is-selected" : ""}`}
              onClick={() => setKanal(k)}
            >
              <KanalLogo kanal={k} />
              {w(k)}
            </button>
          ))}
        </div>
        {kanal === "Alle" || kanalInfo[kanal] !== kanal ? (
          <span className="small muted">{kanal === "Alle" ? t("Alle Channels zusammen", "All channels combined") : kanalInfo[kanal]}</span>
        ) : null}
      </div>

      <div className="grid grid-4">
        {kennzahlen.map((k) => (
          <div key={k.titel} className="card kpi">
            <div className="kpi-head">
              <span>{k.titel}</span>
              <Info text={k.info} />
            </div>
            <span className="kpi-wert">{k.wert}</span>
            <span className={`kpi-delta${k.delta.startsWith("−") ? " is-minus" : ""}`}>{k.delta}</span>
          </div>
        ))}
      </div>

      <div className="live-layout">
        <div className="card card-pad">
          <h2 className="h3" style={{ fontSize: 18 }}>
            {t("Wie viele Leute euch gesehen haben, pro Woche", "How many people saw you, per week")}{kanal === "Alle" ? "" : ` · ${kanal}`}
          </h2>
          <div className="chart" role="img" aria-label={t(`Balkendiagramm: Reichweite pro Woche, höchster Wert in KW ${top.kw} mit ${top.wert} Tausend`, `Bar chart: reach per week, highest in week ${top.kw} with ${top.wert} thousand`)}>
            {wochen.map((x) => (
              <div key={x.kw} className={`chart-bar${x.kw === top.kw ? " is-top" : ""}`} style={{ height: `${(x.wert / max) * 100}%` }}>
                <span className="chart-val">{wochenwert(x.wert)}</span>
              </div>
            ))}
          </div>
          <div className="chart-x" aria-hidden>
            {wochen.map((x, i) => <span key={x.kw}>{i === 0 ? `${t("KW", "CW")} ${x.kw}` : x.kw}</span>)}
          </div>
          <p className="small muted" style={{ margin: "24px 0 0" }}>
            {t(
              `Höchster Wert in KW ${top.kw}: Launch der Ringelblumen-Creme am 14.10. mit ${wochenwert(top.wert)} Leuten.`,
              `Highest in week ${top.kw}: launch of the Calendula Cream on Oct 14 with ${wochenwert(top.wert)} people.`,
            )}
          </p>
        </div>

        <div className="card card-pad stack gap-16">
          <h2 className="h3" style={{ fontSize: 18 }}>{t("Das lief am besten", "What worked best")}</h2>
          {topPostsJeKanal[kanal].map((p) => (
            <div key={p.titel} className="top-post">
              <span className="top-thumb top-thumb-logo"><KanalLogo kanal={p.kanal} size={18} /></span>
              <span className="stack" style={{ gap: 2 }}>
                <span className="bold small" style={{ color: "var(--white)" }}>{p.titel}</span>
                <span className="small muted">{p.wert}</span>
                <button
                  className="link-lime"
                  style={{ textAlign: "left" }}
                  onClick={() =>
                    toast({
                      titel: t("Briefing vorbereitet", "Briefing prepared"),
                      text: t(`Der Briefing-Agent startet mit „Mehr wie ${p.titel}“.`, `The briefing agent starts with “More like ${p.titel}”.`),
                      aktion: { label: t("Zum Briefing →", "Go to briefing →"), href: "/projects/briefing" },
                    })
                  }
                >
                  {t("Mehr davon briefen →", "Brief more of this →")}
                </button>
              </span>
            </div>
          ))}
          <div className="hint-box">{topHinweisJeKanal[kanal]}</div>
        </div>
      </div>

      <section id="planung" className="card card-pad stack gap-20">
        <div className="row wrap gap-16" style={{ justifyContent: "space-between" }}>
          <div className="stack gap-8">
            <h2 className="h3" style={{ fontSize: 18 }}>{t("Social-Planung · KW 44", "Social planning · Week 44")}{kanal === "Alle" ? "" : ` · ${kanal}`}</h2>
            <span className="small muted">{t("Der Social-Planer schlägt Posts vor, ihr gebt frei.", "The social planner suggests posts, you approve them.")}</span>
          </div>
          <button
            className="btn btn-primary"
            onClick={() =>
              toast({
                titel: t("Post-Wunsch gesendet", "Post request sent"),
                text: t(
                  `Der Social-Planer macht einen Vorschlag${kanal === "Alle" ? "" : ` für ${kanal}`}, Lena prüft ihn.`,
                  `The social planner will make a suggestion${kanal === "Alle" ? "" : ` for ${kanal}`}, Lena will check it.`,
                ),
              })
            }
          >
            {t("+ Post planen", "+ Plan a post")}
          </button>
        </div>
        <div className="week">
          {plan.map((d, i) => (
            <div key={d.tag} className="day">
              <span className="day-name">{d.tag}</span>
              {d.posts.filter((x) => sichtbar(x.kanal)).map((x) => (
                <div key={x.titel} className={`plan ${x.status === "Geplant" ? "is-geplant" : "is-vorschlag"}`}>
                  <span className="plan-art"><KanalLogo kanal={x.kanal} size={12} />{x.art} · {w(x.status)}</span>
                  <span className="plan-titel">{x.titel}</span>
                  {x.status === "Vorschlag" ? <button onClick={() => freigeben(i, x.titel)}>{t("Freigeben", "Approve")}</button> : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
