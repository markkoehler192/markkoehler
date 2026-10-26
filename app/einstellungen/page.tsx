import Link from "next/link";
import { Shell } from "@/components/Shell";
import { getSprache } from "@/lib/sprache-server";
import { Einstellungen } from "./Einstellungen";

export default async function EinstellungenSeite() {
  const { t } = await getSprache();
  return (
    <Shell>
      <div className="stack gap-12">
        <Link href="/" className="back">← Start</Link>
        <h1 className="h1">{t("Einstellungen", "Settings")}</h1>
        <p className="sub" style={{ marginTop: 0 }}>{t("Sprache, Benachrichtigungen und Ansicht.", "Language, notifications and view.")}</p>
      </div>
      <Einstellungen />
    </Shell>
  );
}
