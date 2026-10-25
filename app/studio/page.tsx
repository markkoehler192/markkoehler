import Link from "next/link";
import { ArrowTool } from "@/components/Icons";
import { Shell } from "@/components/Shell";
import { ToolAnfragen } from "@/components/ToolAnfragen";
import { aktiveTools, markenwissen, weitereTools } from "@/lib/data";

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

      <div className="grid grid-4">
        {aktiveTools.map((t) => {
          const inhalt = (
            <>
              <span className="tag" style={{ alignSelf: "flex-start" }}>{t.nutzt}</span>
              <span className="circle"><ArrowTool /></span>
              <div className="stack gap-8">
                <span className="h3">{t.name}</span>
                <span className="muted">{t.text}</span>
              </div>
            </>
          );
          // Im Prototyp ist nur der Markentexter ausgebaut.
          return t.href ? (
            <Link key={t.slug} href={t.href} className="card card-link tool">{inhalt}</Link>
          ) : (
            <ToolAnfragen key={t.slug} tool={t} modus="vorschau">{inhalt}</ToolAnfragen>
          );
        })}
      </div>

      <section className="stack gap-20">
        <h2 className="label">Weitere Tools, die wir für euch bauen können</h2>
        <div className="grid grid-4">
          {weitereTools.map((t) => (
            <div key={t.slug} className="card tool">
              <span className="tag" style={{ alignSelf: "flex-start" }}>auf Anfrage</span>
              <div className="stack gap-8">
                <span className="h3">{t.name}</span>
                <span className="muted">{t.text}</span>
                <ToolAnfragen tool={t} modus="anfrage" />
              </div>
            </div>
          ))}
          <ToolAnfragen modus="neu" />
        </div>
      </section>
    </Shell>
  );
}
