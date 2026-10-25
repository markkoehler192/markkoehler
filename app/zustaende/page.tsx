import { Shell } from "@/components/Shell";
import { ZustaendeDemo } from "./ZustaendeDemo";

// Übersicht aller Zustände (Figma "7 · Zustände"), zum Abstimmen. Nicht in der Navigation.
export default function Zustaende() {
  return (
    <Shell>
      <div>
        <h1 className="h1">Zustände</h1>
        <p className="sub">Was der Kunde nach einer Aktion, bei leeren Seiten, beim Warten und bei Fehlern sieht.</p>
      </div>
      <ZustaendeDemo />
    </Shell>
  );
}
