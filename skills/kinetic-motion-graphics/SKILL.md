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

## Working with the user

Most people who use this skill are not developers. You do the technical work; they make the few decisions only they can make.
- **Speak their language** (Hebrew if they wrote in Hebrew) and in plain words. Explain any technical term the first time in half a sentence ("רינדור = שמירת הסרטון כקובץ"). Never paste raw logs; say what happened and what you are doing about it.
- **One short status line per step** ("שלב 2 מתוך 8: כותב את התסריט"), so they always know where things stand.
- **Ask only what you cannot decide yourself**: approvals of the script and the voice, anything that costs money, installing software, and choices of taste with no safe default. Ask them in one numbered round, each with a recommended default, so "כן" is a full answer. Everything else (scene design, timings, effects, file names) you decide and report.
- **Never surprise them with a cost or an install.** Say what it is, why it is needed, and what it costs, then wait for a yes.
- **When something fails, fix it yourself first** (read the error, retry with the fix, check `references/remotion-notes.md`). Ask the user only when the fix needs them (a password, a payment, a file only they have).

## The pipeline at a glance

| # | Step | Output | Gate before the next step | Paid? |
|---|---|---|---|---|
| 0 | Setup and intake | tools ready, voice access, project folder, answers | everything required is installed | no |
| 1 | Read and distil | one-sentence message, audience, tone | — | no |
| 2 | Script | hook + body + CTA, clean and voice versions | user approves the script | no |
| 3 | Pronunciation probe | one short test line with the risky words | every risky word sounds right | ~100 credits |
| 4 | Voice | one full take | transcript matches, tone in range, user listens | ~1 credit per character |
| 5 | Timing | `words.json` | — | no |
| 6 | Storyboard | `src/Video.tsx` | stills sheet passes | no |
| 7 | Sound | music bed + effects layer | levels checked | no (code-made effects) |
| 8 | Render and review | `name_vN.mp4` | every cut checked, report written | no |

Steps 0, 1, 2, 5, 6, 7 and 8 cost nothing; do them well so steps 3 and 4 run once.

## 0. Setup and intake (every run; short after the first)

**Where things are.** `<skill>` below is this skill's own folder: the base directory you were given when the skill loaded (for a plugin install it sits under `~/.claude/plugins/`). Never edit files inside it; everything you write goes into the project folder.

**Running the scripts.** Each script's first lines show its command. With `uv` installed, use that form (`uv run --no-project --with <packages> python -I <skill>/scripts/<name>.py ...`), which brings its packages without installing them globally. Without `uv`, use `python` (or `python3` / `py`) after installing the packages the script names.

**Check the computer.** Run `python <skill>/scripts/check_env.py` (standard library only; try `python3` or `py` if `python` is not found). On Windows, if `python` opens the Microsoft Store or prints nothing, it is the Store placeholder: use `py`, or install Python. If Python itself is missing, check `node -v` and `ffmpeg -version` by hand and start with Python. For each `MISSING` item, tell the user in one line what it is for, show the install command the script printed, and offer to run it for them; run it only after a yes.
- `winget` (Windows) asks to accept its source and package agreements: say so when you ask, and the yes covers the `--accept-...` flags in the printed command. If `winget` or `brew` is not there, give the official download page instead and wait for the user.
- Commands with `sudo` (Linux) need the user's password: give them the command to run themselves. Node from `apt` is often older than 18; use the nodejs.org installer then.
- After an install, your shell still has the old PATH. Prepend the new folder to PATH for your commands (the check script prints where Node is when it finds it off PATH), or ask the user to restart the app and say "המשך". Re-run the check until it prints `READY`.

Mention that the first render downloads a browser (about 120 MB) and the first timing run downloads a speech model (about 1.5 GB), both once.

