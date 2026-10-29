"""Delivery check for voice takes: pitch spread (monotone vs over-excited) and end lift.

Usage:
  uv run --no-project --with numpy --with librosa python -I pitch_report.py take1.mp3 [take2.mp3 ...] [--fmin 70 --fmax 400]

spread = p90-p10 of F0 in semitones. Calibrated on one Hebrew male voice:
~10 read flat-ish, ~12-14 natural, >15 over-excited. Compare against an approved reference take
of the same voice; on a new voice the first take the user approves becomes the reference.
end_lift = median pitch of the last 6 s vs the whole take (semitones); > +1.5 means the ending rises.
per-sentence = spread inside each 3 s window, to find a single over-energetic line.
The default pitch range 70-400 Hz covers male and female speaking voices.
"""
import argparse, shutil, subprocess, sys

ap = argparse.ArgumentParser()
ap.add_argument("takes", nargs="+")
ap.add_argument("--fmin", type=float, default=70)
ap.add_argument("--fmax", type=float, default=400)
args = ap.parse_args()

try:
    import numpy as np, librosa
except ImportError:
    sys.exit("Missing Python packages. Run with uv (see Usage above) or: python -m pip install librosa numpy")
if not shutil.which("ffmpeg"):
    sys.exit("ffmpeg is not installed or not on PATH. Run scripts/check_env.py for the install command.")

for path in args.takes:
    pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", "16000", "-f", "s16le", "-"], capture_output=True, check=True).stdout
    a = np.frombuffer(pcm, np.int16).astype(np.float32) / 32768
    f0, v, _ = librosa.pyin(a, fmin=args.fmin, fmax=args.fmax, sr=16000, frame_length=1024)
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
