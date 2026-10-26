import Link from "next/link";
import { Shell } from "@/components/Shell";
import { getSprache } from "@/lib/sprache-server";
import { BrandBilder } from "./BrandBilder";
import "./brand-bilder.css";

export default async function BrandBilderSeite() {
  const { s, t } = await getSprache();
  return (
    <Shell>
      <div className="stack gap-12">
        <Link href="/studio" className="back">← Studio</Link>
        <h1 className="h1">{t("KI-Brand-Bilder", "AI Brand Images")}</h1>
        <div className="row wrap gap-8">
          <span className="sub" style={{ margin: 0 }}>{t("Bilder im Look eurer Marke. Nutzt:", "Images in your brand's look. Uses:")}</span>
          {["CI", t("Bilder", "Images"), t("Produktinfos", "Product info")].map((m) => (
            <span key={m} className="tag tag-fill"><span className="check">✓</span>{m}</span>
          ))}
        </div>
      </div>
      <BrandBilder key={s} />
    </Shell>
  );
}
