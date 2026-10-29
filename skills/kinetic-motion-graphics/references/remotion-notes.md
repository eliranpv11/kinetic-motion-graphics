# Remotion notes

## Setup

- Node 18+ (tested with Node 22). `npm install` in the copied template. The template's `package.json` pins Remotion 4.x; keep `remotion`, `@remotion/cli`, `@remotion/google-fonts` and `@remotion/media-utils` on the same version.
- The first render downloads a headless Chrome build automatically (about 120 MB, once).
- Windows: if `node`/`npm` are not on PATH in a non-interactive shell (version managers such as fnm or nvm only add them in interactive shells), prepend the Node install folder to PATH for the command, or call `node node_modules/@remotion/cli/remotion-cli.js ...` directly.

## Audio

- Put the voice in `public/` and play it with `<Audio src={staticFile('voice.wav')} />` at the root of the composition, outside `Scenes`, so cuts never interrupt it.
- Set `DURATION_SECONDS` to the voice length plus 0.6 to 1.0 s.
- Music: add a second `<Audio>` with `volume={0.12}` (duck under speech). Remotion mixes on render.

## Word timings

```
uv run --no-project --with faster-whisper --with numpy python -I scripts/word_timings.py public/voice.wav words.json --lang he
```

Uses `medium` by default (CPU, int8, about 1 to 2 min for 40 s). It decodes audio through ffmpeg to avoid PyAV version mismatches.

## Time model

`Scenes` renders only the active scene and does not wrap it in a `<Sequence>`, so `useCurrentFrame()` inside a scene is the absolute frame. That is why every `at` in the storyboard is an absolute second. If you add a `<Sequence>` yourself, remember that frames inside it restart at 0.

## QA commands

```
# one still per scene (after its hero word), quarter size
npx remotion still Main out/s_12.4.png --frame=372 --scale=0.3
# tile stills into a contact sheet
ffmpeg -i out/s_%02d.png -vf tile=5x3 out/sheet.png      # stills named s_01.png, s_02.png, ...
# frame strip around a cut at 13.3 s
ffmpeg -ss 13.1 -t 0.5 -i out/video.mp4 -vf "scale=180:-1,tile=8x2" strip.png
```

## Pitfalls found in practice

- Never call a hook (`useCurrentFrame`, `useVideoConfig`) directly inside a scene's `render()` function: `Scenes` calls `render()` from its own component, so the hook count changes when the scene changes and the full render fails with React error #310 (single stills still work, which hides the bug). Wrap the logic in a small component (for example `After`, `Hide`). Always run one full render, not only stills.

- Never mix the `padding` shorthand with `paddingTop` in one style object: key order decides, and the shorthand silently wins. The kit's `Stack` uses longhands.
- An entrance's `transform` comes from `enter()`. Passing `style={{transform: ...}}` to `Word` replaces it and kills the animation; wrap the word in a div instead.
- SVG `transform-origin` on children is unreliable across renderers; rotate a `<g>` with `rotate(angle cx cy)` instead (see `Spark`).
- When words replace each other in one spot, keep the outgoing word 3 frames past the swap; otherwise the incoming fade leaves a blank frame.
- Muted lead-in text that sits on a background which changes from dark to light needs a mid-grey that reads on both.
- A strike drawn too early hides the word before it is read. Let the word be on screen at least 0.5 s first.
