"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { SearchIcon } from "./Icons";
import { useSprache } from "./Sprache";

export function AreaNav() {
  const { t } = useSprache();
  const items = [
    { href: "/archive", label: "Archive", tip: t("Kampagnen, Assets und CI", "Campaigns, assets and CI") },
    { href: "/studio", label: "Studio", tip: t("Eure KI-Tools", "Your AI tools") },
    { href: "/projects", label: "Projects", tip: t("Laufende Projekte und Reviews", "Ongoing projects and reviews"), badge: 2 },
    { href: "/live", label: "Live", tip: t("Performance und Social-Planung", "Performance and social planning"), badge: 1 },
  ];
  const pathname = usePathname();
  const router = useRouter();
  const [q, setQ] = useState("");

  return (
    <nav className="areanav" aria-label={t("Bereiche", "Areas")}>
      <div className="areanav-items">
        <Link href="/" className="areanav-home">← Start</Link>
        <span className="areanav-sep" />
        {items.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`areanav-item${active ? " is-active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
              {item.badge ? <span className="badge">{item.badge}</span> : null}
              <span className="tip" role="tooltip">{item.tip}</span>
            </Link>
          );
        })}
      </div>
      <form
        className="search search-nav areanav-search"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (q.trim()) router.push(`/suche?q=${encodeURIComponent(q.trim())}`);
        }}
      >
        <SearchIcon />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("Überall suchen oder fragen …", "Search or ask anything …")}
          aria-label={t("Überall suchen oder fragen", "Search or ask anything")}
        />
      </form>
    </nav>
  );
}
