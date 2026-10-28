# Hebrew voiceover

Lessons from real productions. Text-to-speech in Hebrew fails in predictable places; check them before paying for takes, and let a human listen before animating.

## Last accepted run (2026-10-27, use as the default)

Model `eleven_v4`, voice "Eliran 1", one opening tag `[confident]`, **no niqqud at all** (every word in standard plene spelling, homographs rephrased), commas instead of `?`, a dash to separate words that merge. Probe line 115 credits + one full take 518 credits. Measured: 97/97 words, pitch spread 12.2 st, end lift +1.0 st. The user accepted the finished video.

## The recipe that a native listener approved (2026-10)

1. ElevenLabs `eleven_v4`, the user's cloned voice, one take (`generations_count: 1`); a second take only if the first has a defect.
2. Balanced human tone: one opening tag (`[confident]`, or `[conversational] [warmly]`), no later tag changes, no `!`, no `?`. The listener rejected excited lines ("sounds like AI") and then asked that it not become monotone either. Measure with `scripts/pitch_report.py` against the last approved take (approved: 11.4 st with `[conversational]` and 13.4 st with `[confident]`; aim inside that range).
3. Niqqud only on simple words; plene spelling (`פיסקה`) or **unpointed** for words with a shva inside a consonant cluster and for loanwords (סטודיו, הגרפים, תסתכלו, תכתבו, הסקיל, בתגובות, אנימציה); Latin "AI" as is. Look every word up in `hebrew-pronunciation.md`.
4. Prefer the singular when a plural loanword misreads (האנימציה, not האנימציות).
5. Transcribe every take and diff it against the script (dropped, doubled or garbled words), then send the surviving takes to the user to listen; ask for a list of words that sound wrong and fix only those, one variant per hypothesis.
6. Record the approved spelling of each fixed word in the project's glossary so the next video starts from it.

## Niqqud audit (word by word, before submitting)

- Point every word fully, then re-read each one for the vowel a model is most likely to misread:
  - **Qamats vs chataf patach on loanwords.** `אֲנִימַצְיָה`, `הָאֲנִימַצְיוֹת` (chataf patach under א). Writing `אָנִימַצְיָה` invites an "o" (qamats katan reading).
  - **Dagesh after the definite article** (`הַסִּרְטוֹן`, `הַכְּתוּבִיּוֹת`), so כ/ב/פ come out hard where they should.
  - **Gender and person** for speaker, addressee and every referent (`שׁוֹלֵחַ` masculine speaker, `תִּכְתְּבוּ` plural addressee).
- Keep a clean, unpointed copy in full spelling (ktiv male) for on-screen text.

## Fixing one word after the take is approved

Do not re-voice the whole script. Find a silent gap around the sentence on the waveform (not in words.json), generate only that sentence in two or three spelling variants (about 40 credits each), let the user pick by ear, and splice the chosen one into the approved take inside the gap so the total length and every later timing stay the same. Then update only the captions of that sentence. Used on "קלוד הרג את עורכי הווידאו": 3 variants for 115 credits instead of a 520-credit re-take.

**Preferred way to apply a chosen pronunciation (learned 2026-10-28):** splice the exact clip of the variant the user chose in the probe take, not a new re-voicing of that word inside the full sentence. Re-voicing the word inside the full sentence can produce a different reading than the probe item the user chose (this happened with a brand name and the user rejected it); cutting the probe clip itself, matching its loudness (ebur128), and joining it between two silent gaps of the approved take is the reliable method. Keep the clip's duration within about 0.1 s of the old word so the storyboard times stay valid; otherwise re-run `word_timings.py` and shift only the affected scene. One probe take with several spellings in a row costs about 75 credits.

## Cost control (read before generating anything)

Measured 2026-10-27: ElevenLabs charges exactly **1 credit per character of the input, niqqud marks included** (a 368-letter script with niqqud = 520 characters = 520 credits per take). One production spent 13,041 credits on 25 full-script takes, of which one was used, and emptied the user's monthly quota. Where it went: two takes per variant by default, three variants generated in parallel, a failed IPA experiment, two script rewrites, and re-voicing the whole 30 s script to fix one word at a time.

Rules:
1. **Lock the script before the first take.** Every wording change after voicing costs a full re-take.
2. **Probe pronunciation first, cheaply.** Put every risky word (loanwords, clusters, new names) into one short test line of 10 to 15 words and generate it once (~60 to 100 credits). Fix spellings there, and only then voice the full script.
3. **One take per variant**, and at most two variants per round. Generate a second take only when the first has a defect.
4. **Niqqud only where it earns its cost.** It adds ~40% to every take. Use plene spelling and unpointed words by default (see `hebrew-pronunciation.md`), and point only real homographs.
5. **Ask for the word list first.** When the listener reports problems, get the full list of bad words before re-voicing, fix them all in one round.
6. **Report a running total.** Before each generation, state the credits it will cost, the total spent in the production so far, and the remaining quota if known; stop and ask before crossing half of the remaining quota.

