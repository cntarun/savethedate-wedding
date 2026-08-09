import { motion } from "framer-motion";
import { site } from "../config/site.js";
import { Music, Flower2, Rings, iconProps } from "./icons.jsx";

/* ============================================================
   WEDDING WEEKEND — a 3-card itinerary (Sangeet / Haldi / Wedding).
   Cards sit in a row on desktop, stack on mobile, fade/slide in
   staggered on scroll, and lift with a gold glow on hover/tap.
   Content is driven entirely by site.events in config/site.js.
   ============================================================ */

// One refined line icon per ritual (Music = Sangeet, Flower = Haldi,
// custom interlocking Rings = Wedding). All inherit currentColor.
const ICONS = { music: Music, flower: Flower2, rings: Rings };

export default function Itinerary() {
  // Wedding-only variant: a single event reads as one centered card, no
  // "Day 0X" badge and no 3-across grid.
  const single = site.events.length === 1;
  return (
    <section className="relative px-5 py-24 sm:px-8">
      <header className="mx-auto mb-14 max-w-xl text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.4em] text-marigold-light">
          {single ? "Join us as we say I do" : "Three days of celebration"}
        </p>
        <h2 className="font-display text-4xl font-semibold text-ivory sm:text-5xl">
          {single ? "The Celebration" : "The Wedding Weekend"}
        </h2>
      </header>

      <ol
        className={
          single
            ? "mx-auto flex max-w-sm justify-center"
            : "mx-auto grid max-w-5xl gap-6 md:grid-cols-3"
        }
      >
        {site.events.map((ev, i) => (
          <motion.li
            key={ev.id}
            className="group relative flex flex-col items-center rounded-2xl border border-marigold/25 bg-ivory/[0.03] p-7 text-center backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-marigold/60 hover:shadow-[0_18px_40px_-12px_rgba(232,160,32,0.35)]"
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{
              duration: 0.6,
              delay: i * 0.15, // staggered ~150ms per card
              ease: [0.22, 1, 0.36, 1],
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Day badge — hidden for the single-event (wedding-only) variant */}
            {!single && (
              <span className="rounded-full border border-marigold/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-marigold-light">
                Day 0{ev.day}
              </span>
            )}

            {/* Icon in a gold ring — line icon, lifts slightly on card hover */}
            <span className="mt-6 flex h-14 w-14 items-center justify-center rounded-full border border-marigold/40 bg-marigold/10 text-marigold transition-[background-color,transform] duration-300 group-hover:scale-105 group-hover:bg-marigold/20">
              {(() => {
                const EventIcon = ICONS[ev.icon];
                return <EventIcon className="h-6 w-6" {...iconProps} />;
              })()}
            </span>

            {/* Day name + date (small, uppercase) */}
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-ivory/55">
              {ev.dayName} · {ev.date}
            </p>

            {/* Event name (largest, serif) */}
            <h3 className="mt-2 font-display text-3xl font-semibold text-ivory">
              {ev.name}
            </h3>

            {/* Time of day */}
            <p className="mt-1 text-sm font-medium text-marigold-light">{ev.time}</p>

            {/* Gold divider */}
            <span className="my-4 block h-px w-10 bg-marigold/40" aria-hidden />

            {/* Venue (medium weight) */}
            <p className="text-sm font-medium text-ivory/70">{ev.venue}</p>

            {/* Dress code — visually secondary: small maroon pill + muted
                italic one-liner. Grid cards stretch to equal height, so the
                three stay balanced despite differing line lengths. */}
            {ev.dressCode && (
              <div className="mt-5 flex flex-col items-center gap-2">
                <span className="rounded-full bg-maroon/80 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-ivory">
                  Dress Code
                </span>
                <p className="text-xs italic leading-relaxed text-ivory/55">
                  {ev.dressCode}
                </p>
              </div>
            )}
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
