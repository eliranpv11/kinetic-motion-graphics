// APPROVED EXAMPLE (user-accepted 2026-10-27): a full 38 s Hebrew text-to-video with a 7 s hook, 13 scenes and code-made SFX.
// Copy into src/ next to kit/ to run it. Pair: voice in public/voice_v6.wav, effects in public/sfx/, words from scripts/word_timings.py.
// Study it for: hook structure (identity, shock, defuse, interrupt, two-step payoff, meta proof), colour-script comments,
// pre-rolled props on cuts, Swap captions, and the SFX array.
import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {C, FONT, s} from './kit/theme';
import {Scenes, SceneDef} from './kit/scene';
import {Stack, Word} from './kit/text';
import {IrisWipe, Solid} from './kit/backgrounds';
import {ChatInput, FileCard, Spark} from './kit/props';
import {Envelope, FilmStrip, Morph, SceneCard} from './kit/document';
import {AutoToggle, BeforeAfter, CleanFrame, ControlsToButton, EasingCurve, GlitchFrame, IconSteps, Magnifier} from './kit/showcase';
import {CodeReveal, OutlineFill, PhoneFeed, PulseMonitor} from './kit/hook';

// v6: the user's script (proofread, SCRIPT_v6.md). Voice: audio/v6/take1_spliced.wav = take1.mp3 with 0-1.92 s replaced by
// harag/B_harag_et.mp3 ("קלוד הָרַג אֶת עורכי הווידאו", chosen by the user for a clear ר), eleven_v4, [confident].
// Times = absolute word starts from audio/v6/words.json.
// Spine: the "AI kills editors" claim is noise -> this video itself is the proof -> now you can do it too.
export const DURATION_V6 = 37.9;

