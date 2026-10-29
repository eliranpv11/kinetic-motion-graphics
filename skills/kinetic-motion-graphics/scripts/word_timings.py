"""Word-level timings for a voiceover, used to sync every on-screen word to speech.

Usage:
  uv run --no-project --with faster-whisper --with numpy python -I word_timings.py VOICE.mp3 OUT.json [--lang he] [--model medium]

Writes [{"w": word, "start": sec, "end": sec}, ...] and prints a readable list.
Audio is decoded with ffmpeg (must be on PATH) to avoid PyAV version issues.
Transcribed words are for TIMING only; the on-screen text comes from the approved script.
The first run downloads the speech model once (medium: about 1.5 GB; --model small: about 0.5 GB, less accurate).
"""
import argparse, json, shutil, subprocess, sys

ap = argparse.ArgumentParser()
ap.add_argument("audio")
ap.add_argument("out")
ap.add_argument("--lang", default="he")
ap.add_argument("--model", default="medium")
a = ap.parse_args()

try:
    import numpy as np
    from faster_whisper import WhisperModel
except ImportError:
    sys.exit("Missing Python packages. Run with uv (see Usage above) or: python -m pip install faster-whisper numpy")
if not shutil.which("ffmpeg"):
    sys.exit("ffmpeg is not installed or not on PATH. Run scripts/check_env.py for the install command.")

pcm = subprocess.run(
    ["ffmpeg", "-v", "error", "-i", a.audio, "-ac", "1", "-ar", "16000", "-f", "s16le", "-"],
    capture_output=True, check=True,
).stdout
audio = np.frombuffer(pcm, np.int16).astype(np.float32) / 32768

model = WhisperModel(a.model, device="cpu", compute_type="int8")
segs, _ = model.transcribe(audio, language=a.lang, word_timestamps=True, vad_filter=False)
words = []
for seg in segs:
    for w in seg.words or []:
        words.append({"w": w.word.strip(), "start": round(w.start, 2), "end": round(w.end, 2)})

with open(a.out, "w", encoding="utf-8") as fh:
    json.dump(words, fh, ensure_ascii=False, indent=1)
for x in words:
    print(f'{x["start"]:6.2f}-{x["end"]:6.2f}  {x["w"]}')
print(f"duration_hint={len(audio)/16000:.2f}s words={len(words)}")
