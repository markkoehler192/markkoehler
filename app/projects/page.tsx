import { Suspense } from "react";
import { Shell } from "@/components/Shell";
import { ProjectsListe } from "./ProjectsListe";

export default function Projects() {
  return (
    <Shell>
      <div>
        <h1 className="h1">Projects</h1>
        <p className="sub">Laufende Kampagnen-Assets und Präsentationen, die auf euer Feedback warten.</p>
      </div>
      <Suspense>
        <ProjectsListe />
      </Suspense>
    </Shell>
  );
}
