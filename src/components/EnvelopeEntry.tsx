import { useEffect, useState } from 'react';
import { m, useReducedMotion, AnimatePresence } from 'motion/react';
import { Ganesh } from './Ornaments';
import { Monogram } from './Monogram';

type Phase = 'closed' | 'opening' | 'done';

export default function EnvelopeEntry({ onOpen }: { onOpen: () => void }) {
  const [phase, setPhase] = useState<Phase>('closed');
  const reduce = useReducedMotion();

  useEffect(() => {
    if (phase === 'done') return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [phase]);

  const open = () => {
    if (phase !== 'closed') return;
    setPhase('opening');
    onOpen(); // user gesture: starts music
    window.setTimeout(() => setPhase('done'), reduce ? 500 : 3000);
  };
  const skip = () => { if (phase === 'closed') onOpen(); setPhase('done'); };

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <m.div
          key="envelope" role="dialog" aria-modal="true" aria-label="Wedding invitation envelope"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 overflow-hidden px-5 text-center chapter-dark"
          exit={{ opacity: 0, scale: reduce ? 1 : 1.08 }} transition={{ duration: 0.8 }}
        >
          <button type="button" onClick={skip} className="touch absolute right-4 top-4 rounded-full border border-gold/60 px-4 text-sm text-gold-light" style={{ top: 'max(1rem, env(safe-area-inset-top))' }}>
            Skip
          </button>

          <div className="relative text-ivory" lang="hi" style={{ fontFamily: 'var(--font-deva)' }}>
            <p className="text-lg text-gold-light">|| श्री गणेशाय नमः ||</p>
          </div>
          <p className="text-sm tracking-widest text-ivory/90">With the blessings of Lord Ganesha</p>

          <div className="relative" style={{ perspective: 1200 }}>
            {/* back of envelope + card */}
            <div className="relative h-[230px] w-[min(86vw,340px)] rounded-md bg-ivory shadow-2xl gold-frame">
              <m.div
                className="absolute inset-x-4 bottom-3 top-3 flex flex-col items-center justify-center rounded bg-ivory-deep text-wine"
                initial={false} animate={phase === 'opening' && !reduce ? { y: -150, opacity: [1, 1, 0] } : { y: 0 }}
                transition={{ delay: 1.1, duration: 1.3, ease: 'easeOut' }}
              >
                <Monogram size={64} />
                <p className="font-display text-xl">Vishal ❤️ Shruti</p>
              </m.div>
              {/* front pocket */}
              <div className="absolute inset-x-0 bottom-0 h-3/5 rounded-b-md" style={{ background: 'linear-gradient(180deg,#f1e4c8,#e6d3ac)', clipPath: 'polygon(0 100%,0 30%,50% 70%,100% 30%,100% 100%)' }} />
              {/* flap */}
              <m.div
                className="absolute inset-x-0 top-0 h-3/5 bg-[#ead9b4]"
                style={{ transformOrigin: 'top', clipPath: 'polygon(0 0,100% 0,50% 100%)', backfaceVisibility: 'hidden' }}
                initial={false} animate={phase === 'opening' && !reduce ? { rotateX: -180 } : { rotateX: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: 'easeInOut' }}
              />
              {/* wax seal */}
              <m.button
                type="button" onClick={open} aria-label="Break the seal and open the invitation"
                className="absolute left-1/2 top-[42%] z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#8f6a1f] text-wine-deep shadow-lg"
                style={{ background: 'radial-gradient(circle at 35% 30%,#f3dc9b,#d9b25f 55%,#8f6a1f)' }}
                animate={phase === 'opening' ? { scale: reduce ? 1 : [1, 1.3, 0], opacity: [1, 1, 0] } : { scale: [1, 1.06, 1] }}
                transition={phase === 'opening' ? { duration: 0.5 } : { repeat: Infinity, duration: 2.4 }}
              >
                <span className="font-display text-xl font-semibold">VS</span>
              </m.button>
            </div>
            <m.div aria-hidden className="pointer-events-none absolute -inset-20 rounded-full"
              style={{ background: 'radial-gradient(circle,rgba(243,220,155,.8),transparent 65%)' }}
              initial={{ opacity: 0 }} animate={{ opacity: phase === 'opening' && !reduce ? [0, 0, 1, 0] : 0 }} transition={{ duration: 3 }} />
          </div>

          <Ganesh size={72} />
          <p className="font-script text-3xl foil">#ShruVi</p>
          <button type="button" onClick={open} className="btn-gold" disabled={phase !== 'closed'}>Open Your Invitation ✨</button>
        </m.div>
      )}
    </AnimatePresence>
  );
}
