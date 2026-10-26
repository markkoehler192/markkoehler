import Link from "next/link";
import { getSprache } from "@/lib/sprache-server";
import { NutzerMenu } from "./NutzerMenu";

export async function TopBar() {
  const { t, d } = await getSprache();
  const { ansprechperson } = d.kunde;
  return (
    <header className="topbar">
      <div className="topbar-kunde">{d.kunde.name}</div>
      <Link href="/" className="topbar-logo" aria-label={t("Zur Startseite", "Go to home")}>
        <img src="/icons/kurios-eyes.png" alt="KURIOS" width={73} height={38} />
      </Link>
      <div className="topbar-right">
        <Link href="/#kontakt" className="kontakt-pill">
          <span className="avatar avatar-blue" style={{ width: 32, height: 32, fontSize: 12 }}>
            {ansprechperson.initialen}
          </span>
          <span className="kontakt-text">{t(`${ansprechperson.vorname} von KURIOS`, `${ansprechperson.vorname} from KURIOS`)}</span>
        </Link>
        <span className="divider-v" />
        <NutzerMenu />
      </div>
    </header>
  );
}