const CAP = 66;
const Hide: React.FC<{until: number; children: React.ReactNode}> = ({until, children}) => {
  const f = useCurrentFrame();
  return f < Math.round(until * 30) + 3 ? <>{children}</> : null;
};
/** Mounts children only from second `t` (hooks must live in a component, never in a scene's render()). */
const After: React.FC<{t: number; children: React.ReactNode}> = ({t, children}) => {
  const f = useCurrentFrame();
  return f >= s(t) ? <>{children}</> : null;
};
const Swap: React.FC<{items: [string, number][]; size?: number; color?: string}> = ({items, size = CAP, color = C.white}) => (
  <div style={{position: 'relative', height: size * 1.4, width: 1000}}>
    {items.map(([t, a], i) => (
      <Hide key={t} until={items[i + 1]?.[1] ?? 999}>
        <div style={{position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Word text={t} at={a} size={size} weight={700} color={color} />
        </div>
      </Hide>
    ))}
  </div>
);

const scenes: SceneDef[] = [
  // colour: ink + lime flash | identity in 0.4 s
  {
    from: 0,
    to: 0.42,
    push: 1.1,
    render: () => (
      <>
        <Solid color={C.ink} />
        <Stack gap={20}>
          <Spark size={220} />
          <Word text="קלוד" at={0} size={200} entry="focus" color={C.white} />
        </Stack>
      </>
    ),
  },
  // colour: ink + red monitor | shock: the editors' pulse flatlines on "הרג"
  {
    from: 0.42,
    to: 2.25,
    shakes: [1.95],
    render: () => (
      <>
        <Solid color={C.ink} />
        <Stack gap={60}>
          <Word text="קלוד הרג את" at={0.42} size={CAP + 10} weight={900} color={C.white} />
          <PulseMonitor label="עורכי הווידאו" flatAt={1.95} />
          <Word text="עורכי הווידאו" at={1.02} size={110} entry="slam" color="#FF4D4D" />
        </Stack>
      </>
    ),
  },
  // colour: phone glow on ink | defuse: the viewer's own endless feed
  {
    from: 2.25,
    to: 5.55,
    render: () => (
      <>
        <Solid color="#07080F" />
        <Stack gap={34}>
          <Swap items={[['כן, אני יודע.', 2.25], ['שמעתם את זה כבר מיליון פעם', 3.6]]} />
          <PhoneFeed at={2.1} freezeAt={5.5} cards={['הכלי שיחליף אותך', 'AI עושה הכול', '10 כלים שחייבים', 'זה הסוף של...', 'אל תפספסו את זה']} />
        </Stack>
      </>
    ),
  },
  // colour: black, the one motivated hold | interrupt + two-step payoff
  {
    from: 5.55,
    to: 7.12,
    push: 1.02,
    render: () => (
      <>
        <Solid color="#000000" grain={false} />
        <Stack gap={40}>
          <Word text="אבל הפעם" at={5.58} size={CAP} weight={700} color="#7A7C8E" />
          <OutlineFill text="אמיתי" at={6.38} fillAt={6.62} size={280} />
        </Stack>
      </>
    ),
  },
  // colour: ink, code editor | meta proof: the code that draws this video, each item fires live
  {
    from: 7.12,
    to: 11.28,
    render: () => (
      <>
        <Solid color={C.ink} />
        <IrisWipe at={10.72} color={C.accent} dur={10} />
        <Stack gap={36}>
          <Word text="כל מה שאתם רואים עכשיו על המסך" at={7.12} size={CAP - 6} weight={700} color={C.white} />
          <CodeReveal
            at={6.8}
            lines={[
              {code: '<Scenes scenes={scenes} />'},
              {code: '<Word text="כתוביות" entry="type" />', at: 9.1},
              {code: '<EasingCurve at={9.9} />', at: 9.92},
              {code: '<IrisWipe at={10.7} />', at: 10.72},
              {code: '<Audio src="voice.wav" />'},
            ]}
          />
          <div style={{position: 'relative', height: 420, width: 1000}}>
            <Hide until={9.92}>
              <div style={{position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Word text="כתוביות" at={9.1} size={150} entry="type" color={C.accent} />
              </div>
            </Hide>
            <Hide until={10.72}>
              <div style={{position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <After t={9.92}>
                  <EasingCurve at={9.92} size={400} />
                </After>
              </div>
            </Hide>
          </div>
        </Stack>
      </>
    ),
  },
  // colour: inkSoft | autopilot
  {
    from: 11.28,
    to: 13.88,
    shakes: [13.22],
    render: () => (
      <>
        <Solid color={C.inkSoft} />
        <Stack gap={60}>
          <div style={{display: 'flex', alignItems: 'center', gap: 24, direction: 'rtl'}}>
            <Spark size={90} />
            <Word text="קלוד עשה את הכול" at={11.28} size={CAP} weight={700} color={C.white} />
          </div>
          <AutoToggle at={11.0} onAt={12.6} label="טייס אוטומטי" />
          <Word text="לבד" at={13.22} size={190} entry="slam" color={C.accent} />
        </Stack>
      </>
    ),
  },
  // colour: ink | the lens
  {
    from: 13.88,
    to: 15.54,
    render: () => (
      <>
        <Solid color={C.ink} />
        <Stack gap={50}>
          <Word text="תראו איזו רמה מטורפת" at={13.88} size={CAP} weight={700} color={C.white} />
          <Magnifier at={13.6} size={880}>
            <CleanFrame text="רמה" />
          </Magnifier>
        </Stack>
      </>
    ),
  },
  // colour: paper (light break) | before/after slider
  {
    from: 15.54,
    to: 18.88,
    render: () => (
      <>
        <Solid color={C.paper} />
        <Stack gap={50}>
          <Swap items={[['זה לא נראה כמו AI בכלל', 15.54], ['זה נראה כמו סטודיו אמיתי', 17.32]]} color={C.ink} />
          <BeforeAfter at={15.3} wipeAt={17.32} before={<GlitchFrame text="AI" />} after={<CleanFrame text="סטודיו" />} />
        </Stack>
      </>
    ),
  },
  // colour: inkSoft | complexity collapses into one button
  {
    from: 18.88,
    to: 22.66,
    shakes: [21.38],
    render: () => (
      <>
        <Solid color={C.inkSoft} />
        <Stack gap={40}>
          <Swap items={[['והחלק הכי מטורף', 18.88], ['זה הרבה יותר פשוט', 20.38], ['ממה שזה נראה', 21.72]]} />
          <ControlsToButton at={18.4} collapseAt={21.0} label="פשוט" />
        </Stack>
      </>
    ),
  },
  // colour: ink | the skill file turns into an animation
  {
    from: 22.66,
    to: 26.48,
    render: () => (
      <>
        <Solid color={C.ink} />
        <Stack gap={50}>
          <Swap items={[['בניתי לכם סקיל', 22.66], ['שמלמד את קלוד ליצור', 23.64], ['בדיוק אנימציות כאלה', 24.94]]} />
          <Morph
            size={640}
            stages={[
              {at: 22.5, node: <FileCard name="SKILL.md" at={22.5} />},
              {at: 24.94, node: <SceneCard word="אנימציות" size={380} />},
            ]}
          />
        </Stack>
      </>
    ),
  },
  // colour: paper (light break) | three steps, then the request types itself
  {
    from: 26.48,
    to: 31.82,
    render: () => (
      <>
        <Solid color={C.paper} />
        <Stack gap={60}>
          <Swap items={[['כל מה שאתם צריכים לעשות', 26.48], ['להוריד, להתקין', 28.06], ['ולהגיד לקלוד מה אתם רוצים', 29.62]]} color={C.ink} />
          <div style={{background: C.ink, borderRadius: 60, padding: 40}}>
            <IconSteps
              showAt={26.3}
              steps={[
                {label: 'הורדה', at: 28.06, icon: 'download'},
                {label: 'התקנה', at: 28.74, icon: 'box'},
                {label: 'בקשה', at: 29.62, icon: 'bubble'},
              ]}
            />
          </div>
          <ChatInput text="תיצור לי אנימציה לטקסט הזה" at={30.0} sendAt={31.5} />
        </Stack>
      </>
    ),
  },
  // colour: ink | it already knows: the film fills itself
  {
    from: 31.82,
    to: 33.88,
    shakes: [31.84],
    render: () => (
      <>
        <Solid color={C.ink} />
        <Stack gap={70}>
          <Word text="זהו." at={31.82} size={170} entry="slam" color={C.accent} />
          <FilmStrip frames={[{t: 'כתוביות', at: 32.5}, {t: 'אנימציות', at: 32.75}, {t: 'מעברים', at: 33.0}, {t: 'סאונד', at: 33.25}, {t: 'סרטון', at: 33.5}]} />
          <Word text="הוא כבר יודע מה לעשות" at={32.52} size={CAP} weight={700} color={C.white} />
        </Stack>
      </>
    ),
  },
  // colour: lime | CTA
  {
    from: 33.88,
    to: 37.9,
    push: 1.02,
    render: () => (
      <>
        <Solid color={C.accent} grain={false} />
        <Stack gap={46}>
          <Word text="תכתבו ״אנימציות״" at={33.88} size={112} entry="focus" color={C.ink} />
          <ChatInput text="אנימציות" at={34.46} sendAt={35.1} width={760} />
          <Word text="בתגובות" at={34.96} size={100} color={C.ink} />
          <Envelope at={35.62} flyAt={36.7} />
          <Word text="ואני שולח לכם את הסקיל" at={35.62} size={CAP} weight={700} color={C.ink} />
        </Stack>
      </>
    ),
  },
];

// Sound effects (code-made, scripts/make_sfx.py). [file, second, volume]
const SFX: [string, number, number][] = [
  // first sentence stays clean: the "beep" + jump + flatline land right after it, in the gap 1.92-2.34 (measured)
  ['beep', 1.95, 0.4],
  ...[2.3, 2.72, 3.14, 3.56, 3.98, 4.4, 4.82, 5.24].map((t) => ['swipe', t, 0.22] as [string, number, number]),
  ['hit', 6.38, 0.4],
  ['hit', 6.62, 0.65],
  ['whoosh', 7.05, 0.4],
  ['click', 9.1, 0.5],
  ['click', 9.92, 0.5],
  ['click', 10.72, 0.5],
  ['whoosh', 10.9, 0.45],
  ['hit', 13.22, 0.5],
  ['whoosh', 15.45, 0.35],
  ['swipe', 17.3, 0.4],
  ['hit', 21.1, 0.45],
  ['whoosh', 22.6, 0.35],
  ['click', 28.06, 0.4],
  ['click', 28.74, 0.4],
  ['click', 29.62, 0.4],
  ['hit', 31.84, 0.5],
  ['whoosh', 33.82, 0.4],
  ['click', 35.1, 0.45],
  ['whoosh', 36.7, 0.45],
];

export const SkillV6: React.FC = () => (
  <AbsoluteFill style={{background: C.ink}}>
    <Scenes scenes={scenes} />
    <Audio src={staticFile('voice_v6.wav')} />
    {SFX.map(([name, t, v], i) => (
      <Sequence key={i} from={s(t)} durationInFrames={name === 'beep' ? 3 : 60}>
        <Audio src={staticFile(`sfx/${name === 'beep' ? 'flatline' : name}.wav`)} volume={v} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
