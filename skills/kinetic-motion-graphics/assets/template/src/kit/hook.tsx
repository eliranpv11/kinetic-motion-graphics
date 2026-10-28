import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, FONT, s} from './theme';
import {enter, ramp} from './motion';

// Hook kit: shock, defuse, interrupt, two-step payoff, meta proof.

/** Heart-monitor line that flatlines at `flatAt` (shock: "X killed Y"), and can come back at `reviveAt`. */
export const PulseMonitor: React.FC<{label: string; flatAt: number; reviveAt?: number; width?: number; color?: string}> = ({label, flatAt, reviveAt, width = 980, color = '#FF4D4D'}) => {
  const f = useCurrentFrame();
  const H = 360;
  const flat = f >= s(flatAt) && (reviveAt === undefined || f < s(reviveAt));
  const pts: string[] = [];
  for (let x = 0; x <= width; x += 6) {
    const phase = (x + f * 14) % 260;
    let y = H / 2;
    const alive = !flat || x > width * 0.92;
    if (alive && !(flat && x > width * 0.92)) {
      if (phase > 110 && phase < 122) y -= (phase - 110) * 13;
      else if (phase >= 122 && phase < 134) y += (phase - 128) * 16;
      else if (phase >= 134 && phase < 146) y -= (146 - phase) * 3;
    }
    pts.push(`${x},${y}`);
  }
  const lineColor = flat ? '#6B6E80' : color;
  const look = enter('rise', f, 0);
  return (
    <div style={{...look, width, display: 'flex', flexDirection: 'column', gap: 26, direction: 'rtl'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 52, color: C.white}}>{label}</div>
        <div style={{fontFamily: 'monospace', fontWeight: 700, fontSize: 56, color: lineColor, direction: 'ltr'}}>{flat ? '0 bpm' : `${118 + Math.round(Math.sin(f / 7) * 4)} bpm`}</div>
      </div>
      <svg width={width} height={H} style={{background: '#0A0B14', borderRadius: 24, border: `3px solid ${flat ? '#2A2B38' : color + '55'}`}}>
        {[1, 2, 3].map((g) => <line key={g} x1={0} y1={(H / 4) * g} x2={width} y2={(H / 4) * g} stroke="#1A1C2A" strokeWidth={2} />)}
        <polyline points={pts.join(' ')} fill="none" stroke={lineColor} strokeWidth={7} strokeLinejoin="round" style={{filter: flat ? 'none' : `drop-shadow(0 0 12px ${color})`}} />
      </svg>
    </div>
  );
};

