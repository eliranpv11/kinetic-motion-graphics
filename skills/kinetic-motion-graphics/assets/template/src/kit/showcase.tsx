import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FONT, s} from './theme';
import {drift, enter, ramp} from './motion';

// Picture-first metaphors: the graphic carries the idea, text stays small around it.

/** Presence chip, e.g. "עורך: לא מחובר", whose dot goes from live to offline at `offAt`. */
export const StatusChip: React.FC<{label: string; offLabel: string; at: number; offAt: number}> = ({label, offLabel, at, offAt}) => {
  const f = useCurrentFrame();
  const look = enter('pop', f, s(at));
  const off = f >= s(offAt);
  const pulse = off ? 1 : 1 + 0.25 * Math.abs(Math.sin(f / 6));
  return (
    <div style={{...look, display: 'flex', alignItems: 'center', gap: 26, padding: '28px 46px', borderRadius: 999, background: '#1C1D29', border: `3px solid ${off ? '#3A3B4A' : C.accent}`, direction: 'rtl'}}>
      <div style={{width: 34, height: 34, borderRadius: '50%', background: off ? '#5A5C6E' : C.accent, transform: `scale(${pulse})`, boxShadow: off ? 'none' : `0 0 24px ${C.accent}`}} />
      <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 56, color: off ? '#8A8C9E' : C.white}}>{off ? offLabel : label}</div>
    </div>
  );
};

/** Big checklist; each row ticks on its spoken word. */
export const Checklist: React.FC<{items: {t: string; at: number}[]; width?: number; dark?: boolean}> = ({items, width = 860, dark = true}) => {
  const f = useCurrentFrame();
  return (
    <div style={{width, display: 'flex', flexDirection: 'column', gap: 26, direction: 'rtl'}}>
      {items.map((it, i) => {
        const look = enter('rise', f, s(it.at) - 3);
        const tick = ramp(f, s(it.at), s(it.at) + 6);
        const pop = f >= s(it.at) ? 1 + 0.3 * Math.exp(-(f - s(it.at)) / 3) : 1;
        return (
          <div key={i} style={{...look, display: 'flex', alignItems: 'center', gap: 34, padding: '26px 36px', borderRadius: 26, background: dark ? '#1C1D29' : 'white', border: `3px solid ${tick > 0.5 ? C.accent : 'transparent'}`}}>
            <div style={{width: 84, height: 84, borderRadius: 22, background: tick > 0.5 ? C.accent : 'transparent', border: `5px solid ${tick > 0.5 ? C.accent : '#5A5C6E'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop})`}}>
              <svg width={56} height={56} viewBox="0 0 24 24">
                <path d="M4 12.5 L10 18 L20 6" stroke={C.ink} strokeWidth={3.4} fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - tick} />
              </svg>
            </div>
            <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 84, color: dark ? C.white : C.ink, textDecoration: 'none'}}>{it.t}</div>
          </div>
        );
      })}
    </div>
  );
};

/** Large switch that flips on by itself ("autopilot"). */
export const AutoToggle: React.FC<{at: number; onAt: number; label: string}> = ({at, onAt, label}) => {
  const f = useCurrentFrame();
  const look = enter('pop', f, s(at));
  const p = ramp(f, s(onAt), s(onAt) + 7);
  return (
    <div style={{...look, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 34}}>
      <div style={{width: 520, height: 260, borderRadius: 130, background: interpolate(p, [0, 1], [0, 1]) > 0.5 ? C.accent : '#2A2B38', position: 'relative', boxShadow: p > 0.5 ? `0 0 90px ${C.accent}88` : 'none', direction: 'ltr'}}>
        <div style={{position: 'absolute', top: 20, left: 20 + p * 260, width: 220, height: 220, borderRadius: '50%', background: C.white, boxShadow: '0 10px 30px rgba(0,0,0,0.35)'}} />
      </div>
      <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 52, color: p > 0.5 ? C.accent : '#8A8C9E', direction: 'rtl'}}>{label}</div>
    </div>
  );
};

