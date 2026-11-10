import { useCallback, useEffect, useRef, useState } from 'react';

export type MusicState = 'unavailable' | 'playing' | 'paused' | 'blocked';
declare const __MUSIC_SRC__: string;
const SRC = typeof __MUSIC_SRC__ === 'string' ? __MUSIC_SRC__ : '';

export function useMusic() {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<MusicState>(SRC ? 'paused' : 'unavailable');
  const wasPlaying = useRef(false);

  const get = useCallback(() => {
    if (!audio.current) {
      const a = new Audio();
      a.src = SRC; a.loop = true; a.preload = 'none'; a.volume = 0.6;
      a.addEventListener('error', () => setState('unavailable'));
      audio.current = a;
    }
    return audio.current;
  }, []);

  const play = useCallback(async () => {
    if (!SRC) return;
    const a = get();
    try { await a.play(); setState('playing'); }
    catch { setState((s) => (s === 'unavailable' ? s : 'blocked')); }
  }, [get]);

  const pause = useCallback(() => { audio.current?.pause(); setState((s) => (s === 'unavailable' ? s : 'paused')); }, []);
  const toggle = useCallback(() => { (audio.current && !audio.current.paused ? pause : play)(); }, [pause, play]);

  useEffect(() => {
    const onVis = () => {
      const a = audio.current; if (!a) return;
      if (document.hidden) { wasPlaying.current = !a.paused; a.pause(); }
      else if (wasPlaying.current) { a.play().catch(() => undefined); }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => { document.removeEventListener('visibilitychange', onVis); audio.current?.pause(); };
  }, []);

  return { state, play, pause, toggle };
}
