import { useEffect, useRef, useState } from 'react';
import { m } from 'motion/react';
import { Monogram } from './Monogram';
import { weddingDetails } from '../data/weddingDetails';
import ParticleLayer from './ParticleLayer';

export default function Finale() {
  const ref = useRef<HTMLElement>(null);
  const [qr, setQr] = useState<string | null>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const QR = await import('qrcode');
      setQr(await QR.toDataURL(weddingDetails.siteUrl, { margin: 1, width: 320, color: { dark: '#3f0d1c', light: '#f8f0e0' } }));
    }, { rootMargin: '300px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <footer ref={ref} aria-label="Closing message" className="chapter-dark relative overflow-hidden px-5 py-24 text-center">
      <ParticleLayer />
      <div aria-hidden className="diya-glow absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(circle, rgba(243,220,155,.3), transparent 65%)' }} />
      <m.div className="relative mx-auto w-fit" animate={{ scale: [1, 1.06, 1] }} transition={{ repeat: Infinity, duration: 4 }}><Monogram size={110} /></m.div>
      <h2 className="foil relative mt-6 font-display text-[clamp(2rem,7vw,3.5rem)]">Two Families, Two Hearts, One Beautiful Beginning.</h2>
      <p className="relative mx-auto mt-4 max-w-md text-lg">Your presence will make our special day even more memorable.</p>
      <p className="relative mt-8 font-display text-3xl text-gold-light">With Love, Vishal ❤️ Shruti</p>
      <p className="relative mt-2 font-script text-3xl text-gold-light">#ShruVi</p>
      <p className="relative mt-1 font-display tracking-[0.3em]">12.12.2026</p>
      <div className="relative mx-auto mt-10 w-fit rounded-xl bg-ivory p-3">
        {qr ? <img src={qr} alt="QR code linking to this invitation website" width={160} height={160} /> : <div className="h-40 w-40" aria-hidden />}
      </div>
      {qr && <a href={qr} download="shruvi-invitation-qr.png" className="relative mt-3 inline-block text-sm text-gold-light underline">Download QR code</a>}
    </footer>
  );
}
