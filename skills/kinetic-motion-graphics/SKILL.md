---
name: kinetic-motion-graphics
description: Turn any text the user gives (a script, an idea, an article, a post, notes) into a finished studio-grade motion-graphics video, rendered in code with Remotion. The agent reads the text, writes a spoken script with a real hook, voices it in natural, correctly pronounced Hebrew or English at the lowest TTS cost, and builds kinetic typography where every word lands on the spoken word and every claim is shown as a visual metaphor, with music and sound effects. Use this skill whenever the user hands over text and wants a video from it, or asks for an animated explainer, a faceless short (Reels, TikTok, Shorts), a voiceover promo, animated captions, a "text-on-screen" video or a motion-graphics ad, even if they never say "Remotion" or "kinetic typography". Not for live-action or AI-generated footage (camera, actors, video models).
---

# Kinetic Motion Graphics

**Text in, video out.** The user pastes text. You read it, find the one thing it is trying to say, and deliver a finished vertical video: a hook that stops the scroll, a natural human voice, and motion graphics where every word lands on its sound and every claim happens on screen. The look comes from the meaning of the text, not from a fixed template.

Three promises shape every decision:
1. **Studio quality.** It must look and sound like a design studio made it.
2. **Correct, human Hebrew.** Native phrasing on screen; native pronunciation in the voice.
3. **Lowest cost that keeps the quality.** Paid generation happens once, after everything that can be checked for free has been checked.

## The pipeline at a glance

| # | Step | Output | Gate before the next step | Paid? |
|---|---|---|---|---|
| 1 | Read and distil | one-sentence message, audience, tone | — | no |
| 2 | Script | hook + body + CTA, clean and voice versions | user approves the script | no |
| 3 | Pronunciation probe | one short test line with the risky words | every risky word sounds right | ~100 credits |
| 4 | Voice | one full take | transcript matches, tone in range, user listens | ~1 credit per character |
| 5 | Timing | `words.json` | — | no |
| 6 | Storyboard | `src/Video.tsx` | stills sheet passes | no |
| 7 | Sound | music bed + effects layer | levels checked | no (code-made effects) |
| 8 | Render and review | `name_vN.mp4` | every cut checked, report written | no |

Steps 1, 2, 5, 6, 7 and 8 cost nothing; do them well so steps 3 and 4 run once.

## 1. Read and distil

Read everything the user gave. Write down, for yourself:
- **Message:** the single sentence the viewer should remember.
- **Audience and promise:** who is watching and what they get.
- **Proof:** the concrete facts in the text that support the message. Use only facts the user gave; never invent numbers, quotes or claims, and drop any claim you cannot stand behind (an unverified "this is critical" is a liability on screen).

Then sketch a **three-sentence spine** (setup, turn, payoff; the ending answers the opening) and a **must-show list** (each essential claim mapped to the scene that will show it; tell the user if any claim is dropped). If facts are missing, ask one numbered round of questions with a default for each. See `references/story-and-production.md`.

If the text is already a finished script, keep its wording and only tighten it.

## 2. Script

A 25 to 45 second script in three parts. Show it to the user and get approval before any paid step; every wording change after voicing costs a full re-take.

**Hook (first 15 to 25%).** Its own 6 to 10 second section, not an opening line. Build it from at least four of the seven techniques in `references/hooks-and-sound.md`: identity and shock in under 0.7 s, the headline made literal, defusing the skeptic, a pattern interrupt, a two-step payoff, meta proof, and show-don't-list.

**Body.** One spoken sentence per idea; each sentence must be something you can show. Short, everyday words.

**Call to action.** One clear action, said calmly.

**Write it the way an Israeli speaks** (Hebrew rules in `references/hebrew-writing.md`): spoken register, short sentences, verbs over nouns, no translated or "AI-sounding" phrasing, correct gender and person for speaker, addressee and every referent.

Keep two versions of every line:
- **Screen version:** standard full spelling (ktiv male), as it will appear on screen.
- **Voice version:** the same words prepared for TTS with `references/hebrew-pronunciation.md`: plene spelling, risky words unpointed, niqqud only on true homographs, no `!` or `?`, one opening delivery tag.

## 3. Pronunciation probe (cheap insurance)

Put every word the lexicon does not mark as **tested** (loanwords, names, consonant clusters, homographs) into one short test line of 10 to 15 words and generate it once. Ask the user to listen. Fix spellings in the lexicon until the line is right. This costs about 100 credits and prevents full re-takes at 400 to 600 credits each.

