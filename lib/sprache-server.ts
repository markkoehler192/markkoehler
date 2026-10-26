import { cookies } from "next/headers";
import { alsSprache, datenFuer, SPRACH_COOKIE, uebersetzer, wortFuer } from "./sprache";

// Für Server-Komponenten: Sprache aus dem Cookie, dazu Übersetzer und Daten.
export async function getSprache() {
  const s = alsSprache((await cookies()).get(SPRACH_COOKIE)?.value);
  return { s, t: uebersetzer(s), w: wortFuer(s), d: datenFuer(s) };
}
