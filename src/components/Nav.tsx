import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Monogram } from './Monogram';
import { weddingDetails } from '../data/weddingDetails';
import { useFocusTrap } from '../hooks/useFocusTrap';

const ALL = [
  { id: 'home', label: 'Home' }, { id: 'events', label: 'Events' }, { id: 'venue', label: 'Venue' },
  { id: 'family', label: 'Family' }, { id: 'gallery', label: 'Gallery' }, { id: 'rsvp', label: 'RSVP' },
];

export default function Nav() {
  const items = ALL.filter((i) => i.id !== 'gallery' || weddingDetails.gallery.length > 0);
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sheet = useRef<HTMLDivElement>(null);
  useFocusTrap(sheet, open, () => setOpen(false));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
    }, { rootMargin: '-45% 0px -50% 0px' });
    items.forEach((i) => { const el = document.getElementById(i.id); if (el) io.observe(el); });
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const link = (id: string, label: string, cls = '') => (
    <a key={id} href={`#${id}`} onClick={() => setOpen(false)} aria-current={active === id ? 'true' : undefined}
      className={`touch inline-flex items-center px-3 text-sm tracking-wider ${active === id ? 'text-gold-light underline decoration-gold underline-offset-8' : 'text-ivory/90'} ${cls}`}>{label}</a>
  );

  return (
    <>
      <div aria-hidden className="progress-bar" />
      <header className="glass sticky top-0 z-50">
        <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between px-3 py-1">
          <a href="#home" aria-label="Back to the top" className="touch flex items-center" style={{ opacity: scrolled ? 1 : 0.0, transition: 'opacity .3s' }}><Monogram size={36} /></a>
          <div className="hidden md:flex">{items.map((i) => link(i.id, i.label))}</div>
          <button type="button" className="touch md:hidden text-gold-light" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}><Menu /></button>
        </nav>
      </header>
      {open && (
        <div ref={sheet} role="dialog" aria-modal="true" aria-label="Menu" className="chapter-dark fixed inset-0 z-[80] flex flex-col items-center justify-center gap-2">
          <button type="button" aria-label="Close menu" className="touch absolute right-4 top-4 text-gold-light" onClick={() => setOpen(false)}><X /></button>
          {items.map((i) => link(i.id, i.label, '!text-2xl font-display'))}
        </div>
      )}
    </>
  );
}