## 4. Voice

Generate **one** full take with the approved voice version (`references/hebrew-voice.md` has the recipe and the voice settings that a listener approved). Then, before anyone listens:
- Transcribe it with `scripts/word_timings.py` and diff against the script: dropped, doubled or garbled words.
- Measure delivery with `scripts/pitch_report.py` against the last approved take: balanced, neither monotone nor hyped, no rising end, no single line jumping out.

Send the take to the user. If words are wrong, ask for the complete list, fix them all in the probe line, then re-take once. Generate a second take only when the first has a defect. Before every paid call, tell the user its cost, the total spent so far, and the quota left; stop and ask before using more than half of what remains.

To extend an approved take (for example a new hook), voice only the new lines with the same voice and tag, and join them in the edit; never re-voice approved audio.

## 5. Timing

Run `scripts/word_timings.py` on the final audio to get `words.json`. Transcribed spelling is for timing only; on-screen text always comes from the screen version. When a new take of the same script replaces the voice, run `scripts/retime.py old_words.json new_words.json src/Video.tsx` to move every time in the storyboard automatically.

## 6. Storyboard and build

First pick the video's **style world** from its topic and tone (`references/style-worlds.md`: Swiss grid, case file, riso print, dark keynote, news captions, game show, whiteboard, or the kit's default look) and place its strongest native move on the payoff. Then group words into scenes: one idea per scene, cut on the pause between sentences, 1.2 to 3.5 s each. Mark one hero word per scene. Every scene must move one value (hard → easy, hidden → shown, off → on) and leave a small question the next scene answers; merge or cut scenes that do neither. For each scene choose a world and a metaphor (`references/visual-metaphors.md`), write one colour-script comment (world + colour) and read the comments as a sequence, then write the scene in `src/Video.tsx` as a `SceneDef` with absolute times from `words.json`. Cutting craft (one lead per cut, eye trace, camera move by intent, one motivated hold) is in `references/story-and-production.md`.

Visual rules (numbers in `references/timing-and-motion.md`, style in `references/design-system.md`):
- **Land on the word.** A word appears on the frame its sound starts; late never.
- **Picture first.** One big graphic performs the claim; captions stay small (60 to 70 px); large type only for the hero word.
- **One idea, one accent.** At most ~6 words visible; one accent colour, plus at most one "event colour" for the scene.
- **Never frozen, never empty.** Every background drifts; every scene pushes in slowly; holds under 0.5 s, except one motivated hold per video (usually the pattern interrupt). A cut never shows an empty frame: the first element lands on the cut, and staggered props start 0.25 to 0.7 s before it.
- **Fast in, hard out.** Entrances 4 to 9 frames with overshoot and blur (a style world may replace the entrance kind, never the speed); exits are hard cuts on the sentence boundary.
- **Contrast of worlds.** Consecutive scenes change light/dark or world.

Check before rendering: one still per scene after its hero word (`remotion still --frame=N --scale=0.3`), tiled into a sheet. Look for clipped text, overlaps, illegible marks, and scenes that look alike.

## 7. Sound

Never ship a silent bed under the voice without telling the user. One music track from start to end, ducked under speech; four to eight effects per 30 s on major visual events (shock cut, slam, reveal, full-screen transition); a short drop to near silence in the pattern interrupt. Make whooshes, hits and clicks in code (no cost, no licence issue). Music must come from a source the user owns or has a licence for. Details in `references/hooks-and-sound.md`.

## 8. Render, review, deliver

Render to a versioned file (`name_v1.mp4`, `name_v2.mp4`). Inspect a frame strip around **every** cut, audio/picture sync at three hero words, audio coverage (`ffprobe`: audio as long as the video, no silent tail), and loudness (about −14 LUFS, true peak ≤ −1 dB). Deliver the file, the stills sheet, the cost of the run, and each check with its evidence label (`measured`, `reviewed:<method>`, `user-accepted`, `not-performed`); a contact sheet is not a playback review and a transcript match is not a pronunciation check. Keep `<project>/record.md` current (script versions, voice settings, glossary, credits, render version, defects, handoff) so Claude or Codex can pick the work up.

**Revisions:** touch only what the user named and bump the version. A changed line invalidates its take, its timings and its pronunciation check; if a request breaks a lock, offer the nearest option with its credit cost in one line.

## Originality

