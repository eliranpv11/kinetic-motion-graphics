# Writing spoken Hebrew for short video

How to choose the words so the script sounds like an Israeli talking, not like a translation or an AI. (How to spell those words for the voice model is in `hebrew-pronunciation.md`.) Adapted from a Hebrew writing style guide, keeping only what fits a 30-second spoken script; its text-detector tricks are deliberately left out.

## Contents
1. The one test
2. Words to avoid
3. Grammar that sounds native
4. Lines that waste seconds
5. Rhythm
6. What not to do (from written-text advice)

## 1. The one test

Draft in Hebrew, never translate. For every line ask: would an Israeli say this out loud to a friend? If not, rewrite it.

## 2. Words to avoid

**"AI Hebrew" adjectives**, unless they carry a specific, checkable claim: מגוון, מרתק, חיוני, מהותי, ייחודי, מקיף, חדשני, פורץ דרך, חסר תקדים, משמעותי, רלוונטי, מאתגר. Replace each with the concrete fact, not with a synonym.

**Formal connectors → spoken ones:**

| Written | Spoken |
|---|---|
| לפיכך, אי לכך | אז |
| כאשר | כש־ |
| על מנת ש | כדי ש |
| בנוסף לכך, כמו כן | גם, וגם |
| אולם | אבל |
| בשל כך | בגלל זה |
| מאחר ו | כי |
| בהתאם ל | לפי |
| אשר | ש |
| הינו / הינה | drop it (nominal sentence) |

**Copula stuffing:** drop מהווה, משמש כ, עומד בבסיס, ממלא תפקיד מרכזי. Hebrew needs no "is": "המחיר גבוה", or a direct verb.

## 3. Grammar that sounds native

- **Pro-drop.** No pronoun before past or future verbs: "בניתי", not "אני בניתי". Keep the pronoun in the present tense ("אני בונה") or for contrast.
- **של over smichut** in casual speech: "הסרטון של הלקוח", not "סרטון הלקוח". Fixed compounds stay (בית ספר), and the article goes on the second noun (בית הספר).
- **Active voice.** Avoid Pu'al and Huf'al passives (נכתב על ידי, הוכן). Use an active verb, or Nif'al for a middle voice ("הקובץ נפתח").
- **Gender and number, always correct**, including the numeral flip (עשרה סרטונים, עשר דקות). Check speaker, addressee and every referent; a slip in the user's own cloned voice is audible.

## 4. Lines that waste seconds

- **Announcement lines:** "בואו נדבר על", "ופה בדיוק הבעיה", "וזה מה שמשנה", "ויש לזה מחיר:". If deleting the line loses nothing, delete it and say the thing itself.
- **Poster punchlines:** "לפעמים הפתרון הכי פשוט הוא הכי חכם". A concrete closing fact beats an aphorism.
- **"לא X אלא Y"** at most once per script: it is the favourite AI structure.
- **Forced triads:** use two items or four, not always three.
- **Synonym cycling:** if the right word is "כלי", repeat it; do not rotate to מערכת, פתרון, פלטפורמה.
- **Hedge stacking** ("ייתכן שאולי"): take one clear position. Dugri means direct.
- **Vague authority** ("מחקרים מראים", "מומחים אומרים"): name the source, or say "אני", and use only numbers the user gave.

## 5. Rhythm

- Mostly short spoken sentences, 6 to 12 words, plus a few 2 to 4 word fragments ("חמש דקות. זהו."). Fragments give the animation its beats.
- Never three sentences of the same length in a row.
- Open lines with ו, אז, אבל, כי, גם, רק, אפילו. At most one direct-address opener per script (תשמעו, תכל'ס), and only where it does real work.

### Before → after

- "הכלי מהווה פתרון חדשני ומקיף לעריכת וידאו" → "הכלי עורך לך את הסרטון. לבד."
- "על מנת שתבינו, כאשר מעלים קובץ…" → "כדי שתבינו, כשמעלים קובץ…"
- "אני פתחתי את קלוד ואני הדבקתי טקסט" → "פתחתי את קלוד, הדבקתי טקסט."
- "ופה בדיוק מתחילה הבעיה: זה לוקח שעות" → "זה לוקח שעות."

## 6. What not to do (written-text advice that breaks a voiceover)

- No deliberate mistakes or "strategic imperfection": in TTS they are audible errors in the user's voice.
- No `!`, rhetorical `?` or `...` in the voice version (they spike the pitch or add random pauses); keep them on screen only if wanted. `—` stays allowed in the voice version for beats.
- No heavy slang or filler (כאילו, יעני, אממ, אחי, חחח). At most one natural marker (אז, בעצם, תכל'ס) per script.
- No self-corrections mid-line ("רגע, לא") and no deliberately odd word choices.
