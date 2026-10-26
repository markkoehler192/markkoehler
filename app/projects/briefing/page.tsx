import Link from "next/link";
import { Shell } from "@/components/Shell";
import { getSprache } from "@/lib/sprache-server";
import { Briefing } from "./Briefing";

export default async function BriefingSeite() {
  const { s, t } = await getSprache();
  return (
    <Shell>
      <div className="stack gap-12">
        <Link href="/projects" className="back">← Projects</Link>
        <h1 className="h1">{t("Neues Briefing", "New briefing")}</h1>
        <p className="sub" style={{ marginTop: 0 }}>{t("Der Briefing-Agent fragt nach, bis alles klar ist. Danach geht es direkt an KURIOS.", "The briefing agent asks questions until everything is clear. Then it goes straight to KURIOS.")}</p>
      </div>
      <Briefing key={s} />
    </Shell>
  );
}
