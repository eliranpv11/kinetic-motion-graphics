import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FONT, s} from './theme';
import {drift, enter, ramp} from './motion';

// "Text becomes video" metaphors: documents, paste, Enter, scanning, film, waveform, morphs.

export type ParaWord = {
  t: string;
  /** seconds: marker highlight sweeps behind the word */
  hi?: number;
  /** seconds: word lights up in the accent (scan result) */
  lit?: number;
  /** seconds: word lifts off the page and flies away */
  fly?: number;
};

/** A document page with a paragraph of words that can be highlighted, lit, or lifted off. */
export const DocPage: React.FC<{
  at: number;
  title?: string;
  words: ParaWord[];
  caret?: boolean;
  width?: number;
  scan?: [number, number];
  fontSize?: number;
}> = ({at, title = 'טיוטה.txt', words, caret = true, width = 900, scan, fontSize = 54}) => {
  const f = useCurrentFrame();
  const look = enter('rise', f, s(at));
  return (
    <div style={{...look, width, background: C.paper, borderRadius: 26, boxShadow: '0 40px 120px rgba(0,0,0,0.35)', overflow: 'hidden', position: 'relative'}}>
      <div style={{height: 70, background: '#E6E1D6', display: 'flex', alignItems: 'center', padding: '0 28px', gap: 12, direction: 'ltr'}}>
        {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
          <div key={c} style={{width: 20, height: 20, borderRadius: '50%', background: c}} />
        ))}
        <div style={{flex: 1, textAlign: 'center', fontFamily: FONT, fontWeight: 500, fontSize: 30, color: C.mutedDark, marginRight: 60}}>{title}</div>
      </div>
      <div style={{padding: '50px 56px 64px', direction: 'rtl', fontFamily: FONT, fontWeight: 500, fontSize, lineHeight: 1.55, color: '#55524B', display: 'flex', flexWrap: 'wrap', gap: '0 16px', position: 'relative'}}>
        {words.map((w, i) => {
          const hi = w.hi !== undefined ? ramp(f, s(w.hi), s(w.hi) + 7) : 0;
          const lit = w.lit !== undefined ? ramp(f, s(w.lit), s(w.lit) + 4) : 0;
          const fl = w.fly !== undefined ? f - s(w.fly) : -1;
          const flyP = fl < 0 ? 0 : Math.min(1, (fl / 14) ** 1.6);
          const dir = (i % 2 ? 1 : -1) * (60 + (i * 37) % 120);
          return (
            <span
              key={i}
              style={{
                position: 'relative',
                color: lit > 0.5 ? C.ink : undefined,
                fontWeight: lit > 0.5 || hi > 0.5 ? 700 : 500,
                transform: `translate(${dir * flyP}px, ${-1400 * flyP}px) rotate(${dir * 0.2 * flyP}deg) scale(${1 + 0.6 * flyP})`,
                opacity: 1 - flyP * 0.9,
                filter: `blur(${flyP * 6}px)`,
                display: 'inline-block',
              }}
            >
              <span style={{position: 'absolute', inset: '12% -6px', background: C.accent, borderRadius: 6, transformOrigin: 'right', transform: `scaleX(${Math.max(hi, lit)})`, zIndex: 0, boxShadow: lit > 0 ? `0 0 ${30 * lit}px ${C.accent}` : 'none'}} />
              <span style={{position: 'relative', zIndex: 1}}>{w.t}</span>
            </span>
          );
        })}
        {caret && <span style={{width: 5, height: fontSize * 1.1, background: C.ink, opacity: f % 30 < 15 ? 1 : 0, alignSelf: 'center'}} />}
        {scan && <ScanBeam from={scan[0]} to={scan[1]} />}
      </div>
    </div>
  );
};

/** Accent light bar that sweeps down a block (reading / understanding). */
export const ScanBeam: React.FC<{from: number; to: number}> = ({from, to}) => {
  const f = useCurrentFrame();
  if (f < s(from) || f > s(to) + 6) return null;
  const p = ramp(f, s(from), s(to), 0, 100);
  const fade = ramp(f, s(to), s(to) + 6, 1, 0);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: `${p}%`, height: 90, marginTop: -45, opacity: fade, background: `linear-gradient(transparent, ${C.accent}66 45%, ${C.accent} 50%, ${C.accent}66 55%, transparent)`, mixBlendMode: 'multiply', pointerEvents: 'none'}} />
  );
};

