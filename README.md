# Tarun & Priya — Save the Date 💍✈

A single-page, mobile-first save-the-date site: boarding-pass entry animation,
scroll-driven journey map (Coimbatore → Hyderabad/Kochi → France → Hyderabad),
press-and-hold passport-stamp date reveal, split-flap countdown, add-to-calendar,
RSVP-lite email capture, and ambient marigold petals.

## Run it locally

```bash
npm install
npm run dev        # → http://localhost:5173
```

> **Note (Windows):** if `npm run dev` fails with a `'P\node_modules\.bin\'` error,
> it's the `&` in this folder's name confusing npm. Either rename the folder
> (e.g. `savethedate-TP`) or run Vite directly:
> `node node_modules/vite/bin/vite.js`

## Customize everything in ONE file

Open **`src/config/site.js`** — names, dates, city, story text, photo paths,
the three-day event schedule, and music file all live there. Search the project
for `[TODO]` to find everything waiting on you:

1. **Story & proposal copy** — replace the `[TODO]` lines in each `story` entry
   and in `proposals.items` with your real words.
2. **Photos** — see the **Photos** section below (drop originals in
   `/raw-photos`, run `npm run images`). Until then, tasteful placeholders show.
3. **Event times & dress codes** — the `events` array holds Sangeet / Haldi /
   Wedding with venues, start/end times (IST), and the `dressCode` line on each
   card. Edit here; the itinerary, countdown, and calendar file all follow.
4. **Your song** — already wired to `public/audio/ordinary.mp3`. To change it,
   drop a new MP3 there and update `music.src` / `title` / `artist` in the config.
5. **Link preview** — after deploying, update the `og:url` / `og:image` URLs in
   `index.html` to your real domain. The share card is `public/og-image.png`
   (1200×630) — replace it with a photo version anytime.

## Photos (responsive WebP + JPEG, zero setup)

1. Save your originals into **`/raw-photos`** named exactly:
   `coimbatore.jpg`, `roots.jpg`, `france.jpg`, `his-proposal.jpg`,
   `her-proposal.jpg` (jpg / png / webp all fine — any size).
2. Run:

   ```bash
   npm run images
   ```

   This writes `-480 / -800 / -1200` WebP **and** JPEG versions into
   `public/photos/`, each compressed under 300 KB. The site's `<picture>`
   markup serves the right one per device; images lazy-load with their aspect
   ratio reserved (no layout shift). Alt text lives in `site.js`.

## Colors & fonts

Palette and font tokens are in `src/index.css` under `@theme`
(deep teal / marigold / ivory / maroon). Change a hex there and it updates
site-wide. Fonts (Fraunces + Outfit) are loaded in `index.html`.

## Deploy (free)

```bash
npm run build      # outputs static site to dist/
```

- **Vercel:** `vercel` CLI or import the repo at vercel.com — zero config.
- **Netlify:** drag the `dist/` folder into app.netlify.com/drop.

## Where things live

```
src/
├── config/site.js            ← ALL your editable content
├── components/
│   ├── BoardingPass.jsx      ← entry animation (tap to tear)
│   ├── Hero.jsx              ← names + date headline
│   ├── AmbientBackground.jsx ← floating marigold petals (canvas)
│   ├── JourneyMap.jsx        ← scroll-driven route + postcards (GSAP)
│   ├── Proposals.jsx         ← "Two Proposals" two-column section
│   ├── ResponsivePhoto.jsx   ← <picture> WebP/JPEG + srcset + lazy + frame
│   ├── PassportStamp.jsx     ← press-and-hold date reveal
│   ├── Countdown.jsx         ← split-flap departures-board timer
│   ├── EventDetails.jsx      ← "Add all events" .ics + per-event Google links
│   ├── Itinerary.jsx         ← 3-card Wedding Weekend timeline + dress codes
│   ├── MusicToggle.jsx       ← floating music button (muted autoplay → fade-in)
│   └── Footer.jsx
├── lib/calendar.js           ← multi-event .ics + Google-link generation
├── lib/confetti.js           ← dependency-free confetti burst
└── hooks/useReducedMotion.js ← accessibility: honors reduced-motion

scripts/optimize-images.mjs   ← `npm run images` photo pipeline
raw-photos/                   ← drop your original photos here
```

All animations respect `prefers-reduced-motion` — guests with that setting get
elegant instant reveals instead of motion.
