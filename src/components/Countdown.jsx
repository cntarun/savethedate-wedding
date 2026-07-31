import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "../config/site.js";
import { useReducedMotion } from "../hooks/useReducedMotion.js";
import { Plane, iconProps } from "./icons.jsx";

/* ============================================================
   COUNTDOWN — an airport split-flap "departures board" ticking
   down to the wedding. Each digit flips when it changes.
   ============================================================ */

function timeLeft() {
  const diff = Math.max(0, new Date(site.wedding.startISO) - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    mins: Math.floor(diff / 60000) % 60,
    secs: Math.floor(diff / 1000) % 60,
  };
}

export default function Countdown() {
  const [t, setT] = useState(timeLeft);

  useEffect(() => {
    const id = setInterval(() => setT(timeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: String(t.days).padStart(3, "0") },
    { label: "Hours", value: String(t.hours).padStart(2, "0") },
    { label: "Minutes", value: String(t.mins).padStart(2, "0") },
    { label: "Seconds", value: String(t.secs).padStart(2, "0") },
  ];

  return (
    <section className="relative px-5 py-24 sm:px-8">
      <motion.div
        className="mx-auto max-w-2xl"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Departures-board frame */}
        <div className="overflow-hidden rounded-2xl border border-ivory/10 bg-teal-deep/60 shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between border-b border-ivory/10 bg-teal-ink/80 px-5 py-3">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-marigold-light">
              <Plane className="h-3.5 w-3.5" {...iconProps} />
              Departure to forever
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ivory/50">
              On time
            </span>
          </div>

          <div
            className="grid grid-cols-4 gap-2 px-4 py-6 sm:gap-4 sm:px-8 sm:py-8"
            role="timer"
            aria-label={`${t.days} days, ${t.hours} hours, ${t.mins} minutes and ${t.secs} seconds until the wedding`}
          >
            {units.map((u) => (
              <div key={u.label} className="text-center">
                <div className="flex justify-center gap-[3px] sm:gap-1.5">
                  {u.value.split("").map((digit, i) => (
                    <FlapDigit key={`${u.label}-${i}`} digit={digit} />
                  ))}
                </div>
                <div className="mt-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-ivory/50 sm:text-[10px]">
                  {u.label}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-ivory/10 bg-teal-ink/80 px-5 py-2.5 text-center text-[10px] font-medium uppercase tracking-[0.3em] text-ivory/40">
            Gate: {site.wedding.city} · Boarding {site.wedding.dateDisplay}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function FlapDigit({ digit }) {
  const reducedMotion = useReducedMotion();
  return (
    <div
      className="relative h-10 w-7 overflow-hidden rounded-md bg-teal-ink text-ivory shadow-inner sm:h-14 sm:w-10 [perspective:300px]"
      aria-hidden
    >
      {/* Split-flap centre seam */}
      <div className="absolute top-1/2 left-0 z-10 h-px w-full bg-black/40" />
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={digit}
          className="absolute inset-0 flex items-center justify-center font-display text-xl font-semibold tabular-nums sm:text-3xl"
          initial={reducedMotion ? { opacity: 0 } : { rotateX: -90, opacity: 0 }}
          animate={reducedMotion ? { opacity: 1 } : { rotateX: 0, opacity: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { rotateX: 90, opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.1 : 0.3, ease: "easeOut" }}
          style={{ transformOrigin: "center center", backfaceVisibility: "hidden" }}
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
