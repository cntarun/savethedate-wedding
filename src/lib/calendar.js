/* ============================================================
   "Add to Calendar" helpers — all client-side, no backend.
   Builds ONE .ics file holding all three wedding-weekend events
   (Sangeet / Haldi / Wedding) and per-event Google Calendar links.
   ============================================================ */

import { site } from "../config/site.js";

const { him, her, hashtag } = site.couple;

/** Convert an ISO datetime to an iCal UTC timestamp: YYYYMMDDTHHMMSSZ.
 *  Using UTC (the trailing Z) sidesteps VTIMEZONE blocks and is the most
 *  reliably-parsed form across Google / Apple / Outlook. */
function toICSDate(iso) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

/** Escape the characters iCal treats as special (RFC 5545 §3.3.11). */
function escapeICS(text) {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

function eventDescription(ev) {
  return `${ev.name} (${ev.time}) — join ${him} & ${her} to celebrate their wedding. ${hashtag}`;
}

/** One BEGIN:VEVENT…END:VEVENT block per event.
 *  Each carries a UNIQUE UID + SEQUENCE:0 so every calendar client
 *  imports all three as distinct entries (see notes in buildAllEventsIcs). */
function veventBlock(ev, stamp) {
  return [
    "BEGIN:VEVENT",
    `UID:${ev.id}-tarun-priya-2026@savethedate`,
    `DTSTAMP:${stamp}`,
    "SEQUENCE:0",
    `DTSTART:${toICSDate(ev.startISO)}`,
    `DTEND:${toICSDate(ev.endISO)}`,
    `SUMMARY:${escapeICS(`${ev.name} — ${him} & ${her}`)}`,
    `DESCRIPTION:${escapeICS(eventDescription(ev))}`,
    `LOCATION:${escapeICS(ev.venue)}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
  ].join("\r\n");
}

/** Assemble the full calendar: one VCALENDAR wrapper, three VEVENTs.
 *
 *  Multi-event import gotchas we deliberately avoid:
 *   • Each VEVENT has a UNIQUE UID — clients dedupe on UID, so shared
 *     UIDs would collapse three events into one.
 *   • SEQUENCE:0 on each — marks them as fresh, not updates to drop.
 *   • NO "METHOD:REQUEST" line — some clients (notably older Outlook)
 *     treat a METHOD calendar as a single meeting invite and ignore
 *     every VEVENT after the first. Omitting METHOD makes this a plain
 *     "publish" calendar, which all clients expand into N events.
 */
export function buildAllEventsIcs() {
  const stamp = toICSDate(new Date().toISOString());
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//TarunAndPriya//WeddingWeekend//EN",
    "CALSCALE:GREGORIAN",
    ...site.events.map((ev) => veventBlock(ev, stamp)),
    "END:VCALENDAR",
  ].join("\r\n");
}

/** Download the combined 3-event .ics (opens straight into Apple/Outlook,
 *  and Google Calendar imports it via Settings → Import). */
export function downloadAllEventsIcs() {
  const blob = new Blob([buildAllEventsIcs()], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "tarun-priya-wedding-weekend.ics";
  a.click();
  URL.revokeObjectURL(url);
}

/** One-click "add to Google Calendar" link for a single event.
 *  Google's link scheme only supports one event at a time, which is why
 *  we offer these alongside the combined .ics download. */
export function googleEventUrl(ev) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${ev.name} — ${him} & ${her}`,
    dates: `${toICSDate(ev.startISO)}/${toICSDate(ev.endISO)}`,
    details: eventDescription(ev),
    location: ev.venue,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}
