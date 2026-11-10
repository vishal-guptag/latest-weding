import { useCallback, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useFocusTrap } from '../hooks/useFocusTrap';

export interface Photo { src: string; alt: string; width: number; height: number }

export default function Lightbox({ photos, index, onClose, onIndex }: { photos: Photo[]; index: number; onClose: () => void; onIndex: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, true, onClose);
  const go = useCallback((d: number) => onIndex((index + d + photos.length) % photos.length), [index, photos.length, onIndex]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [go]);
  const touch = useRef(0);
  const p = photos[index];
  return (
    <div ref={ref} role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4"
      onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); }}>
      <button type="button" aria-label="Close" onClick={onClose} className="touch absolute right-4 top-4 text-ivory"><X /></button>
      <button type="button" aria-label="Previous photo" onClick={() => go(-1)} className="touch absolute left-2 text-ivory"><ChevronLeft size={32} /></button>
      <img src={p.src} alt={p.alt} width={p.width} height={p.height} className="max-h-[85vh] max-w-full object-contain" />
      <button type="button" aria-label="Next photo" onClick={() => go(1)} className="touch absolute right-2 text-ivory"><ChevronRight size={32} /></button>
    </div>
  );
}
