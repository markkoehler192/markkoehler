import { Shell } from "@/components/Shell";
import { getSprache } from "@/lib/sprache-server";
import { StudioTools } from "./StudioTools";

export default async function Studio() {
  const { t, d } = await getSprache();
  return (
    <Shell>
      <div>
        <h1 className="h1">Studio</h1>
        <p className="sub">{t("Eure KI-Tools, trainiert auf eure Marke. Gebaut von KURIOS.", "Your AI tools, trained on your brand. Built by KURIOS.")}</p>
      </div>

      <div className="card wissen-bar">
        <span className="bold small" style={{ color: "var(--white)" }}>{t("Alle Tools kennen WILDBLATT:", "All tools know WILDBLATT:")}</span>
        {d.markenwissen.map((m) => (
          <span key={m} className="tag tag-fill"><span className="check">✓</span>{m}</span>
        ))}
        <span className="muted">{t("automatisch aus dem Archive", "automatically from the archive")}</span>
      </div>

      <StudioTools />
    </Shell>
  );
}
