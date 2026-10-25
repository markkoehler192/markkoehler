import type { ReactNode } from "react";
import { AreaNav } from "./AreaNav";

// Rahmen für alle Unterseiten: Bereichsnavigation + Inhalt.
export function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <AreaNav />
      <main className="page">
        <div className="page-inner">{children}</div>
      </main>
    </>
  );
}
