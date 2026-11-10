import { lazy, Suspense, useState } from 'react';
import { weddingDetails } from '../data/weddingDetails';
import { withViewTransition } from '../utils/viewTransition';

const Lightbox = lazy(() => import('./Lightbox'));

export default function Gallery() {
  const photos = weddingDetails.gallery;
  const [open, setOpen] = useState<number | null>(null);
  if (!photos.length) return null; // owner has not supplied photographs yet
  return (
    <section id="gallery" aria-labelledby="gal-title" className="chapter-paper px-4 py-24">
      <h2 id="gal-title" className="foil foil-paper mb-10 text-center font-display text-[clamp(2.5rem,9vw,5rem)]">Our Wedding Story</h2>
      <div className="mx-auto max-w-5xl columns-2 gap-3 md:columns-3">
        {photos.map((p, i) => (
          <button key={p.src} type="button" onClick={() => withViewTransition(() => setOpen(i))} className="mb-3 block w-full overflow-hidden rounded-lg">
            <img src={p.src} alt={p.alt} width={p.width} height={p.height} loading="lazy" decoding="async" className="h-auto w-full" style={{ aspectRatio: `${p.width} / ${p.height}` }} />
          </button>
        ))}
      </div>
      {open !== null && (
        <Suspense fallback={null}>
          <Lightbox photos={photos} index={open} onIndex={setOpen} onClose={() => withViewTransition(() => setOpen(null))} />
        </Suspense>
      )}
    </section>
  );
}
