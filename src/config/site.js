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

  // A note from the parents — the opening section of this wedding-only
  // variant, so the family can share the link with their own guests.
  // Drop the photo named `parents.*` into /raw-photos and run `npm run images`.
  parents: {
    eyebrow: "With love, from the family",
    heading: "Our son is getting married",
    // Warm invitation message. Edit freely — line breaks are fine.
    message:
      "With hearts full of joy, we invite you to celebrate the wedding of our son, " +
      "Tarun, to Priya. Watching him find his partner in life has been our greatest " +
      "happiness, and we would be honoured to have you; our dear family and friends, " +
      "with us as we welcome Priya into our family. Your presence and blessings would " +
      "mean the world to us.",
    signature: "— The Chellaboyina family",
    photo: {
      base: "parents",
      aspect: "3 / 4", // portrait; update if your photo is a different shape
      alt: "Tarun's parents in traditional South Indian attire, inviting guests to the wedding",
    },
  },

  wedding: {
    // Wedding-only invite variant: everything centers on the wedding day.
    // Countdown targets the wedding (evening of 13 Dec).
    startISO: "2026-12-13T18:00:00+05:30",
    endISO: "2026-12-13T23:00:00+05:30",
    dateDisplay: "13 December 2026",
    city: "Hyderabad",
    country: "India",
    venue: "Grand Lawns Jalavihar, Hyderabad",
  },

  // Single event (the wedding). Powers the itinerary card AND the calendar
  // file. Times are IST (+05:30) — adjust the hours here if they firm up.
  events: [
    {
      id: "wedding",
      day: 1,
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
        "They packed two suitcases and one shared dream, and moved across the world " +
        "for their Masters. New language, new winters, " +
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
