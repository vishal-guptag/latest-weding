import { flushSync } from 'react-dom';

/** Same-document View Transition when supported; otherwise an instant update. */
export function withViewTransition(update: () => void) {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (typeof doc.startViewTransition === 'function' && !reduce) {
    doc.startViewTransition(() => flushSync(update));
  } else {
    update();
  }
}
