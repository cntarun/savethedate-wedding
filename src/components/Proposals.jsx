import { motion } from "framer-motion";
import { site } from "../config/site.js";
import ResponsivePhoto from "./ResponsivePhoto.jsx";

/* ============================================================
   PROPOSALS — replaces the old "The way home" beat.
   A single merged photo of both proposals, centered, fading and
   sliding in on scroll with the same motion language as the rest
   of the site. Optional caption below.
   ============================================================ */

export default function Proposals() {
  const { heading, subheading, photo, text } = site.proposals;

  return (
    <section className="relative px-5 py-24 sm:px-8">
      <header className="mx-auto mb-14 max-w-xl text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.4em] text-marigold-light">
          {subheading}
        </p>
        <h2 className="font-display text-4xl font-semibold text-ivory sm:text-5xl">
          {heading}
        </h2>
      </header>

      <motion.figure
        className="mx-auto flex max-w-3xl flex-col items-center"
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <ResponsivePhoto
          photo={photo}
          sizes="(max-width: 768px) 90vw, 720px"
          className="w-full"
        />

        {text && (
          <figcaption className="mt-6 max-w-xl text-center text-sm italic leading-relaxed text-ivory/75">
            {text}
          </figcaption>
        )}
      </motion.figure>
    </section>
  );
}