References from other creators are for learning craft, never for copying. Before the storyboard is final: the hook, structure and call to action differ from the reference; fewer than a third of the metaphors appear in it; the palette and opening frame differ. If the user asks for "the same video", offer an original take on the same goal and say why.

## The template and kit

```
cp -r <skill>/assets/template <project>/remotion
cd <project>/remotion && npm install
# voice at public/voice.wav, storyboard in src/Video.tsx
npx remotion studio                                   # live preview
npx remotion still Main out/s.png --frame=120 --scale=0.3
npx remotion render Main out/video_v1.mp4
```

| Kit file (`src/kit/`) | Contents |
|---|---|
| `theme.ts` | palette (swap `C.accent` per brand), font (Rubik, Hebrew + Latin), type scale, `s(seconds)` |
| `motion.ts` | entrances `enter()`: rise, focus, pop, slam, type; `dimAfter`, `drift`, `shake`, `ramp` |
| `text.tsx` | `Word`, `Mixed` (one part in accent), `Stack`, `Swap` (captions swapping line by line), `Hide` / `After` (time gates; use them instead of hooks inside `render()`) |
| `backgrounds.tsx` | `Solid`, `Grain`, `Sunburst`, `Spotlight`, `Blueprint`, `Cosmic`, `Studio`, `IrisWipe` |
| `props.tsx` | `Stamp`, `Starburst`, `Strike`, `ScribbleToLine`, `Cursor`, `ChatInput`, `Spark`, `Steps`, `Meter`, `EditorTimeline`, `FileCard`, `BouncingBall`, `CommentStack` |
| `document.tsx` | `DocPage`, `KeyCap`, `FilmStrip`, `Waveform`, `Morph`, `BulbIcon`, `PictureIcon`, `SceneCard`, `TimelineToss`, `Envelope` |
| `hook.tsx` | hook kit: `PulseMonitor` (flatline shock), `PhoneFeed` (swipe, freeze, drain), `OutlineFill` (two-step payoff), `CodeReveal` (meta proof) |
| `showcase.tsx` | `StatusChip`, `Checklist`, `AutoToggle`, `Magnifier`, `BeforeAfter`, `GlitchFrame`, `CleanFrame`, `ControlsToButton`, `EasingCurve`, `IconSteps` |
| `scene.tsx` | `Scenes`: hard cuts, push-in, shake impulses |

All `at` values are absolute seconds of the spoken word, so the storyboard reads like the transcript. New metaphors go into the kit as reusable components.

**Approved example:** `assets/examples/text-to-video-hook.tsx` is a full 38-second Hebrew video the user accepted: a 7-second hook (identity → flatline shock → frozen feed → two-step "real" → the code that draws the video), 13 scenes with colour-script comments, pre-rolled props on every cut, `Swap` captions and a code-made SFX track. Read it before writing a new storyboard; reuse its structure, not its words.

**Typical cost of a run** (ElevenLabs, ~1 credit per character): probe line ~115 + one full 35-second take ~520 = **about 650 credits**. A run that re-voices whole scripts to fix single words costs 10 to 20 times that.

| Script (`scripts/`) | Use |
|---|---|
| `word_timings.py` | word-level timings from the voice (faster-whisper) |
| `retime.py` | move every storyboard time to a new take |
| `pitch_report.py` | measure delivery: monotone vs hyped, rising end |
| `make_sfx.py` | code-made whoosh, hit, click, riser, swipe (free, no licence issue) |

## Reference files

| File | Read it when |
|---|---|
| `references/hooks-and-sound.md` | writing the hook; adding music and effects |
| `references/hebrew-writing.md` | writing any Hebrew script line (native spoken register, words to avoid, rhythm) |
| `references/story-and-production.md` | spine and must-show list, cutting craft, project record, evidence labels, revisions |
| `references/hebrew-pronunciation.md` | preparing the voice version (lexicon of tested words) |
| `references/hebrew-voice.md` | generating and choosing takes; cost control; approved recipe |
| `references/visual-metaphors.md` | choosing what each scene shows |
| `references/timing-and-motion.md` | durations, easing, cut rhythm |
| `references/design-system.md` | palette, type scale, safe zones, RTL |
| `references/style-worlds.md` | choosing the video's overall look; native moves; craft rules for reading time, sound transitions and loudness |
| `references/remotion-notes.md` | setup, Windows notes, audio, QA commands, known pitfalls |
