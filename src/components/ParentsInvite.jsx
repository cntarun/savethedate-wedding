import { motion } from "framer-motion";
import { site } from "../config/site.js";
import ResponsivePhoto from "./ResponsivePhoto.jsx";

/* ============================================================
   PARENTS' INVITE — opening section of the wedding-only variant.
   A note from the family with their photo, so they can share the
   link with their own guests. Photo slides in from the left, the
   message from the right; stacks on mobile. Animates once the
   boarding pass has torn away (`started`).
   ============================================================ */

export default function ParentsInvite({ started }) {
  const { eyebrow, heading, message, signature, photo } = site.parents;

  const rise = (x) => ({
    hidden: { opacity: 0, x, y: 20 },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  });

  return (
    <section className="relative px-5 pt-20 pb-16 sm:px-8">
      <div className="mx-auto grid max-w-4xl items-center gap-10 md:grid-cols-[minmax(0,340px)_1fr] md:gap-14">
        {/* Parents' photo */}
        <motion.div
          variants={rise(-48)}
          initial="hidden"
          animate={started ? "show" : "hidden"}
          className="mx-auto w-full max-w-xs md:max-w-none"
        >
          <ResponsivePhoto photo={photo} sizes="(max-width: 768px) 80vw, 340px" />
        </motion.div>

        {/* The note */}
        <motion.div
          variants={rise(48)}
          initial="hidden"
          animate={started ? "show" : "hidden"}
          className="text-center md:text-left"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.4em] text-marigold-light">
            {eyebrow}
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-ivory sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ivory/75">{message}</p>
          {signature && (
            <p className="mt-5 font-display text-lg italic text-marigold-light">
              {signature}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
