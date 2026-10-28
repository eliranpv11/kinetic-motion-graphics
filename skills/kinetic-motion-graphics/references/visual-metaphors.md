# Visual metaphors

The difference between captions and motion graphics: every claim *happens* on screen. Pick the metaphor from the type of claim, not from the words.

## Catalogue (kit component in brackets)

| Claim type | Visual | Kit |
|---|---|---|
| Hook / "nobody did X" | the key noun struck through after it is read | `Strike` |
| "It really happened" / confirmation | rubber stamp slams with a shake | `Stamp` |
| A list of things done | each item replaces the previous as one big word, over a timeline that fills itself | `Word` + `EditorTimeline` |
| Did it alone / automatically | brand spark spins, hero word slams | `Spark` + slam |
| Quality / level | meter fills bar by bar and flashes at MAX | `Meter` |
| "Not like X" | X pops in, then a marker crosses it out | `pop` + `Strike` |
| "Like a studio / pro" | dark wall, ceiling lights switch on one by one | `Studio` |
| "The best part" / excitement | comic sunburst world, starburst badge pops, word slams inside | `Sunburst` + `Starburst` |
| Complicated → simple | tangled scribble resolves into one clean accent line | `ScribbleToLine` |
| "I built / made" | blueprint world, a file card draws its own lines | `Blueprint` + `FileCard` |
| Teaching / principles | guide words, then a principle demonstrated (squash-and-stretch ball for animation) | `BouncingBall` |
| Steps / how-to | numbered steps that tick as each verb is spoken | `Steps` |
| "Just ask / tell it" | chat input types a request, send button fires | `ChatInput` |
| "It knows what to do" | the work assembles itself (timeline fills, playhead runs) | `EditorTimeline` |
| Social proof / call to comment | comments slide in fast with avatars and hearts | `CommentStack` |
| Section change | full-screen iris wipe in the accent colour | `IrisWipe` |
| End card | accent background, call to action, bouncing arrow | `Solid` + `Word` |

### More metaphors (kit `document.tsx`, `showcase.tsx`)

| Claim type | Visual | Kit |
|---|---|---|
| "Nobody did it by hand" | presence chip goes from live to offline | `StatusChip` |
| List of deliverables | big checklist ticking on each spoken word | `Checklist` |
| Automatic / by itself | large switch flips on ("autopilot") | `AutoToggle` |
| Quality, detail | lens glides over a crisp frame | `Magnifier` |
| Cheap vs premium, before vs after | slider wipes from a glitchy frame to a clean one | `BeforeAfter`, `GlitchFrame`, `CleanFrame` |
| Simpler than it looks | panel of knobs and sliders collapses into one button | `ControlsToButton` |
| Principles of good motion | easing curve draws itself, a dot rides it | `EasingCurve` |
| Download, install, ask | three icon tiles light up in turn | `IconSteps` |
| Text becomes video | document words highlight, scan, lift off into film frames | `DocPage`, `FilmStrip` |
| Synced to the voice | waveform spikes where words land | `Waveform` |
| Idea becomes picture | word → bulb → picture → scene card | `Morph` + icons |
| No editing timeline | timeline folds and is thrown away | `TimelineToss` |
| "I'll send it to you" | envelope with the file flies off | `Envelope` |

## Inventing a new one

1. Name the change the sentence describes (before → after, less → more, hidden → revealed, many → one).
2. Find the simplest object that can physically go through that change in under one second.
3. Time the change so its decisive moment lands on the hero word.
4. Build it once in `props.tsx` with an `at` prop in absolute seconds, so later videos can reuse it.

Avoid literal clip-art (a light bulb for "idea"). The best metaphors are interfaces and physical behaviour the audience already knows: meters, stamps, cursors, checkmarks, progress bars, chat boxes.
