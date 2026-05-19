import pathlib

root = pathlib.Path(__file__).resolve().parent.parent / "src"
for path in root.rglob("*.ts*"):
    text = path.read_text(encoding="utf-8")
    fixed = text
    fixed = fixed.replace("<motion", "<div")
    fixed = fixed.replace("</motion>", "</div>")
    fixed = fixed.replace("createElement('motion')", "createElement('div')")
    if fixed != text:
        path.write_text(fixed, encoding="utf-8")
        print("fixed", path)
