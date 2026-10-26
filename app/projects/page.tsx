import Link from "next/link";
import { Suspense } from "react";
import { Shell } from "@/components/Shell";
import { ProjektUebersicht } from "./ProjektUebersicht";

export default function Projects() {
  return (
    <Shell>
      <div className="head-row">
        <div>
          <h1 className="h1">Projects</h1>
          <p className="sub">Eure Projekte mit KURIOS. Wähl ein Projekt, um Assets und Präsentationen zu sehen und Feedback zu geben.</p>
        </div>
        <Link href="/projects/briefing" className="btn btn-primary">+ Neues Briefing</Link>
      </div>
      <Suspense>
        <ProjektUebersicht />
      </Suspense>
    </Shell>
  );
}
