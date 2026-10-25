import Link from "next/link";
import { Shell } from "@/components/Shell";
import { Briefing } from "./Briefing";

export default function BriefingSeite() {
  return (
    <Shell>
      <div className="stack gap-12">
        <Link href="/projects" className="back">← Projects</Link>
        <h1 className="h1">Neues Briefing</h1>
        <p className="sub" style={{ marginTop: 0 }}>Der Briefing-Agent fragt nach, bis alles klar ist. Danach geht es direkt an KURIOS.</p>
      </div>
      <Briefing />
    </Shell>
  );
}
