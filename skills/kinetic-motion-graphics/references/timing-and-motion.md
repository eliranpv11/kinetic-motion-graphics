# Timing and motion

Numbers measured frame by frame (30 fps) from a professional 45 s Hebrew kinetic-typography promo, then used in the kit. Treat them as defaults to tune, not laws.

## Measured rhythm

- Scene length: 0.5 to 3.5 s; most ideas get 1.2 to 2.5 s.
- Still holds: rarely longer than 0.5 s (16 frames). The longest fully still stretch in 45 s was 17 frames. Everything else has some motion.
- Element entrances: 4 to 7 frames. Big "event" moves (a badge popping, a stamp) take 7 to 10 frames including the settle.
- Hard cuts: single-frame changes on sentence boundaries, often hidden by a colour change of the whole world (cream to black, black to orange).
- A full-screen colour wipe (circle iris in the accent colour) marks a section change, about once per 10 to 15 s.

## Entrance recipes (kit `enter()`)

| Kind | Use for | Frames | Look |
|---|---|---|---|
| `rise` | lead-in and secondary words | 4 to 6 | opacity 0→1, y +28→0, blur 6→0, ease-out cubic |
| `focus` | hero words | 5 | blur 16→0, scale 1.10→1.00, opacity 0→1 over 3 |
| `pop` | badges, starbursts, icons | 9 | spring (damping 9, stiffness 180, mass 0.6) overshoots to ~125 % then settles; rotation unwinds from -25°; blur 8→0 |
| `slam` | stamps, single punch words | 6 + settle | scale 2.3→1 with ease-in, -8° tilt, then a decaying wobble; pair with a 10-frame screen shake |
| `type` | chat inputs, code | 22 chars/s | characters appear, blinking caret |

Ease-out (`bezier(0.22, 1, 0.36, 1)`) for things arriving, ease-in for things hitting (slam). Never linear for position or scale.

## Supporting motion

- **Dim on arrival:** when the hero word lands, earlier words in the scene go to 35 % opacity over 6 frames. This is the main hierarchy device.
- **Push-in:** every scene scales 1.00→1.04 across its length. The camera never sits still.
- **Ambient drift:** backgrounds rotate (sunburst 0.25°/frame), pan (blueprint 0.6 px/frame) or float (glow blobs on 140 to 200 frame sine cycles).
- **Shake:** exponential decay over ~10 frames, 14 px start. Use only on a slam or an impact, at most once per scene.
- **Click feedback:** cursor scales to 0.85 for 4 frames, ripple ring expands and fades over 12 frames.

## Sync

- Word lands at the start time from `words.json` (0 to 2 frames early is fine).
- Whisper often stretches a word's start back into the preceding silence; when a start sits exactly on the previous word's end and a pause was audible, take the later onset from a second pass or trust the pause.
- Hard cuts go in the gap between sentences, not mid-word.
- **No empty frames after a cut.** Place each cut on the start time of the scene's first spoken word, give that first element the same `at`, and let props that support it (backgrounds, documents, waveforms) start a few frames before the cut so they are already there. A scene that opens on 2 to 4 empty frames reads as a glitch. Props with a staggered or pop entrance (panels of many items, toggles, cards) need 0.25 to 0.7 s of pre-roll before the cut so they are already full on the first frame.
- Leave 0.6 to 1.0 s after the last word for the end card to breathe.
