import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "../config/site.js";
import { useReducedMotion } from "../hooks/useReducedMotion.js";
import { Plane, Sparkle, iconProps } from "./icons.jsx";

/* ============================================================
   ENTRY ANIMATION — a boarding pass slides in, then tears along
   the perforation and flies apart to reveal the site.
   Guests can tap to tear early; it auto-tears after a moment.
   ============================================================ */

// Phases: enter → ready (waiting for tap / timer) → torn → gone
const AUTO_TEAR_MS = 3200;

// Fake barcode: array of bar widths, rendered as divs
const BARCODE = [3, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 3, 1, 2, 2, 1, 3];

export default function BoardingPass({ onDone }) {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState("enter");

  // Reduced motion: skip the whole show with a short fade
  useEffect(() => {
    if (reducedMotion) {
      const t = setTimeout(onDone, 600);
      return () => clearTimeout(t);
    }
  }, [reducedMotion, onDone]);

  // Auto-tear if the guest just watches
  useEffect(() => {
    if (phase !== "ready" || reducedMotion) return;
    const t = setTimeout(() => setPhase("torn"), AUTO_TEAR_MS);
    return () => clearTimeout(t);
  }, [phase, reducedMotion]);

  // After the tear animation plays out, fade the overlay and hand off
  useEffect(() => {
    if (phase !== "torn") return;
    const t = setTimeout(() => setPhase("gone"), 1100);
    return () => clearTimeout(t);
  }, [phase]);

  const tear = () => phase === "ready" && setPhase("torn");

  if (reducedMotion) {
    return (
      <motion.div
        className="fixed inset-0 z-50 bg-teal-ink"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
    );
  }

  return (
    <AnimatePresence onExitComplete={onDone}>
      {phase !== "gone" && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-teal-ink px-5"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          onClick={tear}
          role="button"
          aria-label="Open invitation"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && tear()}
        >
          {/* Soft radial glow behind the ticket */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 45%, rgba(232,160,32,0.14), transparent 70%)",
            }}
          />

          {/* The ticket: main body + tearable stub */}
          <motion.div
            className="relative flex w-full max-w-95 -rotate-3 flex-col drop-shadow-2xl sm:max-w-105"
            initial={{ y: "80vh", rotate: 8, opacity: 0 }}
            animate={{ y: 0, rotate: -3, opacity: 1 }}
            transition={{ type: "spring", stiffness: 60, damping: 14, mass: 1.1 }}
            onAnimationComplete={() => phase === "enter" && setPhase("ready")}
          >
            {/* ---- MAIN BODY ---- */}
            <motion.div
              className="paper-grain relative overflow-hidden rounded-t-2xl bg-ivory text-teal-ink"
              animate={
                phase === "torn"
                  ? { rotate: -7, x: -40, y: "-70vh", opacity: 0 }
                  : {}
              }
              transition={{ duration: 0.9, ease: [0.6, -0.05, 0.7, 1] }}
            >
              {/* Airline strip */}
              <div className="flex items-center justify-between bg-teal-deep px-5 py-3 text-ivory">
                <span className="font-display text-sm font-semibold tracking-[0.25em]">
                  T&nbsp;&amp;&nbsp;P&nbsp;AIRWAYS
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-marigold-light">
                  Save the date
                </span>
              </div>

              {/* Route row */}
              <div className="flex items-center justify-between px-5 pt-5 pb-2">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-maroon/70">
                    From
                  </div>
                  <div className="font-display text-4xl font-semibold tracking-tight">CDG</div>
                  <div className="text-[11px] text-teal-ink/60">Paris</div>
                </div>

                {/* Dotted flight path with plane */}
                <div className="relative mx-3 mt-3 flex-1">
                  <div className="border-t-2 border-dashed border-teal-deep/30" />
                  <motion.span
                    className="absolute -top-2.5 text-marigold"
                    initial={{ left: "0%" }}
                    animate={{ left: phase === "enter" ? "0%" : "82%" }}
                    transition={{ duration: 1.6, ease: "easeInOut" }}
                    aria-hidden
                  >
                    <Plane className="h-5 w-5" {...iconProps} />
                  </motion.span>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-maroon/70">
                    To
                  </div>
                  <div className="font-display text-4xl font-semibold tracking-tight">HYD</div>
                  <div className="text-[11px] text-teal-ink/60">Hyderabad</div>
                </div>
              </div>

              {/* Details row */}
              <div className="grid grid-cols-3 gap-2 px-5 pb-5 pt-2">
                <Field label="Flight" value="4EVER" />
                <Field label="Boarding" value="11 DEC 2026" />
                <Field
                  label="Dest"
                  value={
                    <span className="inline-flex items-center gap-1">
                      HYD <Sparkle className="h-3 w-3 text-marigold" {...iconProps} />
                    </span>
                  }
                />
              </div>
            </motion.div>

            {/* ---- PERFORATION ---- */}
            <div className="relative flex h-0 items-center" aria-hidden>
              <div className="absolute -left-2.5 z-10 h-5 w-5 rounded-full bg-teal-ink" />
              <div className="absolute -right-2.5 z-10 h-5 w-5 rounded-full bg-teal-ink" />
            </div>

            {/* ---- STUB (tears away) ---- */}
            <motion.div
              className="paper-grain relative overflow-hidden rounded-b-2xl bg-ivory-dim text-teal-ink"
              style={{ transformOrigin: "left center" }}
              animate={
                phase === "torn"
                  ? { rotate: 24, x: 70, y: "75vh", opacity: 0 }
                  : {}
              }
              transition={{ duration: 0.9, ease: [0.6, -0.05, 0.7, 1] }}
            >
              <div className="border-t-2 border-dashed border-teal-deep/25" />
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-maroon/70">
                    Passengers
                  </div>
                  <div className="font-display text-lg font-semibold">
                    {site.couple.him} &amp; {site.couple.her}
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] text-teal-ink/60">
                    + you, hopefully
                    <Sparkle className="h-3 w-3 text-marigold" {...iconProps} />
                    {site.wedding.city}
                  </div>
                </div>
                {/* Barcode */}
                <div className="flex h-12 items-stretch gap-[2px]" aria-hidden>
                  {BARCODE.map((w, i) => (
                    <div key={i} className="bg-teal-ink" style={{ width: w }} />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Tap hint */}
          <AnimatePresence>
            {phase === "ready" && (
              <motion.p
                className="absolute bottom-12 text-xs font-medium uppercase tracking-[0.3em] text-ivory/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                Tap to tear your ticket
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-widest text-maroon/70">
        {label}
      </div>
      <div className="font-display text-sm font-semibold">{value}</div>
    </div>
  );
}

