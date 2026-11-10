import { weddingDetails } from '../data/weddingDetails';

export function buildShareMessage(siteUrl: string = weddingDetails.siteUrl): string {
  return [
    '💍 With immense joy, we invite you to celebrate the wedding of Vishal ❤️ Shruti!',
    '',
    '📅 Wedding Date: 12 December 2026',
    '',
    '✨ Pre-Wedding Ceremonies:',
    '11 December 2026',
    '',
    '📍 Venue:',
    'Meraki Hotel & Banquets,',
    'Partapur, Meerut.',
    '',
    'Your presence and blessings will make our celebration even more special.',
    '',
    'Please join us in celebrating #ShruVi ❤️',
    '',
    'We look forward to celebrating with you!',
    '',
    siteUrl,
  ].join('\n');
}

export function buildWhatsAppUrl(siteUrl?: string): string {
  return 'https://wa.me/?text=' + encodeURIComponent(buildShareMessage(siteUrl));
}
