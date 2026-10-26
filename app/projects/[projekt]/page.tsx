import Link from "next/link";
import { notFound } from "next/navigation";
import { Shell } from "@/components/Shell";
import { projekte } from "@/lib/data";
import { getSprache } from "@/lib/sprache-server";
import { ProjektDetail } from "./ProjektDetail";

export function generateStaticParams() {
  return projekte.map((p) => ({ projekt: p.slug }));
}

export default async function ProjektSeite({ params }: { params: Promise<{ projekt: string }> }) {
  const { projekt: slug } = await params;
  const { t, d } = await getSprache();
  const p = d.projekte.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <Shell>
      <div className="stack gap-12">
        <Link href="/projects" className="back">{t("← Alle Projekte", "← All projects")}</Link>
        <h1 className="h1">{p.name}</h1>
        <p className="sub" style={{ marginTop: 0 }}>{p.art} · {p.zeitraum} · {p.text}</p>
      </div>
      <ProjektDetail slug={p.slug} />
    </Shell>
  );
}