/** Magnifying lens gliding over a frame: crisp detail even when zoomed. */
export const Magnifier: React.FC<{at: number; children: React.ReactNode; size?: number}> = ({at, children, size = 760}) => {
  const f = useCurrentFrame();
  const look = enter('rise', f, s(at));
  const t = (f - s(at)) / 30;
  const lx = size / 2 + Math.sin(t * 1.7) * size * 0.22;
  const ly = size * 0.62 / 2 + Math.cos(t * 1.3) * size * 0.12;
  const r = 150;
  const zoom = 2.2;
  const h = size * 0.62;
  return (
    <div style={{...look, position: 'relative', width: size, height: h, borderRadius: 24, overflow: 'hidden', border: '4px solid #2A2B38'}}>
      <div style={{position: 'absolute', inset: 0}}>{children}</div>
      <div style={{position: 'absolute', left: lx - r, top: ly - r, width: r * 2, height: r * 2, borderRadius: '50%', overflow: 'hidden', border: `8px solid ${C.accent}`, boxShadow: '0 20px 60px rgba(0,0,0,0.5)'}}>
        <div style={{position: 'absolute', width: size, height: h, left: r - lx * zoom, top: r - ly * zoom, transform: `scale(${zoom})`, transformOrigin: '0 0'}}>{children}</div>
      </div>
    </div>
  );
};

/** Before/after slider: a handle wipes from the "before" layer to the "after" layer. */
export const BeforeAfter: React.FC<{at: number; wipeAt: number; before: React.ReactNode; after: React.ReactNode; width?: number; height?: number}> = ({at, wipeAt, before, after, width = 900, height = 620}) => {
  const f = useCurrentFrame();
  const look = enter('rise', f, s(at));
  const p = ramp(f, s(wipeAt), s(wipeAt) + 14);
  const x = width * (1 - p);
  return (
    <div style={{...look, position: 'relative', width, height, borderRadius: 28, overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0}}>{after}</div>
      <div style={{position: 'absolute', inset: 0, clipPath: `inset(0 0 0 ${width - x}px)`}}>{before}</div>
      <div style={{position: 'absolute', top: 0, bottom: 0, left: width - x - 4, width: 8, background: C.white}}>
        <div style={{position: 'absolute', top: height / 2 - 44, left: -40, width: 88, height: 88, borderRadius: '50%', background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, color: C.ink, fontWeight: 900}}>⇆</div>
      </div>
    </div>
  );
};

/** A glitchy, cheap-looking frame (used as "before"). */
export const GlitchFrame: React.FC<{text: string}> = ({text}) => {
  const f = useCurrentFrame();
  const j = (k: number) => Math.sin(f * 2.3 + k) * 8;
  return (
    <div style={{position: 'absolute', inset: 0, background: '#3B3F4A', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
      {[['#FF3B6B', -1], ['#3BE8FF', 1], ['#DDDDDD', 0]].map(([c, k]) => (
        <div key={c as string} style={{position: 'absolute', fontFamily: FONT, fontWeight: 900, fontSize: 210, color: c as string, transform: `translate(${j(k as number) * (k as number)}px, ${j(2) * 0.3}px)`, mixBlendMode: 'screen', opacity: 0.85}}>
          {text}
        </div>
      ))}
      {Array.from({length: 6}).map((_, i) => (
        <div key={i} style={{position: 'absolute', left: 0, right: 0, top: `${(i * 17 + f * 3) % 100}%`, height: 10, background: 'rgba(255,255,255,0.12)'}} />
      ))}
    </div>
  );
};

/** A clean, premium-looking frame (used as "after"). */
export const CleanFrame: React.FC<{text: string}> = ({text}) => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at ${50 + drift(f, 8, 120)}% 40%, #2B2E45, ${C.ink} 70%)`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 170, color: C.accent, direction: 'rtl', textShadow: `0 0 50px ${C.accent}55`}}>{text}</div>
    </div>
  );
};

