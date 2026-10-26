import Link from "next/link";
import { Shell } from "@/components/Shell";
import { Markentexter } from "./Markentexter";

export default function MarkentexterSeite() {
  return (
    <Shell>
      <div className="stack gap-12">
        <Link href="/studio" className="back">← Studio</Link>
        <h1 className="h1">KI-Markentexter</h1>
        <div className="row wrap gap-8">
          <span className="sub" style={{ margin: 0 }}>Schreibt in eurer Markensprache. Nutzt:</span>
          {["Markensprache", "Produktinfos", "CI"].map((m) => (
            <span key={m} className="tag tag-fill"><span className="check">✓</span>{m}</span>
          ))}
        </div>
      </div>
      <Markentexter />
    </Shell>
  );
}
