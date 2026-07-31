import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "../config/site.js";
import { useReducedMotion } from "../hooks/useReducedMotion.js";
import ResponsivePhoto from "./ResponsivePhoto.jsx";
import { Plane, iconProps } from "./icons.jsx";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   THE JOURNEY — scroll-driven storytelling.
   A dotted route line draws itself down the page as you scroll,
   a little plane rides along it, and a postcard for each city
   slides in as it enters the viewport.
   ============================================================ */

export default function JourneyMap() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const planeRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion) return; // line renders fully drawn, no scrub

    const ctx = gsap.context(() => {
      const line = lineRef.current;
      const length = line.getTotalLength();

      // Start with the route hidden, then "draw" it as the guest scrolls
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(line, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 0.6,
        },
      });

      // Plane rides the tip of the line
      gsap.fromTo(
        planeRef.current,
        { top: "0%" },
        {
          top: "99%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 0.6,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="relative px-5 py-24 sm:px-8">
      <header className="mx-auto mb-16 max-w-xl text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.4em] text-marigold-light">
          The journey
        </p>
        <h2 className="font-display text-4xl font-semibold text-ivory sm:text-5xl">
          Every route led here
        </h2>
      </header>

      <div className="relative mx-auto max-w-3xl">
        {/* The route rail — left on mobile, center on desktop */}
        <div
          className="absolute top-0 bottom-0 left-4 w-px sm:left-1/2 sm:-translate-x-1/2"
          aria-hidden
        >
          <svg
            className="h-full w-8 -translate-x-1/2 overflow-visible"
            viewBox="0 0 32 100"
            preserveAspectRatio="none"
          >
            {/* Faint full route underneath */}
            <path
              d="M16 0 C 24 12, 8 22, 16 33 C 24 44, 8 55, 16 66 C 24 77, 8 88, 16 100"
              fill="none"
              stroke="rgba(251,246,236,0.12)"
              strokeWidth="0.5"
              strokeDasharray="1.4 1.6"
              vectorEffect="non-scaling-stroke"
            />
            {/* Drawn-in route (animated via GSAP scrub) */}
            <path
              ref={lineRef}
              d="M16 0 C 24 12, 8 22, 16 33 C 24 44, 8 55, 16 66 C 24 77, 8 88, 16 100"
              fill="none"
              stroke="#e8a020"
              strokeWidth="0.7"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {/* Plane riding the route */}
          <div
            ref={planeRef}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-marigold"
            style={{ top: reducedMotion ? "99%" : "0%" }}
          >
            <Plane className="h-5 w-5 rotate-[135deg] drop-shadow" {...iconProps} />
          </div>
        </div>

        {/* Postcards */}
        <ol className="space-y-20">
          {site.story.map((stop, i) => (
            <Postcard key={stop.id} stop={stop} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Postcard({ stop, index }) {
  const even = index % 2 === 0;
  return (
    <li
      className={`relative pl-12 sm:w-[calc(50%-2.5rem)] sm:pl-0 ${
        even ? "sm:mr-auto" : "sm:ml-auto"
      }`}
    >
      {/* City stop marker on the rail */}
      <motion.span
        className={`absolute top-8 left-4 z-10 -translate-x-1/2 sm:top-10 ${
          even
            ? "sm:left-[calc(100%+2.5rem)]"
            : "sm:left-auto sm:right-[calc(100%+2.5rem)] sm:translate-x-1/2"
        }`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-20% 0px" }}
        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.15 }}
        aria-hidden
      >
        <span className="block h-3.5 w-3.5 rounded-full border-2 border-marigold bg-teal-ink shadow-[0_0_12px_rgba(232,160,32,0.6)]" />
      </motion.span>

      {/* The postcard itself */}
      <motion.article
        className="paper-grain rounded-xl bg-ivory p-5 text-teal-ink shadow-xl sm:p-6"
        initial={{ opacity: 0, y: 48, rotate: even ? -2 : 2 }}
        whileInView={{ opacity: 1, y: 0, rotate: even ? -1 : 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-3 flex items-baseline justify-between gap-3 border-b border-teal-deep/15 pb-3">
          <span className="font-display text-xl font-semibold text-maroon">
            {stop.city}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-deep/60">
            {stop.year}
          </span>
        </div>

        <h3 className="font-display text-2xl font-semibold">{stop.title}</h3>

        {stop.photo && (
          <ResponsivePhoto
            photo={stop.photo}
            sizes="(max-width: 640px) 88vw, 40vw"
            className="mt-3"
          />
        )}

        <p className="mt-3 text-sm leading-relaxed text-teal-ink/80">{stop.text}</p>
      </motion.article>
    </li>
  );
}
