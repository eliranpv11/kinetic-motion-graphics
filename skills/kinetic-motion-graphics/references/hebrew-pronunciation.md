# Hebrew pronunciation lexicon for TTS

How to write Hebrew so a text-to-speech model says it the way an Israeli would. Read this before writing any voice input in Hebrew, and add every newly verified word to it.

Status in the tables: **tested** = a native listener approved (or rejected) it in a real take; **rule** = follows the rules below but not yet heard. Pronunciation is in Latin letters, stressed syllable in CAPS, `kh` = ח/כ (fricative), `ts` = צ.

## Contents
1. Input strategy (the rules)
2. Tested words (from real productions)
3. Tech, AI and software loanwords
4. Video, content and social-media words
5. Imperatives and verbs with clusters (calls to action)
6. Everyday words that models misread
7. Homographs: when niqqud is required
8. Numbers, letters and symbols
9. Tone and delivery (keep it human)

## 1. Input strategy

Models such as ElevenLabs v4 learned mostly from **unpointed** Hebrew. Niqqud helps on simple words but often hurts on clusters. Use this order:

1. **Full spelling (ktiv male) first.** Add the vowel letters Israelis use online: `פיסקה` (not `פסקה`), `תוכנה`, `חופשי`, `מיוחד`, `שיעור`. A yod or vav forces the vowel without any niqqud.
2. **Leave a word unpointed if it has a shva inside a consonant cluster** (`גרפים`, `סטודיו`, `תסתכלו`, `תכתבו`, `סקיל`, `בתגובות`). Pointed, the model voices the shva as "e" (ha-ge-RA-fim, se-TU-dio, ha-sa-KIL). **tested**
3. **Point only to resolve a real ambiguity**, and then only that word, preferring vowel points over shva (see section 7).
4. **Loanwords:** write them as they are written on Israeli social media, unpointed (`קלוד`, `טיימליין`, `פרומפט`). Short Latin acronyms can stay Latin (`AI`). **tested**
5. **Never use IPA between slashes in a Hebrew line.** The model says the word "slash". **tested**
6. **If a form keeps failing, switch form** rather than repeating it: singular instead of plural (`האנימציה` for `האנימציות`), a synonym, or a rephrased sentence. **tested**
7. **Keep a per-voice glossary** in the project (`audio/glossary.md`) and copy verified rows here.

ElevenLabs also offers pronunciation dictionaries (alias rules: "when you see X, say Y") in its app and API. When available in the tools you have, put the stubborn words there once instead of respelling them in every script.

## 2. Tested words

| Word | Send this | Say | Failed input |
|---|---|---|---|
| סקיל | `סקיל`, `הסקיל` | SKIL, ha-SKIL | `הַסְּקִיל` → "ha-sa-KIL" |
| גרפים | `הגרפים` | ha-gra-FIM | `הַגְּרָפִים` → "ha-ge-ra-FIM" |
| סטודיו | `סטודיו` | STU-dio | `סְטוּדְיוֹ` → "se-TU-dio" |
| תסתכלו | `תסתכלו` | tis-tak-LU | `תִּסְתַּכְּלוּ` → "tis-ta-ke-LU" |
| תכתבו | `תכתבו` | tikh-te-VU | `תִּכְתְּבוּ` |
| אנימציה | `אנימציה` (singular) | a-ni-MATS-ya | `אָנִימַצְיָה` (qamats read "o"); plural `האנימציות` failed in every form |
| פיסקה | `פיסקה` | pis-KA | `פִּסְקָה` / `כְּפִסְקָה` misread |
| AI | `AI` | EY-ay | `/ˈeɪ ˈaɪ/` spoken as "slash" |
| בתגובות | `בתגובות` | bat-gu-VOT | (unpointed by rule after the סקיל failure) |
| אנימציות (no article) | `אנימציות` | a-ni-MATS-yot | **tested, user-accepted**: the plural reads fine without ה; with ה (האנימציות) it failed three times |
| הרג (את) | `הָרַג אֶת עורכי הווידאו` | ha-RAG et or-KHEI ha-VI-de-o | **tested, user-accepted in the final video** (chosen from three variants). Unpointed `הרג` lost its ר and sounded odd (the listener: "where is the resh?"), and without a pause it merged with the next word. Pointing this short, shva-free word plus adding `אֶת` gave a clear ha-RAG. Lesson: niqqud does help on short words without shva |
| הכול | `הכול` | ha-KOL | **tested, user-accepted** (standard plene; not הכל) |
| יודע (not ידע) | `יודע` | yo-DE-a | rephrased: unpointed `ידע` is a homograph (yada / yeda) |
| מטורפת, אמיתי, להתקין, ליצור, מיליון, בכלל | unpointed | me-tó-re-fet, a-mi-TI, le-hat-KIN, li-TSOR, mil-YON, bikh-LAL | **tested, user-accepted** in the v6 take |
| ראשל (brand, Rashel) | `רָשֶׁל` (pointed) | ra-SHEL | **tested, user-accepted** (2026-10-28, Rashel Beauty). Unpointed `ראשל` was read wrongly inside the full take (it passed in an isolated probe line). `רָשֶׁל ביוטי` chosen by ear from 4 spellings (`רָשֶׁל`, `רֵאשֶׁל`, `רָאשֶׁל`, `רֶשֶׁל`). Example of the rule for invented names in section 10 |
| קנית (you bought, f) | `אַת קָנִית` | at ka-NIT | **tested, user-accepted**. `קנית` and pointed `קָנִית` alone were read as masculine (ka-NI-ta); adding the pronoun `אַת` forced the feminine. Example of the gender rule in section 10 |

