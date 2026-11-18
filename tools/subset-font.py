"""Cut assets/fonts/mosiken-sc.woff2 down to the Chinese characters the site uses.

    pip install fonttools brotli
    python3 tools/subset-font.py path/to/NotoSansSC[wght].ttf

The source is Noto Sans SC (SIL Open Font License 1.1), from
https://github.com/google/fonts/tree/main/ofl/notosanssc. Run this again after
changing the Chinese copy: characters missing from the subset still show, but
in the reader's system font instead of this one.
"""
import re
import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
SOURCES = [*ROOT.glob("zh/*.html"), ROOT / "assets/js/scenes.js", ROOT / "assets/js/main.js", ROOT / "tools/copy/zh.mjs"]

# CJK ideographs, CJK and full-width punctuation, and a few typographic marks.
WANTED = re.compile(r"[　-〿㐀-䶿一-鿿＀-￯—‘’“”…·]")


def main(source: str) -> None:
    text = "".join(p.read_text(encoding="utf-8") for p in SOURCES if p.exists())
    chars = sorted(set(WANTED.findall(text)))
    font = TTFont(source, lazy=False)
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = ["*"]
    options.name_IDs = ["*"]
    options.notdef_outline = True
    sub = subset.Subsetter(options)
    sub.populate(text="".join(chars))
    sub.subset(font)
    # Keep the weights the site sets (400 to 900); drop the thin end of the axis.
    font = instancer.instantiateVariableFont(font, {"wght": (400, 900)})
    out = ROOT / "assets/fonts/mosiken-sc.woff2"
    font.flavor = "woff2"
    font.save(out)
    print(f"{len(chars)} characters, {out.stat().st_size / 1024:.0f} KB -> {out.relative_to(ROOT)}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
