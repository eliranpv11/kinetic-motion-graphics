"""Delivery check for voice takes: pitch spread (monotone vs over-excited) and end lift.

Usage:
  uv run --no-project --with numpy --with librosa python -I pitch_report.py take1.mp3 [take2.mp3 ...]

spread = p90-p10 of F0 in semitones. Calibrated on one Hebrew male clone (2026-10):
~10 read flat-ish, ~12-14 natural, >15 over-excited. Compare against an approved reference take.
end_lift = median pitch of the last 6 s vs the whole take (semitones); > +1.5 means the ending rises.
per-sentence = spread inside each 3 s window, to find a single over-energetic line.
"""
import subprocess, sys
import numpy as np, librosa

for path in sys.argv[1:]:
    pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", "16000", "-f", "s16le", "-"], capture_output=True, check=True).stdout
    a = np.frombuffer(pcm, np.int16).astype(np.float32) / 32768
    f0, v, _ = librosa.pyin(a, fmin=70, fmax=300, sr=16000, frame_length=1024)
    t = librosa.times_like(f0, sr=16000)
    med = np.nanmedian(f0[v])
    st = 12 * np.log2(f0 / med)
    spread = np.nanpercentile(st[v], 90) - np.nanpercentile(st[v], 10)
    dur = len(a) / 16000
    last = st[(t > dur - 6) & v]
    win = []
    for s0 in np.arange(0, dur, 3):
        m = (t >= s0) & (t < s0 + 3) & v
        win.append(f"{s0:.0f}s:{np.nanmedian(st[m]):+.0f}" if m.sum() > 10 else f"{s0:.0f}s:-")
    print(f"{path}: dur={dur:.1f}s spread={spread:.1f}st end_lift={np.nanmedian(last):+.1f}st | level per 3s: {' '.join(win)}")
