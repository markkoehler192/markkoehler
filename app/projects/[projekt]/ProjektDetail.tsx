"use client";

import Link from "next/link";
import { useState } from "react";
import { AnsichtUmschalter, useAnsicht } from "@/components/Ansicht";
import { Chips } from "@/components/Chips";
import { EmptyState } from "@/components/States";
import { assets, praesentationen, projekte } from "@/lib/data";
import { AssetKarte, AssetZeile, PraesentationKarte, PraesentationZeile } from "../Karten";

const filter = ["Alle", "Review offen", "In Arbeit", "Freigegeben"] as const;
type Filter = (typeof filter)[number];

export function ProjektDetail({ slug }: { slug: string }) {
  const p = projekte.find((x) => x.slug === slug)!;
  const [f, setF] = useState<Filter>("Alle");
  const [ansicht, setAnsicht] = useAnsicht();

  const alleAssets = assets.filter((a) => a.projekt === p.name);
  const liste = alleAssets
    .filter((a) => f === "Alle" || a.status === f)
    .sort((a, b) => Number(b.status === "Review offen") - Number(a.status === "Review offen") || a.tageBisFrist - b.tageBisFrist);
  const praes = praesentationen.filter((x) => x.projekt === p.name);

  return (
    <>
      {p.briefing ? (
        <div className="card card-pad row wrap gap-20" style={{ justifyContent: "space-between" }}>
          <div className="stack gap-8">
            <span className="label">Briefing</span>
            <span className="bold" style={{ color: "var(--white)", fontSize: 18 }}>{p.briefing.text}</span>
            <span className="small muted">Der Briefing-Agent fragt nach, was noch fehlt.</span>
          </div>
          <Link href="/projects/briefing" className="btn btn-primary">Briefing fortsetzen →</Link>
        </div>
      ) : null}

      {alleAssets.length ? (
        <section className="stack gap-20">
          <div className="row wrap gap-16" style={{ justifyContent: "space-between" }}>
            <h2 className="label">Assets · {alleAssets.length}</h2>
            <div className="row wrap gap-16">
              <Chips options={filter} value={f} onChange={setF} label="Assets filtern" />
              <AnsichtUmschalter ansicht={ansicht} onChange={setAnsicht} />
            </div>
          </div>
          {liste.length && ansicht === "liste" ? (
            <div className="liste">
              {liste.map((a) => <AssetZeile key={a.slug} a={a} />)}
            </div>
          ) : liste.length ? (
            <div className="grid grid-3">
              {liste.map((a) => <AssetKarte key={a.slug} a={a} />)}
            </div>
          ) : (
            <EmptyState titel="Keine Treffer" text="In diesem Projekt gibt es dazu gerade keine Assets.">
              <button className="btn btn-primary" onClick={() => setF("Alle")}>Alle Assets zeigen</button>
            </EmptyState>
          )}
        </section>
      ) : null}

      {praes.length ? (
        <section className="stack gap-20">
          <div className="row" style={{ justifyContent: "space-between" }}>
            <h2 className="label">Präsentationen · {praes.length}</h2>
            {!alleAssets.length ? <AnsichtUmschalter ansicht={ansicht} onChange={setAnsicht} /> : null}
          </div>
          {ansicht === "liste" ? (
            <div className="liste">
              {praes.map((x) => <PraesentationZeile key={x.titel} p={x} />)}
            </div>
          ) : (
            <div className="grid grid-3">
              {praes.map((x) => <PraesentationKarte key={x.titel} p={x} />)}
            </div>
          )}
        </section>
      ) : null}

      {!alleAssets.length && !praes.length && !p.briefing ? (
        <EmptyState text="Sobald KURIOS hier etwas für euch hat, siehst du es an dieser Stelle.">
          <Link href="/projects/briefing" className="btn btn-primary">Briefing starten</Link>
        </EmptyState>
      ) : null}
    </>
  );
}
