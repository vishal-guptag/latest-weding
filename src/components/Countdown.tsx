import { useEffect, useState } from 'react';
import { m } from 'motion/react';
import { getTimeLeft } from '../utils/countdown';
import { weddingDetails } from '../data/weddingDetails';

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-[64px] flex-col items-center rounded-lg border border-gold/50 bg-wine-deep/70 px-3 py-2 sm:min-w-[84px]">
      <div className="relative h-10 overflow-hidden sm:h-14">
        <m.span key={value} initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}
          className="block font-display text-4xl tabular-nums text-gold-light sm:text-5xl">{String(value).padStart(2, '0')}</m.span>
      </div>
      <span className="text-[11px] uppercase tracking-[0.2em] text-ivory/85">{label}</span>
    </div>
  );
}

export default function Countdown() {
  const [t, setT] = useState(() => getTimeLeft(weddingDetails.countdownTarget));
  useEffect(() => {
    const id = window.setInterval(() => setT(getTimeLeft(weddingDetails.countdownTarget)), 1000);
    return () => window.clearInterval(id);
  }, []);
  if (t.done) return <p className="font-script text-4xl foil" role="status">Today is the day</p>;
  return (
    <div role="timer" aria-label={`${t.days} days, ${t.hours} hours, ${t.minutes} minutes until the wedding`} className="flex flex-wrap justify-center gap-2 sm:gap-4">
      <Unit value={t.days} label="Days" /><Unit value={t.hours} label="Hours" />
      <Unit value={t.minutes} label="Minutes" /><Unit value={t.seconds} label="Seconds" />
    </div>
  );
}
