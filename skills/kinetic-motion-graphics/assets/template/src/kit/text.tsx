import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, SIZE, s} from './theme';
import {Entry, dimAfter, enter} from './motion';

export type WordProps = {
  text: string;
  /** absolute time in seconds when the word lands (sync to the spoken word) */
  at: number;
  entry?: Entry;
  size?: number;
  weight?: 500 | 700 | 900;
  color?: string;
  /** seconds: step back to muted when the next idea lands */
  dimAt?: number;
  style?: React.CSSProperties;
};

/** A single kinetic word or short phrase. Hebrew is set RTL. */
export const Word: React.FC<WordProps> = ({
  text,
  at,
  entry = 'rise',
  size = SIZE.line,
  weight = 900,
  color = C.ink,
  dimAt,
  style,
}) => {
  const f = useCurrentFrame();
  const look = entry === 'type' ? enter('none', f, s(at)) : enter(entry, f, s(at));
  const shown = entry === 'type' ? typed(text, f, s(at)) : text;
  return (
    <div
      style={{
        fontFamily: FONT,
        fontWeight: weight,
        fontSize: size,
        lineHeight: 1.02,
        letterSpacing: size > 120 ? '-0.02em' : '0',
        color,
        direction: 'rtl',
        textAlign: 'center',
        whiteSpace: 'pre-wrap',
        ...look,
        opacity: look.opacity * dimAfter(f, dimAt === undefined ? undefined : s(dimAt)),
        ...style,
      }}
    >
      {shown}
    </div>
  );
};

function typed(text: string, f: number, at: number, cps = 22) {
  const n = Math.max(0, Math.floor(((f - at) / 30) * cps));
  return text.slice(0, n);
}

/** Vertical stack centred on screen, with an optional vertical offset. */
export const Stack: React.FC<{children: React.ReactNode; gap?: number; top?: number | string; style?: React.CSSProperties}> = ({
  children,
  gap = 18,
  top,
  style,
}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: top === undefined ? 'center' : 'flex-start',
      gap,
      // longhands only: a `padding` shorthand would silently override paddingTop
      paddingLeft: 70,
      paddingRight: 70,
      paddingTop: top ?? 0,
      ...style,
    }}
  >
    {children}
  </div>
);

/** Keeps children until `until` seconds (+3 frames, so the incoming word's fade never leaves a blank frame). */
export const Hide: React.FC<{until: number; children: React.ReactNode}> = ({until, children}) => {
  const f = useCurrentFrame();
  return f < s(until) + 3 ? <>{children}</> : null;
};

/** Mounts children from `t` seconds. Use it instead of calling hooks inside a scene's render() (React error #310). */
export const After: React.FC<{t: number; children: React.ReactNode}> = ({t, children}) => {
  const f = useCurrentFrame();
  return f >= s(t) ? <>{children}</> : null;
};

/** Small caption that swaps line by line in one spot, each line landing on its spoken time. */
export const Swap: React.FC<{items: [string, number][]; size?: number; color?: string; weight?: 500 | 700 | 900}> = ({items, size = 66, color = C.white, weight = 700}) => (
  <div style={{position: 'relative', height: size * 1.4, width: 1000}}>
    {items.map(([t, a], i) => (
      <Hide key={t} until={items[i + 1]?.[1] ?? 9999}>
        <div style={{position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Word text={t} at={a} size={size} weight={weight} color={color} />
        </div>
      </Hide>
    ))}
  </div>
);

/** Word with one part in the accent colour, e.g. ["שמלמדת את ", "קלוד"]. */
export const Mixed: React.FC<{parts: [string, string?][]; at: number; size?: number; entry?: Entry; dimAt?: number}> = ({
  parts,
  at,
  size = SIZE.line,
  entry = 'rise',
  dimAt,
}) => {
  const f = useCurrentFrame();
  const look = enter(entry, f, s(at));
  return (
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: size,
        lineHeight: 1.05,
        direction: 'rtl',
        textAlign: 'center',
        ...look,
        opacity: look.opacity * dimAfter(f, dimAt === undefined ? undefined : s(dimAt)),
      }}
    >
      {parts.map(([t, col], i) => (
        <span key={i} style={{color: col ?? C.ink}}>
          {t}
        </span>
      ))}
    </div>
  );
};
