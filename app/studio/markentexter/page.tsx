import Link from "next/link";
import { Shell } from "@/components/Shell";
import { getSprache } from "@/lib/sprache-server";
import { Markentexter } from "./Markentexter";

export default async function MarkentexterSeite() {
  const { s, t } = await getSprache();
  return (
    <Shell>
      <div className="stack gap-12">
        <Link href="/studio" className="back">← Studio</Link>
        <h1 className="h1">{t("KI-Markentexter", "AI Brand Writer")}</h1>
        <div className="row wrap gap-8">
          <span className="sub" style={{ margin: 0 }}>{t("Schreibt in eurer Markensprache. Nutzt:", "Writes in your brand voice. Uses:")}</span>
          {[t("Markensprache", "Brand voice"), t("Produktinfos", "Product info"), "CI"].map((m) => (
            <span key={m} className="tag tag-fill"><span className="check">✓</span>{m}</span>
          ))}
        </div>
      </div>
      <Markentexter key={s} />
    </Shell>
  );
}