**Voice access**, in this order:
1. An ElevenLabs connector or MCP tool already available to you, **if it gives you the audio as a file on disk** (or a download link you can fetch). A tool that only plays the audio in the chat window is fine for the user to listen, but the pipeline needs the file; then use option 2 or the user's own recording.
2. The `ELEVENLABS_API_KEY` environment variable: use `scripts/tts_elevenlabs.py` (`quota`, `voices`, `models`, `cost`, `say`). Run `models` once: use `eleven_v4` if it is listed, otherwise `eleven_v3`.
3. Neither: explain the two options in plain words and let the user choose: (a) connect ElevenLabs (paid, about 1 credit per character; a free account has a small monthly quota) as a connector in their Claude app, or create an API key at elevenlabs.io and set it themself as the environment variable `ELEVENLABS_API_KEY`, then restart the agent; (b) record the voice themself (free): they read the approved script into their phone, send the file, and you skip steps 3 and 4. Never ask the user to paste an API key into the chat, and never write a key into a file.

**Choose the voice once.** If the account has the user's own cloned voice, recommend it. Otherwise list a few voices that suit the language and tone and recommend one; for Hebrew, prefer a voice tagged Hebrew or a multilingual one and expect the pronunciation lexicon to need a probe for that voice. Record the voice ID in `record.md`.

**Project folder.** Default: a new folder `kinetic-videos/<short-slug>` inside the current working folder; say where it is. Copy the template there (see "The template and kit") and run `npm install` once per project. The project keeps its own `record.md` and `audio/glossary.md` (pronunciations verified for this voice); read them first when continuing a project.

**Intake: one round of questions**, only for what the text and the defaults do not answer, each with a default:
1. Platform and length (default: Reels/TikTok/Shorts, vertical, about 35 s).
2. Voice (default: the one recommended above, or their own recording).
3. Music: a track they own or have a licence for (free options to suggest: YouTube Audio Library, Pixabay Music; the track's own licence terms apply), or none for now (default: none, and say the video will have effects but no music bed).
4. Look (default: you pick a style world from the topic and say which).
Brand colours or a logo only if they mention a brand. Then go straight to step 1.

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

**English scripts** follow the same structure and rules; the Hebrew references do not apply, the probe in step 3 covers only names and brand words, and every script run gets `--lang en`.

**Write it the way an Israeli speaks** (Hebrew rules in `references/hebrew-writing.md`): spoken register, short sentences, verbs over nouns, no translated or "AI-sounding" phrasing, correct gender and person for speaker, addressee and every referent.

Keep two versions of every line:
- **Screen version:** standard full spelling (ktiv male), as it will appear on screen.
- **Voice version:** the same words prepared for TTS with `references/hebrew-pronunciation.md`: plene spelling, risky words unpointed, niqqud only on true homographs, no `!` or `?`, one opening delivery tag.

## 3. Pronunciation probe (cheap insurance)

Put every word the lexicon does not mark as **tested** (loanwords, names, consonant clusters, homographs) into one short test line of 10 to 15 words and generate it once. Ask the user to listen: give the full path of the file and open it in their default player (`Invoke-Item <file>` in PowerShell, `open` on macOS, `xdg-open` on Linux), and list the risky words in the order they are spoken. Fix spellings until the line is right and record each verified spelling in the project's `audio/glossary.md` (never in the skill's own lexicon). This costs about 100 credits and prevents full re-takes at 400 to 600 credits each.

## 4. Voice

Generate **one** full take with the approved voice version (`references/hebrew-voice.md` has the recipe and the settings a native listener approved on one cloned voice; on another voice treat them as a starting point). If the user recorded the voice themself, skip the probe and the generation. Either way, keep the original take in `audio/` and convert the chosen one for the video: `ffmpeg -i audio/take1.mp3 -ar 48000 -ac 1 remotion/public/voice.wav`. Then, before anyone listens:
- Transcribe it with `scripts/word_timings.py` and diff against the script: dropped, doubled or garbled words.
- Measure delivery with `scripts/pitch_report.py` against the last approved take: balanced, neither monotone nor hyped, no rising end, no single line jumping out.

Send the take to the user. If words are wrong, ask for the complete list, fix them all in the probe line, then re-take once. Generate a second take only when the first has a defect. Before every paid call, tell the user its cost, the total spent so far, and the quota left; stop and ask before using more than half of what remains.

To extend an approved take (for example a new hook), voice only the new lines with the same voice and tag, and join them in the edit; never re-voice approved audio.

## 5. Timing

