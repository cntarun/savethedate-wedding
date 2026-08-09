import { motion } from "framer-motion";
import { site } from "../config/site.js";
import { downloadAllEventsIcs, googleEventUrl } from "../lib/calendar.js";
import { burstConfetti } from "../lib/confetti.js";
import { CalendarPlus, ArrowUpRight, iconProps } from "./icons.jsx";

/* ============================================================
   ADD TO CALENDAR — multi-event.
   Main CTA downloads ONE .ics holding all three events; below it,
   three per-event Google Calendar one-click links.
   ============================================================ */

export default function EventDetails() {
  const single = site.events.length === 1; // wedding-only invite variant

  const celebrate = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 70);
  };

  const addAll = (e) => {
    celebrate(e);
    downloadAllEventsIcs();
  };

  return (
    <section className="relative px-5 py-24 text-center sm:px-8">
      <motion.div
        className="mx-auto max-w-xl"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.4em] text-marigold-light">
          Mark your calendar
        </p>
        <h2 className="font-display text-4xl font-semibold text-ivory sm:text-5xl">
          {site.wedding.dateDisplay}
        </h2>
        <p className="mt-4 text-ivory/70">
          {site.wedding.city}, {site.wedding.country}
        </p>

        {/* Main CTA — downloads the .ics (single wedding event here) */}
        <motion.button
          type="button"
          onClick={addAll}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-marigold px-8 py-3.5 font-semibold text-teal-ink shadow-lg shadow-marigold/20"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
        >
          <CalendarPlus className="h-5 w-5" {...iconProps} />
          {single ? "Add to calendar" : "Add all events to calendar"}
        </motion.button>

        {/* Helper text */}
        <p className="mt-4 text-sm text-ivory/55">
          {single
            ? "Download the invite, or add it to Google below"
            : "Add all three events at once, or add them individually below"}
        </p>

        {/* Per-event Google Calendar one-click links */}
        <ul className="mx-auto mt-6 flex max-w-md flex-col gap-2.5">
          {site.events.map((ev) => (
            <li key={ev.id}>
              <a
                href={googleEventUrl(ev)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 rounded-xl border border-marigold/25 bg-teal-deep/30 px-5 py-3 text-left transition-colors hover:border-marigold/60 hover:bg-teal-deep/50"
              >
                <span className="flex flex-col">
                  <span className="font-display text-base font-semibold text-ivory">
                    {ev.name}
                  </span>
                  <span className="text-xs text-ivory/50">
                    {ev.dayName}, {ev.date}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-medium uppercase tracking-[0.15em] text-marigold-light opacity-80 transition-opacity group-hover:opacity-100">
                  Google
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" {...iconProps} />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xs text-ivory/40">
          Formal invitation with full schedule to follow
        </p>
      </motion.div>
    </section>
  );
}
