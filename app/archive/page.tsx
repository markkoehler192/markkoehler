import Link from "next/link";
import { FolderIcon } from "@/components/Icons";
import { Shell } from "@/components/Shell";
import { ArchiveSearch } from "@/components/ArchiveSearch";
import { ordner, zuletztHinzugefuegt } from "@/lib/data";

export default function Archive() {
  return (
    <Shell>
      <div className="head-row">
        <div>
          <h1 className="h1">Archive</h1>
          <p className="sub">Alles, was wir für euch gemacht haben, sauber sortiert.</p>
        </div>
        <ArchiveSearch placeholder="Im Archive suchen …" />
      </div>

      <div className="grid grid-3">
        {ordner.map((o) => (
          <Link key={o.slug} href={`/archive/${o.slug}`} className="card card-link folder">
            <div className="folder-top">
              <FolderIcon />
              <span className="stack" style={{ alignItems: "flex-end", gap: 4 }}>
                <span className="small muted">{o.anzahl}</span>
                {o.neu ? <span className="neu-hinweis">{o.neu} neu</span> : null}
              </span>
            </div>
            <div className="stack gap-8">
              <span className="h3">{o.name}</span>
              <span className="muted">{o.text}</span>
            </div>
          </Link>
        ))}
      </div>

      <section className="stack gap-20">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <h2 className="h2">Zuletzt hinzugefügt</h2>
          <Link href="/archive/bilder" className="label" style={{ color: "var(--white)" }}>Alle anzeigen →</Link>
        </div>
        <div className="grid grid-4">
          {zuletztHinzugefuegt.map((f) => (
            <div key={f.name} className="stack gap-12">
              <div className="ph file-prev" aria-hidden />
              <div className="stack">
                <span className="bold" style={{ color: "var(--white)" }}>{f.name}</span>
                <span className="small muted">{f.ort}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}
