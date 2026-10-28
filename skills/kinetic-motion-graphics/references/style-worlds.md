# Style worlds

The kit's default look (cream, ink, one orange accent, Rubik, pop and slam) suits most videos. When the topic calls for a stronger identity, give the whole video **one style world**: a fixed grammar of palette, type, motion, transitions and sound that every scene obeys. The scene-level "event colours" in `design-system.md` still work inside a world.

Adapted for vertical Hebrew Remotion from the open style library lemomo-ai/lemo-opuscar (MIT), which was read, not installed. Nothing here needs new packages: every effect below is CSS, SVG or a Remotion primitive.

## Contents
1. Choosing a world
2. The worlds (seven)
3. Craft rules that apply in every world
4. Building the effects in Remotion

## 1. Choosing a world

- Pick from the **topic and tone**, not from what looked good last time. Write down two or three candidate worlds, then pick one and say why in one line. The first idea that comes to mind is usually the cliché.
- One world per video. Never mix two worlds' transition grammars.
- Every world has **native moves**: things only that medium can do (a stamp, a knife cut, an ink layer). Put the strongest one on the **emotional peak** of the script (usually the payoff after the pattern interrupt). One native move at the peak beats five scattered.
- If the user's channel has a running series, keep its world fixed across episodes; vary the native moves.

| Topic / tone | World |
|---|---|
| Steps, systems, comparisons, "how it works", calm authority | Swiss grid |
| Myth busting, warnings, scams, "the case of…", verdicts | Case file |
| Creative, culture, lifestyle, warm and human | Riso print |
| Software, AI tools, product features, Claude tips | Dark keynote |
| News with numbers, facts with a source | News captions |
| Lists, rankings, "5 tips", playful energy | Game show |
| Explaining one idea, a formula, cause and effect | Whiteboard |

## 2. The worlds

Each world: when it fits, palette, Hebrew type, motion, transitions, native moves, sound, pitfalls. Hex values are starting points; pick the accent for the topic.

### Swiss grid

- **Fits:** steps, a system, before/after, a comparison. Feels exact and trustworthy.
- **Palette:** page `#EAE9E5`, paper `#FFFFFF`, ink `#111111`, two light greys for grid lines, and **one** signal colour (red `#E30613`, orange `#FF5A00` or ultramarine `#1F3FFF`). Only one element carries the signal: it is the protagonist.
- **Type:** one family, several weights: Heebo 400/800/900 or IBM Plex Sans Hebrew. **Flush right, ragged left** (the RTL mirror of Swiss flush left). Giant numerals beside tiny notes (40 px) with a 1 px rule above.
- **Motion:** two curves only: `bezier(0.7, 0, 0.2, 1)` for snaps, linear for lines being drawn. **No overshoot, no spring, no blur entrance.** Words rise out of a clip rect (mask), never fade. Every snap lands on a beat or a spoken word.
- **Transitions:** wipes, clip reveals, a hard pan by one column. Never a dissolve.
- **Native moves:** *the grid means something* (columns are days, rows are steps); *knife cut* (a thin line crosses an element, then it collapses to its midline: for "removed", "cancelled", "no more"); *the exception* (one element moves linearly, off-grid, in the signal colour: the rebel, the outlier, the product); *re-flow* (everything rearranges around a change, nearest first).
- **Sound:** dry, close print foley: letterpress clack, paper slap, guillotine snick, a felt thump on landings. Music with a steady pulse (marimba ostinato, minimal techno).
- **Pitfalls:** many thin columns look like a chart; use fewer, wider modules. Rotate, hold, then label; never both at once.

### Case file (halftone dossier)

