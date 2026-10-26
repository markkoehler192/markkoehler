import { Shell } from "@/components/Shell";
import { getSprache } from "@/lib/sprache-server";
import { ZustaendeDemo } from "./ZustaendeDemo";

// Übersicht aller Zustände (Figma "7 · Zustände"), zum Abstimmen. Nicht in der Navigation.
export default async function Zustaende() {
  const { t } = await getSprache();
  return (
    <Shell>
      <div>
        <h1 className="h1">{t("Zustände", "States")}</h1>
        <p className="sub">{t("Was der Kunde nach einer Aktion, bei leeren Seiten, beim Warten und bei Fehlern sieht.", "What clients see after an action, on empty pages, while waiting and on errors.")}</p>
      </div>
      <ZustaendeDemo />
    </Shell>
  );
}