/** A messy control panel (knobs, sliders, switches) that collapses into one button. */
export const ControlsToButton: React.FC<{at: number; collapseAt: number; label: string}> = ({at, collapseAt, label}) => {
  const f = useCurrentFrame();
  const c = ramp(f, s(collapseAt), s(collapseAt) + 10);
  const btn = enter('pop', f, s(collapseAt) + 8);
  const items = Array.from({length: 18});
  return (
    <div style={{position: 'relative', width: 860, height: 620}}>
      {items.map((_, i) => {
        const col = i % 6;
        const row = Math.floor(i / 6);
        const x0 = 40 + col * 136;
        const y0 = 60 + row * 180;
        const look = enter('pop', f, s(at) + i * 0.6);
        const kind = i % 3;
        return (
          <div key={i} style={{position: 'absolute', left: interpolate(c, [0, 1], [x0, 380]), top: interpolate(c, [0, 1], [y0, 260]), opacity: look.opacity * (1 - c), transform: `${look.transform} scale(${1 - 0.7 * c}) rotate(${c * (i * 37 % 180)}deg)`}}>
            {kind === 0 && <div style={{width: 96, height: 96, borderRadius: '50%', border: '6px solid #6E7090', position: 'relative', transform: `rotate(${f * (i % 2 ? 4 : -3)}deg)`}}><div style={{position: 'absolute', left: 40, top: 6, width: 6, height: 30, background: '#C9CAD6'}} /></div>}
            {kind === 1 && <div style={{width: 96, height: 120, display: 'flex', justifyContent: 'center'}}><div style={{width: 8, height: 120, background: '#4A4C62', position: 'relative'}}><div style={{position: 'absolute', left: -20, top: 40 + drift(f + i * 9, 30, 40), width: 48, height: 22, borderRadius: 6, background: '#C9CAD6'}} /></div></div>}
            {kind === 2 && <div style={{width: 100, height: 54, borderRadius: 27, background: i % 2 ? '#4A4C62' : '#6E7090', position: 'relative'}}><div style={{position: 'absolute', top: 6, left: (f + i * 7) % 40 < 20 ? 6 : 52, width: 42, height: 42, borderRadius: '50%', background: '#C9CAD6'}} /></div>}
          </div>
        );
      })}
      <div style={{...btn, position: 'absolute', left: 180, top: 220, width: 500, height: 180, borderRadius: 90, background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 76, color: C.ink, boxShadow: `0 0 80px ${C.accent}88`, direction: 'rtl'}}>{label}</div>
    </div>
  );
};

/** An easing curve that draws itself while a dot rides it: the core idea of good animation. */
export const EasingCurve: React.FC<{at: number; size?: number}> = ({at, size = 620}) => {
  const f = useCurrentFrame();
  const draw = ramp(f, s(at), s(at) + 18);
  const t = ((f - s(at)) % 45) / 45;
  const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const pad = 60;
  const W2 = size - pad * 2;
  const px = pad + t * W2;
  const py = size - pad - e * W2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{background: '#1C1D29', borderRadius: 30, opacity: enter('rise', f, s(at) - 4).opacity}}>
      {[0.25, 0.5, 0.75].map((g) => (
        <g key={g}>
          <line x1={pad + g * W2} y1={pad} x2={pad + g * W2} y2={size - pad} stroke="#2E3044" strokeWidth={2} />
          <line x1={pad} y1={pad + g * W2} x2={size - pad} y2={pad + g * W2} stroke="#2E3044" strokeWidth={2} />
        </g>
      ))}
      <path d={`M ${pad} ${size - pad} C ${pad + W2 * 0.65} ${size - pad}, ${pad + W2 * 0.35} ${pad}, ${size - pad} ${pad}`} stroke={C.accent} strokeWidth={10} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
      {draw > 0.9 && <circle cx={px} cy={py} r={22} fill={C.white} />}
      {draw > 0.9 && <circle cx={size - 26} cy={py} r={16} fill={C.accent} />}
    </svg>
  );
};

/** Three icons that light up in turn: download, install (box), ask (speech bubble). */
export const IconSteps: React.FC<{steps: {label: string; at: number; icon: 'download' | 'box' | 'bubble'}[]; showAt?: number}> = ({steps, showAt}) => {
  const f = useCurrentFrame();
  const icon = (k: string, on: boolean) => {
    const c = on ? C.ink : '#8A8C9E';
    if (k === 'download') return <path d="M12 3v12M6 10l6 6 6-6M4 20h16" stroke={c} strokeWidth={2.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />;
    if (k === 'box') return <path d="M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10" stroke={c} strokeWidth={2.4} fill="none" strokeLinejoin="round" />;
    return <path d="M4 5h16v11H9l-5 4z" stroke={c} strokeWidth={2.6} fill="none" strokeLinejoin="round" />;
  };
  return (
    <div style={{display: 'flex', gap: 40, direction: 'rtl'}}>
      {steps.map((st, i) => {
        const on = f >= s(st.at);
        // tiles can appear (dim) from `showAt`, long before their step lights up, so the scene never opens empty
        const look = enter('pop', f, showAt !== undefined ? s(showAt) + i * 2 : s(st.at) - 6);
        const pop = on ? 1 + 0.25 * Math.exp(-(f - s(st.at)) / 3) : 0.9;
        return (
          <div key={i} style={{...look, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22}}>
            <div style={{width: 230, height: 230, borderRadius: 54, background: on ? C.accent : '#1C1D29', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop})`, boxShadow: on ? `0 0 60px ${C.accent}77` : 'none'}}>
              <svg width={130} height={130} viewBox="0 0 24 24">{icon(st.icon, on)}</svg>
            </div>
            <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 48, color: on ? C.white : '#8A8C9E'}}>{st.label}</div>
          </div>
        );
      })}
    </div>
  );
};
