import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {C, SIZE, s} from './kit/theme';
import {Scenes, SceneDef} from './kit/scene';
import {Stack, Swap, Word} from './kit/text';
import {Solid} from './kit/backgrounds';

// Storyboard. Every time is the absolute second of the spoken word, taken from words.json.
// Replace this example with one scene per idea of the script (see assets/examples/ for a full approved video).
export const DURATION_SECONDS = 4;

const scenes: SceneDef[] = [
  // colour: cream | one value moves: question -> answer
  {
    from: 0,
    to: 4,
    render: () => (
      <>
        <Solid color={C.cream} />
        <Stack>
          <Swap items={[['שלום', 0.2], ['עולם', 1.0]]} color={C.ink} />
          <Word text="עולם" at={1.0} entry="focus" size={SIZE.hero} />
        </Stack>
      </>
    ),
  },
];

// Code-made effects (scripts/make_sfx.py -> public/sfx). [file, second, volume]
const SFX: [string, number, number][] = [
  // ['hit', 1.0, 0.5],
];

export const Video: React.FC = () => (
  <AbsoluteFill style={{background: C.ink}}>
    <Scenes scenes={scenes} />
    {/* <Audio src={staticFile('voice.wav')} /> */}
    {/* <Audio src={staticFile('music.mp3')} volume={0.12} /> (licensed music only) */}
    {SFX.map(([name, t, v], i) => (
      <Sequence key={i} from={s(t)} durationInFrames={60}>
        <Audio src={staticFile(`sfx/${name}.wav`)} volume={v} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