Run `scripts/word_timings.py` on the final audio to get `words.json`. Transcribed spelling is for timing only; on-screen text always comes from the screen version. When a new take of the same script replaces the voice, run `scripts/retime.py old_words.json new_words.json src/Video.tsx` to move every time in the storyboard automatically.

## 6. Storyboard and build

First pick the video's **style world** from its topic and tone (`references/style-worlds.md`: Swiss grid, case file, riso print, dark keynote, news captions, game show, whiteboard, or the kit's default look) and place its strongest native move on the payoff. Then group words into scenes: one idea per scene, cut on the pause between sentences, 1.2 to 3.5 s each (shock cuts in the hook may be shorter, the one motivated hold longer). Mark one hero word per scene. Every scene must move one value (hard → easy, hidden → shown, off → on) and leave a small question the next scene answers; merge or cut scenes that do neither. For each scene choose a world and a metaphor (`references/visual-metaphors.md`), write one colour-script comment (world + colour) and read the comments as a sequence, then write the scene in `src/Video.tsx` as a `SceneDef` with absolute times from `words.json`. Cutting craft (one lead per cut, eye trace, camera move by intent, one motivated hold) is in `references/story-and-production.md`.

Visual rules (numbers in `references/timing-and-motion.md`, style in `references/design-system.md`):
- **Land on the word.** A word appears on the frame its sound starts; late never.
- **Picture first.** One big graphic performs the claim; captions stay small (60 to 70 px); large type only for the hero word.
- **One idea, one accent.** At most ~6 words visible; one accent colour, plus at most one "event colour" for the scene.
- **Never frozen, never empty.** Every background drifts; every scene pushes in slowly; holds under 0.5 s, except one motivated hold per video (usually the pattern interrupt). A cut never shows an empty frame: the first element lands on the cut, and staggered props start 0.25 to 0.7 s before it.
- **Fast in, hard out.** Entrances 4 to 9 frames with overshoot and blur (a style world may replace the entrance kind, never the speed); exits are hard cuts on the sentence boundary.
- **Contrast of worlds.** Consecutive scenes change light/dark or world.

Check before rendering: one still per scene after its hero word (`npx remotion still Main out/s_01.png --frame=N --scale=0.3`, numbered in order), tiled into a sheet (`ffmpeg -i out/s_%02d.png -vf tile=5x3 out/sheet.png`). Look for clipped text, overlaps, illegible marks, and scenes that look alike.

## 7. Sound

Never ship a silent bed under the voice without telling the user. One music track from start to end, ducked under speech; four to eight effects per 30 s on major visual events (shock cut, slam, reveal, full-screen transition); a short drop to near silence in the pattern interrupt. Make whooshes, hits and clicks in code (no cost, no licence issue): run `scripts/make_sfx.py remotion/public/sfx` once per project. Music must come from a source the user owns or has a licence for. Details in `references/hooks-and-sound.md`.

## 8. Render, review, deliver

Render to a versioned file (`name_v1.mp4`, `name_v2.mp4`). Inspect a frame strip around **every** cut, audio/picture sync at three hero words, audio coverage (`ffprobe`: audio as long as the video, no silent tail), and loudness (about −14 LUFS, true peak ≤ −1 dB; if it is off, fix it without re-rendering: `ffmpeg -i out/video_v1.mp4 -c:v copy -af loudnorm=I=-14:TP=-1:LRA=11 -c:a aac -b:a 192k out/video_v1_final.mp4`, then measure again). Fix every defect you find and re-render before showing anything. Deliver: open the video for the user, give its full path, then a short plain-language summary in their language (what was made, how long, what it cost, what was checked and what was not), and the stills sheet. In `record.md`, label each check with its evidence label (`measured`, `reviewed:<method>`, `user-accepted`, `not-performed`); with the user, say the same thing in plain words ("בדקתי את זה במדידה", "את זה לא בדקתי"). A contact sheet is not a playback review and a transcript match is not a pronunciation check. Keep `<project>/record.md` current (script versions, voice settings, glossary, credits, render version, defects, handoff) so Claude or Codex can pick the work up.

**Revisions:** touch only what the user named and bump the version. A changed line invalidates its take, its timings and its pronunciation check; if a request breaks a lock, offer the nearest option with its credit cost in one line.

