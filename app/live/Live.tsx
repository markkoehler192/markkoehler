"use client";

import { useState } from "react";
import { Chips } from "@/components/Chips";
import { useToast } from "@/components/Toast";
import { kennzahlen, reichweiteProWoche, socialPlanung, topPosts, type PlanPost } from "@/lib/data";

const zeitraeume = ["7 Tage", "30 Tage", "Kampagne"] as const;

function Info({ text }: { text: string }) {
  const [offen, setOffen] = useState(false);
  return (
    <span className="info">
      <button className="info-btn" aria-label="Was heißt das?" aria-expanded={offen} onClick={() => setOffen(!offen)} onBlur={() => setOffen(false)}>i</button>
      {offen ? <span className="info-pop" role="tooltip">{text}</span> : null}
    </span>
  );
}

export function Live() {
  const toast = useToast();
  const [zeitraum, setZeitraum] = useState<(typeof zeitraeume)[number]>("30 Tage");
  const [plan, setPlan] = useState<PlanPost[]>(socialPlanung);
  const max = Math.max(...reichweiteProWoche.map((w) => w.wert));
  const top = reichweiteProWoche.find((w) => w.wert === max)!;

  const freigeben = (i: number) => {
    setPlan((p) => p.map((x, j) => (j === i ? { ...x, status: "Geplant" } : x)));
    toast({ titel: "Post freigegeben", text: `„${plan[i].titel}“ geht am ${plan[i].tag} raus. Lena kümmert sich um den Rest.` });
  };

  return (
    <>
      <div className="head-row">
        <div>
          <h1 className="h1">Live</h1>
          <p className="sub">Was gerade läuft, wie es ankommt und was als Nächstes kommt.</p>
        </div>
        <Chips options={zeitraeume} value={zeitraum} onChange={setZeitraum} label="Zeitraum" />
      </div>

      <div className="grid grid-4">
        {kennzahlen.map((k) => (
          <div key={k.titel} className="card kpi">
            <div className="kpi-head">
              <span>{k.titel}</span>
              <Info text={k.info} />
            </div>
            <span className="kpi-wert">{k.wert}</span>
            <span className="kpi-delta">{k.delta}</span>
          </div>
        ))}
      </div>

      <div className="live-layout">
        <div className="card card-pad">
          <h2 className="h3" style={{ fontSize: 18 }}>Wie viele Leute euch gesehen haben, pro Woche</h2>
          <div className="chart" role="img" aria-label={`Balkendiagramm: Reichweite pro Woche, höchster Wert in KW ${top.kw} mit ${top.wert} Tausend`}>
            {reichweiteProWoche.map((w) => (
              <div key={w.kw} className={`chart-bar${w.kw === top.kw ? " is-top" : ""}`} style={{ height: `${(w.wert / max) * 100}%` }}>
                <span className="chart-val">{w.wert.toLocaleString("de-DE")} Tsd.</span>
              </div>
            ))}
          </div>
          <div className="chart-x" aria-hidden>
            {reichweiteProWoche.map((w, i) => <span key={w.kw}>{i === 0 ? `KW ${w.kw}` : w.kw}</span>)}
          </div>
          <p className="small muted" style={{ margin: "24px 0 0" }}>
            Höchster Wert in KW {top.kw}: Launch der Ringelblumen-Creme am 14.10. mit {top.wert} Tsd. Leuten.
          </p>
        </div>

        <div className="card card-pad stack gap-16">
          <h2 className="h3" style={{ fontSize: 18 }}>Das lief am besten</h2>
          {topPosts.map((p) => (
            <div key={p.titel} className="top-post">
              <span className="top-thumb" />
              <span className="stack" style={{ gap: 2 }}>
                <span className="bold small" style={{ color: "var(--white)" }}>{p.titel}</span>
                <span className="small muted">{p.wert}</span>
                <button
                  className="link-lime"
                  style={{ textAlign: "left" }}
                  onClick={() => toast({ titel: "Briefing vorbereitet", text: `Der Briefing-Agent startet mit „Mehr wie ${p.titel}“.`, aktion: { label: "Zum Briefing →", href: "/projects/briefing" } })}
                >
                  Mehr davon briefen →
                </button>
              </span>
            </div>
          ))}
          <div className="hint-box">Das Reel lief 3x besser als üblich. Daraus eine Serie machen?</div>
        </div>
      </div>

      <section id="planung" className="card card-pad stack gap-20">
        <div className="row wrap gap-16" style={{ justifyContent: "space-between" }}>
          <div className="stack gap-8">
            <h2 className="h3" style={{ fontSize: 18 }}>Social-Planung · KW 44</h2>
            <span className="small muted">Der Social-Planer schlägt Posts vor, ihr gebt frei.</span>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => toast({ titel: "Post-Wunsch gesendet", text: "Der Social-Planer macht einen Vorschlag, Lena prüft ihn." })}
          >
            + Post planen
          </button>
        </div>
        <div className="week">
          {plan.map((d, i) => (
            <div key={d.tag} className="day">
              <span className="day-name">{d.tag}</span>
              {d.titel ? (
                <div className={`plan ${d.status === "Geplant" ? "is-geplant" : "is-vorschlag"}`}>
                  <span className="plan-art">{d.art} · {d.status}</span>
                  <span className="plan-titel">{d.titel}</span>
                  {d.status === "Vorschlag" ? <button onClick={() => freigeben(i)}>Freigeben</button> : null}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
