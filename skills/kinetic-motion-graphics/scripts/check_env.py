"""Setup check: is everything the pipeline needs installed on this computer?

Usage:
  python check_env.py            # human-readable report
  python check_env.py --json     # machine-readable report

Standard library only, so it runs before anything else is installed.
For every missing piece it prints what it is for and the install command for this OS.
Exit code 0 = ready to render, 1 = something required is missing.
"""
import importlib.util, json, os, platform, re, shutil, subprocess, sys

OS = {"Windows": "windows", "Darwin": "mac"}.get(platform.system(), "linux")

INSTALL = {
    "node": {
        "windows": "winget install -e --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements",
        "mac": "brew install node",
        "linux": "Node 18+ installer from https://nodejs.org (apt often has an older Node)",
    },
    "ffmpeg": {
        "windows": "winget install -e --id Gyan.FFmpeg --accept-source-agreements --accept-package-agreements",
        "mac": "brew install ffmpeg",
        "linux": "sudo apt install ffmpeg",
    },
    "python": {
        "windows": "winget install -e --id Python.Python.3.12 --accept-source-agreements --accept-package-agreements",
        "mac": "brew install python@3.12",
        "linux": "sudo apt install python3 python3-pip",
    },
    "uv": {
        "windows": "winget install -e --id astral-sh.uv --accept-source-agreements --accept-package-agreements",
        "mac": "brew install uv",
        "linux": "curl -LsSf https://astral.sh/uv/install.sh | sh",
    },
}
PY_PKGS = {
    "faster_whisper": "faster-whisper",
    "numpy": "numpy",
    "librosa": "librosa",
}


def version(cmd, args=("--version",)):
    exe = shutil.which(cmd)
    if not exe:
        return None
    try:
        out = subprocess.run([exe, *args], capture_output=True, text=True, timeout=20)
        text = (out.stdout or out.stderr).strip().splitlines()
        return text[0] if text else "installed"
    except Exception:
        return "installed (version unknown)"


def major(v):
    m = re.search(r"(\d+)", v or "")
    return int(m.group(1)) if m else 0


checks = []


def add(name, required, ok, found, purpose, fix=None):
    checks.append({"name": name, "required": required, "ok": ok, "found": found, "purpose": purpose, "fix": fix})


def hidden_node():
    """Node installed by a version manager (fnm, nvm, volta) that only adds it to interactive shells."""
    home = os.path.expanduser("~")
    roots = [os.path.join(home, ".fnm", "node-versions"), os.path.join(home, ".nvm", "versions", "node"),
             os.path.join(home, ".local", "share", "fnm", "node-versions"), os.path.join(home, ".volta", "bin")]
    for env in ("APPDATA", "LOCALAPPDATA"):
        if os.environ.get(env):
            roots += [os.path.join(os.environ[env], "fnm", "node-versions"), os.path.join(os.environ[env], "nvm")]
    roots.append(os.path.join(os.environ.get("ProgramFiles", r"C:\Program Files"), "nodejs"))
    exe = "node.exe" if OS == "windows" else "node"
    for root in roots:
        for dirpath, _, files in os.walk(root):
            if exe in files and dirpath.count(os.sep) - root.count(os.sep) <= 3:
                return dirpath
    return None


pm = {"windows": "winget", "mac": "brew"}.get(OS)
if pm and not shutil.which(pm):
    # Without the package manager the printed install commands cannot run: point to the download pages instead.
    pages = {"node": "https://nodejs.org", "ffmpeg": "https://ffmpeg.org/download.html",
             "python": "https://www.python.org/downloads/", "uv": "https://docs.astral.sh/uv/"}
    for k, url in pages.items():
        INSTALL[k][OS] = f"{pm} not found: download from {url}"

node = version("node", ("-v",))
node_fix = INSTALL["node"][OS]
if not node and (folder := hidden_node()):
    node_fix = (f"Node is installed in {folder} but not on PATH for this shell. "
                f"Prepend that folder to PATH for each command (see references/remotion-notes.md, Windows).")
add("node", True, bool(node) and major(node.lstrip("v")) >= 18, node,
    "builds and renders the video (Remotion), version 18 or newer", node_fix)
npm = version("npm", ("-v",))
add("npm", True, bool(npm), npm, "installs the video project's packages (comes with Node.js)", node_fix)
ffmpeg = version("ffmpeg", ("-version",))
add("ffmpeg", True, bool(ffmpeg), ffmpeg, "cuts and joins audio, checks the final file", INSTALL["ffmpeg"][OS])
ffprobe = version("ffprobe", ("-version",))
add("ffprobe", True, bool(ffprobe), ffprobe, "measures audio and video length (comes with ffmpeg)", INSTALL["ffmpeg"][OS])
py_ok = sys.version_info >= (3, 10)
add("python", True, py_ok, platform.python_version(),
    "runs the timing and sound scripts, version 3.10 or newer", INSTALL["python"][OS])
uv = version("uv")
add("uv", False, bool(uv), uv,
    "runs the Python scripts with their packages without installing them globally (recommended)", INSTALL["uv"][OS])
for mod, pkg in PY_PKGS.items():
    have = importlib.util.find_spec(mod) is not None
    need = "only if uv is missing" if mod != "librosa" else "optional, for the delivery report"
    add(f"python:{pkg}", False, have, "installed" if have else None,
        f"Python package {pkg} ({need})", f"{sys.executable} -m pip install {pkg}")
key = bool(os.environ.get("ELEVENLABS_API_KEY"))
add("ELEVENLABS_API_KEY", False, key, "set" if key else None,
    "voice generation through the API; not needed if ElevenLabs is connected to the agent as a connector, "
    "or if the user records the voice", "see 'Voice access' in SKILL.md step 0")

# A Python package is only a real gap when uv is not there to supply it.
for c in checks:
    if c["name"] in ("python:faster-whisper", "python:numpy") and not uv and not c["ok"]:
        c["required"] = True

ready = all(c["ok"] for c in checks if c["required"])

if "--json" in sys.argv:
    print(json.dumps({"os": OS, "ready": ready, "checks": checks}, ensure_ascii=False, indent=1))
else:
    print(f"System: {platform.system()} {platform.release()}  ({OS})")
    for c in checks:
        mark = "OK " if c["ok"] else ("MISSING" if c["required"] else "optional")
        print(f"[{mark:>8}] {c['name']:<22} {c['found'] or '-'}")
        if not c["ok"]:
            print(f"           for: {c['purpose']}")
            if c["fix"]:
                print(f"           install: {c['fix']}")
    print("READY" if ready else "NOT READY: install the MISSING items, then open a new terminal and run this again.")
sys.exit(0 if ready else 1)
