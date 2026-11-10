import { useEffect, type RefObject } from 'react';

export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean, onEscape: () => void) {
  useEffect(() => {
    if (!active || !ref.current) return;
    const node = ref.current;
    const prev = document.activeElement as HTMLElement | null;
    const sel = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"]),input,textarea,select';
    const focusables = () => Array.from(node.querySelectorAll<HTMLElement>(sel));
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.stopPropagation(); onEscape(); return; }
      if (e.key !== 'Tab') return;
      const f = focusables(); if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prevOverflow; prev?.focus?.(); };
  }, [active, ref, onEscape]);
}
