"""ElevenLabs voice generation through the API, for agents without an ElevenLabs connector.

Usage:
  python tts_elevenlabs.py quota                                   # credits used / left this month
  python tts_elevenlabs.py voices                                  # voices on the account (id, name, language)
  python tts_elevenlabs.py models                                  # model ids the account can use
  python tts_elevenlabs.py cost --text-file voice.txt              # what a take would cost (no charge)
  python tts_elevenlabs.py say --voice VOICE_ID --text-file voice.txt --out audio/take1.mp3 [--model eleven_v4]

Reads the key from the ELEVENLABS_API_KEY environment variable. The user sets it themself;
never ask them to paste the key into the chat and never write it into a project file.
Standard library only. 1 character of input (niqqud and audio tags included) = 1 credit.
"""
import argparse, json, os, sys, urllib.error, urllib.request

API = "https://api.elevenlabs.io/v1"


def call(path, body=None, raw=False):
    key = os.environ.get("ELEVENLABS_API_KEY")
    if not key:
        sys.exit("ELEVENLABS_API_KEY is not set. See SKILL.md step 0, 'Voice access'.")
    req = urllib.request.Request(
        API + path,
        data=json.dumps(body).encode() if body is not None else None,
        headers={"xi-api-key": key, "Content-Type": "application/json"},
        method="POST" if body is not None else "GET",
    )
    try:
        with urllib.request.urlopen(req, timeout=300) as r:
            data = r.read()
    except urllib.error.HTTPError as e:
        sys.exit(f"ElevenLabs error {e.code}: {e.read().decode(errors='replace')[:400]}")
    return data if raw else json.loads(data)


def quota():
    s = call("/user/subscription")
    used, limit = s.get("character_count", 0), s.get("character_limit", 0)
    return used, limit, limit - used


def read_text(path):
    with open(path, encoding="utf-8-sig") as fh:  # -sig: a BOM from Windows editors would be billed as a character
        return fh.read().strip()


ap = argparse.ArgumentParser()
sub = ap.add_subparsers(dest="cmd", required=True)
sub.add_parser("quota")
sub.add_parser("voices")
sub.add_parser("models")
c = sub.add_parser("cost")
c.add_argument("--text-file", required=True)
s = sub.add_parser("say")
s.add_argument("--voice", required=True)
s.add_argument("--text-file", required=True)
s.add_argument("--out", required=True)
s.add_argument("--model", default="eleven_v4")
s.add_argument("--format", default="mp3_44100_128")
a = ap.parse_args()

if a.cmd == "quota":
    used, limit, left = quota()
    print(f"used={used} limit={limit} left={left}")
elif a.cmd == "voices":
    for v in call("/voices").get("voices", []):
        labels = v.get("labels") or {}
        print(f'{v["voice_id"]}  {v["name"]}  [{v.get("category", "")}]  {labels.get("language", "")} {labels.get("gender", "")}')
elif a.cmd == "models":
    for m in call("/models"):
        langs = ",".join(l.get("language_id", "") for l in m.get("languages", []))
        print(f'{m["model_id"]}  tts={m.get("can_do_text_to_speech")}  he={"he" in langs.split(",")}')
elif a.cmd == "cost":
    print(f"characters={len(read_text(a.text_file))} (= credits for one take)")
else:
    text = read_text(a.text_file)
    audio = call(f"/text-to-speech/{a.voice}?output_format={a.format}", {"text": text, "model_id": a.model}, raw=True)
    os.makedirs(os.path.dirname(os.path.abspath(a.out)), exist_ok=True)
    with open(a.out, "wb") as fh:
        fh.write(audio)
    used, limit, left = quota()
    print(f"wrote {a.out}  charged~{len(text)}  left={left} of {limit}")
