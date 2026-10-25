import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import { StartSearch } from "@/components/StartSearch";
import { KontaktButtons } from "@/components/KontaktButtons";
import { bereiche, kunde, offeneAufgaben } from "@/lib/data";

export default function Start() {
  const { ansprechperson, nutzer } = kunde;
  return (
    <main className="page">
      <div className="page-inner start">
        <div>
          <h1 className="h1 start-title">
            Moin {nutzer.vorname}.<br />Was brauchst du heute?
          </h1>
          <p className="sub" style={{ fontSize: 18, marginTop: 24 }}>
            Such etwas, frag etwas oder spring direkt in einen Bereich.
          </p>
        </div>

        <StartSearch />

        <section className="stack gap-16" style={{ alignItems: "center" }} aria-labelledby="ansteht">
          <h2 id="ansteht" className="label">Was ansteht</h2>
          <div className="ansteht">
            {offeneAufgaben.map((a) => (
              <Link key={a.text} href={a.href} className={`ansteht-chip${a.wichtig ? " is-wichtig" : ""}`}>
                <span className="dot" />
                {a.text} →
              </Link>
            ))}
          </div>
        </section>

        <div className="tiles">
          {bereiche.map((b) => (
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
            <span className="small muted">Fragen, Ideen, Feedback? Ich bin für dich da.</span>
          </div>
          <KontaktButtons />
        </div>
      </div>
    </main>
  );
}
