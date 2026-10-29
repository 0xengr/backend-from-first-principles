# AGENTS.md

This repo is **prose, not code**. It is a from-first-principles reference for backend concepts:
one Markdown file per concept, collected into numbered chapters. There is no build, no test
suite, and no application to run.

The failure mode to avoid is a confident, plausible, *wrong* note — especially one that
generalises a version-specific behaviour. Accuracy beats coverage.

## Layout

```text
README.md                  series index: theses, reading paths, chapter table
GLOSSARY.md                cross-chapter vocabulary; overloaded terms
docs/style.md              THE editorial contract — single source of truth
docs/template.md           literal skeleton to copy when adding a concept
scripts/check.mjs          structural + link checker (node, zero dependencies)
01-everything-http/        a chapter: README.md is its map, NN-slug.md is a concept
```

## Non-negotiables

Detailed rules live in [docs/style.md](docs/style.md). Read it before writing or editing notes.
The ones that are checked or matter most:

1. **One concept per file.** A chapter is a directory; a concept is `NN-slug.md`.
2. **Advanced material appears only under `## Going deeper`.** This is what makes every file
   readable by a beginner and useful to an expert at the same time. An RFC clause number in
   `The mental model` is a defect.
3. **Fixed skeleton, fixed order:** one-liner, `The mental model`, `In practice`, `Going
   deeper`, `Traps`, `Sources`. Never `## Beginner` / `## Advanced`.
4. **Cite or mark unverified.** Prefer the RFC (pin the section) → MDN → vendor protocol docs.
   A blog post points you at a source; it is not the source.
5. **Name the version.** `HTTP/1.1` uses chunked transfer coding; "HTTP" does not.
6. **No table of contents in a topic file.** The chapter `README.md` is the map.
7. When a file is added, renamed, or removed, update the chapter map and `GLOSSARY.md`.

## Verification

```bash
node scripts/check.mjs            # errors only: broken links, stray http.md refs, H1 problems
node scripts/check.mjs --strict   # also fails on missing skeleton sections / Sources
```

Default mode reports skeleton gaps as warnings, because chapters written before the convention
existed are converted gradually. `--strict` is the target state. A link check is skipped
inside agent config directories (`.commandcode/`, `.opencode/`, `.agents/`), where paths are
written repo-root-relative by design.

## Commit protocol

Conventional Commits, scoped by chapter:

```text
docs(<chapter>): <imperative summary>
```

Examples: `docs(http): split topics into one file each`,
`docs(http): correct chunked coding version scope`. Use `chore` for tooling and scaffolding
that is not note content. One logical change per commit. The body explains *why*; the subject
stays under ~72 characters.

## Agent tooling

- **Skills: `.agents/skills/<name>/SKILL.md`** is the shared home. Both Command Code and
  OpenCode discover it, so write a skill once. `name` must equal the directory name.
  `.commandcode/skills/` wins on conflicts in Command Code and is for Command-Code-only skills.
- **Commands are per-agent and cannot be shared:**
  `.commandcode/commands/<name>.md` (Command Code) and `.opencode/commands/<name>.md`
  (OpenCode). Keep command bodies to a few lines that point at `docs/style.md` or
  `AGENTS.md`; never copy editorial rules into a command, or the copies drift.
- **Do not create a `.commandcode/commands/<name>.md` with the same name as a skill.** In
  Command Code, custom commands outrank skills, so the command shadows the skill and the skill
  becomes reachable only as `/skill:<name>`.
