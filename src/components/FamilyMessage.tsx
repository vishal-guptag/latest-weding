import { weddingDetails } from '../data/weddingDetails';

export default function FamilyMessage() {
  const { hindiMessage } = weddingDetails;
  return (
    <section aria-label="Family message" className="px-5 py-24 text-center" style={{ background: 'radial-gradient(100% 100% at 50% 0%, #6b1530, #4a0f22 70%)' }}>
      <div className="gold-frame mx-auto max-w-2xl rounded-sm px-6 py-14">
        <blockquote lang="hi" className="space-y-3 text-[clamp(1.4rem,5vw,2.2rem)] leading-relaxed text-gold-light">
          {hindiMessage.lines.map((l) => <p key={l}>{l}</p>)}
        </blockquote>
        <p lang="hi" className="mt-8 text-lg text-ivory">{hindiMessage.signed}</p>
      </div>
    </section>
  );
}
