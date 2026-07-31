import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "../config/site.js";
import { useReducedMotion } from "../hooks/useReducedMotion.js";
import { burstConfetti } from "../lib/confetti.js";
import { Sparkle, iconProps } from "./icons.jsx";

/* ============================================================
   DATE REVEAL — press & hold the stamp: it hovers, charges,
   then SLAMS a visa-style stamp onto the passport page with a
   confetti burst and a haptic tap on supported phones.
   Reduced motion (or keyboard Enter): instant elegant stamp.
   ============================================================ */

const HOLD_MS = 700;

export default function PassportStamp() {
  const reducedMotion = useReducedMotion();
  const [state, setState] = useState("idle"); // idle | holding | stamped
  const holdTimer = useRef(null);
  const pageRef = useRef(null);

  const slam = () => {
    clearTimeout(holdTimer.current);
    setState("stamped");
    navigator.vibrate?.(35);
    // Confetti erupts from the centre of the passport page
    const rect = pageRef.current?.getBoundingClientRect();
    if (rect) {
      // slight delay so it pops right as the stamp lands
      setTimeout(
        () => burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 90),
        reducedMotion ? 0 : 380
      );
    }
  };

  const startHold = () => {
    if (state === "stamped") return;
    if (reducedMotion) return slam();
    setState("holding");
    holdTimer.current = setTimeout(slam, HOLD_MS);
  };

  const cancelHold = () => {
    if (state !== "holding") return;
    clearTimeout(holdTimer.current);
    setState("idle");
  };

  return (
    <section className="relative px-5 py-24 sm:px-8">
      <header className="mx-auto mb-12 max-w-xl text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.4em] text-marigold-light">
          Final destination
        </p>
        <h2 className="font-display text-4xl font-semibold text-ivory sm:text-5xl">
          Your entry is approved
        </h2>
      </header>

      {/* Passport page */}
      <motion.div
        ref={pageRef}
        className="paper-grain relative mx-auto max-w-md overflow-hidden rounded-2xl bg-ivory p-6 text-teal-ink shadow-2xl sm:p-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Passport page texture lines */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden>
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 11px, #0d4747 12px)",
            }}
          />
        </div>

        <div className="mb-1 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-teal-deep/50">
          <span>Republic of Forever</span>
          <span>Page 26</span>
        </div>
        <div className="mb-6 border-b border-teal-deep/15 pb-3 font-display text-sm italic text-teal-ink/70">
          Immigration · Arrivals · {site.wedding.city}
        </div>

        {/* Stamp landing zone */}
        <div className="relative flex min-h-52 items-center justify-center">
          <AnimatePresence mode="wait">
            {state !== "stamped" ? (
              <motion.button
                key="press"
                type="button"
                className="group relative flex flex-col items-center gap-4 outline-none"
                onPointerDown={startHold}
                onPointerUp={cancelHold}
                onPointerLeave={cancelHold}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && slam()}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                aria-label="Press and hold to stamp the wedding date"
              >
                {/* The floating stamp */}
                <motion.div
                  className="flex h-24 w-24 items-center justify-center rounded-full bg-maroon text-ivory shadow-lg"
                  animate={
                    state === "holding"
                      ? { y: -18, scale: 1.12, rotate: [-3, 3, -3] }
                      : { y: [0, -6, 0] }
                  }
                  transition={
                    state === "holding"
                      ? { rotate: { duration: 0.3, repeat: Infinity }, y: { duration: 0.2 }, scale: { duration: 0.2 } }
                      : { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }
                >
                  <div className="text-center">
                    <div className="font-display text-2xl font-bold leading-none">T&amp;P</div>
                    <div className="mt-1 text-[8px] uppercase tracking-[0.2em]">official</div>
                  </div>
                </motion.div>

                {/* Charge ring while holding */}
                <svg className="pointer-events-none absolute -top-4 h-32 w-32 -rotate-90" viewBox="0 0 100 100" aria-hidden>
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="#e8a020"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="289"
                    initial={{ strokeDashoffset: 289 }}
                    animate={{ strokeDashoffset: state === "holding" ? 0 : 289 }}
                    transition={{ duration: state === "holding" ? HOLD_MS / 1000 : 0.2, ease: "linear" }}
                  />
                </svg>

                <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-teal-deep/60 group-hover:text-teal-deep">
                  Press &amp; hold to stamp
                </span>
              </motion.button>
            ) : (
              /* THE STAMP — slams in from above */
              <motion.div
                key="stamped"
                className="relative select-none"
                initial={
                  reducedMotion
                    ? { opacity: 0 }
                    : { scale: 2.6, opacity: 0, rotate: 8 }
                }
                animate={
                  reducedMotion
                    ? { opacity: 1 }
                    : { scale: 1, opacity: 1, rotate: -6 }
                }
                transition={
                  reducedMotion
                    ? { duration: 0.4 }
                    : { type: "spring", stiffness: 500, damping: 22, mass: 1.2 }
                }
              >
                <div className="rounded-lg border-[3px] border-maroon px-6 py-5 text-center text-maroon [box-shadow:inset_0_0_18px_rgba(107,31,42,0.12)]">
                  <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.35em]">
                    <Sparkle className="h-3 w-3" {...iconProps} />
                    Admitted
                    <Sparkle className="h-3 w-3" {...iconProps} />
                  </div>
                  <div className="my-2 font-display text-3xl font-bold uppercase leading-tight sm:text-4xl">
                    {site.wedding.dateDisplay}
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.3em]">
                    {site.wedding.city} · {site.wedding.country}
                  </div>
                  <div className="mt-2 border-t border-maroon/30 pt-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-maroon/70">
                    Purpose of visit: Wedding of {site.couple.him} &amp; {site.couple.her}
                  </div>
                </div>
                {/* Ink smudge */}
                <div
                  className="pointer-events-none absolute -inset-2 rounded-xl opacity-30 mix-blend-multiply"
                  style={{
                    background:
                      "radial-gradient(ellipse at 30% 20%, rgba(107,31,42,0.25), transparent 50%), radial-gradient(ellipse at 75% 80%, rgba(107,31,42,0.2), transparent 45%)",
                  }}
                  aria-hidden
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
