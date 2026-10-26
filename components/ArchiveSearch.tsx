"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SearchIcon } from "./Icons";

// Suchfeld im Seitenkopf. Mit onSearch filtert es die Seite live,
// ohne springt es beim Absenden in die globale Suche.
export function ArchiveSearch({ placeholder, value, onSearch }: { placeholder: string; value?: string; onSearch?: (q: string) => void }) {
  const router = useRouter();
  const [lokal, setLokal] = useState("");
  const q = onSearch ? (value ?? "") : lokal;
  return (
    <form
      className="search search-page"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        if (!onSearch && q.trim()) router.push(`/suche?q=${encodeURIComponent(q.trim())}`);
      }}
    >
      <SearchIcon />
      <input
        value={q}
        placeholder={placeholder}
        aria-label={placeholder.replace(" …", "")}
        onChange={(e) => (onSearch ? onSearch(e.target.value) : setLokal(e.target.value))}
      />
    </form>
  );
}
