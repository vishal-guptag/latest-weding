export function Monogram({ size = 64, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} role="img" aria-label="V and S monogram with a heart">
      <defs>
        <linearGradient id="mg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#8f6a1f" /><stop offset=".45" stopColor="#f3dc9b" /><stop offset="1" stopColor="#d9b25f" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="none" stroke="url(#mg)" strokeWidth="2" />
      <circle cx="50" cy="50" r="41" fill="none" stroke="url(#mg)" strokeWidth=".8" />
      <text x="36" y="62" textAnchor="middle" fontFamily="Cormorant Garamond, Georgia, serif" fontSize="40" fill="url(#mg)">V</text>
      <text x="64" y="62" textAnchor="middle" fontFamily="Cormorant Garamond, Georgia, serif" fontSize="40" fill="url(#mg)">S</text>
      <path d="M50 78 C42 70 38 66 38 62 a6 6 0 0 1 12 -3 a6 6 0 0 1 12 3 c0 4 -4 8 -12 16z" transform="translate(0 -3) scale(.9) translate(5.5 6)" fill="#c0392b" />
    </svg>
  );
}
