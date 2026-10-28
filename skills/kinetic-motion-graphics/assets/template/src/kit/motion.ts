import {Easing, interpolate, spring} from 'remotion';
import {FPS} from './theme';

// Durations in frames at 30fps, measured from professional reference work.
export const T = {
  fadeWord: 4, // small/secondary word fade-rise
  focusHero: 5, // hero word blur->sharp
  pop: 9, // starburst/badge overshoot settle
  slam: 6, // stamp/slam from big to 1
  dim: 6, // previous word dims when the next one lands
  exit: 5,
};

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const outCubic = Easing.bezier(0.22, 1, 0.36, 1);

export type Entry = 'rise' | 'focus' | 'pop' | 'slam' | 'type' | 'none';

export type Look = {
  opacity: number;
  transform: string;
  filter: string;
};

/** Returns the look of an element that enters at frame `at` (absolute frames). */
export function enter(kind: Entry, frame: number, at: number): Look {
  // +1: the element is already partly visible on its landing frame, so a cut never shows an empty frame
  const t = frame - at + 1;
  if (kind === 'none') return {opacity: t >= 0 ? 1 : 0, transform: 'none', filter: 'none'};
  if (t < 0) return {opacity: 0, transform: 'none', filter: 'none'};

  if (kind === 'rise') {
    const p = interpolate(t, [0, T.fadeWord + 2], [0, 1], {...clamp, easing: outCubic});
    return {
      opacity: interpolate(t, [0, T.fadeWord], [0, 1], clamp),
      transform: `translateY(${(1 - p) * 28}px)`,
      filter: `blur(${(1 - p) * 6}px)`,
    };
  }
  if (kind === 'focus') {
    const p = interpolate(t, [0, T.focusHero], [0, 1], {...clamp, easing: outCubic});
    return {
      opacity: interpolate(t, [0, 3], [0, 1], clamp),
      transform: `scale(${1.1 - 0.1 * p})`,
      filter: `blur(${(1 - p) * 16}px)`,
    };
  }
  if (kind === 'pop') {
    const sc = spring({frame: t, fps: FPS, config: {damping: 9, stiffness: 180, mass: 0.6}});
    return {
      opacity: interpolate(t, [0, 2], [0, 1], clamp),
      transform: `scale(${sc}) rotate(${(1 - sc) * -25}deg)`,
      filter: `blur(${interpolate(t, [0, 5], [8, 0], clamp)}px)`,
    };
  }
  // slam: from oversized to rest, then a tiny settle
  const sc = interpolate(t, [0, T.slam], [2.3, 1], {...clamp, easing: Easing.in(Easing.quad)});
  const settle = t > T.slam ? 1 + Math.sin((t - T.slam) * 1.6) * 0.03 * Math.exp(-(t - T.slam) / 4) : 1;
  return {
    opacity: interpolate(t, [0, 2], [0, 1], clamp),
    transform: `scale(${sc * settle}) rotate(-8deg)`,
    filter: `blur(${interpolate(t, [0, T.slam], [6, 0], clamp)}px)`,
  };
}

/** Opacity multiplier for a word that should step back once a newer word lands. */
export function dimAfter(frame: number, at?: number, to = 0.35) {
  if (at === undefined) return 1;
  return interpolate(frame, [at, at + T.dim], [1, to], clamp);
}

/** Slow ambient drift so the frame is never frozen. */
export function drift(frame: number, amp = 10, period = 90) {
  return Math.sin((frame / period) * Math.PI * 2) * amp;
}

/** Screen shake impulse at frame `at`. */
export function shake(frame: number, at: number, strength = 14) {
  const t = frame - at;
  if (t < 0 || t > 10) return 'translate(0px,0px)';
  const k = strength * Math.exp(-t / 2.5);
  return `translate(${Math.sin(t * 9.1) * k}px, ${Math.cos(t * 7.3) * k}px)`;
}

export const ramp = (frame: number, a: number, b: number, from = 0, to = 1, ease = outCubic) =>
  interpolate(frame, [a, b], [from, to], {...clamp, easing: ease});
