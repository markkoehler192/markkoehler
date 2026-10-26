import Link from "next/link";
import { Shell } from "@/components/Shell";
import { BrandBilder } from "./BrandBilder";
import "./brand-bilder.css";

export default function BrandBilderSeite() {
  return (
    <Shell>
      <div className="stack gap-12">
        <Link href="/studio" className="back">← Studio</Link>
        <h1 className="h1">KI-Brand-Bilder</h1>
        <div className="row wrap gap-8">
          <span className="sub" style={{ margin: 0 }}>Bilder im Look eurer Marke. Nutzt:</span>
          {["CI", "Bilder", "Produktinfos"].map((m) => (
            <span key={m} className="tag tag-fill"><span className="check">✓</span>{m}</span>
          ))}
        </div>
      </div>
      <BrandBilder />
    </Shell>
  );
}
