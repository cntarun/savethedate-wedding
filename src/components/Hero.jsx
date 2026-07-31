import { motion } from "framer-motion";
import { site } from "../config/site.js";
import { ChevronDown, iconProps } from "./icons.jsx";

/* ============================================================
   HERO — first thing guests see after the boarding pass tears.
   (Ambient animated background gets layered in next.)
   ============================================================ */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero({ started }) {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Gradient wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(20,96,96,0.55), transparent 70%)," +
            "radial-gradient(ellipse 60% 40% at 80% 90%, rgba(107,31,42,0.35), transparent 70%)," +
            "radial-gradient(ellipse 50% 35% at 15% 85%, rgba(232,160,32,0.12), transparent 70%)",
        }}
      />

      <motion.p
        className="mb-6 text-xs font-medium uppercase tracking-[0.4em] text-marigold-light"
        variants={fadeUp}
        initial="hidden"
        animate={started ? "show" : "hidden"}
        custom={0.1}
      >
        Four cities · One story
      </motion.p>

      <motion.h1
        className="font-display text-6xl font-semibold leading-none tracking-tight text-ivory sm:text-8xl"
        variants={fadeUp}
        initial="hidden"
        animate={started ? "show" : "hidden"}
        custom={0.3}
      >
        {site.couple.him}
        <span className="mx-3 inline-block font-light italic text-marigold sm:mx-5">&amp;</span>
        {site.couple.her}
      </motion.h1>

      <motion.p
        className="mt-6 text-base font-light tracking-wide text-ivory/80 sm:text-lg"
        variants={fadeUp}
        initial="hidden"
        animate={started ? "show" : "hidden"}
        custom={0.55}
      >
        are getting married
      </motion.p>

      <motion.p
        className="mt-2 font-display text-lg italic text-marigold-light sm:text-xl"
        variants={fadeUp}
        initial="hidden"
        animate={started ? "show" : "hidden"}
        custom={0.7}
      >
        {site.wedding.dateDisplay} · {site.wedding.city}
      </motion.p>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 flex flex-col items-center gap-2 text-ivory/50"
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">The journey</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          <ChevronDown className="h-5 w-5" {...iconProps} />
        </motion.span>
      </motion.div>
    </section>
  );
}
