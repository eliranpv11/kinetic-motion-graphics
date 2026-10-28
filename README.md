<div dir="rtl" align="right">

# 🎬 Kinetic Motion Graphics: מטקסט לסרטון, בעזרת Claude

**מדביקים טקסט, ומקבלים סרטון אנכי מוכן לרילס, טיקטוק ושורטס.**

רעיון, תסריט, פוסט או כתבה: Claude כותב מהם תסריט עם פתיחה שעוצרת את הגלילה, מקריא אותו בקול טבעי בעברית (או באנגלית), ובונה סרטון גרפי שבו כל מילה קופצת על המסך בדיוק כשהיא נאמרת. יש גם מוזיקה ואפקטים, והכול נבנה בקוד, בלי מצלמה, בלי שחקנים ובלי עורך וידאו.

הכלי נבנה קודם כול לעברית. יש בו מילון הגייה שנבדק באוזן, כללים לכתיבה בעברית מדוברת, ושיטה לחסוך כסף על הקראה.

---

## 🧭 למי זה מתאים

- לכל מי שיוצר תוכן ורוצה סרטוני "טקסט על המסך" מקצועיים בלי ללמוד אפטר אפקטס.
- לבעלי עסקים שרוצים להפוך פוסט או מאמר לסרטון קצר.
- למתחילים: לא צריך לדעת לתכנת. Claude כותב את כל הקוד בעצמו, אתם רק מאשרים בכל שלב.

---

## 🧰 מה צריך לפני שמתחילים

אלה תוכנות חינמיות שמתקינים פעם אחת במחשב. Claude משתמש בהן כדי לבנות את הסרטון.

