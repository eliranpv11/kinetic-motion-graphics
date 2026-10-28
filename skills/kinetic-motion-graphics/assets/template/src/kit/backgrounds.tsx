import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, s} from './theme';
import {drift, ramp} from './motion';

// Every background keeps a slow ambient motion so no frame is ever frozen.

export const Solid: React.FC<{color: string; grain?: boolean}> = ({color, grain = true}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: color}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at ${50 + drift(f, 6, 160)}% ${40 + drift(f, 4, 200)}%, rgba(255,255,255,0.10), transparent 60%)`,
        }}
      />
      {grain && <Grain />}
    </AbsoluteFill>
  );
};

export const Grain: React.FC<{opacity?: number}> = ({opacity = 0.06}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{opacity, mixBlendMode: 'overlay', pointerEvents: 'none'}}>
      <svg width="100%" height="100%">
        <filter id={`g${f % 4}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={f % 4} />
        </filter>
        <rect width="100%" height="100%" filter={`url(#g${f % 4})`} />
      </svg>
    </AbsoluteFill>
  );
};

/** Comic sunburst with halftone dots, rays rotate slowly. */
export const Sunburst: React.FC<{a?: string; b?: string}> = ({a = C.comicYellow, b = '#FFDC6B'}) => {
  const f = useCurrentFrame();
  const rot = f * 0.25;
  return (
    <AbsoluteFill style={{background: a, overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 3200,
          height: 3200,
          marginLeft: -1600,
          marginTop: -1600,
          transform: `rotate(${rot}deg)`,
          background: `repeating-conic-gradient(${b} 0deg 7deg, ${a} 7deg 14deg)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: 'radial-gradient(rgba(180,90,0,0.22) 3px, transparent 3.5px)',
          backgroundSize: '22px 22px',
        }}
      />
    </AbsoluteFill>
  );
};

/** Dark stage; a light cone switches on at `on` seconds. */
export const Spotlight: React.FC<{on: number; x?: number; y?: number}> = ({on, x = 50, y = 62}) => {
  const f = useCurrentFrame();
  const t = f - s(on);
  const flick = t < 0 ? 0 : t < 2 ? 1 : t < 3 ? 0.55 : t < 5 ? 1 : 0.92 + drift(f, 0.04, 23);
  return (
    <AbsoluteFill style={{background: '#070707'}}>
      <AbsoluteFill
        style={{
          opacity: flick,
          background: `conic-gradient(from 180deg at ${x}% -8%, transparent 162deg, rgba(255,240,215,0.30) 172deg, rgba(255,240,215,0.42) 180deg, rgba(255,240,215,0.30) 188deg, transparent 198deg)`,
          filter: 'blur(10px)',
        }}
      />
      <AbsoluteFill
        style={{
          opacity: flick,
          background: `radial-gradient(ellipse 34% 4% at ${x}% ${y}%, rgba(255,240,215,0.45), transparent 70%)`,
        }}
      />
      <Grain opacity={0.08} />
    </AbsoluteFill>
  );
};

/** Blueprint grid that slowly pans. */
export const Blueprint: React.FC = () => {
  const f = useCurrentFrame();
  const off = f * 0.6;
  return (
    <AbsoluteFill style={{background: C.blueprint}}>
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.10) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.10) 2px, transparent 2px), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '120px 120px, 120px 120px, 24px 24px, 24px 24px',
          backgroundPosition: `${off}px ${off}px`,
        }}
      />
    </AbsoluteFill>
  );
};

/** Deep space gradient with drifting glow blobs and twinkling sparkles. */
export const Cosmic: React.FC = () => {
  const f = useCurrentFrame();
  const blobs = [
    {x: 20, y: 30, c: '#7B2FF7', r: 520},
    {x: 80, y: 55, c: '#F72FA4', r: 460},
    {x: 30, y: 80, c: '#2F6BF7', r: 560},
  ];
  return (
    <AbsoluteFill style={{background: C.cosmic, overflow: 'hidden'}}>
      {blobs.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${b.x + drift(f + i * 40, 4, 140)}%`,
            top: `${b.y + drift(f + i * 70, 3, 170)}%`,
            width: b.r * 2,
            height: b.r * 2,
            marginLeft: -b.r,
            marginTop: -b.r,
            borderRadius: '50%',
            background: b.c,
            filter: 'blur(140px)',
            opacity: 0.75,
          }}
        />
      ))}
      {Array.from({length: 26}).map((_, i) => {
        const x = (i * 37.7) % 100;
        const y = (i * 61.3) % 100;
        const tw = 0.4 + 0.6 * Math.abs(Math.sin((f + i * 11) / 14));
        return (
          <div key={i} style={{position: 'absolute', left: `${x}%`, top: `${y}%`, color: 'white', fontSize: 22 + (i % 3) * 10, opacity: tw}}>
            ✦
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/** Neutral studio wall with ceiling lights that switch on one after another. */
export const Studio: React.FC<{on: number}> = ({on}) => {
  const f = useCurrentFrame();
  const lit = ramp(f, s(on), s(on) + 8);
  return (
    <AbsoluteFill style={{background: interpolate(lit, [0, 1], [0, 1]) > 0.5 ? '#E9E7E3' : '#2B2B2B'}}>
      <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 55%, rgba(255,255,255,${0.9 * lit}), rgba(0,0,0,${0.5 * (1 - lit)}) 70%)`}} />
      <div style={{position: 'absolute', top: 70, left: 0, right: 0, height: 14, background: '#1A1A1A'}} />
      {[0, 1, 2, 3, 4].map((i) => {
        const on_i = ramp(f, s(on) + i * 2, s(on) + i * 2 + 3);
        return (
          <div key={i} style={{position: 'absolute', top: 84, left: 150 + i * 190, width: 46, height: 70, background: '#151515', borderRadius: '0 0 10px 10px'}}>
            <div style={{position: 'absolute', bottom: -6, left: 6, width: 34, height: 12, borderRadius: 6, background: `rgba(255,248,220,${on_i})`, boxShadow: `0 0 ${60 * on_i}px ${20 * on_i}px rgba(255,248,220,${0.6 * on_i})`}} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/** Circle wipe in a solid colour: the classic hard transition between ideas. */
export const IrisWipe: React.FC<{at: number; color?: string; dur?: number}> = ({at, color = C.accent, dur = 9}) => {
  const f = useCurrentFrame();
  const t = f - s(at);
  if (t < 0 || t > dur * 2) return null;
  const r = t <= dur ? ramp(t, 0, dur, 0, 1500) : ramp(t, dur, dur * 2, 1500, 0);
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: 540 - r, top: 960 - r, width: r * 2, height: r * 2, borderRadius: '50%', background: color}} />
    </AbsoluteFill>
  );
};