## 3. Tech, AI and software loanwords (rule unless marked)

| Word | Send this | Say |
|---|---|---|
| Claude | `קלוד` | KLOD |
| ChatGPT | `צ'אט ג'יפיטי` | chat-ji-pi-TI |
| Gemini | `ג'מיני` | JE-mi-ni |
| בינה מלאכותית | `בינה מלאכותית` | bi-NA ma-la-kho-TIT |
| מודל | `מודל` | MO-del |
| פרומפט | `פרומפט` | PROMPT |
| טוקן | `טוקן` | TO-ken |
| אפליקציה | `אפליקציה` | ap-li-KATS-ya |
| אתר | `אתר` | a-TAR |
| קוד | `קוד` | KOD |
| קובץ | `קובץ` | KO-vets |
| תיקייה | `תיקייה` | ti-ki-YA |
| תוכנה | `תוכנה` | to-kha-NA |
| תוכנת עריכה | `תוכנת עריכה` | to-kh-NAT a-ri-KHA |
| טיימליין | `טיימליין` | TAIM-lain |
| אוטומציה | `אוטומציה` | o-to-MATS-ya |
| אלגוריתם | `אלגוריתם` | al-go-RIT-mm |
| דאטה | `דאטה` | DA-ta |
| דשבורד | `דשבורד` | DASH-bord |
| ממשק | `ממשק` | mim-SHAK |
| שרת | `שרת` | SHA-rat |
| ענן | `ענן` | a-NAN |
| סייבר | `סייבר` | SAI-ber |
| אינטגרציה | `אינטגרציה` | in-teg-RATS-ya |
| פלאגין | `פלאגין` | PLA-gin |
| עדכון | `עדכון` | id-KUN |
| גרסה | `גרסה` | gir-SA |
| הורדה | `הורדה` | ho-ra-DA |
| התקנה | `התקנה` | hat-ka-NA |
| קישור | `קישור` | ki-SHUR |
| לינק | `לינק` | LINK |
| סטארטאפ | `סטארטאפ` | STAR-tap |
| מנוי | `מנוי` | mi-NUI |

## 4. Video, content and social-media words (rule)

| Word | Send this | Say |
|---|---|---|
| סרטון | `סרטון` / `הסרטון` | sir-TON |
| וידאו | `וידאו` | VI-de-o |
| ריל / רילס | `ריל`, `רילס` | RIL, RILS |
| טיקטוק | `טיקטוק` | TIK-tok |
| אינסטגרם | `אינסטגרם` | INS-ta-gram |
| יוטיוב | `יוטיוב` | YU-tyub |
| ערוץ | `ערוץ` | a-RUTS |
| עוקבים | `עוקבים` | ok-VIM |
| לייק | `לייק` | LAIK |
| תגובה / תגובות | `תגובה`, `בתגובות` | tgu-VA, bat-gu-VOT |
| שיתוף | `שיתוף` | shi-TUF |
| כתוביות | `כתוביות` | ktu-vi-YOT |
| אנימציה | `אנימציה` | a-ni-MATS-ya (singular, **tested**) |
| גרפיקה | `גרפיקה` | GRA-fi-ka |
| מעברים | `המעברים` | ha-ma-a-va-RIM |
| עריכה | `עריכה` | a-ri-KHA |
| עורך / עורכת | `עורך`, `עורכת` | o-REKH, o-RE-khet |
| צילום | `צילום` | tsi-LUM |
| מצלמה | `מצלמה` | mats-le-MA |
| תאורה | `תאורה` | te-u-RA |
| פודקאסט | `פודקאסט` | POD-kast |
| קריינות | `קריינות` | ka-ri-ya-NUT |
| תסריט | `תסריט` | tas-RIT |
| טקסט | `טקסט` | TEKST |
| תמונה | `תמונה` | tmu-NA |
| ויראלי | `ויראלי` | vi-RA-li |

## 5. Imperatives and verbs (calls to action)

Plural imperatives start with a cluster and are the most frequent CTA words. Send them unpointed, in the colloquial future form Israelis actually say.

