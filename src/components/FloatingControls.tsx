import { useEffect, useState } from 'react';
import { ArrowUp, Share2, VolumeX } from 'lucide-react';
import type { MusicState } from '../hooks/useMusic';

interface Props { music: MusicState; onMusic: () => void; onShare: () => void }

export default function FloatingControls({ music, onMusic, onShare }: Props) {
  const [top, setTop] = useState(false);
  useEffect(() => {
    const f = () => setTop(window.scrollY > 700);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  const btn = 'touch flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-wine-deep/90 text-gold-light shadow-lg';
  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col gap-3" style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
      {top && <button type="button" aria-label="Back to top" className={btn} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={20} /></button>}
      <button type="button" aria-label="Share invitation" className={btn} onClick={onShare}><Share2 size={20} /></button>
      {music !== 'unavailable' && (
        <button type="button" onClick={onMusic} className={btn}
          aria-label={music === 'playing' ? 'Mute music' : music === 'blocked' ? 'Tap to play music' : 'Play music'} aria-pressed={music === 'playing'}>
          {music === 'blocked' ? <VolumeX size={20} /> : <span className={`eq ${music === 'playing' ? '' : 'paused'}`} aria-hidden><span /><span /><span /></span>}
        </button>
      )}
    </div>
  );
}
