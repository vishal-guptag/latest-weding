import { Phone } from 'lucide-react';
import { weddingDetails } from '../data/weddingDetails';

function Names({ list }: { list: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-2 gap-y-1 leading-relaxed">
      {list.map((n, i) => (
        <li key={n}>{n}{i < list.length - 1 && <span aria-hidden className="ml-2 text-gold-dark">·</span>}</li>
      ))}
    </ul>
  );
}

const tile = 'rounded-2xl border border-gold-dark/40 bg-ivory/70 p-6 shadow-sm';
const h = 'mb-3 font-display text-2xl font-semibold text-wine';

export default function FamilyDetails() {
  const { family } = weddingDetails;
  return (
    <section id="family" aria-labelledby="family-title" className="chapter-paper px-4 py-24">
      <h2 id="family-title" className="foil foil-paper mb-10 text-center font-display text-[clamp(2.5rem,9vw,5rem)]">With Love &amp; Blessings</h2>
      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
        <div className={`${tile} md:col-span-2`}>
          <h3 className={h}>A cordial invitation from:</h3>
          {family.hosts.map((n) => <p key={n} className="font-display text-2xl">{n}</p>)}
          <p className="mt-2">{family.address}</p>
          <p className="mt-3 flex flex-wrap items-center gap-3">
            <span>Contact:</span>
            {family.phones.map((p) => (
              <a key={p} href={`tel:${p}`} className="touch inline-flex items-center gap-1 rounded-full border border-wine/40 px-3 font-semibold text-wine"><Phone size={14} aria-hidden />{p}</a>
            ))}
          </p>
        </div>
        <div id="rsvp" className={`${tile}`}><h3 className={h}>R.S.V.P.</h3><Names list={family.rsvp} /></div>
        <div className={tile}><h3 className={h}>Special Invitation</h3><Names list={family.special} /></div>
        <div className={`${tile} md:col-span-2`}><h3 className={h}>W.B.C.F.</h3><Names list={family.wbcf} /></div>
      </div>
    </section>
  );
}
