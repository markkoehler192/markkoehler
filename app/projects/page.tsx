import Link from "next/link";
import { Suspense } from "react";
import { Shell } from "@/components/Shell";
import { getSprache } from "@/lib/sprache-server";
import { ProjektUebersicht } from "./ProjektUebersicht";

export default async function Projects() {
  const { t } = await getSprache();
  return (
    <Shell>
      <div className="head-row">
        <div>
          <h1 className="h1">Projects</h1>
          <p className="sub">{t("Eure Projekte mit KURIOS. Wähl ein Projekt, um Assets und Präsentationen zu sehen und Feedback zu geben.", "Your projects with KURIOS. Pick a project to see assets and presentations and give feedback.")}</p>
        </div>
        <Link href="/projects/briefing" className="btn btn-primary">{t("+ Neues Briefing", "+ New briefing")}</Link>
      </div>
      <Suspense>
        <ProjektUebersicht />
      </Suspense>
    </Shell>
  );
}
