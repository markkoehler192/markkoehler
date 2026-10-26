import Link from "next/link";
import { notFound } from "next/navigation";
import { Shell } from "@/components/Shell";
import { EmptyState } from "@/components/States";
import { ordner } from "@/lib/data";
import { getSprache } from "@/lib/sprache-server";
import { BilderOrdner } from "./BilderOrdner";

export function generateStaticParams() {
  return ordner.map((o) => ({ ordner: o.slug }));
}

export default async function Ordner({ params }: { params: Promise<{ ordner: string }> }) {
  const { ordner: slug } = await params;
  const { t, d } = await getSprache();
  const o = d.ordner.find((x) => x.slug === slug);
  if (!o) notFound();

  return (
    <Shell>
      {slug === "bilder" ? (
        <BilderOrdner />
      ) : (
        <>
          <div className="stack gap-12">
            <Link href="/archive" className="back">← Archive</Link>
            <h1 className="h1">{o.name}</h1>
            <p className="sub" style={{ marginTop: 0 }}>{o.anzahl} · {o.text}</p>
          </div>
          {/* Im Prototyp ist nur der Ordner Bilder gefüllt. Später kommen die Inhalte aus OneDrive/SharePoint. */}
          <EmptyState text={t("Sobald wir ein Asset für euch fertig haben, landet es in diesem Ordner.", "As soon as we finish an asset for you, it lands in this folder.")}>
            <Link href="/projects/briefing" className="btn btn-primary">{t("Briefing starten", "Start a briefing")}</Link>
          </EmptyState>
        </>
      )}
    </Shell>
  );
}
