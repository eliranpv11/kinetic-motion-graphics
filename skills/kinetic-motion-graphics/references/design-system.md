# Design system

## Palette logic

- **Base trio:** brand accent + near-black ink + warm cream. Most scenes use only these.
- **Event colour:** a scene may switch its whole world to one strong colour to mark a beat: comic yellow (excitement), blueprint blue (building, technical), cosmic violet (magic, "AI"), neon on navy (levels, performance), accent orange (wipe, end card).
- Never two event colours in one scene. Never the accent on a background of a similar hue.
- Defaults in `kit/theme.ts` use Claude orange `#D97757`; swap `C.accent` for another brand.

## Type

- One family, heavy weights. The kit loads Rubik 500/700/900 with Hebrew and Latin subsets via `@remotion/google-fonts`. Alternatives with Hebrew: Heebo, Assistant, Secular One.
- Scale at 1080x1920: hero 230 (up to ~290 for one short word), big 150, line 92, small 58, caption 40.
- Hero words fill 60 to 85 % of the width. If a hero word is longer than ~8 Hebrew letters, use `big` instead of `hero`.
- Tight leading (1.0 to 1.05) and slight negative tracking on big sizes.

## Layout

- Safe area: 70 px side padding; keep text out of the top 220 px and the bottom 380 px when the video goes to Reels/TikTok (platform UI covers them).
- Default composition is a centred vertical stack: muted lead-in above, hero in the middle, supporting prop below.
- A prop (meter, timeline, card) sits below the text and is never wider than 920 px.

## RTL (Hebrew)

- Set `direction: 'rtl'` on text containers (the kit's `Word`, `Mixed`, `Stack` do).
- Mixed Hebrew + Latin in one line ("כמו AI") works inside one `Word`; for a Latin hero word, give it its own `Word`.
- Use Hebrew gershayim (״קלוד״) for quotes on screen, not ASCII quotes.
- Progress and timelines that represent sequence run right to left in Hebrew (step 1 on the right).
