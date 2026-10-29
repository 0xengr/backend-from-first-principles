---
description: Scaffold a new concept file, chapter map row, and glossary stubs
---

Scaffold a new concept file in this notes repo.

Arguments: `$1` is the chapter directory (for example `01-everything-http`). `$2` is the
concept title — quote it if it contains spaces.

1. Read `docs/template.md` and the rules in `docs/style.md`.
2. Pick the next free `NN-` prefix in that chapter and a lowercase hyphenated slug from the
   title.
3. Create `<chapter>/NN-slug.md` from the template, with the H1 as `# NN. <Title>`. Leave the
   template's cues in place — do not invent the note's content.
4. Add a row for the new file to the map table in `<chapter>/README.md`, under the part it
   belongs to.
5. Add any new or overloaded terms the concept introduces to `GLOSSARY.md`.
6. Run `node scripts/check.mjs` and report the remaining warnings for the new file, so I know
   what still needs writing.
