import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import { StartSearch } from "@/components/StartSearch";
import { KontaktButtons } from "@/components/KontaktButtons";
import { getSprache } from "@/lib/sprache-server";

export default async function Start() {
  const { t, d } = await getSprache();
  const { ansprechperson, nutzer } = d.kunde;
  return (
    <main className="page">
      <div className="page-inner start">
        <div>
          <h1 className="h1 start-title">
            {t("Moin", "Hi")} {nutzer.vorname}.<br />{t("Was brauchst du heute?", "What do you need today?")}
          </h1>
          <p className="sub" style={{ fontSize: 18, marginTop: 24 }}>
            {t("Such etwas, frag etwas oder spring direkt in einen Bereich.", "Search, ask, or jump straight into an area.")}
          </p>
        </div>

        <StartSearch />

        <section className="stack gap-16" style={{ alignItems: "center" }} aria-labelledby="ansteht">
          <h2 id="ansteht" className="label">{t("Was ansteht", "Coming up")}</h2>
          <div className="ansteht">
            {d.offeneAufgaben.map((a) => (
              <Link key={a.text} href={a.href} className={`ansteht-chip${a.wichtig ? " is-wichtig" : ""}`}>
                <span className="dot" />
                {a.text} →
              </Link>
            ))}
          </div>
        </section>

        <div className="tiles">
          {d.bereiche.map((b) => (
            <Link key={b.href} href={b.href} className="tile">
              <span className="circle"><ArrowRight /></span>
              <span className="tile-title">{b.titel}</span>
              <span className="tile-text">{b.text}</span>
            </Link>
          ))}
        </div>

        <div id="kontakt" className="kontakt-card">
          <span className="avatar avatar-blue">{ansprechperson.initialen}</span>
          <div className="stack" style={{ marginRight: 24 }}>
            <span className="bold small" style={{ color: "var(--white)" }}>
              {ansprechperson.name} · {ansprechperson.rolle}
            </span>
            <span className="small muted">{t("Fragen, Ideen, Feedback? Ich bin für dich da.", "Questions, ideas, feedback? I'm here for you.")}</span>
          </div>
          <KontaktButtons />
        </div>
      </div>
    </main>
  );
}
