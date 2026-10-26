import { ArchiveSearch } from "@/components/ArchiveSearch";
import { Shell } from "@/components/Shell";
import { ArchiveInhalt } from "./ArchiveInhalt";

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
      <ArchiveInhalt />
    </Shell>
  );
}
