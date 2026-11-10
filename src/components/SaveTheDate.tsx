import { CalendarDays, Download } from 'lucide-react';
import { m } from 'motion/react';
import { weddingDetails } from '../data/weddingDetails';
import { downloadIcs, googleCalendarUrl } from '../utils/ics';

export default function SaveTheDate() {
  const wedding = weddingDetails.events.find((e) => e.date === weddingDetails.weddingDate)!;
  return (
    <section aria-labelledby="std-title" className="chapter-dark px-4 py-24 text-center">
      <m.div animate={{ rotate: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 5 }} className="mx-auto mb-4 w-fit text-gold" aria-hidden>
        <CalendarDays size={56} />
      </m.div>
      <h2 id="std-title" className="font-display text-sm tracking-[0.4em] text-gold-light">SAVE THE DATE</h2>
      <p className="foil mt-4 font-display text-[clamp(2rem,8vw,4.5rem)]">VISHAL ❤️ SHRUTI</p>
      <p className="mt-2 font-display text-2xl tracking-[0.3em]">12 DECEMBER 2026</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a className="btn-gold" href={googleCalendarUrl(wedding)} target="_blank" rel="noopener noreferrer">Add to Google Calendar</a>
        <button type="button" className="btn-gold btn-ghost" onClick={() => downloadIcs()}><Download size={16} aria-hidden /> Download .ics</button>
      </div>
    </section>
  );
}