/** A big keyboard key that gets pressed. */
export const KeyCap: React.FC<{label: string; at: number; pressAt: number; width?: number}> = ({label, at, pressAt, width = 420}) => {
  const f = useCurrentFrame();
  const look = enter('pop', f, s(at));
  const t = f - s(pressAt);
  const down = t >= 0 && t < 5 ? 1 : t >= 5 && t < 10 ? 1 - (t - 5) / 5 : 0;
  const flash = t >= 0 ? Math.exp(-t / 6) : 0;
  return (
    <div style={{...look, position: 'relative', width, height: 230}}>
      <div style={{position: 'absolute', inset: 0, top: 26, borderRadius: 40, background: '#1C1D29'}} />
      <div style={{position: 'absolute', inset: 0, bottom: 26 - 20 * down, top: 20 * down, borderRadius: 40, background: interpolate(flash, [0, 1], [0, 1]) > 0.3 ? C.accent : '#F7F5F0', border: '4px solid #1C1D29', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22, fontFamily: FONT, fontWeight: 900, fontSize: 92, color: C.ink, boxShadow: `0 0 ${120 * flash}px ${C.accent}`}}>
        <span>{label}</span>
        <span style={{fontSize: 80}}>↵</span>
      </div>
    </div>
  );
};

/** Film strip whose frames fill with words on cue, drifting sideways. */
export const FilmStrip: React.FC<{frames: {t: string; at: number}[]; width?: number}> = ({frames, width = 1400}) => {
  const f = useCurrentFrame();
  const fw = 330;
  const x = -120 + drift(f, 0, 1) - f * 1.2;
  return (
    <div style={{width, height: 400, background: '#111', position: 'relative', overflow: 'hidden', transform: 'rotate(-6deg)'}}>
      {[18, 344].map((top) => (
        <div key={top} style={{position: 'absolute', left: 0, right: 0, top, height: 38, display: 'flex', gap: 30, transform: `translateX(${x % 70}px)`}}>
          {Array.from({length: 30}).map((_, i) => (
            <div key={i} style={{width: 40, height: 38, borderRadius: 6, background: '#E9E6DF', flexShrink: 0}} />
          ))}
        </div>
      ))}
      <div style={{position: 'absolute', top: 78, left: 0, display: 'flex', gap: 24, transform: `translateX(${x * 0.6 + 200}px)`, direction: 'ltr'}}>
        {frames.map((fr, i) => {
          const look = enter('pop', f, s(fr.at));
          return (
            <div key={i} style={{width: fw, height: 244, borderRadius: 10, background: f >= s(fr.at) ? C.ink : '#2A2B38', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `4px solid ${f >= s(fr.at) ? C.accent : '#2A2B38'}`}}>
              <div style={{...look, fontFamily: FONT, fontWeight: 900, fontSize: 70, color: C.accent, direction: 'rtl'}}>{fr.t}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** Live voice waveform; bars spike at the given seconds (where spoken words land). */
export const Waveform: React.FC<{at: number; peaks: number[]; bars?: number; width?: number; color?: string}> = ({at, peaks, bars = 46, width = 940, color = C.accent}) => {
  const f = useCurrentFrame();
  const on = ramp(f, s(at), s(at) + 8);
  const spike = peaks.reduce((m, p) => Math.max(m, Math.exp(-Math.abs(f - s(p)) / 3)), 0);
  return (
    <div style={{width, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      {Array.from({length: bars}).map((_, i) => {
        const centre = 1 - Math.abs(i - bars / 2) / (bars / 2);
        const n = 0.35 + 0.65 * Math.abs(Math.sin(f * 0.21 + i * 1.7) * Math.cos(f * 0.13 + i * 0.6));
        const h = on * (24 + 150 * n * centre + 130 * spike * centre);
        return <div key={i} style={{width: width / bars - 8, height: h, borderRadius: 8, background: color, opacity: 0.35 + 0.65 * centre}} />;
      })}
    </div>
  );
};

/** Cross-morphs between stages (word -> icon -> scene), each landing at its time. */
export const Morph: React.FC<{stages: {at: number; node: React.ReactNode}[]; size?: number}> = ({stages, size = 520}) => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'relative', width: size, height: size}}>
      {stages.map((st, i) => {
        const next = stages[i + 1];
        const inP = ramp(f, s(st.at), s(st.at) + 7);
        const outP = next ? ramp(f, s(next.at) - 2, s(next.at) + 4) : 0;
        if (f < s(st.at)) return null;
        const sc = 0.6 + 0.4 * inP + 0.5 * outP;
        return (
          <div key={i} style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: inP * (1 - outP), transform: `scale(${sc}) rotate(${(1 - inP) * -12}deg)`, filter: `blur(${(1 - inP) * 10 + outP * 14}px)`}}>
            {st.node}
          </div>
        );
      })}
    </div>
  );
};

export const BulbIcon: React.FC<{size?: number; color?: string}> = ({size = 360, color = C.accent}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx={50} cy={42} r={26} fill={color} />
    <rect x={38} y={64} width={24} height={14} rx={4} fill={C.paper} />
    <rect x={41} y={80} width={18} height={6} rx={3} fill={C.paper} />
    {[0, 1, 2, 3, 4].map((i) => {
      const a = (-150 + i * 30) * (Math.PI / 180);
      return <line key={i} x1={50 + Math.cos(a) * 33} y1={42 + Math.sin(a) * 33} x2={50 + Math.cos(a) * 44} y2={42 + Math.sin(a) * 44} stroke={color} strokeWidth={5} strokeLinecap="round" />;
    })}
  </svg>
);

export const PictureIcon: React.FC<{size?: number}> = ({size = 380}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect x={8} y={18} width={84} height={64} rx={8} fill={C.paper} stroke={C.accent} strokeWidth={5} />
    <circle cx={70} cy={36} r={8} fill={C.accent} />
    <path d="M14 76 L38 46 L54 64 L64 54 L86 76 Z" fill={C.ink} />
  </svg>
);

/** A mini finished frame: proof that the idea became a scene. */
export const SceneCard: React.FC<{word: string; size?: number}> = ({word, size = 460}) => {
  const f = useCurrentFrame();
  return (
    <div style={{width: size, height: size * 1.4, borderRadius: 30, background: C.ink, border: `6px solid ${C.accent}`, overflow: 'hidden', position: 'relative', boxShadow: `0 30px 90px rgba(0,0,0,0.4)`}}>
      <div style={{position: 'absolute', width: size * 1.6, height: size * 1.6, left: -size * 0.3, top: -size * 0.1, background: `repeating-conic-gradient(${C.accent}22 0deg 10deg, transparent 10deg 20deg)`, transform: `rotate(${f * 0.6}deg)`}} />
      {/* font shrinks with word length so long words never overflow the card */}
      <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: Math.min(size * 0.24, (size * 1.5) / Math.max(1, word.length)), color: C.accent, direction: 'rtl'}}>{word}</div>
    </div>
  );
};

