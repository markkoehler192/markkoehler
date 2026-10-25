import Link from "next/link";
import { notFound } from "next/navigation";
import { Shell } from "@/components/Shell";
import { assets } from "@/lib/data";
import { Review } from "./Review";

export function generateStaticParams() {
  return assets.map((a) => ({ slug: a.slug }));
}

export default async function ReviewSeite({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = assets.find((x) => x.slug === slug);
  if (!a) notFound();
  const version = a.meta.split(" · ").pop();
  return (
    <Shell>
      <div className="stack gap-12">
        <Link href="/projects" className="back">← Projects</Link>
        <h1 className="h1">{a.titel}</h1>
        <p className="sub" style={{ marginTop: 0 }}>
          {a.projekt} · {a.meta.split(" · ").slice(0, 2).join(" ")} · {version?.replace("V", "Version ")} ·{" "}
          <span style={{ color: "var(--white)", fontWeight: 800 }}>bitte {a.frist} freigeben</span>
        </p>
      </div>
      <Review asset={a} />
    </Shell>
  );
}
