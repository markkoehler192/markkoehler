import Link from "next/link";
import { KontaktButtons } from "@/components/KontaktButtons";
import { Shell } from "@/components/Shell";
import { getSprache } from "@/lib/sprache-server";
import { KontoAktionen } from "./KontoAktionen";

export default async function Konto() {
  const { t, d } = await getSprache();
  const { nutzer, ansprechperson, team } = d.kunde;
  return (
    <Shell>
      <div className="stack gap-12">
        <Link href="/" className="back">← Start</Link>
        <h1 className="h1">{t("Account", "Account")}</h1>
        <p className="sub" style={{ marginTop: 0 }}>{t("Deine Daten und wer bei euch Zugang hat.", "Your details and who on your team has access.")}</p>
      </div>

      <div className="konto-layout">
        <section className="card card-pad stack gap-20">
          <div className="row gap-16">
            <span className="avatar avatar-user" style={{ width: 64, height: 64, fontSize: 20 }}>{nutzer.initialen}</span>
            <div className="stack" style={{ gap: 4 }}>
              <span className="h3">{nutzer.vorname} {nutzer.nachname}</span>
              <span className="muted">{nutzer.rolle} · {d.kunde.name}</span>
            </div>
          </div>
          <dl className="konto-daten">
            <dt>{t("Name", "Name")}</dt>
            <dd>{nutzer.vorname} {nutzer.nachname}</dd>
            <dt>{t("E-Mail", "Email")}</dt>
            <dd>{nutzer.email}</dd>
            <dt>{t("Firma", "Company")}</dt>
            <dd>{d.kunde.name}</dd>
            <dt>{t("Rolle", "Role")}</dt>
            <dd>{nutzer.rolle}</dd>
          </dl>
          <KontoAktionen />
        </section>

        <div className="stack gap-20">
          <section className="card card-pad stack gap-16">
            <h2 className="label">{t("Team bei", "Team at")} {d.kunde.name.split(" ")[0]}</h2>
            <div className="stack">
              {team.map((m) => (
                <div key={m.name} className="team-zeile">
                  <span className="avatar" style={{ width: 32, height: 32, fontSize: 12, background: "var(--line)", flex: "none" }}>
                    {m.name.split(" ").map((x) => x[0]).join("")}
                  </span>
                  <span className="stack">
                    <span className="bold small" style={{ color: "var(--white)" }}>{m.name}</span>
                    <span className="small muted">{m.rolle}</span>
                  </span>
                  <span className="small muted" style={{ textAlign: "right" }}>{m.rechte}</span>
                </div>
              ))}
            </div>
            <span className="small muted">{t("Neue Leute oder andere Rechte? Lena richtet das für euch ein.", "New people or different access? Lena sets it up for you.")}</span>
          </section>

          <section className="card card-pad stack gap-16">
            <h2 className="label">{t("Deine Ansprechperson", "Your contact")}</h2>
            <div className="row gap-16 wrap">
              <span className="avatar avatar-blue" style={{ width: 44, height: 44, fontSize: 13, flex: "none" }}>{ansprechperson.initialen}</span>
              <span className="stack" style={{ flex: 1 }}>
                <span className="bold small" style={{ color: "var(--white)" }}>{ansprechperson.name}</span>
                <span className="small muted">{ansprechperson.rolle}</span>
              </span>
              <KontaktButtons />
            </div>
          </section>
        </div>
      </div>
    </Shell>
  );
}
