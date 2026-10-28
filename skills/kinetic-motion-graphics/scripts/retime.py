"""Re-time a storyboard after the voiceover was regenerated with the same words.

Usage:
  python retime.py OLD_words.json NEW_words.json src/Video.tsx [--out src/Video.tsx]

Aligns the words of the old and new takes (difflib on normalised words, so ASR splitting
"ובנה" vs "הוא בנה" or punctuation differences do not matter), builds a piecewise-linear
old->new time map through the matched word starts, and rewrites every time literal:
  at={x}  from: x  to: x  sendAt={x}  pressAt={x}  tossAt={x}  flyAt={x}  maxAt={x}  fullAt={x}
  resolveAt={x}  hi: x  lit: x  fly: x  dimAt={x}  on={x}  scan={[a, b]}  peaks={[...]}
  ['word', x] tuples   DURATION_* = x
Numbers in other contexts (sizes, push, colours) are left alone. Prints every change.
"""
import argparse, bisect, difflib, io, json, re

ap = argparse.ArgumentParser()
ap.add_argument("old")
ap.add_argument("new")
ap.add_argument("tsx")
ap.add_argument("--out")
a = ap.parse_args()

old = json.load(io.open(a.old, encoding="utf-8"))
new = json.load(io.open(a.new, encoding="utf-8"))
norm = lambda w: re.sub(r"[^\w]", "", w["w"]).lower()
sm = difflib.SequenceMatcher(a=[norm(w) for w in old], b=[norm(w) for w in new], autojunk=False)
pairs = [(old[blk.a + k]["start"], new[blk.b + k]["start"]) for blk in sm.get_matching_blocks() for k in range(blk.size)]
matched = len(pairs)
if matched < 0.7 * min(len(old), len(new)):
    raise SystemExit(f"only {matched} of {len(old)} words matched; is this the same script?")
print(f"anchors: {matched} matched words (old {len(old)}, new {len(new)})")
xs = [0.0] + [p[0] for p in pairs] + [old[-1]["end"]]
ys = [0.0] + [p[1] for p in pairs] + [new[-1]["end"]]


def m(t: float) -> float:
    if t >= xs[-1]:
        return round(ys[-1] + (t - xs[-1]), 2)
    i = max(1, bisect.bisect_right(xs, t))
    x0, x1, y0, y1 = xs[i - 1], xs[i], ys[i - 1], ys[i]
    return round(y0 + (t - x0) * (y1 - y0) / (x1 - x0 or 1), 2)


src = io.open(a.tsx, encoding="utf-8").read()
changes = []


def sub_num(match):
    t = float(match.group(2))
    nt = m(t)
    if nt != t:
        changes.append(f"{t} -> {nt}")
    return f"{match.group(1)}{nt}"


keys = r"(?:at|sendAt|pressAt|tossAt|flyAt|maxAt|fullAt|resolveAt|dimAt|on|clickAt)"
patterns = [
    rf"(\b{keys}=\{{)(\d+(?:\.\d+)?)",
    r"(\b(?:from|to|hi|lit|fly|at):\s*)(\d+(?:\.\d+)?)",
    r"(\['[^']+',\s*)(\d+(?:\.\d+)?)",
    r"(DURATION_\w*\s*=\s*)(\d+(?:\.\d+)?)",
]
for p in patterns:
    src = re.sub(p, sub_num, src)


def sub_list(match):
    nums = [m(float(n)) for n in re.findall(r"\d+(?:\.\d+)?", match.group(2))]
    return match.group(1) + ", ".join(str(n) for n in nums) + match.group(3)


src = re.sub(r"(\b(?:scan|peaks)=\{\[)([\d.,\s]+)(\]\})", sub_list, src)
io.open(a.out or a.tsx, "w", encoding="utf-8").write(src)
print(f"{len(changes)} values re-timed")
for c in changes:
    print(" ", c)
