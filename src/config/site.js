/* ============================================================
   SITE CONFIG — this is YOUR file.
   All names, dates, copy, and links live here so you can edit
   everything without touching component code.
   Anything marked [TODO] needs your real content.
   ============================================================ */

export const site = {
  couple: {
    him: "Tarun",
    her: "Priya",
    initials: "T & P",
    hashtag: "#TarunWedsPriya", // [TODO] change if you have a real hashtag
  },

  wedding: {
    // Countdown targets the FIRST event (Sangeet, evening of 11 Dec).
    // Celebrations run 11–13 December 2026.
    startISO: "2026-12-11T19:00:00+05:30",
    endISO: "2026-12-13T23:00:00+05:30",
    dateDisplay: "11 – 13 December 2026",
    city: "Hyderabad",
    country: "India",
    venue: "Ayana Resorts & Grand Lawns Jalavihar",
  },

  // The three-day wedding weekend. Powers the itinerary section AND the
  // multi-event calendar file. Times are IST (+05:30) — adjust start/end
  // hours here if the schedule firms up; everything else updates itself.
  events: [
    {
      id: "sangeet",
      day: 1,
      dayName: "Friday",
      date: "11 December 2026",
      name: "Sangeet",
      time: "Evening",
      venue: "Ayana Resorts, Hyderabad",
      dressCode:
        "Vibrant Indo-Western - think sequins & glitters; dance-ready is the dress code.",
      icon: "music", // music note
      startISO: "2026-12-11T19:00:00+05:30",
      endISO: "2026-12-11T23:00:00+05:30",
    },
    {
      id: "haldi",
      day: 2,
      dayName: "Saturday",
      date: "12 December 2026",
      name: "Haldi",
      time: "Morning",
      venue: "Ayana Resorts, Hyderabad",
      dressCode:
        "Sunshine hues - yellows, oranges, and florals.",
      icon: "flower", // turmeric / marigold bloom
      startISO: "2026-12-12T10:00:00+05:30",
      endISO: "2026-12-12T13:00:00+05:30",
    },
    {
      id: "wedding",
      day: 3,
      dayName: "Sunday",
      date: "13 December 2026",
      name: "Wedding",
      time: "Evening",
      venue: "Grand Lawns Jalavihar, Hyderabad",
      dressCode:
        "Traditional Indian formal.",
      icon: "rings", // mandap rings
      startISO: "2026-12-13T18:00:00+05:30",
      endISO: "2026-12-13T23:00:00+05:30",
    },
  ],

  // The journey sections, in scroll order.
  // Each `photo.base` maps to the responsive files the image script generates:
  //   /photos/<base>-480.webp / -800.webp / -1200.webp  (+ .jpg fallbacks)
  // Run `npm run images` after dropping originals into /raw-photos (see README).
  story: [
    {
      id: "coimbatore",
      city: "Coimbatore",
      title: "Where it began",
      year: "College days",
      text:
        "Two engineering students, one campus in Coimbatore. ",
      photo: {
        base: "coimbatore",
        aspect: "3 / 2",
        alt: "Tarun and Priya as college students in Coimbatore, standing together on a tree-lined campus path",
      },
    },
    {
      id: "roots",
      city: "Hyderabad ↔ Kochi",
      title: "Two homes, one map",
      year: "Where we come from",
      text:
        "He grew up with Hyderabad's biryani and boulders; she with Kochi's " +
        "backwaters and monsoons. Eight hundred kilometres apart, until the " +
        "map folded itself in our favour.",
      photo: {
        base: "roots",
        aspect: "2 / 3",
        alt: "Tarun and Priya in traditional Kerala attire, celebrating their Hyderabad and Kochi roots",
      },
    },
    {
      id: "france",
      city: "France",
      title: "The leap",
      year: "Masters, together",
      text:
        "We packed two suitcases and one shared dream, and moved across the world " +
        "for our Masters. New language, new winters, " +
        "and France became our second home. ",
      photo: {
        base: "france",
        aspect: "2 / 3",
        alt: "Tarun and Priya walking a pebble beach beneath the white cliffs of Étretat, France",
      },
    },
  ],

  // Proposals section — replaces the old "The way home" story beat.
  // A single merged photo of both proposals (drop `proposals.*` into
  // /raw-photos and run `npm run images`).
  proposals: {
    heading: "We put a ring on it",
    subheading: "France, 2026",
    photo: {
      base: "proposals",
      aspect: "1600 / 1258", // true ratio of the merged image — no cropping
      alt: "Tarun and Priya's two proposals in France — Tarun on one knee at a château, and Priya on one knee on the cliffs of Étretat",
    },
    text: "Now, we're making our journey official, and we'd love for you to be part of it!", // optional caption [TODO: add a line about the proposals if you like]
  },

  music: {
    src: "/audio/ordinary.mp3",
    title: "Ordinary", // [TODO] confirm song title
    artist: "Alex Warren", // [TODO] confirm artist
  },
};
