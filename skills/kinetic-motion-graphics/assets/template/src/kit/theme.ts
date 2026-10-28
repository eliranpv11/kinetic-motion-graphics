import {loadFont} from '@remotion/google-fonts/Rubik';

// One heavy Hebrew-capable family carries the whole video. Weights do the hierarchy.
export const {fontFamily: FONT} = loadFont('normal', {
  weights: ['500', '700', '900'],
  subsets: ['hebrew', 'latin'],
});

export const FPS = 30;
export const W = 1080;
export const H = 1920;

// Base palette: brand accent + ink + cream. Each scene may add ONE "event" colour on top.
export const C = {
  accent: '#D97757', // Claude orange
  accentDeep: '#B85A3C',
  ink: '#141413',
  inkSoft: '#1E1D1B',
  cream: '#F0EBE3',
  paper: '#FAF8F4',
  white: '#FFFFFF',
  muted: '#8C877D',
  mutedDark: '#5A564F',
  // event colours (one per scene, never mixed)
  comicYellow: '#FFC93C',
  comicRed: '#E8442E',
  blueprint: '#1F4FD8',
  cosmic: '#2A1670',
  neonGreen: '#2BD67B',
};

// Type scale for 1080x1920. Hero words fill ~70-85% of the width.
export const SIZE = {
  hero: 230,
  big: 150,
  line: 92,
  small: 58,
  caption: 40,
};

export const s = (seconds: number) => Math.round(seconds * FPS);
