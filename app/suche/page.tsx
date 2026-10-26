import { Suspense } from "react";
import { SearchResults } from "./SearchResults";

export default function Suche() {
  return (
    <main className="page">
      <div className="page-inner">
        <Suspense>
          <SearchResults />
        </Suspense>
      </div>
    </main>
  );
}
