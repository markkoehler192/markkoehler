"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, type ReactNode } from "react";
import { datenFuer, SPRACH_COOKIE, uebersetzer, wortFuer, type Sprache } from "@/lib/sprache";

const SprachContext = createContext<Sprache>("de");

export function SpracheProvider({ sprache, children }: { sprache: Sprache; children: ReactNode }) {
  return <SprachContext.Provider value={sprache}>{children}</SprachContext.Provider>;
}

// Für Client-Komponenten: t("Deutsch", "English"), w(Statuswort), d = Daten in der gewählten Sprache.
export function useSprache() {
  const s = useContext(SprachContext);
  const router = useRouter();
  const setzen = (neu: Sprache) => {
    document.cookie = `${SPRACH_COOKIE}=${neu}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  };
  return { s, t: uebersetzer(s), w: wortFuer(s), d: datenFuer(s), setzen };
}
