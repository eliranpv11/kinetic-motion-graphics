# Story, cutting and production discipline

Ideas adapted from the user's ai-video-directing skill that transfer to code-rendered motion graphics. Read with SKILL.md steps 1, 2, 6 and 8.

## Contents
1. Story before script
2. Scenes and cuts
3. Production record
4. Evidence labels
5. Revisions without drift

## 1. Story before script

- **Three-sentence spine** before writing lines: setup, turn, payoff. The last scene answers the first (the same object changed, the same word resolved).
- **Must-show list:** one line per essential claim of the user's text, each mapped to the scene that will show it. If distilling drops a claim, tell the user; never drop it silently.
- **Line craft:** concrete nouns over abstractions (an abstraction cannot be drawn); cut each line to its minimum; never state the theme; keep one plain, direct line for the payoff.
- **Ask once:** if facts are missing, ask one numbered round of questions, each with a proposed default.

## 2. Scenes and cuts

- **Every scene moves one value:** hard → easy, hidden → shown, many → one, off → on. A scene that leaves everything where it found it gets merged or cut.
- **Question chain:** each scene leaves a small question the next one answers. A scene that neither raises nor settles anything is a candidate to cut.
- **One lead per cut:** story, emotion or rhythm. After a run of short scenes, break the pattern on purpose with one longer, motivated hold (ambient motion keeps running). Give a reveal one unbroken scene; do not cut into it.
- **Eye trace:** put the incoming scene's hero word or prop where the viewer's eye was at the end of the outgoing scene. Steady reads as control; scattered on purpose reads as chaos.
- **Camera move by intent** (one idea per scene): push-in (default) = a thought arriving; pull-back = reveal and end card; whip or crash zoom = section change; rise = release.
- **Colour script:** before the stills, write one comment per scene with its world and colour and read them as a sequence. It catches two similar worlds in a row before any render time is spent.

## 3. Production record

Keep `<project>/record.md` up to date, so any agent (Claude or Codex) can continue the work:
- approved script version (screen and voice versions)
- voice provider, model, voice ID, delivery tag, approved take file
- pronunciation glossary for this voice
- credits spent and remaining
- current render version and its file
- known defects
- handoff block: finished / unresolved / next step

## 4. Evidence labels

Label every check in the delivery report: `planned`, `measured`, `reviewed:<method>`, `user-accepted`, `not-performed`. A contact sheet is not a playback review; an ASR match is not a pronunciation check; a quote is not a charge.

Audio coverage check for every export: `ffprobe` must show the audio stream lasting as long as the video, and the last 1.5 s must not be silent unless intended. A command that succeeds but reports no audio samples is a fail.

## 5. Revisions without drift

- Touch only what the user named, and bump the version.
- A changed line invalidates its take, its `words.json` times and its pronunciation check.
- If a request breaks a lock (for example adding a line after voicing), offer the nearest feasible option and give its credit cost in one line (voicing only the new lines is usually cheapest).
