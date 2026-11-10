import { weddingDetails, type WeddingEvent } from '../data/weddingDetails';

const pad = (n: number) => String(n).padStart(2, '0');

/** Local IST wall-clock time as YYYYMMDDTHHmmss (used with TZID=Asia/Kolkata). */
export function toLocalStamp(date: string, time: string): string {
  return `${date.replace(/-/g, '')}T${time.replace(':', '')}00`;
}

export function addMinutes(date: string, time: string, minutes: number): { date: string; time: string } {
  const [y, m, d] = date.split('-').map(Number);
  const [hh, mm] = time.split(':').map(Number);
  const t = new Date(Date.UTC(y, m - 1, d, hh, mm + minutes));
  return {
    date: `${t.getUTCFullYear()}-${pad(t.getUTCMonth() + 1)}-${pad(t.getUTCDate())}`,
    time: `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}`,
  };
}

const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');

const DEFAULT_DURATION = 60;

function eventTitle(e: WeddingEvent) {
  return `${titleCase(e.name)} – Vishal ❤️ Shruti (#ShruVi)`;
}
function titleCase(s: string) {
  return s.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());
}

function vevent(e: WeddingEvent, uidSuffix: string): string[] {
  const end = addMinutes(e.date, e.time, DEFAULT_DURATION);
  return [
    'BEGIN:VEVENT',
    `UID:${e.id}-${uidSuffix}@shruvi-wedding`,
    'DTSTAMP:20260101T000000Z',
    `DTSTART;TZID=Asia/Kolkata:${toLocalStamp(e.date, e.time)}`,
    `DTEND;TZID=Asia/Kolkata:${toLocalStamp(end.date, end.time)}`,
    `SUMMARY:${esc(eventTitle(e))}`,
    `LOCATION:${esc(weddingDetails.venue.shortName + ', ' + weddingDetails.venue.address)}`,
    `DESCRIPTION:${esc(`${weddingDetails.hashtag} – ${weddingDetails.tagline}`)}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${esc(titleCase(e.name) + ' starts in 1 hour')}`,
    'TRIGGER:-PT1H',
    'END:VALARM',
    'END:VEVENT',
  ];
}

export function buildIcs(events: WeddingEvent[] = weddingDetails.events): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ShruVi Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-TIMEZONE:Asia/Kolkata',
    'BEGIN:VTIMEZONE',
    'TZID:Asia/Kolkata',
    'BEGIN:STANDARD',
    'DTSTART:19700101T000000',
    'TZOFFSETFROM:+0530',
    'TZOFFSETTO:+0530',
    'TZNAME:IST',
    'END:STANDARD',
    'END:VTIMEZONE',
    ...events.flatMap((e) => vevent(e, 'cal')),
    'END:VCALENDAR',
  ];
  return lines.join('\r\n') + '\r\n';
}

export function googleCalendarUrl(e: WeddingEvent): string {
  const end = addMinutes(e.date, e.time, DEFAULT_DURATION);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: eventTitle(e),
    dates: `${toLocalStamp(e.date, e.time)}/${toLocalStamp(end.date, end.time)}`,
    ctz: 'Asia/Kolkata',
    location: `${weddingDetails.venue.shortName}, ${weddingDetails.venue.address}`,
    details: `${weddingDetails.hashtag} – ${weddingDetails.tagline}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcs(filename = 'shruvi-wedding.ics') {
  const blob = new Blob([buildIcs()], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
