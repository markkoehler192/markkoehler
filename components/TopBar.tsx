import Link from "next/link";
import { kunde } from "@/lib/data";

export function TopBar() {
  const { ansprechperson, nutzer } = kunde;
  return (
    <header className="topbar">
      <div className="topbar-kunde">{kunde.name}</div>
      <Link href="/" className="topbar-logo" aria-label="Zur Startseite">
        <img src="/icons/kurios-eyes.png" alt="KURIOS" width={73} height={38} />
      </Link>
      <div className="topbar-right">
        <Link href="/#kontakt" className="kontakt-pill">
          <span className="avatar avatar-blue" style={{ width: 32, height: 32, fontSize: 12 }}>
            {ansprechperson.initialen}
          </span>
          <span className="kontakt-text">{ansprechperson.vorname} von KURIOS</span>
        </Link>
        <span className="divider-v" />
        <span className="user-name" style={{ fontSize: 15 }}>{nutzer.vorname}</span>
        <span className="avatar avatar-user">{nutzer.initialen}</span>
      </div>
    </header>
  );
}
