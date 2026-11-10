export interface WeddingEvent {
  id: string;
  number: string;
  name: string;
  date: string; // ISO yyyy-mm-dd
  time: string; // 24h HH:mm, Asia/Kolkata
  timeLabel: string;
  dayLabel: string;
  art: 'baan' | 'chaak' | 'ghurchari' | 'barat' | 'chadat' | 'dinner';
}

const SITE_URL = (import.meta.env?.VITE_SITE_URL as string | undefined) ?? 'https://shruvi-wedding.netlify.app';

export const weddingDetails = {
  siteUrl: SITE_URL,
  hashtag: '#ShruVi',
  tagline: 'Two Souls, One Beautiful Journey',
  weddingDate: '2026-12-12',
  countdownTarget: '2026-12-12T00:00:00+05:30',
  updates: '' as string,
  groom: 'Vishal',
  bride: 'Shruti',
  invite: {
    hosts: 'Mrs. Mamta Gupta & Mr. Surendra Kr. Gupta',
    request:
      'request your gracious presence and solicit your blessings on the auspicious occasion of the',
    ceremony: 'Wedding Ceremony',
    ofSon: 'of their beloved son',
    groomLine: 'Grand S/o Late Smt. Murti Devi & Late Shri Kanti Prasad Gupta',
    brideLine: 'D/o Mrs. Pinky Bansal & Mr. Sanjay Kr. Bansal, Meerut',
  },
  events: [
    { id: 'baan', number: '01', name: 'BAAN', date: '2026-12-11', time: '09:00', timeLabel: '09:00 AM', dayLabel: 'FRIDAY — 11 DECEMBER 2026', art: 'baan' },
    { id: 'chaak', number: '02', name: 'CHAAK', date: '2026-12-11', time: '11:00', timeLabel: '11:00 AM', dayLabel: 'FRIDAY — 11 DECEMBER 2026', art: 'chaak' },
    { id: 'ghurchari', number: '03', name: 'GHURCHARI', date: '2026-12-12', time: '15:00', timeLabel: '03:00 PM', dayLabel: 'SATURDAY — 12 DECEMBER 2026', art: 'ghurchari' },
    { id: 'barat', number: '04', name: 'DEPARTURE OF BARAT', date: '2026-12-12', time: '18:00', timeLabel: '06:00 PM', dayLabel: 'SATURDAY — 12 DECEMBER 2026', art: 'barat' },
    { id: 'chadat', number: '05', name: 'CHADAT', date: '2026-12-12', time: '19:00', timeLabel: '07:00 PM', dayLabel: 'SATURDAY — 12 DECEMBER 2026', art: 'chadat' },
    { id: 'dinner', number: '06', name: 'DINNER', date: '2026-12-12', time: '20:00', timeLabel: '08:00 PM', dayLabel: 'SATURDAY — 12 DECEMBER 2026', art: 'dinner' },
  ] as WeddingEvent[],
  venue: {
    name: 'MERAKI HOTEL & BANQUETS',
    shortName: 'Meraki Hotel & Banquets',
    address:
      'Delhi Road, Beside Radha Govind Maruti Car Showroom, Opposite Metro Pillar No. 1550, Partapur, Meerut, Uttar Pradesh.',
    locationUrl:
      'https://www.google.com/maps/search/?api=1&query=Meraki+Hotel+%26+Banquets+Partapur+Meerut',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Meraki+Hotel+%26+Banquets+Partapur+Meerut',
  },
  family: {
    hosts: ['Devendra Kumar Gupta', 'Surendra Kumar Gupta'],
    address: '4, Shiv Sarovar Bank Colony, Garh Road, Meerut.',
    phones: ['9760121236', '8077795772'],
    rsvp: [
      'Jagdish Prasad Singhal',
      'Satya Prakash Singhal',
      'Rakesh Singhal',
      'Virendra Gupta',
      'Mukesh Gupta',
      'And All Singhal Family',
    ],
    special: [
      'Sneha Gupta – Nitin Gupta',
      'Shivani Garg – Ashish Garg',
      'Kanchan Singhal – Nikhil Singhal',
    ],
    wbcf: [
      'Akhil Gupta',
      'Sachin Gupta',
      'Dipanshu Gupta',
      'Himanshu Gupta',
      'Akshat Agarwal',
      'Atharv Agarwal',
      'Aakhya Agarwal',
      'Ojasvi Agarwal',
      'Aadhya Agarwal',
    ],
  },
  hindiMessage: {
    lines: [
      'सखियों की रात होगी, जश्न ज़रा हट के होगा।',
      'हमारे मामा व चाचा की शादी में अंदाज़ ज़रा हट के होगा।',
    ],
    signed: 'आराध्या गुप्ता, आद्विक गुप्ता, वैभव सिंघल, लक्ष्य सिंघल',
  },
  gallery: [] as { src: string; alt: string; width: number; height: number }[],
};

export type WeddingDetails = typeof weddingDetails;