| Word | Send this | Say |
|---|---|---|
| תכתבו | `תכתבו` | tikh-te-VU (**tested**) |
| תסתכלו | `תסתכלו` | tis-tak-LU (**tested**) |
| תעקבו | `תעקבו` | ta-ak-VU |
| תשתפו | `תשתפו` | te-shat-FU |
| תשמרו | `תשמרו` | tish-me-RU |
| תלחצו | `תלחצו` | til-kha-TSU |
| תורידו | `תורידו` | to-RI-du |
| תנסו | `תנסו` | te-na-SU |
| תגידו | `תגידו` | ta-GI-du |
| תשלחו | `תשלחו` | tish-le-KHU |
| תצפו | `תצפו` | tits-PU |
| תירשמו | `תירשמו` | ti-ra-she-MU |
| אשלח | `ואשלח` | ve-esh-LAKH |
| הדבקתי | `הדבקתי` | hid-BAK-ti |
| לחצתי | `לחצתי` | la-KHATS-ti |
| בניתי | `בניתי` | ba-NI-ti |
| תיכנסו | `תיכנסו` | ti-kan-SU |

## 6. Everyday words that models misread (rule)

| Word | Send this | Say | Why |
|---|---|---|---|
| בדיוק | `בדיוק` | be-dI-yuk | unpointed reads naturally |
| עכשיו | `עכשיו` | akh-SHAV | |
| אפשר | `אפשר` | ef-SHAR | |
| צריך | `צריך` | tsa-RIKH | |
| כמו | `כמו` | KMO | |
| מאוד | `מאוד` | me-OD | |
| חינם | `בחינם` | be-khi-NAM | |
| מיוחד | `מיוחד` | me-yu-KHAD | |
| שיעור | `שיעור` | shi-UR | plene yod |
| חופשי | `חופשי` | khof-SHI | plene vav |
| תודה | `תודה` | to-DA | |
| שנייה | `שנייה` | SHNI-ya | |
| דקה | `דקה` | da-KA | |
| קל | `קל` | KAL | |
| לגמרי | `לגמרי` | le-gam-REI | |

## 7. Homographs: when niqqud is required

Point only the ambiguous word, with the vowel that decides it, and keep shva marks off where you can.

| Spelling | Meanings | If you mean | Send |
|---|---|---|---|
| ספר | book / barber / he counted | SE-fer (book) | `סֵפֶר` |
| בקר | cattle / controller / he visited | bi-KER (visited) | `בִּיקֵר` (plene) |
| חלב | milk / fat | kha-LAV (milk) | `חָלָב` |
| עשה / עושה | he did / he does; m / f | o-SE (m, does) | `עוֹשֶׂה` |
| רוצה | wants m / f | ro-TSE (m) | `רוֹצֶה` |
| לך | to you m / f / go | le-KHA (to you, m) | `לְךָ` |
| אותך | you m / f (object) | ot-KHA (m) | `אוֹתְךָ` |
| שלך | yours m / f | shel-KHA (m) | `שֶׁלְּךָ` |
| מכיר | knows m / f | ma-KIR (m) | `מַכִּיר` |
| פסקה | paragraph / she stopped | pis-KA | `פיסקה` (plene beats niqqud) |

## 8. Numbers, letters and symbols

- On ElevenLabs v4/v3 keep numbers as digits in the script; the model reads them. Check gender agreement in the listener's ear (שלוש דקות, שלושה ימים).
- Percent: `50%` reads well; versions: write `גרסה 5` rather than `v5`.
- English brand names in Latin may switch the voice into English mid-sentence; prefer the Hebrew transliteration unless the brand is an acronym.

## 9. Tone and delivery (keep it human)

- A native listener wants it to sound like a person talking, not an AI announcer: **balanced, neither monotone nor hyped.** One opening tag (`[confident]` or `[conversational] [warmly]`), no tag switches later. **tested**: an `[excited]` mid-script line ("וּבָנָה מִזֶּה סִרְטוֹן!") was rejected as over-energetic; the listener approved a single-`[conversational]` read (spread 11.4 st) and a `[confident]` read (13.4 st); a `[conversational] [warmly]` read measured flat (9.8 st).
- No `!` in the voice input; full stops and commas only. Keep `!` for the on-screen text if wanted.
- No `?` in the voice input for rhetorical questions; it lifts the pitch (**tested**). Use a comma.
- Do not switch tags near the end.

## 10. Names, gender and context (general rules, learned from real productions)

- **Names and invented words** (brands, products, people, places, any word not in a dictionary): never trust the unpointed spelling. Put each one in the probe line, pointed, in 3 to 4 spelling variants in ONE take (about 75 credits), and let the user choose by ear. Then confirm it again in the full take.
- **Forms spelled the same for masculine and feminine** (past-tense second person, present-tense verbs, `אותך`, `לך`, `שלך`): the model may voice the wrong gender even when the rest of the script is clear. For every line addressed to a specific gender, verify these words by ear in the probe. Fixes in order: add the pronoun (`אַת ...`), add niqqud, rephrase to a form that differs between genders.
- **A probe result is a sample, not a guarantee.** The same word can be read differently inside a long sentence than in a short test line. For words the user cared about, check them again in the full take and reuse the approved clip (see `hebrew-voice.md`, "Fixing one word after the take is approved").
- **Record every verified word** in section 2 with the input that worked, the input that failed, and the reading, so the next production starts from it. Rows are examples of what to try, not a closed list: apply the same method to any new word.
