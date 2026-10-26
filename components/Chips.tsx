"use client";

// Einfachauswahl als Pills (Filter, Kanal, Länge, Zeitraum).
export function Chips<T extends string>({
  options,
  value,
  onChange,
  label,
  anzeige,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  label: string;
  anzeige?: (o: T) => string;
}) {
  return (
    <div className="row wrap gap-8" role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          role="radio"
          aria-checked={o === value}
          className={`pill${o === value ? " is-selected" : ""}`}
          onClick={() => onChange(o)}
        >
          {anzeige ? anzeige(o) : o}
        </button>
      ))}
    </div>
  );
}
