"""Generate royalty-free sound effects in code: whoosh, hit, click, riser, swipe.

Usage:
  uv run --no-project --with numpy python -I make_sfx.py OUT_DIR

Writes 44.1 kHz mono WAV files. They are synthesised here, so there is no cost and no licence issue.
Use them in Remotion as <Sequence from={s(t)}><Audio src={staticFile('sfx/hit.wav')} volume={0.6} /></Sequence>.
"""
import os, sys, wave
import numpy as np

SR = 44100
rng = np.random.default_rng(7)
out = sys.argv[1] if len(sys.argv) > 1 else "sfx"
os.makedirs(out, exist_ok=True)


def save(name, x):
    x = x / (np.max(np.abs(x)) + 1e-9) * 0.9
    with wave.open(os.path.join(out, name), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())
    print("wrote", name, f"{len(x) / SR:.2f}s")


def env(n, attack, release):
    a = int(attack * SR)
    e = np.ones(n)
    e[:a] = np.linspace(0, 1, a)
    e[a:] = np.exp(-np.linspace(0, 1, n - a) * release)
    return e


def sweep_noise(dur, f0, f1, q=6.0):
    """Band-passed noise whose centre frequency sweeps from f0 to f1 (simple resonator)."""
    n = int(dur * SR)
    noise = rng.standard_normal(n)
    fc = np.geomspace(f0, f1, n)
    y = np.zeros(n)
    y1 = y2 = 0.0
    for i in range(n):
        w = 2 * np.pi * fc[i] / SR
        r = np.exp(-w / (2 * q))
        b1, b2 = 2 * r * np.cos(w), -r * r
        v = (1 - r) * noise[i] + b1 * y1 + b2 * y2
        y[i] = v
        y2, y1 = y1, v
    return y


n = int(0.45 * SR)
save("whoosh.wav", sweep_noise(0.45, 300, 4000) * np.hanning(n))

n = int(0.6 * SR)
t = np.arange(n) / SR
body = np.sin(2 * np.pi * (55 + 90 * np.exp(-t * 18)) * t) * np.exp(-t * 7)
snap = rng.standard_normal(n) * np.exp(-t * 60) * 0.5
save("hit.wav", body + snap)

n = int(0.08 * SR)
t = np.arange(n) / SR
save("click.wav", (np.sin(2 * np.pi * 2200 * t) + 0.5 * rng.standard_normal(n)) * np.exp(-t * 90))

n = int(1.2 * SR)
save("riser.wav", sweep_noise(1.2, 200, 6000, q=4.0) * np.linspace(0, 1, n) ** 2)

n = int(0.22 * SR)
save("swipe.wav", sweep_noise(0.22, 1200, 5000, q=3.0) * env(n, 0.02, 6))

# monitor: two short beeps, then a long flatline tone
t = np.arange(int(1.8 * SR)) / SR
tone = np.sin(2 * np.pi * 980 * t)
gate = ((t < 0.09) | ((t > 0.45) & (t < 0.54)) | (t > 0.9)).astype(float)
fade = np.clip((1.8 - t) / 0.15, 0, 1)
save("flatline.wav", tone * gate * fade * 0.6)
