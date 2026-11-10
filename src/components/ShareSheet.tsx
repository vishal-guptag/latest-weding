import { useRef, useState } from 'react';
import { Copy, MessageCircle, Share2, X } from 'lucide-react';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { buildShareMessage, buildWhatsAppUrl } from '../utils/share';
import { weddingDetails } from '../data/weddingDetails';

export default function ShareSheet({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  useFocusTrap(ref, true, onClose);

  const copy = async () => {
    try { await navigator.clipboard.writeText(weddingDetails.siteUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    catch { window.prompt('Copy this link', weddingDetails.siteUrl); }
  };
  const more = async () => {
    try { await navigator.share({ title: '#ShruVi — Vishal ❤️ Shruti', text: buildShareMessage(), url: weddingDetails.siteUrl }); } catch { /* cancelled */ }
  };
  const row = 'btn-gold btn-ghost w-full justify-start';
  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/60 sm:items-center" onClick={onClose}>
      <div ref={ref} role="dialog" aria-modal="true" aria-label="Share invitation" onClick={(e) => e.stopPropagation()} className="chapter-dark w-full max-w-sm rounded-t-2xl border border-gold/50 p-6 sm:rounded-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl text-gold-light">Share invitation</h2>
          <button type="button" aria-label="Close" className="touch text-gold-light" onClick={onClose}><X /></button>
        </div>
        <div className="flex flex-col gap-3">
          <a className={row} href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden /> Share via WhatsApp</a>
          <button type="button" className={row} onClick={copy}><Copy size={18} aria-hidden /> {copied ? 'Link copied ✓' : 'Copy Invitation Link'}</button>
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button type="button" className={row} onClick={more}><Share2 size={18} aria-hidden /> More options</button>
          )}
        </div>
        <p role="status" className="sr-only">{copied ? 'Link copied' : ''}</p>
      </div>
    </div>
  );
}