## Shva in consonant clusters (the most common misread)

A listener flagged הַגְּרָפִים, סְטוּדְיוֹ, תִּסְתַּכְּלוּ, תִּכְתְּבוּ, אֲנִימַצְיוֹת and אֲנִימַצְיָה in one take: every one has a shva inside a consonant cluster, and the model voiced it as "e" (ha-ge-rafim, se-tudio, tista-ke-lu). Full niqqud on these words makes the reading worse, not better. Two fixes to test as separate variants:
- Keep the other vowels but drop the shva in the cluster (הַגרָפִים, סטוּדיוֹ, תִּסתַּכלוּ, תִּכתְבוּ, אֲנִימַציָה).
- Leave just those words unpointed (הגרפים, סטודיו, תסתכלו), since the model was trained mostly on unpointed text.
Ask the listener which variant reads right, then record the winning form in the glossary for that voice and model.

## Loanwords and names

English words inside Hebrew (Claude, AI, skill, studio) are the most frequent misreads. Options, in order:
1. Pointed Hebrew spelling (`קְלוֹד`, `סְקִיל`, `סְטוּדְיוֹ`).
2. Latin spelling inside the Hebrew line ("כמו AI") read correctly in ElevenLabs v4 transcripts.
3. Rephrase to avoid the word.

Tested and failed: IPA between slashes (`/klod/`) inside Hebrew text on ElevenLabs v4. The model spoke the word "slash" aloud. Do not use IPA overrides in Hebrew lines.

## Model choice (ElevenLabs, observed 2026-10)

- `eleven_v4` gave clean transcripts in every Hebrew take tested, with audio tags honoured.
- `eleven_v3` drifted on the same text: repeated words ("מתקינים מתקינים"), garbled words, and a much slower take (41 s against 30 s). Prefer v4 for Hebrew unless a listener prefers the v3 voice.

## Structures that make models stutter

- Two `אֶת` objects in a row ("מְלַמֵּד אֶת קְלוֹד אֶת כָּל…") produced a repeated "את קלוד" in every take of one production. Rephrase ("מְלַמֵּד אֶת קְלוֹד אֵיךְ עוֹשִׂים…") instead of cutting audio.
- Long lists without punctuation run together; separate items with commas and close the list with `—`.

- `הָאֲנִימַצְיוֹת` (definite article + א-initial plural loanword) stayed wrong after both the shva fix and unpointing; the singular `אנימציה` read fine. When one form keeps failing, switch to a form of the same word that the model already reads correctly.

- `הַסְּקִיל` came out "ha-sakil": the same shva-cluster failure. Leave `הסקיל`, `סקיל`, `בתגובות` unpointed.

## Intonation

- Keep one delivery tag per section and do not switch back near the end. Re-applying `[confident]` after an `[excited]` block, right before a question, made the pitch jump up in the closing lines.
- A `?` in the voice input raises the pitch. For a rhetorical question that leads into a call to action, use a comma or `—` in the voice input and keep the `?` only in the on-screen text.
- Close the script calmly (`.` rather than `!`); a call to action lands better without a final spike.

## Energy (history)

- First an `[excited]` opening was too much; then `[confident]` + `[excited]` mid-script still drew "over-energetic, sounds like AI" on the line "וּבָנָה מִזֶּה סִרְטוֹן!". The settled rule: no hype at all, one natural tone. Energy comes from the picture and the cutting, not the voice.
- Delivery varies between takes of the same text, but a second take is bought only when the first one fails the transcript or pitch check (cost control above).

## Checking takes

- Transcribe each take and diff against the script: catches duplicated, dropped or swapped words. It cannot judge vowels, stress or naturalness.
- Pronunciation is approved only by listening. If nobody has listened, report it as not checked; give the listener the time code of each risky word.

## Splice points (learned 2026-10-28)

Pick the cut points from the audio envelope, not from `words.json`. Whisper word starts can be 0.1 s or more later than the real onset, so a cut placed "just before the word" can leave a fragment of the old word that restarts as a stutter, or clip the first syllable of the next word. Measure RMS in 40 ms steps around the cut and cut where it is below -60 dB, with a 20 to 30 ms fade on each side. Leave 70 ms of lead before and about 120 ms after the inserted clip. After splicing, print the envelope again and check that each word has one onset and a smooth decay, then re-run `word_timings.py` or set the scene times from the measured onsets.
