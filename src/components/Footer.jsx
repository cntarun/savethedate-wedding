import { site } from "../config/site.js";

export default function Footer() {
  return (
    <footer className="border-t border-ivory/10 px-5 py-10 text-center">
      <p className="font-display text-2xl font-semibold text-marigold">
        {site.couple.initials}
      </p>
      <p className="mt-1 text-xs uppercase tracking-[0.3em] text-ivory/40">
        Est. December 2026 · {site.wedding.city}
      </p>
      <p className="mt-3 text-sm text-ivory/50">{site.couple.hashtag}</p>
    </footer>
  );
}