| מה | בשביל מה | איך בודקים שזה מותקן |
|---|---|---|
| **Claude Code** (באפליקציית Claude למחשב או בטרמינל) | זה ה"עוזר" שעושה את כל העבודה | פותחים את האפליקציה, לשונית Code |
| **[Node.js](https://nodejs.org)** גרסה 18 ומעלה | בונה את הסרטון (Remotion) | `node -v` |
| **[ffmpeg](https://ffmpeg.org/download.html)** | מחבר בין הקול לתמונה | `ffmpeg -version` |
| **[Python](https://www.python.org/downloads/)** גרסה 3.10 ומעלה | מודד מתי כל מילה נאמרת | `python --version` |
| **חשבון [ElevenLabs](https://elevenlabs.io)** | הקול שמקריא את התסריט (בתשלום) | מחברים אותו ל־Claude כקונקטור, או עם מפתח API |

> 💡 **לא בטוחים מה מותקן?** אפשר פשוט לכתוב ל־Claude: "תבדוק אם יש לי Node, ffmpeg ו־Python, ותעזור לי להתקין מה שחסר". הוא יבדוק ויסביר צעד אחר צעד.

---

## 📥 התקנה

### דרך האפליקציה של Claude (הכי פשוט)

1. פותחים את אפליקציית Claude ונכנסים ל־**Customize** ואז **Plugins**.
2. בוחרים **Add marketplace** ומדביקים: `eliranpv11/kinetic-motion-graphics`
3. מתקינים את **kinetic-motion-graphics** מהרשימה.
4. סוגרים ופותחים מחדש את האפליקציה.

### דרך הטרמינל

מקלידים את שתי הפקודות האלה בתוך Claude Code, ואז מפעילים אותו מחדש:

<div dir="ltr" align="left">

```
/plugin marketplace add eliranpv11/kinetic-motion-graphics
/plugin install kinetic-motion-graphics@eliran-video-tools
```

</div>

### עדכון לגרסה חדשה

- **אם התקנתם מגיטהאב** (אחת משתי הדרכים למעלה): מריצים בטרמינל של המחשב את שתי הפקודות האלה, ואז מפעילים מחדש את Claude:

<div dir="ltr" align="left">

```
claude plugin marketplace update eliran-video-tools
claude plugin update kinetic-motion-graphics@eliran-video-tools
```

</div>

- **אם העליתם קובץ ZIP לאפליקציה**: מעלים שוב את קובץ ה־ZIP החדש באותו מקום, והוא מחליף את הישן.

---

## ▶️ איך משתמשים

פשוט כותבים ל־Claude מה רוצים. למשל:

> "תהפוך את הפוסט הזה לסרטון של 30 שניות לטיקטוק: …"

או משתמשים בפקודה המהירה:

<div dir="ltr" align="left">

```
/kinetic-video הטקסט שלכם כאן
```

</div>

### מה קורה מאחורי הקלעים

| שלב | מה Claude עושה | מה אתם עושים | עולה כסף? |
|---|---|---|---|
| 1 | קורא את הטקסט ומוצא את המסר המרכזי | – | לא |
| 2 | כותב תסריט עם פתיחה חזקה, תוכן וקריאה לפעולה | **מאשרים את התסריט** | לא |
| 3 | מקריא שורת ניסיון קצרה עם המילים הקשות להגייה | **מקשיבים ומאשרים** | מעט (כ־100 קרדיטים) |
| 4 | מקריא את התסריט המלא פעם אחת | **מקשיבים** | כן (כקרדיט לכל תו) |
| 5 | מודד בדיוק מתי נאמרת כל מילה | – | לא |
| 6 | בוחר סגנון עיצובי ובונה את הסצנות | – | לא |
| 7 | מוסיף מוזיקה ואפקטים | – | לא |
| 8 | מייצא את הסרטון ובודק אותו | **צופים בתוצאה** | לא |

> 🛑 **שום תשלום לא קורה בלי אישור שלכם.** לפני כל הקראה Claude אומר כמה היא תעלה וכמה נשאר לכם.

### כמה זה עולה

רק ההקראה ב־ElevenLabs עולה כסף. כל השאר חינם. סרטון רגיל של כ־35 שניות עולה **בערך 650 קרדיטים**: כ־115 על שורת הניסיון ועוד כ־520 על ההקראה המלאה. שורת הניסיון היא מה שחוסך את הכסף: היא מונעת הקראה מחדש של כל הסרטון בגלל מילה אחת שנשמעה לא נכון.

---

## 🎨 סגנונות עיצוב

Claude בוחר סגנון שמתאים לנושא, או שאתם מבקשים אחד בעצמכם:

| סגנון | מתאים ל־ |
|---|---|
| **ברירת מחדל** (שמנת, שחור וכתום) | כמעט הכול |
| **רשת שוויצרית** | שלבים, השוואות, "איך זה עובד" |
| **תיק חקירה** | ניפוץ מיתוסים, אזהרות, עוקץ שנחשף |
| **הדפס ריזו** | נושאים יצירתיים וחמים |
| **מצגת השקה כהה** | תוכנה, בינה מלאכותית, טיפים על כלים |
| **כתוביות חדשות** | חדשות ועובדות עם מספרים |
| **שעשועון** | רשימות, דירוגים, "5 טיפים" |
| **לוח מחיק** | הסבר של רעיון אחד |

אפשר לכתוב למשל: "תעשה את זה בסגנון תיק חקירה".

---

## ❓ שאלות ובעיות נפוצות

**מילה נשמעת לא נכון בהקראה**
אומרים ל־Claude איזו מילה ואיך היא צריכה להישמע. הוא מתקן רק את המילה הזו בשורת ניסיון קצרה, ולא מקריא את כל הסרטון מחדש.

**מופיעה הודעה כמו `node: command not found` או `ffmpeg not found`**
התוכנה לא מותקנת, או שהמחשב לא מוצא אותה. בקשו מ־Claude לעזור להתקין אותה, ואחרי ההתקנה פתחו מחדש את האפליקציה.

**אפשר לעבוד מהטלפון?**
את הפלאגין אפשר להוסיף מהטלפון, אבל בניית הסרטון צריכה מחשב. הדרך המעשית היא [Remote Control](https://code.claude.com/docs/en/remote-control.md): מתחילים את העבודה במחשב וממשיכים אותה מהטלפון.

**אפשר להשתמש בקול שלי?**
כן. נותנים ל־Claude הקלטה שלכם, והוא בונה את הסרטון סביבה בלי לשלם על הקראה.

---

## 📖 מילון מונחים קצר

- **Claude Code**: הגרסה של Claude שיכולה לעבוד על קבצים במחשב שלכם ולהריץ תוכנות.
- **פלאגין / סקיל**: חבילת הוראות וכלים שמלמדת את Claude לעשות משימה מסוימת, כאן: סרטונים.
- **Remotion**: כלי שבונה סרטונים מקוד. בזכותו כל מילה נוחתת בדיוק בזמן.
- **הוק (Hook)**: השניות הראשונות של הסרטון, שתפקידן לעצור את הגלילה.
- **רינדור (Render)**: השלב שבו הסרטון נשמר כקובץ MP4.
- **קרדיטים**: יחידת התשלום של ElevenLabs על הקראה.

---

## 🤝 רוצים לעזור?

הכי עוזר: מילים בעברית שההקראה מבטאת לא נכון. פתחו Issue או Pull Request עם המילה, הכתיב שעבד, הכתיב שנכשל ואיך זה נשמע (פרטים בסעיף 2 של `references/hebrew-pronunciation.md`).

רישיון MIT: מותר להשתמש, לשנות ולשתף. ראו [LICENSE](LICENSE).

</div>

---

# Kinetic Motion Graphics, a Claude Code plugin (English)

**Text in, video out.** Paste any text (a script, an idea, an article, a post) and Claude delivers a finished vertical (1080x1920) motion-graphics video: a scroll-stopping hook, a natural Hebrew or English voiceover, kinetic typography where every word lands on its spoken word, visual metaphors for every claim, music and sound effects. Rendered in code with [Remotion](https://www.remotion.dev).

Built for Hebrew first: the skill includes a tested Hebrew pronunciation lexicon, rules for writing spoken Israeli Hebrew, and a cost-control routine for ElevenLabs voice generation (probe a short line before paying for the full take).

## Install

### Claude Code (CLI or desktop app)

```
/plugin marketplace add eliranpv11/kinetic-motion-graphics
/plugin install kinetic-motion-graphics@eliran-video-tools
```

Restart Claude Code after installing. To update later, run `claude plugin marketplace update eliran-video-tools` and `claude plugin update kinetic-motion-graphics@eliran-video-tools` in a terminal, then restart. If you installed by uploading a ZIP in the Claude app, upload the new ZIP the same way.

### From a phone

The plugin can be added to your account from the Claude mobile app (Customize, then Plugins, then Add marketplace, `eliranpv11/kinetic-motion-graphics`). Rendering a video needs Node.js, ffmpeg and Python on a computer, so the practical way to use it from a phone is [Remote Control](https://code.claude.com/docs/en/remote-control.md): start Claude Code on your computer with the plugin installed, and continue that session from the phone. Cloud sessions do not install plugins from GitHub automatically, and ffmpeg and Remotion are not confirmed to run there.

### Skill only (no plugin)

Copy the folder `skills/kinetic-motion-graphics` into `~/.claude/skills/` (Windows: `%USERPROFILE%\.claude\skills\`). Remove any older copy first so Claude does not see two versions.

## Use

- Hand Claude a text and ask for a video; the skill triggers on its own.
- Or run `/kinetic-video <your text>`.

Claude writes the script, asks for your approval, runs a cheap pronunciation probe, generates the voice once, picks a style world, then builds and renders the video, and reports each check with its evidence.

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
  references/      design system, style worlds, Hebrew writing, pronunciation, voice, timing, hooks and sound, metaphors
  scripts/         word_timings.py, retime.py, pitch_report.py, make_sfx.py
  assets/          Remotion project template, component kit, a full example storyboard
```

## Contributing

Pronunciation findings are the most valuable contribution: open an issue or a pull request with the word, the input that worked, the input that failed, and how it sounded (see section 2 of `references/hebrew-pronunciation.md`).

## License

MIT, see [LICENSE](LICENSE).
