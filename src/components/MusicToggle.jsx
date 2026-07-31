import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { site } from "../config/site.js";
import { useReducedMotion } from "../hooks/useReducedMotion.js";

/* ============================================================
   MUSIC TOGGLE — "our song", top-right.
   • Starts MUTED and autoplays (the only autoplay browsers allow).
   • The first interaction anywhere (tap / click / key) unmutes and
     fades the volume in smoothly; after that the button toggles
     play / pause.
   • Icon animates between a playing sound-wave and a muted speaker.
   • Loops for the whole visit.
   ============================================================ */

const TARGET_VOLUME = 0.5;

export default function MusicToggle() {
  const audioRef = useRef(null);
  const fadeRef = useRef(null);
  const armedRef = useRef(false); // has the first interaction happened?
  const justArmedRef = useRef(false); // swallow the click that armed us
  const [playing, setPlaying] = useState(false);
  const reducedMotion = useReducedMotion();

  // Smoothly ramp the volume to `target`, then optionally run `done`.
  const fadeTo = (target, done) => {
    const audio = audioRef.current;
    if (!audio) return;
    clearInterval(fadeRef.current);
    const step = (target - audio.volume) / 24;
    fadeRef.current = setInterval(() => {
      let v = audio.volume + step;
      const arrived = step >= 0 ? v >= target : v <= target;
      if (arrived) {
        v = target;
        clearInterval(fadeRef.current);
        done?.();
      }
      audio.volume = Math.min(1, Math.max(0, v));
    }, 55);
  };

  // Unmute + play + fade in (used by both "tap anywhere" and the button).
  const start = () => {
    const audio = audioRef.current;
    if (!audio) return;
    armedRef.current = true;
    audio.muted = false;
    audio.play().then(() => setPlaying(true)).catch(() => {});
    fadeTo(TARGET_VOLUME);
  };

  // Muted autoplay on mount + arm on first user interaction anywhere.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;
    audio.muted = true;
    audio.play().catch(() => {}); // muted autoplay is permitted

    const onFirstInteraction = () => {
      if (armedRef.current) return;
      justArmedRef.current = true;
      start();
      // ignore the coincident click on the button for a moment
      setTimeout(() => (justArmedRef.current = false), 400);
      removeListeners();
    };
    const events = ["pointerdown", "keydown", "touchstart"];
    const removeListeners = () =>
      events.forEach((e) => window.removeEventListener(e, onFirstInteraction));
    events.forEach((e) =>
      window.addEventListener(e, onFirstInteraction, { passive: true })
    );

    return () => {
      removeListeners();
      clearInterval(fadeRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Button toggles play / pause once armed.
  const onButtonClick = () => {
    if (justArmedRef.current) return; // this click is what armed playback
    if (!armedRef.current) return start();
    const audio = audioRef.current;
    if (playing) {
      fadeTo(0, () => {
        audio.pause();
        setPlaying(false);
      });
    } else {
      audio.muted = false;
      audio.play().then(() => setPlaying(true)).catch(() => {});
      fadeTo(TARGET_VOLUME);
    }
  };

  return (
    <div className="fixed right-4 top-4 z-40 flex items-center gap-2.5">
      {/* preload="metadata": muted autoplay still streams progressively, but we
          avoid eagerly pulling the whole file on load (kinder to mobile data).
          BASE_URL keeps the path correct on the Pages sub-path. */}
      <audio
        ref={audioRef}
        src={import.meta.env.BASE_URL + site.music.src.replace(/^\//, "")}
        loop
        preload="metadata"
      />

      {/* Subtle song caption — shown on all sizes, low-opacity small caps */}
      <span className="max-w-[42vw] text-right text-[9px] uppercase leading-tight tracking-[0.15em] text-ivory/40 sm:max-w-none sm:text-[10px]">
        {site.music.title} - {site.music.artist}
      </span>

      <motion.button
        type="button"
        onClick={onButtonClick}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 bg-teal-deep/90 text-marigold shadow-xl backdrop-blur"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={playing ? "Pause our song" : "Play our song"}
        aria-pressed={playing}
      >
        {playing ? (
          <WaveIcon animate={!reducedMotion} />
        ) : (
          <MutedIcon />
        )}
      </motion.button>
    </div>
  );
}

/* Animated equalizer bars while playing */
function WaveIcon({ animate }) {
  const bars = [0, 1, 2, 3];
  const heights = [
    [7, 15, 7],
    [15, 7, 15],
    [10, 16, 10],
    [16, 9, 16],
  ];
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      {bars.map((b, i) => (
        <motion.rect
          key={b}
          x={4 + i * 4.2}
          width="2.4"
          rx="1.2"
          fill="currentColor"
          initial={{ height: 8, y: 8 }}
          animate={
            animate
              ? {
                  height: heights[i],
                  y: heights[i].map((h) => 12 - h / 2),
                }
              : { height: 12, y: 6 }
          }
          transition={
            animate
              ? { duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }
              : { duration: 0 }
          }
        />
      ))}
    </svg>
  );
}

/* Muted speaker with a slash */
function MutedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" opacity="0.85" />
      <path
        d="M17 9l4 6M21 9l-4 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
