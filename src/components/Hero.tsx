import { useRef } from 'react';
import { m, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Monogram } from './Monogram';
import Countdown from './Countdown';
import { Mandala } from './Ornaments';
import ParticleLayer from './ParticleLayer';

function Kinetic({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <span className="inline-block">
      <span className="sr-only">{text}</span>
      {text.split('').map((c, i) => (
        <m.span key={i} aria-hidden className="inline-block"
          initial={reduce ? false : { opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + i * 0.07, duration: 0.6, ease: 'easeOut' }}>{c}</m.span>
      ))}
    </span>
  );
}

export default function Hero({ started }: { started: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const monoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.25]);
  const monoY = useTransform(scrollYProgress, [0, 0.5], [0, -120]);
  const monoOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
  const namesY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);

  return (
    <section id="home" ref={ref} aria-labelledby="hero-title" className="chapter-dark relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center">
      <ParticleLayer />
      <div aria-hidden className="absolute inset-0" style={{ background: 'repeating-linear-gradient(100deg, rgba(255,255,255,.03) 0 40px, transparent 40px 90px), radial-gradient(60% 50% at 50% 25%, rgba(243,220,155,.18), transparent 70%)' }} />
      <Mandala size={620} className="absolute -bottom-40 left-1/2 -translate-x-1/2 max-w-none" opacity={0.18} />
      <m.div style={reduce ? undefined : { scale: monoScale, y: monoY, opacity: monoOpacity }} className="relative z-10 mb-4">
        <Monogram size={84} />
      </m.div>
      <m.h1 id="hero-title" style={{ y: namesY }} className="relative z-10 font-display leading-[0.9]">
        <span className="foil block text-[clamp(3.5rem,17vw,11rem)] tracking-wide">{started ? <Kinetic text="VISHAL" delay={0.1} /> : 'VISHAL'}</span>
        <span className="font-script block text-[clamp(2rem,8vw,4.5rem)] text-gold-light">Weds</span>
        <span className="foil block text-[clamp(3.5rem,17vw,11rem)] tracking-wide">{started ? <Kinetic text="SHRUTI" delay={0.8} /> : 'SHRUTI'}</span>
      </m.h1>
      <p className="relative z-10 mt-6 max-w-md text-base text-ivory/90 sm:text-lg">Two Hearts. One Promise. Forever Together.</p>
      <p className="relative z-10 mt-2 font-script text-3xl text-gold-light">#ShruVi</p>
      <p className="relative z-10 mt-1 font-display text-2xl tracking-[0.25em] text-ivory">12 December 2026</p>
      <div className="relative z-10 mt-8"><Countdown /></div>
    </section>
  );
}
