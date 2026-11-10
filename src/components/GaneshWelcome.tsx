import { Ganesh } from './Ornaments';
import ParticleLayer from './ParticleLayer';

export default function GaneshWelcome() {
  return (
    <section aria-labelledby="welcome-title" className="chapter-dark relative overflow-hidden px-5 py-24 text-center">
      <ParticleLayer />
      <div className="relative mx-auto flex max-w-xl flex-col items-center gap-5">
        <div className="relative">
          <div aria-hidden className="diya-glow absolute -inset-10 rounded-full" style={{ background: 'radial-gradient(circle, rgba(240,160,48,.45), transparent 65%)' }} />
          <Ganesh size={220} className="relative" />
        </div>
        <p lang="hi" className="text-xl text-gold-light">|| श्री गणेशाय नमः ||</p>
        <h2 id="welcome-title" lang="hi" className="foil text-5xl">शुभ विवाह</h2>
        <p className="reveal max-w-md text-lg leading-relaxed text-ivory/95">
          With the blessings of Lord Ganesha, we invite you to celebrate the beginning of a beautiful journey.
        </p>
      </div>
    </section>
  );
}