- **Fits:** "the truth about…", a scam exposed, a myth on trial, warnings. Serious frame, any subject.
- **Palette:** cream paper with faint mottling, one dark ink (navy `#1B2A4A` or sepia-black) for outlines and captions, an overprint ink for offset shadows (cobalt), a highlight ink for keywords (yellow), and a red kept **only for stamps and alarms**. At most five inks plus paper.
- **Type:** headlines in a black serif: **Frank Ruhl Libre 900** or **Suez One**, with a **misregistration shadow** (the same text +8/+8 px in the overprint ink, `mix-blend-mode: multiply`). Numbers in a fat display face (Secular One). Case numbers and dates in a Latin mono (digits only).
- **Motion:** everything enters with overshoot (back ease, 9 to 13 frames); headlines pop **per letter** with a 2-frame stagger (per word for long Hebrew lines, since final forms and joins look broken mid-word). Stamp slam: 3 frames from 2.6× to 1×, then a damped bounce, shake + stamp sound on the same frame.
- **Transitions:** **dot wipe**: a grid of circles grows to cover the frame (~13 frames, diagonal delay), the scene switches while covered, the dots shrink away. A hard cut is saved for the biggest hit.
- **Native moves:** *the accusation* (topic becomes "תיק מס׳ 4127: …", counts listed); *numbered exhibits* (a giant halftone numeral behind each point); *the stamp* (verdict as a physical slam: ״מאומת״, ״שקר״, ״פג תוקף״); *redaction* (black bars print over words and lift one by one: the reveal).
- **Sound:** rubber stamp, paper slide, typewriter, a camera flash pop.
- **Pitfalls:** dots smaller than ~14 px moiré after encoding. A 100 % white flash reads as a dropped frame; cap at 50 %.

### Riso print

- **Fits:** warm, creative, cultural topics; anything that should feel handmade.
- **Palette:** warm paper `#F4EEE2` (never pure white) and **two or three translucent spot inks** that multiply where they overlap: blue `#0078BF` + yellow `#FFE800` + fluorescent pink `#FF48B0`, or teal `#00838A` + fluorescent orange `#FF7477`. Every other colour is an overlap. Save the densest overlap for the peak.
- **Type:** a heavy face printed on one ink layer, so it misregisters with it: Secular One or Rubik 900. A title can be printed twice with a visible offset (the "double hit"). Captions on a paper-white knockout strip.
- **Motion:** registration offsets are **fixed per scene** (±1 to 3 px), not jittered every frame. On an accent: a **kick** (8 to 14 px, decaying over ~8 frames). In a held moment the layers drift apart, then snap back on the next word.
- **Transitions:** an ink shape grows over the frame (everything under it becomes the mix colour), then shrinks into the next scene's key shape.
- **Native moves:** *plates as story* (the world gains an ink at each turning point; colour returns at the payoff); *two inks, a third where they meet* (for "together", a merger, an overlap that is the finding); *knockout reveal* (a shape made of missing ink whose ink arrives later).
- **Pitfalls:** three halftoned inks in one area turn to mud. Per-frame grain flicker inflates the file; re-seed grain per scene, not per frame.

### Dark keynote

- **Fits:** software, AI, tools, product features. The interface is the star (cursor, windows, toggles, one number).
- **Palette:** a cool near-black stage (slightly blue, never brown), three surface steps, text in three greys. **One luminous accent** for what the product *is* or *does* (lime `#B7F34A`, violet `#8B7CFF`, or Claude orange `#D97757` for Claude topics). An optional **problem colour** (red) exists only while the problem exists and never returns after the turn.
- **Type:** Heebo or IBM Plex Sans Hebrew. One line per screen. **The big number gets its own screen with no caption over it.** Captions are a UI toast: a dark translucent pill, 1 px light border, bottom centre (above the platform safe zone).
- **Motion:** precise, on ones, no boil. Fast-out with one small overshoot and an immediate settle. Nothing just fades: closing is designed (parts retract, a CRT-off squash to a point).
- **Native moves:** *generated accumulation* (notifications, tabs or tickets spawn by rule, faster and faster: the problem; build with `Array.from` and seeded `random()`); *the snap grid* (the whole mess flies into a clean grid on one word: the promise); *freeze* (everything stops mid-air and the music cuts to zero: the pattern interrupt); *number from glyph noise* (digits scramble and lock one by one); *light reveal* (a soft band sweeps and only lit pixels turn on, under ~1.3 s).
- **Sound:** soft UI clicks, glassy ticks, one sub hit on the snap; everything from one designed family.
- **Fit with the kit:** `ChatInput`, `Cursor`, `AutoToggle`, `StatusChip`, `ControlsToButton` already live here.

