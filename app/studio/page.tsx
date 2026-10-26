import { Shell } from "@/components/Shell";
import { markenwissen } from "@/lib/data";
import { StudioTools } from "./StudioTools";

export default function Studio() {
  return (
    <Shell>
      <div>
        <h1 className="h1">Studio</h1>
        <p className="sub">Eure KI-Tools, trainiert auf eure Marke. Gebaut von KURIOS.</p>
      </div>

      <div className="card wissen-bar">
        <span className="bold small" style={{ color: "var(--white)" }}>Alle Tools kennen WILDBLATT:</span>
        {markenwissen.map((m) => (
          <span key={m} className="tag tag-fill"><span className="check">✓</span>{m}</span>
        ))}
        <span className="muted">automatisch aus dem Archive</span>
      </div>

      <StudioTools />
    </Shell>
  );
}
