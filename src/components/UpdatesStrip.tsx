import { weddingDetails } from '../data/weddingDetails';

export default function UpdatesStrip() {
  const text = weddingDetails.updates.trim();
  if (!text) return null;
  return (
    <div role="status" className="relative z-[70] bg-gold px-4 py-2 text-center text-sm font-semibold text-wine-deep">
      {text}
    </div>
  );
}
