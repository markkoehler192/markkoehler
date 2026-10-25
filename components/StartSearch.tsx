"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "./Icons";

export function StartSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
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
        placeholder="Suchen oder fragen, z. B. „Logo als PNG“"
        aria-label="Suchen oder fragen"
      />
      <button className="circle" type="submit" aria-label="Suchen">
        <ArrowRight />
      </button>
    </form>
  );
}
