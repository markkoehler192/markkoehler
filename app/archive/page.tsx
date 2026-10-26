import { ArchiveSearch } from "@/components/ArchiveSearch";
import { Shell } from "@/components/Shell";
import { getSprache } from "@/lib/sprache-server";
import { ArchiveInhalt } from "./ArchiveInhalt";

export default async function Archive() {
  const { t } = await getSprache();
  return (
    <Shell>
      <div className="head-row">
        <div>
          <h1 className="h1">Archive</h1>
          <p className="sub">{t("Alles, was wir für euch gemacht haben, sauber sortiert.", "Everything we have made for you, neatly sorted.")}</p>
        </div>
        <ArchiveSearch placeholder={t("Im Archive suchen …", "Search the archive …")} />
      </div>
      <ArchiveInhalt />
    </Shell>
  );
}
