import { useEffect, useRef } from 'react';

interface P { x: number; y: number; r: number; vy: number; vx: number; rot: number; vr: number; hue: string }

export default function ParticleLayer() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const mobile = window.innerWidth < 768;
    const count = mobile ? 14 : 30;
    const colors = ['#f0a030', '#d9a6a6', '#f3dc9b', '#d9b25f'];
    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const box = canvas.parentElement!.getBoundingClientRect(); w = Math.max(1, box.width); h = Math.max(1, box.height);
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const make = (initial: boolean): P => ({
      x: Math.random() * w, y: initial ? Math.random() * h : -20,
      r: 3 + Math.random() * 4, vy: 0.3 + Math.random() * 0.6, vx: (Math.random() - 0.5) * 0.4,
      rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.03, hue: colors[Math.floor(Math.random() * colors.length)],
    });
    const ps = Array.from({ length: count }, () => make(true));

    const tick = () => {
      if (!visible) { raf = requestAnimationFrame(tick); return; }
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.y += p.vy; p.x += p.vx + Math.sin(p.y / 40) * 0.3; p.rot += p.vr;
        if (p.y > h + 20) Object.assign(p, make(false));
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.globalAlpha = 0.55; ctx.fillStyle = p.hue;
        ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(tick);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);
    // Only animate while the host section is on screen.
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(canvas.parentElement!);
    const onVis = () => { cancelAnimationFrame(raf); if (!document.hidden) raf = requestAnimationFrame(tick); };
    document.addEventListener('visibilitychange', onVis);
    
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); document.removeEventListener('visibilitychange', onVis); ro.disconnect(); io.disconnect(); };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
