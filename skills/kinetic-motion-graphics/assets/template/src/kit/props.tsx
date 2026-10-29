import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FONT, s} from './theme';
import {drift, enter, ramp} from './motion';

// Visual metaphors. Each one turns a spoken claim into something that happens on screen.

/** Rubber stamp that slams in with a tilt, e.g. "קרה", "אושר". */
export const Stamp: React.FC<{text: string; at: number; color?: string; size?: number}> = ({text, at, color = C.comicRed, size = 150}) => {
  const f = useCurrentFrame();
  const look = enter('slam', f, s(at));
  return (
    <div style={{...look, display: 'inline-block', border: `14px solid ${color}`, borderRadius: 18, padding: '0 40px', color, fontFamily: FONT, fontWeight: 900, fontSize: size, lineHeight: 1.15, direction: 'rtl', mixBlendMode: 'normal'}}>
      {text}
    </div>
  );
};

/** Comic starburst badge with text inside. */
export const Starburst: React.FC<{at: number; size?: number; color?: string; children?: React.ReactNode}> = ({at, size = 640, color = C.comicRed, children}) => {
  const f = useCurrentFrame();
  const look = enter('pop', f, s(at));
  const pts = 16;
  const poly = Array.from({length: pts * 2})
    .map((_, i) => {
      const r = i % 2 === 0 ? 50 : 39;
      const a = (Math.PI * i) / pts - Math.PI / 2;
      return `${50 + r * Math.cos(a)},${50 + r * Math.sin(a)}`;
    })
    .join(' ');
  return (
    <div style={{position: 'relative', width: size, height: size, ...look, transform: `${look.transform} rotate(${drift(f, 3, 60)}deg)`}}>
      <svg viewBox="0 0 100 100" width={size} height={size} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
        <polygon points={poly} fill="#111" transform="translate(1.2,1.6)" />
        <polygon points={poly} fill={color} stroke="#111" strokeWidth={1.2} />
      </svg>
      <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>{children}</div>
    </div>
  );
};

/** Marker strike that draws across a word (negation: "not AI"). */
export const Strike: React.FC<{at: number; width?: number; color?: string; thickness?: number}> = ({at, width = 700, color = '#111', thickness = 34}) => {
  const f = useCurrentFrame();
  const p = ramp(f, s(at), s(at) + 6);
  return (
    <svg width={width} height={160} style={{position: 'absolute', left: '50%', top: '50%', marginLeft: -width / 2, marginTop: -80, overflow: 'visible'}}>
      <path d={`M ${width} 95 Q ${width / 2} 55 0 75`} stroke={color} strokeWidth={thickness} strokeLinecap="round" fill="none" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
      <path d={`M ${width - 30} 45 Q ${width / 2} 105 20 120`} stroke={color} strokeWidth={thickness * 0.8} strokeLinecap="round" fill="none" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ramp(f, s(at) + 4, s(at) + 10)} />
    </svg>
  );
};

/** Tangled scribble that resolves into one clean line ("complicated -> simple"). */
export const ScribbleToLine: React.FC<{at: number; resolveAt: number; width?: number}> = ({at, resolveAt, width = 820}) => {
  const f = useCurrentFrame();
  const draw = ramp(f, s(at), s(at) + 14);
  const res = ramp(f, s(resolveAt), s(resolveAt) + 10);
  const scribble = 'M 60 260 C 300 40, 520 420, 700 120 S 180 60, 260 330 S 760 380, 560 60 S 120 220, 420 300 S 760 200, 640 330 C 520 420, 200 120, 120 180';
  return (
    <svg width={width} height={440} viewBox="0 0 820 440" style={{overflow: 'visible'}}>
      <path d={scribble} stroke={C.ink} strokeWidth={5} fill="none" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} opacity={1 - res} />
      {[[60, 260], [700, 120], [260, 330], [560, 60], [420, 300], [640, 330], [120, 180]].map(([x, y], i) => (
        <circle key={i} cx={interpolate(res, [0, 1], [x, 60 + (i * 700) / 6])} cy={interpolate(res, [0, 1], [y, 400])} r={12} fill="white" stroke={C.ink} strokeWidth={4} opacity={ramp(f, s(at) + i, s(at) + i + 4) * (i === 0 || i === 6 ? 1 : 1 - res)} />
      ))}
      <line x1={760} y1={400} x2={60} y2={400} stroke={C.accent} strokeWidth={8} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - res} />
      <circle cx={60} cy={400} r={18} fill={C.accent} opacity={res} />
      <circle cx={760} cy={400} r={18} fill={C.accent} opacity={res} />
    </svg>
  );
};