### News captions

- **Fits:** news, facts with numbers, anything that must read with the sound off.
- **Rules:** *sound-off first* (every beat understood from picture and captions alone); *the caption is the shot* (one huge line, slammed in two or three chunks, one keyword on a yellow block); *every number with its source on screen* (a small source tag slides in with it); *the biggest number lands in the first 4 frames* and rolls to its value.
- **Palette:** ink background `#151512` or the user's footage, ivory text `#F7F5EF`, honey yellow `#FFC21A` = the point, red `#FF4A3D` = the bad number, grey `#8D8B83` = labels.
- **Type:** Heebo 900 or Rubik 900, ~88 px (verdict lines ~110). Chunks slam 4 frames apart: scale 1.3→1 in 4 frames with back ease. Keyword block wipes in **right to left** behind its word in 4 frames, text turns ink. One keyword per caption. One line per caption: if it would wrap, split the sentence.
- **Numbers:** `font-variant-numeric: tabular-nums` so a rolling counter never jitters; the counter changes colour when it lands.
- **Transitions:** hard cut by default; a 1 to 2 frame white flash (≤ 50 %) on the turn; a card sliding in with speed streaks; a 0.3 s punch-in on the culprit; a split screen opening from its divider.
- **Native moves:** *proportion by darkness* (a yellow line sweeps to the percentage, what it passed goes dark, the figure sits on the dark side: for any "X% of…"); *the document says it* (the source page on a dark desk, a highlighter sweeps the line, the number pops beside it); *freeze and question* (the image stops on the viewer's question, music cut); *two counters racing*, the difference stamped after both settle.
- **Pitfall:** captions change at most every ~2.5 s even when shots change faster; reading time sets the caption clock.

### Game show

- **Fits:** lists, rankings, "5 things", challenges, light topics.
- **Palette:** ink, white, cream cards, and candy hues (yellow, orange, pink, green, sky, blue). **One round = one hue**: background, pattern and round card share it; neighbouring rounds never repeat a hue.
- **Type:** Secular One or Fredoka for big words, white or yellow with a thick ink outline (`-webkit-text-stroke` or paint-order stroke). Judgement words at an angle.
- **Motion:** everything on the beat. Entrances drop from above with ease-in and land on the word; pops use back ease; a small squash on every downbeat. Nothing fades in.
- **Transitions:** hard cuts on bar lines with a very short white flash.
- **Native moves:** *round cards* (a card flies in with the round number and name: "סיבוב 3"); *judgement word* (״בול!״, ״עבר!״ pops at an angle on the last hit); *call and response speeding up* (the pattern going from slow to fast *is* the story); *stats as game UI* (podium scores, counters racing to a target); *report card* (a typewritten recap with a grade stamp: the ending).
- **Sound:** a jingle per round card, pitched pips for each item, a crowd "oh" on the judgement.

### Whiteboard

- **Fits:** explaining one concept, a formula, cause and effect, a process.
- **Palette:** board white with faint ghost marks, **three markers at most, each with a fixed meaning**: dark ink for structure, blue for process, the accent (orange `#D97757` or red) for the thing that matters.
- **Type:** handwriting written stroke by stroke: Karantina or Amatic SC for notes; Rubik for the one hero word if it must be crisp.
- **Motion:** strokes follow a slow-fast-slow curve and are scheduled into a time window so the writing finishes on its word. Draw with SVG `stroke-dashoffset`. A label 0.3 to 0.8 s, a title up to ~3 s.
- **Transitions:** the camera travels across one big board instead of cutting; a drawn line leads the camera to the next region.
- **Native moves:** *writing in order* (the formula term by term as it is spoken); *the eraser rewinds* (wiping a line backwards = undo, "what if"); *ghosts of the old lesson* (a faint earlier drawing becomes relevant); *the full-board view* (pull back at the end to show every region as one picture).
- **Pitfall:** hand-drawn SVG paths in Hebrew must be traced right to left, or the writing order looks wrong.

## 3. Craft rules that apply in every world

- **Reading time for text-only beats** (no voice under them): hold at least 1.8 s and roughly (letters ÷ 15 + 1.5) s after the text finishes animating in. That formula was measured for English; treat it as a starting point for Hebrew and check by reading aloud. Fast pace comes from fewer words per screen, not from cutting before people finish reading.
- **Sound matches the material:** paper sounds like paper, glass like glass, UI like UI. It changes *which* effects you pick, not how many (keep four to eight per 30 s, from `hooks-and-sound.md`).
- **Sound as a transition, at least once:** bring the next scene's sound in a few frames before the cut (J-cut), or let a scene's sound run over the cut (L-cut).
- **Two silences:** besides the pattern-interrupt drop, one more near-silence before the payoff or the CTA; the first sound after it should be one of the most important in the video.
- **One transition grammar per world.** No default cross-fades anywhere.
- **Vary the pace:** one clear acceleration (a run of fast cuts) and one breath (the motivated hold). A video at one even speed feels flat.
- **Subject size:** at key moments the hero element fills at least a third of the frame height. Common failures: subject too small, colour on a similar colour (red on red), captions covering the subject, a gag too fast to read.
- **Loudness:** master to about −14 LUFS integrated, true peak ≤ −1 dB. Check with `ffmpeg -i out.mp4 -af ebur128 -f null -` (read the summary).

## 4. Building the effects in Remotion

| Effect | How |
|---|---|
| Halftone dots | SVG `<pattern>` of circles whose radius follows a density value, or CSS `radial-gradient` tiled with `background-size`; keep the step ≥ 14 px |
| Misregistration / overprint | render the layer twice: the copy in the second ink, offset a few px, `mix-blend-mode: multiply`; offsets fixed per scene |
| Translucent riso inks | each ink layer `mix-blend-mode: multiply` over paper |
| Grain | static per scene: seed Remotion's `random()` with the scene id, not the frame. Grain that changes every frame bloats the file and flickers |
| Clip-reveal text | an `overflow: hidden` box; the word translates up from below the baseline |
| Knife cut | a 2 px line scales across the element (linear, ~5 frames), then the element's `scaleY` collapses to 0 at its midline |
| Dot wipe | a grid of circles, each scaling 0→cover with a delay by `(x + y)` distance; swap the scene at full cover; max radius must cover the cell diagonal |
| Stroke-by-stroke writing | SVG path with `strokeDasharray = length`, animate `strokeDashoffset` with the slow-fast-slow curve |
| Rolling counter | interpolate the value, `Math.round`, `tabular-nums`; scramble digits with seeded `random()` before they lock |
| Outlined big type | `WebkitTextStroke` plus `paintOrder: 'stroke fill'` so the stroke sits outside the letters |
| Fonts | load from `@remotion/google-fonts/<Name>` with `subsets: ['hebrew', 'latin']`; verified to include Hebrew: Rubik, Heebo, Assistant, IBM Plex Sans Hebrew, Frank Ruhl Libre, Noto Serif Hebrew, Suez One, Secular One, Karantina, Amatic SC, Varela Round, Fredoka, Bellefair |

New reusable pieces (a `DotWipe`, `KnifeCut`, `Overprint`, `Halftone`) go into the kit once built, like any new metaphor.
