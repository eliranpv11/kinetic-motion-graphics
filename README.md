# Kinetic Motion Graphics, a Claude Code plugin

**Text in, video out.** Paste any text (a script, an idea, an article, a post) and Claude delivers a finished vertical (1080x1920) motion-graphics video: a scroll-stopping hook, a natural Hebrew or English voiceover, kinetic typography where every word lands on its spoken word, visual metaphors for every claim, music and sound effects. Rendered in code with [Remotion](https://www.remotion.dev).

Built for Hebrew first: the skill includes a tested Hebrew pronunciation lexicon, rules for writing spoken Israeli Hebrew, and a cost-control routine for ElevenLabs voice generation (probe a short line before paying for the full take).

## Install

### Claude Code (CLI or desktop app)

```
/plugin marketplace add eliranpv11/kinetic-motion-graphics
/plugin install kinetic-motion-graphics@eliran-video-tools
```

Restart Claude Code after installing.

### Skill only (no plugin)

Copy the folder `skills/kinetic-motion-graphics` into `~/.claude/skills/` (Windows: `%USERPROFILE%\.claude\skills\`). Remove any older copy first so Claude does not see two versions.

## Use

- Hand Claude a text and ask for a video; the skill triggers on its own.
- Or run `/kinetic-video <your text>`.

Claude writes the script, asks for your approval, runs a cheap pronunciation probe, generates the voice once, then builds and renders the video, and reports each check with its evidence.

## Requirements

| Tool | Used for |
|---|---|
| Node.js 18+ | Remotion render (`npm install` inside the project template) |
| ffmpeg | audio processing and final mux |
| Python 3.10+ with `faster-whisper`, `numpy` (and `librosa` for the pitch report) | word timings and delivery report |
| ElevenLabs account (connected to Claude, or API access) | Hebrew / English voiceover (paid, about 1 credit per character) |

## What's inside

```
.claude-plugin/    plugin.json, marketplace.json
commands/          /kinetic-video
skills/kinetic-motion-graphics/
  SKILL.md         the 8-step pipeline, approval gates, cost rules
  references/      design system, Hebrew writing, pronunciation, voice, timing, hooks and sound, metaphors
  scripts/         word_timings.py, retime.py, pitch_report.py, make_sfx.py
  assets/          Remotion project template, component kit, a full example storyboard
```

## עברית בקצרה

הדבקת טקסט, וקלוד מחזיר סרטון אנכי מוכן: הוק, קריינות טבעית בעברית, טקסט קינטי שמסונכרן למילה, מוזיקה ואפקטים. הסקיל כולל לקסיקון הגיות מאומת, כללי כתיבה בעברית מדוברת ושיטה לחיסכון בקרדיטים של ElevenLabs. התקנה: שתי הפקודות שבפרק Install, ואחרי זה הפעלה מחדש של Claude Code.

## Contributing

Pronunciation findings are the most valuable contribution: open an issue or a pull request with the word, the input that worked, the input that failed, and how it sounded (see section 2 of `references/hebrew-pronunciation.md`).

## License

MIT, see [LICENSE](LICENSE).
