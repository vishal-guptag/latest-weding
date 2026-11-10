import type { WeddingEvent } from '../../data/weddingDetails';

const G = 'url(#gold)';
export function GoldDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
      <defs>
        <linearGradient id="gold" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#8f6a1f" /><stop offset=".4" stopColor="#f3dc9b" />
          <stop offset=".55" stopColor="#e8d9f0" /><stop offset=".7" stopColor="#d9b25f" /><stop offset="1" stopColor="#8f6a1f" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Devotional line-art Ganesh Ji in an antique-gold circular frame. */
export function Ganesh({ size = 220, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className={className} role="img" aria-label="Lord Ganesha in a golden frame" fill="none" stroke={G} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="100" cy="100" r="96" strokeWidth="2.4" />
      <circle cx="100" cy="100" r="89" strokeWidth=".8" />
      {Array.from({ length: 24 }).map((_, i) => (
        <line key={i} x1="100" y1="6" x2="100" y2="12" transform={`rotate(${i * 15} 100 100)`} />
      ))}
      {/* crown */}
      <path d="M78 62 L84 40 L92 54 L100 34 L108 54 L116 40 L122 62 Z" />
      <circle cx="100" cy="46" r="2.4" fill={G} />
      {/* ears */}
      <path d="M72 70 C40 56 28 96 52 120 C60 128 70 122 74 112" />
      <path d="M128 70 C160 56 172 96 148 120 C140 128 130 122 126 112" />
      {/* head */}
      <path d="M74 66 C74 58 126 58 126 66 C130 90 122 108 112 116 L88 116 C78 108 70 90 74 66 Z" />
      {/* tilak */}
      <path d="M100 68 v14" strokeWidth="2.2" /><path d="M93 72 q7 -6 14 0" />
      {/* eyes */}
      <path d="M86 90 q5 -4 10 0 M104 90 q5 -4 10 0" />
      {/* trunk curling to the left */}
      <path d="M100 94 C100 116 98 134 88 146 C78 158 66 156 66 146 C66 138 76 138 78 146" />
      <path d="M106 94 C108 112 106 128 100 138" />
      {/* tusk */}
      <path d="M112 112 q8 8 4 18" />
      {/* modak bowl and body hint */}
      <path d="M60 170 C70 150 130 150 140 170" />
      <path d="M84 150 q16 -14 32 0" />
      <circle cx="100" cy="150" r="3" fill={G} />
      {/* lotus base */}
      <path d="M70 178 q30 -22 60 0 M82 178 q18 -16 36 0" />
    </svg>
  );
}

export function Mandala({ size = 300, className = '', opacity = 0.35 }: { size?: number; className?: string; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none" stroke={G} strokeWidth=".9" opacity={opacity}>
      {Array.from({ length: 16 }).map((_, i) => (
        <g key={i} transform={`rotate(${i * 22.5} 100 100)`}>
          <path d="M100 100 C92 70 92 40 100 14 C108 40 108 70 100 100Z" />
          <path d="M100 40 C96 52 104 52 100 62" />
        </g>
      ))}
      <circle cx="100" cy="100" r="18" /><circle cx="100" cy="100" r="30" /><circle cx="100" cy="100" r="96" />
    </svg>
  );
}

export function Jharokha({ className = '', stroke = G }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 120 160" className={className} aria-hidden="true" fill="none" stroke={stroke} strokeWidth="1.4" strokeLinecap="round">
      <path d="M10 156 V70 C10 30 40 12 60 4 C80 12 110 30 110 70 V156" />
      <path d="M20 156 V72 C20 40 44 24 60 16 C76 24 100 40 100 72 V156" strokeWidth=".8" />
      <path d="M60 4 v-4 M54 8 h12" />
      <circle cx="60" cy="34" r="6" /><path d="M42 60 q18 -18 36 0" />
      <path d="M2 156 h116" strokeWidth="2" />
    </svg>
  );
}

