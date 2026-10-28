import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {s} from './theme';
import {shake} from './motion';

export type SceneDef = {
  /** seconds, absolute */
  from: number;
  to: number;
  /** seconds: optional camera shake impulses inside the scene */
  shakes?: number[];
  /** slow push-in from 1 to this scale over the scene (camera never sits still) */
  push?: number;
  render: () => React.ReactNode;
};

/**
 * Plays scenes back to back with hard cuts on the spoken boundary.
 * Children use absolute frames (useCurrentFrame), so every `at` in the storyboard
 * is the real time of the spoken word: no per-scene offset bookkeeping.
 */
export const Scenes: React.FC<{scenes: SceneDef[]}> = ({scenes}) => {
  const f = useCurrentFrame();
  const sc = scenes.find((x) => f >= s(x.from) && f < s(x.to));
  if (!sc) return null;
  const p = (f - s(sc.from)) / Math.max(1, s(sc.to) - s(sc.from));
  const scale = 1 + ((sc.push ?? 1.04) - 1) * p;
  const sh = (sc.shakes ?? []).map((t) => shake(f, s(t))).find((x) => x !== 'translate(0px,0px)') ?? '';
  return <AbsoluteFill style={{transform: `scale(${scale}) ${sh}`}}>{sc.render()}</AbsoluteFill>;
};