/** A small editor timeline that folds up and gets thrown away. */
export const TimelineToss: React.FC<{at: number; tossAt: number}> = ({at, tossAt}) => {
  const f = useCurrentFrame();
  const look = enter('rise', f, s(at));
  const t = Math.max(0, f - s(tossAt));
  const fold = Math.min(1, t / 6);
  const fly = Math.max(0, (t - 6) / 12);
  return (
    <div style={{...look, transform: `${look.transform} translate(${fly * 900}px, ${-fly * 500 + fly * fly * 900}px) rotate(${fly * 140}deg) scaleY(${1 - 0.85 * fold}) scaleX(${1 - 0.3 * fold})`, opacity: look.opacity * (1 - Math.max(0, fly - 0.6) * 2.5), width: 820, padding: 22, borderRadius: 20, background: '#1C1D29', display: 'flex', flexDirection: 'column', gap: 12}}>
      {['#6E7BFF', '#3DD9A0', '#FF7AB6'].map((c, i) => (
        <div key={i} style={{display: 'flex', gap: 8}}>
          {Array.from({length: 5 + i}).map((_, j) => (
            <div key={j} style={{flex: 1 + ((i + j) % 3), height: 40, borderRadius: 6, background: c, opacity: 0.85}} />
          ))}
        </div>
      ))}
    </div>
  );
};

/** Envelope carrying a file that flies off (the "I'll send it" payoff). */
export const Envelope: React.FC<{at: number; flyAt: number; file?: string}> = ({at, flyAt, file = 'SKILL.md'}) => {
  const f = useCurrentFrame();
  const look = enter('pop', f, s(at));
  const ins = ramp(f, s(at) + 4, s(at) + 12);
  const t = Math.max(0, f - s(flyAt));
  const fly = Math.min(1, (t / 16) ** 1.5);
  return (
    <div style={{...look, position: 'relative', width: 520, height: 360, transform: `${look.transform} translate(${fly * -700}px, ${-fly * 1300}px) rotate(${-fly * 25}deg) scale(${1 - 0.5 * fly})`}}>
      <div style={{position: 'absolute', left: 70, right: 70, top: interpolate(ins, [0, 1], [-200, 40]), height: 230, background: 'white', borderRadius: 14, border: `4px solid ${C.ink}`, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 26, fontFamily: 'monospace', fontWeight: 700, fontSize: 40, color: C.ink, direction: 'ltr'}}>
        {file}
      </div>
      <svg width={520} height={360} viewBox="0 0 520 360" style={{position: 'absolute', inset: 0}}>
        <path d="M10 120 L260 270 L510 120 L510 350 L10 350 Z" fill={C.accent} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
        <path d="M10 350 L210 230 M510 350 L310 230" stroke={C.ink} strokeWidth={6} />
      </svg>
    </div>
  );
};
