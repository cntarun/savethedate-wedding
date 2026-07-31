import { useState } from "react";
import { Plane, iconProps } from "./icons.jsx";

/* ============================================================
   RESPONSIVE PHOTO — one <picture> that serves WebP with a JPEG
   fallback, at three widths via srcset, lazy-loaded, with the
   aspect ratio reserved up-front so nothing shifts as it loads.
   Wrapped in a thin gold / ivory matte frame with a soft hover
   shadow, consistent with the rest of the site.

   Files come from the image pipeline (`npm run images`):
     /photos/<base>-480.webp  -800.webp  -1200.webp
     /photos/<base>-480.jpg   -800.jpg   -1200.jpg
   Until those exist, an on-theme placeholder shows instead.
   ============================================================ */

const WIDTHS = [480, 800, 1200];

export default function ResponsivePhoto({
  photo,
  sizes = "(max-width: 640px) 90vw, 45vw",
  className = "",
}) {
  const [failed, setFailed] = useState(false);
  if (!photo) return null;

  const { base, alt, aspect = "3 / 2" } = photo;
  // BASE_URL is "/" in dev and "/savethedate/" in the Pages build, so photo
  // URLs resolve correctly whether served from root or a sub-path.
  const BASE = import.meta.env.BASE_URL;
  const webpSet = WIDTHS.map((w) => `${BASE}photos/${base}-${w}.webp ${w}w`).join(", ");
  const jpgSet = WIDTHS.map((w) => `${BASE}photos/${base}-${w}.jpg ${w}w`).join(", ");

  return (
    <figure
      className={`group relative overflow-hidden rounded-xl border border-marigold/40 bg-ivory p-1.5 shadow-lg transition-shadow duration-300 hover:shadow-[0_16px_38px_-10px_rgba(232,160,32,0.5)] ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {failed ? (
        // Placeholder until the real image is dropped in + processed
        <div
          className="flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed border-teal-deep/20 bg-ivory-dim"
          aria-hidden
        >
          <span className="inline-flex rotate-[-6deg] items-center gap-1.5 rounded border-2 border-maroon/40 px-3 py-1 font-display text-xs font-semibold uppercase tracking-[0.25em] text-maroon/50">
            Photo en route
            <Plane className="h-3.5 w-3.5" {...iconProps} />
          </span>
        </div>
      ) : (
        <picture>
          <source type="image/webp" srcSet={webpSet} sizes={sizes} />
          <source type="image/jpeg" srcSet={jpgSet} sizes={sizes} />
          <img
            src={`${BASE}photos/${base}-800.jpg`}
            alt={alt}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="h-full w-full rounded-lg object-cover"
          />
        </picture>
      )}
    </figure>
  );
}
