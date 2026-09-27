#!/usr/bin/env python3
from pathlib import Path
import shutil, sys, os

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "_site"

def normalize_base(value: str) -> str:
    value = (value or "/").strip()
    if not value.startswith("/"):
        value = "/" + value
    if not value.endswith("/"):
        value += "/"
    while "//" in value:
        value = value.replace("//", "/")
    return value

base = normalize_base(sys.argv[1] if len(sys.argv) > 1 else os.environ.get("MIRBIR_BASE_PATH", "/"))

if OUT.exists():
    shutil.rmtree(OUT)
OUT.mkdir(parents=True)

skip_top = {".git", ".github", "scripts", "_site", ".gitignore", "README-GITHUB.md"}
for item in ROOT.iterdir():
    if item.name in skip_top:
        continue
    dest = OUT / item.name
    if item.is_dir():
        shutil.copytree(item, dest)
    else:
        shutil.copy2(item, dest)

text_exts = {".html", ".js", ".css", ".json", ".txt", ".xml", ".svg", ".webmanifest"}
for p in OUT.rglob("*"):
    if p.is_file() and p.suffix.lower() in text_exts:
        try:
            txt = p.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        if "__MIRBIR_BASE__" in txt:
            p.write_text(txt.replace("__MIRBIR_BASE__", base), encoding="utf-8")

(OUT / ".nojekyll").write_text("", encoding="utf-8")
print(f"Built GitHub Pages site at {OUT} with base path {base}")
