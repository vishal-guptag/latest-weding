import { useLayoutEffect, useRef, useState } from 'react';
import { m, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { weddingDetails, type WeddingEvent } from '../data/weddingDetails';
import EventCard from './EventCard';
import { useMediaQuery } from '../hooks/useMediaQuery';

function VerticalDay({ events }: { events: WeddingEvent[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 70%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return (
    <div ref={ref} className="relative mx-auto max-w-md pl-8">
      <div aria-hidden className="absolute bottom-0 left-2 top-0 w-px bg-gold/25" />
      <m.div aria-hidden className="absolute bottom-0 left-2 top-0 w-[2px] origin-top bg-gradient-to-b from-gold-light to-gold" style={{ scaleY: fill }} />
      <ol className="flex flex-col gap-8">
        {events.map((e) => (
          <li key={e.id} className="relative">
            <span aria-hidden className="absolute -left-[30px] top-8 h-3.5 w-3.5 rounded-full border-2 border-gold bg-wine-deep" />
            <EventCard event={e} className="reveal" />
          </li>
        ))}
      </ol>
    </div>
  );
}

function PinnedDay({ events, label }: { events: WeddingEvent[]; label: string }) {
  const outer = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current || !viewport.current) return;
      setDist(Math.max(0, track.current.scrollWidth - viewport.current.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (viewport.current) ro.observe(viewport.current);
    if (track.current) ro.observe(track.current);
    return () => ro.disconnect();
  }, []);

  const scrollToIndex = (i: number) => {
    if (!outer.current) return;
    const top = outer.current.getBoundingClientRect().top + window.scrollY;
    const frac = events.length > 1 ? i / (events.length - 1) : 0;
    window.scrollTo({ top: top + frac * dist, behavior: reduce ? 'auto' : 'smooth' });
  };
  const current = () => {
    const p = scrollYProgress.get();
    return Math.round(p * (events.length - 1));
  };
  const pinned = dist > 0;

  return (
    <div ref={outer} style={pinned ? { height: `calc(100vh + ${dist}px)` } : undefined}>
      <div className={pinned ? 'sticky top-0 flex h-screen flex-col justify-center gap-6 overflow-hidden py-16' : 'flex flex-col gap-6 py-6'}>
        <h3 className="px-8 text-center font-display text-2xl tracking-[0.25em] text-gold-light">{label}</h3>
        <div ref={viewport} className="overflow-hidden">
          <m.div ref={track} style={pinned ? { x } : undefined} className={`flex gap-6 px-[8vw] ${pinned ? 'w-max' : 'justify-center'}`}>
            {events.map((e, i) => <EventCard key={e.id} event={e} className="w-[min(80vw,380px)]" onFocusCard={() => pinned && scrollToIndex(i)} />)}
          </m.div>
        </div>
        {pinned && (
          <div className="flex items-center justify-center gap-4">
            <button type="button" aria-label="Previous event" className="touch btn-gold btn-ghost !px-3" onClick={() => scrollToIndex(Math.max(0, current() - 1))}><ChevronLeft aria-hidden /></button>
            <div aria-hidden className="h-1 w-48 overflow-hidden rounded bg-gold/25"><m.div className="h-full origin-left bg-gold" style={{ scaleX: bar }} /></div>
            <button type="button" aria-label="Next event" className="touch btn-gold btn-ghost !px-3" onClick={() => scrollToIndex(Math.min(events.length - 1, current() + 1))}><ChevronRight aria-hidden /></button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EventJourney() {
  const wide = useMediaQuery('(min-width: 768px)');
  const days = Array.from(new Set(weddingDetails.events.map((e) => e.dayLabel))).map((label) => ({
    label, events: weddingDetails.events.filter((e) => e.dayLabel === label),
  }));
  return (
    <section id="events" aria-labelledby="events-title" className="chapter-dark relative py-20">
      <h2 id="events-title" className="foil px-4 text-center font-display text-[clamp(2.5rem,9vw,5.5rem)]">Wedding Events</h2>
      <div className="mt-10 flex flex-col gap-10">
        {days.map((d) => (
          <div key={d.label}>
            {wide ? <PinnedDay events={d.events} label={d.label} /> : (
              <>
                <h3 className="mb-6 px-4 text-center font-display text-xl tracking-[0.2em] text-gold-light">{d.label}</h3>
                <div className="px-4"><VerticalDay events={d.events} /></div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
