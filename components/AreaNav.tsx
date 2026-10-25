"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { SearchIcon } from "./Icons";

const items = [
  { href: "/archive", label: "Archive", tip: "Kampagnen, Assets und CI" },
  { href: "/studio", label: "Studio", tip: "Eure KI-Tools" },
  { href: "/projects", label: "Projects", tip: "Laufende Projekte und Reviews", badge: 2 },
  { href: "/live", label: "Live", tip: "Performance und Social-Planung", badge: 1 },
];

export function AreaNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [q, setQ] = useState("");

  return (
    <nav className="areanav" aria-label="Bereiche">
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
          placeholder="Überall suchen oder fragen …"
          aria-label="Überall suchen oder fragen"
        />
      </form>
    </nav>
  );
}
