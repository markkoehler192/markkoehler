"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "./Icons";
import { useSprache } from "./Sprache";

export function StartSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const { t } = useSprache();
  return (
    <form
      className="start-search"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        if (q.trim()) router.push(`/suche?q=${encodeURIComponent(q.trim())}`);
      }}
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t("Suchen oder fragen, z. B. „Logo als PNG“", "Search or ask, e.g. “logo as PNG”")}
        aria-label={t("Suchen oder fragen", "Search or ask")}
      />
      <button className="circle" type="submit" aria-label={t("Suchen", "Search")}>
        <ArrowRight />
      </button>
    </form>
  );
}