/** A phone whose feed swipes up fast through generic cards; freezes and drains at `freezeAt`. */
export const PhoneFeed: React.FC<{at: number; freezeAt: number; cards: string[]; swipeEvery?: number}> = ({at, freezeAt, cards, swipeEvery = 0.42}) => {
  const f = useCurrentFrame();
  const tEnd = Math.min(f, s(freezeAt));
  const t = (tEnd - s(at)) / 30;
  const idx = Math.max(0, t / swipeEvery);
  const step = Math.floor(idx);
  const frac = idx - step;
  const ease = frac < 0.55 ? 1 - Math.pow(1 - frac / 0.55, 3) : 1;
  const offset = (step + ease) * 1180;
  const drained = ramp(f, s(freezeAt), s(freezeAt) + 8);
  const look = enter('rise', f, s(at));
  const colors = ['#FF5C8A', '#5CC8FF', '#FFB85C', '#9B7BFF', '#5CFFB0'];
  return (
    <div style={{...look, width: 620, height: 1180, borderRadius: 70, background: '#05060C', border: '14px solid #22243A', overflow: 'hidden', position: 'relative', filter: `grayscale(${drained}) brightness(${1 - 0.55 * drained})`}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: -offset + 1180 * 0.0, filter: f < s(freezeAt) && frac < 0.55 ? `blur(${(1 - frac / 0.55) * 10}px)` : 'none'}}>
        {Array.from({length: 40}).map((_, i) => (
          <div key={i} style={{height: 1180, padding: 50, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 26, background: `linear-gradient(160deg, ${colors[i % colors.length]}88, #05060C 75%)`, position: 'relative'}}>
            {/* thumbnail: a big loud word, like every "AI changes everything" video */}
            <div style={{position: 'absolute', top: 160, left: 0, right: 0, textAlign: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 260, color: colors[i % colors.length], textShadow: '0 10px 40px rgba(0,0,0,0.5)', transform: `rotate(${(i % 2 ? -1 : 1) * 6}deg)`}}>{['AI', '🤯', '10x', '!!!', 'AI'][i % 5]}</div>
            <div style={{position: 'absolute', top: 40, right: 40, padding: '8px 22px', borderRadius: 20, background: '#FF3B5C', fontFamily: FONT, fontWeight: 700, fontSize: 34, color: 'white'}}>{['חדש', 'ויראלי', 'חובה', 'דחוף', 'חדש'][i % 5]}</div>
            <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 70, color: C.white, direction: 'rtl', lineHeight: 1.1}}>{cards[i % cards.length]}</div>
            <div style={{display: 'flex', gap: 14, direction: 'rtl'}}>
              <div style={{width: 60, height: 60, borderRadius: '50%', background: colors[(i + 2) % colors.length]}} />
              <div style={{width: 220, height: 22, borderRadius: 11, background: '#ffffff44', alignSelf: 'center'}} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/** Word that lands as an outline (hit 1) and then fills solid with a flash (hit 2): a two-step payoff. */
export const OutlineFill: React.FC<{text: string; at: number; fillAt: number; size?: number; color?: string}> = ({text, at, fillAt, size = 260, color = C.accent}) => {
  const f = useCurrentFrame();
  const look = enter('focus', f, s(at));
  const fill = ramp(f, s(fillAt), s(fillAt) + 3);
  const flash = f >= s(fillAt) ? Math.exp(-(f - s(fillAt)) / 4) : 0;
  return (
    <div style={{position: 'relative'}}>
      <AbsoluteFill style={{background: color, opacity: flash * 0.35, position: 'fixed'}} />
      <div style={{...look, fontFamily: FONT, fontWeight: 900, fontSize: size, lineHeight: 1, direction: 'rtl', color: fill > 0.5 ? color : 'transparent', WebkitTextStroke: `5px ${color}`, transform: `${look.transform} scale(${1 + 0.08 * flash})`, textShadow: fill > 0.5 ? `0 0 ${40 * flash + 10}px ${color}88` : 'none'}}>{text}</div>
    </div>
  );
};

/** The frame shrinks into a code editor showing the code that draws it; lines light up on cue. */
export const CodeReveal: React.FC<{at: number; lines: {code: string; at?: number}[]; width?: number}> = ({at, lines, width = 960}) => {
  const f = useCurrentFrame();
  const p = ramp(f, s(at), s(at) + 10);
  return (
    <div style={{width, borderRadius: 28, overflow: 'hidden', background: '#0B0C16', border: '3px solid #23253A', transform: `scale(${interpolate(p, [0, 1], [1.6, 1])})`, opacity: p, boxShadow: '0 40px 120px rgba(0,0,0,0.5)'}}>
      <div style={{height: 64, background: '#15172A', display: 'flex', alignItems: 'center', gap: 12, padding: '0 24px', direction: 'ltr'}}>
        {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <div key={c} style={{width: 18, height: 18, borderRadius: '50%', background: c}} />)}
        <div style={{marginLeft: 18, fontFamily: 'monospace', fontSize: 28, color: '#8A8CA8'}}>Video.tsx</div>
      </div>
      <div style={{padding: '26px 30px', direction: 'ltr', display: 'flex', flexDirection: 'column', gap: 8}}>
        {lines.map((l, i) => {
          const on = l.at !== undefined && f >= s(l.at);
          const hl = l.at !== undefined ? ramp(f, s(l.at), s(l.at) + 5) : 0;
          return (
            <div key={i} style={{display: 'flex', gap: 22, fontFamily: 'monospace', fontSize: 31, lineHeight: 1.5, color: on ? C.white : '#8D90B0', background: `rgba(198,255,61,${0.16 * hl})`, borderLeft: `6px solid rgba(198,255,61,${hl})`, paddingLeft: 12, borderRadius: 6}}>
              <span style={{color: '#4A4D68', width: 34, textAlign: 'right'}}>{i + 1}</span>
              <span style={{whiteSpace: 'pre'}}>{l.code}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