export function Garland({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 40" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path d="M0 6 Q100 40 200 6 T400 6" fill="none" stroke="#8f6a1f" strokeWidth="1" />
      {Array.from({ length: 17 }).map((_, i) => {
        const x = i * 25;
        const y = 6 + Math.sin((x / 200) * Math.PI) * 14 * (x <= 200 ? 1 : -1) * 0 + 12 * Math.abs(Math.sin((x / 200) * Math.PI)) ;
        return <circle key={i} cx={x} cy={y} r="6" fill={i % 2 ? '#f0a030' : '#d9b25f'} />;
      })}
    </svg>
  );
}

export function Divider({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 20" className={className} aria-hidden="true" fill="none" stroke={G} strokeWidth="1.2">
      <path d="M0 10 H96 M144 10 H240" />
      <path d="M120 2 l8 8 -8 8 -8 -8z" /><circle cx="104" cy="10" r="2" /><circle cx="136" cy="10" r="2" />
    </svg>
  );
}

/** One consistent line-art style for all six events. */
export function EventArt({ art, size = 120 }: { art: WeddingEvent['art']; size?: number }) {
  const common = { fill: 'none', stroke: G, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const body = (() => {
    switch (art) {
      case 'baan':
        return (<g {...common}>
          {Array.from({ length: 8 }).map((_, i) => <ellipse key={i} cx="60" cy="34" rx="8" ry="16" transform={`rotate(${i * 45} 60 50)`} />)}
          <circle cx="60" cy="50" r="7" /><path d="M30 92 q30 22 60 0 M36 92 q24 -16 48 0" />
        </g>);
      case 'chaak':
        return (<g {...common}>
          <circle cx="60" cy="60" r="34" /><circle cx="60" cy="60" r="8" />
          {Array.from({ length: 8 }).map((_, i) => <line key={i} x1="60" y1="26" x2="60" y2="52" transform={`rotate(${i * 45} 60 60)`} />)}
          <path d="M34 100 h52" />
        </g>);
      case 'ghurchari':
        return (<g {...common}>
          <path d="M40 100 C40 70 48 50 66 34 L78 20 L82 36 C92 44 96 56 90 66 L82 62 C78 72 78 84 82 100" />
          <path d="M74 44 l6 -2" /><circle cx="84" cy="46" r="1.5" fill={G} />
          <path d="M46 70 q14 6 28 -2" strokeDasharray="3 4" />
        </g>);
      case 'barat':
        return (<g {...common}>
          <ellipse cx="60" cy="66" rx="30" ry="18" /><path d="M30 66 v-8 M90 66 v-8" />
          {Array.from({ length: 5 }).map((_, i) => <path key={i} d={`M${34 + i * 13} 52 l7 28 M${34 + i * 13} 80 l7 -28`} strokeWidth="1.2" />)}
          <path d="M10 24 Q60 4 110 24" />{[22, 40, 60, 80, 98].map((x) => <circle key={x} cx={x} cy={x < 60 ? 22 - (x > 30 ? 4 : 0) : 22 - (x < 90 ? 4 : 0)} r="2.4" className="twinkle" fill={G} />)}
        </g>);
      case 'chadat':
        return (<g {...common}>
          <path d="M22 100 V40 M98 100 V40 M16 40 H104 M22 40 C22 22 60 12 60 12 C60 12 98 22 98 40" />
          <circle cx="48" cy="74" r="5" /><path d="M48 80 v18 M42 98 h12" />
          <circle cx="72" cy="74" r="5" /><path d="M72 80 v18 M66 98 h12" />
        </g>);
      case 'dinner':
        return (<g {...common}>
          <path d="M60 18 q-5 8 0 14 q5 -6 0 -14z" fill={G} /><path d="M60 34 v34" />
          <path d="M20 92 H100 M30 92 q30 -22 60 0" /><path d="M44 74 h32" />
        </g>);
    }
  })();
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label={`${art} illustration`}>
      <circle cx="60" cy="60" r="57" fill="rgba(217,178,95,.08)" stroke={G} strokeWidth="1" />
      {body}
    </svg>
  );
}
