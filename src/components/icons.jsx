/* ============================================================
   ICONS — single source of truth for the site's icon system.
   Base library: lucide-react (thin-line SVG icons).

   Every icon inherits `currentColor`, so tint by setting a text
   color on the parent (e.g. text-marigold / text-teal-deep).
   `iconProps` enforces one consistent stroke width everywhere.
   ============================================================ */

import { Music, Flower2, Volume2, VolumeX, CalendarPlus, ChevronDown, Plane, ArrowUpRight, Sparkle } from "lucide-react";

// Spread onto every icon for one consistent thin stroke. Icons render at
// 14–24px, where strokeWidth 1.5 reads as a uniform ~1.5px line.
export const iconProps = { strokeWidth: 1.5 };

export { Music, Flower2, Volume2, VolumeX, CalendarPlus, ChevronDown, Plane, ArrowUpRight, Sparkle };

/* Wedding "rings" — lucide has no rings/mandap/diya, so this is a custom
   line icon drawn on the same 24×24 grid, fill:none, currentColor stroke,
   round caps, with a non-scaling 1.5px stroke to match the lucide set.
   Two interlocking bands + a small solitaire diamond above. */
export function Rings({ className = "", size, strokeWidth, absoluteStrokeWidth, ...rest }) {
  // `size` / `strokeWidth` / `absoluteStrokeWidth` are lucide-only props — we
  // absorb them here so they don't leak onto the DOM <svg> (we set our own).
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {/* the two interlocking wedding bands */}
      <circle cx="9" cy="15.5" r="5.4" vectorEffect="non-scaling-stroke" />
      <circle cx="15" cy="15.5" r="5.4" vectorEffect="non-scaling-stroke" />
      {/* solitaire diamond above the left band */}
      <path d="M9 4.2 11 6.4 9 9 7 6.4 Z" vectorEffect="non-scaling-stroke" />
      <path d="M7 6.4 H11" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