/** Mouse cursor moving between keyframes [seconds, x, y] with a click ripple at `clickAt`. */
export const Cursor: React.FC<{path: [number, number, number][]; clickAt?: number[]}> = ({path, clickAt = []}) => {
  const f = useCurrentFrame();
  const times = path.map((p) => s(p[0]));
  if (f < times[0]) return null;
  const x = interpolate(f, times, path.map((p) => p[1]), {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const y = interpolate(f, times, path.map((p) => p[2]), {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const press = clickAt.some((c) => f >= s(c) && f < s(c) + 4);
  return (
    <>
      {clickAt.map((c, i) => {
        const t = f - s(c);
        if (t < 0 || t > 12) return null;
        return <div key={i} style={{position: 'absolute', left: x - 50, top: y - 50, width: 100, height: 100, borderRadius: '50%', border: `5px solid ${C.accent}`, transform: `scale(${t / 8})`, opacity: 1 - t / 12}} />;
      })}
      <svg width={70} height={70} viewBox="0 0 24 24" style={{position: 'absolute', left: x, top: y, transform: `scale(${press ? 0.85 : 1})`, filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'}}>
        <path d="M3 2 L3 19 L8 14.5 L11.5 22 L14.5 20.6 L11 13.3 L18 13.3 Z" fill="#111" stroke="white" strokeWidth={1.4} />
      </svg>
    </>
  );
};

/** Chat input that types a prompt, then the send button fires. */
export const ChatInput: React.FC<{text: string; at: number; sendAt: number; width?: number}> = ({text, at, sendAt, width = 900}) => {
  const f = useCurrentFrame();
  const look = enter('rise', f, s(at) - 6);
  const n = Math.max(0, Math.min(text.length, Math.floor(((f - s(at)) / 30) * 24)));
  const sent = f >= s(sendAt);
  return (
    <div style={{...look, width, height: 140, borderRadius: 70, background: 'white', boxShadow: '0 20px 60px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', padding: '0 26px', gap: 22, direction: 'rtl'}}>
      <Spark size={52} spin={f} />
      <div style={{flex: 1, fontFamily: FONT, fontWeight: 500, fontSize: 46, color: C.ink, whiteSpace: 'nowrap', overflow: 'hidden'}}>
        {text.slice(0, n)}
        <span style={{opacity: f % 16 < 8 && !sent ? 1 : 0}}>|</span>
      </div>
      <div style={{width: 92, height: 92, borderRadius: '50%', background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${sent ? 1 + 0.25 * Math.exp(-(f - s(sendAt)) / 3) : 1})`}}>
        <svg width={44} height={44} viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" stroke="white" strokeWidth={3} fill="none" strokeLinecap="round" /></svg>
      </div>
    </div>
  );
};

/** A spark mark in the style of Claude's logo: only for videos about Claude, never as the user's own logo. */
export const Spark: React.FC<{size?: number; color?: string; spin?: number}> = ({size = 120, color = C.accent, spin = 0}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <g transform={`rotate(${spin * 0.8} 50 50)`}>
      {Array.from({length: 12}).map((_, i) => {
        const a = (i * Math.PI) / 6;
        const r = i % 2 ? 34 : 46;
        return <line key={i} x1={50 + Math.cos(a) * 8} y1={50 + Math.sin(a) * 8} x2={50 + Math.cos(a) * r} y2={50 + Math.sin(a) * r} stroke={color} strokeWidth={8} strokeLinecap="round" />;
      })}
    </g>
  </svg>
);

/** Three-step progress (download / install / ask) with checks landing on cue. */
export const Steps: React.FC<{labels: string[]; doneAt: number[]; at: number}> = ({labels, doneAt, at}) => {
  const f = useCurrentFrame();
  const look = enter('rise', f, s(at));
  return (
    <div style={{...look, display: 'flex', direction: 'rtl', alignItems: 'flex-start', gap: 0}}>
      {labels.map((l, i) => {
        const d = ramp(f, s(doneAt[i]), s(doneAt[i]) + 6);
        const pop = f >= s(doneAt[i]) ? 1 + 0.35 * Math.exp(-(f - s(doneAt[i])) / 3) : 1;
        return (
          <React.Fragment key={i}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: 220, gap: 16}}>
              <div style={{width: 84, height: 84, borderRadius: '50%', border: `6px solid ${d > 0.5 ? C.accent : '#BDB7AC'}`, background: d > 0.5 ? C.accent : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop})`, fontFamily: FONT, fontWeight: 700, fontSize: 38, color: d > 0.5 ? 'white' : C.muted}}>
                {d > 0.5 ? '✓' : i + 1}
              </div>
              <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 40, color: d > 0.5 ? C.ink : C.muted}}>{l}</div>
            </div>
            {i < labels.length - 1 && (
              <div style={{width: 90, height: 8, marginTop: 38, background: '#D8D2C7', borderRadius: 4, overflow: 'hidden'}}>
                <div style={{width: `${ramp(f, s(doneAt[i]), s(doneAt[i + 1]), 0, 100)}%`, height: '100%', background: C.accent, marginRight: 0, marginLeft: 'auto'}} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

/** Level meter that fills bar by bar and hits MAX. */
export const Meter: React.FC<{at: number; maxAt: number; bars?: number}> = ({at, maxAt, bars = 12}) => {
  const f = useCurrentFrame();
  const fill = ramp(f, s(at), s(maxAt), 0, bars);
  const hit = f >= s(maxAt);
  return (
    <div style={{width: 520, padding: 24, border: '5px solid #3D7BFF', borderRadius: 16, boxShadow: '0 0 50px rgba(61,123,255,0.6)', display: 'flex', flexDirection: 'column-reverse', gap: 10, background: 'rgba(10,15,40,0.6)'}}>
      {Array.from({length: bars}).map((_, i) => {
        const on = i < fill;
        const col = i >= bars - 2 ? '#FF3B3B' : i >= bars - 5 ? '#FFC93C' : C.neonGreen;
        return <div key={i} style={{height: 34, borderRadius: 6, background: on ? col : 'rgba(255,255,255,0.08)', boxShadow: on ? `0 0 20px ${col}` : 'none', opacity: hit && i >= bars - 2 ? 0.6 + 0.4 * Math.abs(Math.sin(f / 2)) : 1}} />;
      })}
    </div>
  );
};

/** Video-editor timeline whose tracks fill with clips by themselves. */
export const EditorTimeline: React.FC<{at: number; fullAt: number; width?: number}> = ({at, fullAt, width = 920}) => {
  const f = useCurrentFrame();
  const p = ramp(f, s(at), s(fullAt));
  const tracks = [
    {c: '#3D7BFF', clips: [[0, 0.18], [0.2, 0.45], [0.48, 0.7], [0.72, 1]]},
    {c: '#2DBE8C', clips: [[0, 0.3], [0.33, 0.62], [0.66, 1]]},
    {c: '#8B5CF6', clips: [[0, 0.12], [0.14, 0.3], [0.32, 0.5], [0.52, 0.68], [0.7, 0.86], [0.88, 1]]},
  ];
  return (
    <div style={{width, padding: 26, background: '#1B1B1D', borderRadius: 22, boxShadow: '0 30px 80px rgba(0,0,0,0.5)', ...enter('rise', f, s(at) - 4)}}>
      <div style={{position: 'relative', display: 'flex', flexDirection: 'column', gap: 14}}>
        {tracks.map((t, ti) => (
          <div key={ti} style={{position: 'relative', height: 54, background: 'rgba(255,255,255,0.05)', borderRadius: 8}}>
            {t.clips.map(([a, b], ci) => {
              const vis = p > a + ti * 0.04;
              return <div key={ci} style={{position: 'absolute', left: `${a * 100}%`, width: `${(b - a) * 100 - 0.8}%`, top: 4, bottom: 4, borderRadius: 6, background: t.c, opacity: vis ? 1 : 0, transform: `scaleY(${vis ? 1 : 0.2})`}} />;
            })}
          </div>
        ))}
        <div style={{position: 'absolute', top: -14, bottom: -14, left: `${p * 100}%`, width: 4, background: C.accent, boxShadow: `0 0 16px ${C.accent}`}} />
      </div>
    </div>
  );
};

/** File card, e.g. SKILL.md, with lines that write themselves. */
export const FileCard: React.FC<{name: string; at: number; lines?: number}> = ({name, at, lines = 6}) => {
  const f = useCurrentFrame();
  return (
    <div style={{...enter('pop', f, s(at)), width: 460, height: 580, background: 'rgba(255,255,255,0.08)', border: '5px solid rgba(255,255,255,0.9)', borderRadius: 16, padding: 40, display: 'flex', flexDirection: 'column', gap: 26, position: 'relative'}}>
      <div style={{fontFamily: 'monospace', fontSize: 38, color: 'white', fontWeight: 700}}>{name}</div>
      {Array.from({length: lines}).map((_, i) => (
        <div key={i} style={{height: 16, borderRadius: 8, background: 'white', width: `${ramp(f, s(at) + 6 + i * 3, s(at) + 14 + i * 3, 0, 55 + ((i * 29) % 40))}%`}} />
      ))}
      <div style={{position: 'absolute', bottom: 30, left: 30}}><Spark size={70} spin={f} /></div>
    </div>
  );
};

/** Ball bouncing with squash and stretch: shorthand for "good animation". */
export const BouncingBall: React.FC<{at: number; size?: number; color?: string; floor?: number}> = ({at, size = 120, color = C.accent, floor = 420}) => {
  const f = useCurrentFrame();
  const t = f - s(at);
  if (t < 0) return null;
  const period = 18;
  const k = Math.exp(-t / 60);
  const ph = (t % period) / period;
  const y = floor - Math.sin(ph * Math.PI) * 360 * k;
  const nearFloor = Math.min(ph, 1 - ph) < 0.08;
  const sx = nearFloor ? 1.3 : 0.88;
  const sy = nearFloor ? 0.72 : 1.14;
  return (
    <div style={{position: 'relative', width: 600, height: floor + size}}>
      <div style={{position: 'absolute', left: 300 - size * 0.7, top: floor + size - 10, width: size * 1.4, height: 22, borderRadius: '50%', background: 'rgba(0,0,0,0.12)', transform: `scaleX(${0.5 + 0.5 * (1 - (floor - y) / 360)})`}} />
      <div style={{position: 'absolute', left: 300 - size / 2, top: y, width: size, height: size, borderRadius: '50%', background: color, transform: `scale(${sx}, ${sy})`, transformOrigin: '50% 100%'}} />
    </div>
  );
};

/** Comments that slide in one after another (CTA proof). */
export const CommentStack: React.FC<{at: number; text: string; count?: number; every?: number}> = ({at, text, count = 6, every = 0.18}) => {
  const f = useCurrentFrame();
  const colors = ['#F59E0B', '#3B82F6', '#10B981', '#EF4444', '#8B5CF6', '#EC4899'];
  return (
    <div style={{width: 800, background: 'white', borderRadius: 28, padding: 30, boxShadow: '0 30px 80px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', gap: 18, direction: 'rtl'}}>
      <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 36, color: C.mutedDark}}>תגובות</div>
      {Array.from({length: count}).map((_, i) => {
        const look = enter('rise', f, s(at + i * every));
        return (
          <div key={i} style={{...look, display: 'flex', alignItems: 'center', gap: 18}}>
            <div style={{width: 54, height: 54, borderRadius: '50%', background: colors[i % colors.length]}} />
            <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 40, color: C.ink}}>{text}</div>
            <div style={{marginRight: 'auto', color: '#EF4444', fontSize: 34}}>♥</div>
          </div>
        );
      })}
    </div>
  );
};
