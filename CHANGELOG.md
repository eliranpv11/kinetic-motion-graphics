# Changelog

## 1.3.0
- Step 0, setup and intake: the agent checks the computer with `scripts/check_env.py` (finds Node installed by fnm/nvm but missing from PATH), explains each missing tool in plain words and offers the install command for the OS, sets up voice access, picks a project folder, and asks one round of questions with defaults.
- `scripts/tts_elevenlabs.py`: quota, voices, models, cost and voice generation through the ElevenLabs API for agents without a connector. The key stays in an environment variable.
- New "Working with the user" rules: the user's language, plain words, a status line per step, questions only for what the user must decide, no cost or install without a yes.
- Recording your own voice is now a full path (no ElevenLabs needed).
- Everything is general now: no personal names, private files, client brands or production history; the tested voice settings are a starting point for any voice.
- Windows PowerShell commands next to the bash ones, `npm.cmd`/`npx.cmd` fallback, winget agreements asked up front, package-manager check.
- The agent never edits the installed skill: verified pronunciations go to the project's `audio/glossary.md`.
- A connector voice is used only if it gives a file on disk; every take is converted to `public/voice.wav`.
- Loudness fix command, plain-language delivery summary, English runs with `--lang en`, free music sources to suggest.
- The example storyboard runs as is (exports `Video` and `DURATION_SECONDS`, uses `voice.wav` and the kit's `Hide`/`After`/`Swap`).
- `retime.py` moves every `*At` time, `until`, `t`, `shakes` and swipe arrays, keeps line endings and warns about values it cannot map.
- Scripts explain missing packages or ffmpeg instead of crashing; `make_sfx.py` takes real arguments; `pitch_report.py` covers female voices (`--fmin`, `--fmax`).

## 1.2.0
- Style worlds (`references/style-worlds.md`): seven complete looks to choose per video (Swiss grid, case file, riso print, dark keynote, news captions, game show, whiteboard), each with palette, Hebrew fonts, motion, transitions, native moves, sound and pitfalls, plus a table of how to build every effect in Remotion with no new packages.
- Craft rules for every look: reading time for text-only beats, sound matched to the material, J/L sound transitions, a second silence, one transition grammar per video.
- The storyboard step now starts by choosing the style world and placing its strongest native move on the payoff.
- Delivery checks now include loudness (about -14 LUFS, true peak at most -1 dB).

## 1.1.0
- Hebrew pronunciation lexicon: new rules for names and invented words, gender-ambiguous forms, and probe results that do not carry over to a full sentence.
- Hebrew voice guide: splice an approved probe clip instead of re-voicing a word; choose cut points from the audio envelope, not from word timings.
- Public release: MIT license, install from GitHub.

## 1.0.0
- First packaged release.