## Originality

References from other creators are for learning craft, never for copying. Before the storyboard is final: the hook, structure and call to action differ from the reference; fewer than a third of the metaphors appear in it; the palette and opening frame differ. If the user asks for "the same video", offer an original take on the same goal and say why.

## The template and kit

```
# bash / macOS / Linux
cp -r <skill>/assets/template <project>/remotion
cd <project>/remotion && npm install
# PowerShell (Windows)
Copy-Item -Recurse <skill>\assets\template <project>\remotion
Set-Location <project>\remotion; npm install

# then, inside <project>/remotion: voice at public/voice.wav, storyboard in src/Video.tsx
npx remotion studio                                   # live preview
npx remotion still Main out/s.png --frame=120 --scale=0.3
npx remotion render Main out/video_v1.mp4
```

If PowerShell says "running scripts is disabled", call `npm.cmd` and `npx.cmd` instead of `npm` and `npx`; do not change the user's execution policy.

| Kit file (`src/kit/`) | Contents |
|---|---|
| `theme.ts` | palette (swap `C.accent` per brand), font (Rubik, Hebrew + Latin), type scale, `s(seconds)` |
| `motion.ts` | entrances `enter()`: rise, focus, pop, slam, type; `dimAfter`, `drift`, `shake`, `ramp` |
| `text.tsx` | `Word`, `Mixed` (one part in accent), `Stack`, `Swap` (captions swapping line by line), `Hide` / `After` (time gates; use them instead of hooks inside `render()`) |
| `backgrounds.tsx` | `Solid`, `Grain`, `Sunburst`, `Spotlight`, `Blueprint`, `Cosmic`, `Studio`, `IrisWipe` |
| `props.tsx` | `Stamp`, `Starburst`, `Strike`, `ScribbleToLine`, `Cursor`, `ChatInput`, `Spark`, `Steps`, `Meter`, `EditorTimeline`, `FileCard`, `BouncingBall`, `CommentStack` |
| `document.tsx` | `DocPage` (with `ScanBeam`), `KeyCap`, `FilmStrip`, `Waveform`, `Morph`, `BulbIcon`, `PictureIcon`, `SceneCard`, `TimelineToss`, `Envelope` |
| `hook.tsx` | hook kit: `PulseMonitor` (flatline shock), `PhoneFeed` (swipe, freeze, drain), `OutlineFill` (two-step payoff), `CodeReveal` (meta proof) |
| `showcase.tsx` | `StatusChip`, `Checklist`, `AutoToggle`, `Magnifier`, `BeforeAfter`, `GlitchFrame`, `CleanFrame`, `ControlsToButton`, `EasingCurve`, `IconSteps` |
| `scene.tsx` | `Scenes`: hard cuts, push-in, shake impulses |

All `at` values are absolute seconds of the spoken word, so the storyboard reads like the transcript. New metaphors go into the kit as reusable components.

**Approved example:** `assets/examples/text-to-video-hook.tsx` is a full, tested 38-second Hebrew video: a 7-second hook (identity → flatline shock → frozen feed → two-step "real" → the code that draws the video), 13 scenes with colour-script comments, pre-rolled props on every cut, `Swap` captions and a code-made SFX track. Read it before writing a new storyboard; reuse its structure, not its words. Its topic and call to action ("comment a word and I'll send you the skill") belong to that video: write each user's CTA from their own goal.

**Typical cost of a run** (ElevenLabs, ~1 credit per character): probe line ~100 to 115 + one full 35-second take ~520 = **about 650 credits**. A run that re-voices whole scripts to fix single words costs 10 to 20 times that.

| Script (`scripts/`) | Use |
|---|---|
| `check_env.py` | step 0: what is installed, what is missing, the install command for this OS |
| `tts_elevenlabs.py` | voice through the ElevenLabs API when no connector is available: quota, voices, models, cost, say |
| `word_timings.py` | word-level timings from the voice (faster-whisper) |
| `retime.py` | move every storyboard time to a new take |
| `pitch_report.py` | measure delivery: monotone vs hyped, rising end |
| `make_sfx.py` | code-made whoosh, hit, click, riser, swipe, flatline monitor beeps (free, no licence issue) |

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
