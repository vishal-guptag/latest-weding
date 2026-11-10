import { m } from 'motion/react';
import { CalendarPlus } from 'lucide-react';
import type { WeddingEvent } from '../data/weddingDetails';
import { EventArt } from './Ornaments';
import { googleCalendarUrl } from '../utils/ics';

export function formatDate(date: string) {
  return new Date(date + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

const accent: Record<WeddingEvent['art'], string> = {
  baan: 'from-saffron/25', chaak: 'from-rose/20', ghurchari: 'from-saffron/15', barat: 'from-gold/20', chadat: 'from-gold/25', dinner: 'from-rose/15',
};

export default function EventCard({ event, className = '', onFocusCard }: { event: WeddingEvent; className?: string; onFocusCard?: () => void }) {
  return (
    <m.article
      tabIndex={0} onFocus={onFocusCard} aria-label={`${event.name}, ${formatDate(event.date)}, ${event.timeLabel}`}
      whileHover={{ y: -6 }} whileTap={{ y: -3 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={`glass-card flex shrink-0 flex-col items-center gap-3 rounded-2xl bg-gradient-to-b ${accent[event.art]} to-transparent p-6 text-center ${className}`}
    >
      <p className="font-display text-sm tracking-[0.3em] text-gold">{event.number}</p>
      <EventArt art={event.art} size={112} />
      <h3 className="font-display text-3xl font-semibold leading-tight text-ivory sm:text-4xl">{event.name}</h3>
      <p className="font-display text-2xl text-gold-light">{formatDate(event.date)}</p>
      <p className="font-display text-4xl font-semibold text-ivory">{event.timeLabel}</p>
      <a href={googleCalendarUrl(event)} target="_blank" rel="noopener noreferrer" className="btn-gold btn-ghost mt-2 text-sm">
        <CalendarPlus size={16} aria-hidden /> Add to calendar
      </a>
    </m.article>
  );
}
