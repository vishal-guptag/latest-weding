import { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { weddingDetails } from '../data/weddingDetails';
import { mapLinks } from '../utils/maps';
import { Jharokha } from './Ornaments';

const EMBED = 'https://www.google.com/maps?q=Meraki+Hotel+%26+Banquets+Partapur+Meerut&output=embed';

export default function Venue() {
  const { venue } = weddingDetails;
  const [showMap, setShowMap] = useState(false);
  return (
    <section id="venue" aria-labelledby="venue-title" className="chapter-dark px-4 py-24">
      <h2 id="venue-title" className="foil mb-10 text-center font-display text-[clamp(2.5rem,9vw,5rem)]">Venue</h2>
      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
        <div className="glass-card flex items-center justify-center rounded-2xl p-6 md:row-span-2">
          <Jharokha className="h-56 w-auto" />
        </div>
        <div className="glass-card rounded-2xl p-6 md:col-span-2">
          <MapPin aria-hidden className="pin-bounce mb-3 text-gold" size={36} />
          <h3 className="font-display text-3xl font-semibold text-gold-light sm:text-4xl">{venue.name}</h3>
          <p className="mt-3 leading-relaxed text-ivory/95">{venue.address}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a className="btn-gold" href={mapLinks.location} target="_blank" rel="noopener noreferrer">📍 View Location</a>
            <a className="btn-gold btn-ghost" href={mapLinks.directions} target="_blank" rel="noopener noreferrer">🚗 Get Directions</a>
          </div>
        </div>
        <div className="glass-card overflow-hidden rounded-2xl md:col-span-2">
          {showMap ? (
            <iframe title="Map of Meraki Hotel & Banquets, Partapur, Meerut" src={EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-72 w-full border-0" />
          ) : (
            <button type="button" onClick={() => setShowMap(true)} className="flex h-72 w-full flex-col items-center justify-center gap-2 text-gold-light">
              <MapPin aria-hidden size={32} /><span className="font-semibold">Tap to load map</span>
              <span className="text-sm text-ivory/80">{venue.shortName}, Partapur, Meerut</span>
              <Navigation aria-hidden size={0} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
