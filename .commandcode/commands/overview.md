Orient someone who has just arrived in this repository. Read the repo before answering:
`README.md`, `AGENTS.md`, `GLOSSARY.md`, each chapter's `README.md`, and the file list of each
chapter directory. Do not describe anything you have not read.

Arguments: `$ARGUMENTS`

## If the argument is empty — tour the whole repo

1. **What this is.** One short paragraph, in your own words, on what the repo collects, who it
   is for, and the stance it takes (concepts from first principles, not framework usage).
2. **Layout.** A short tree, one line per entry, each marked `[read this]` or `[machinery]`.
   - Read this: the chapter directories and their concept files, `GLOSSARY.md`, `README.md`.
   - Machinery, which nobody studies: `AGENTS.md`, `docs/style.md`, `docs/template.md`,
     `scripts/check.mjs`, `.commandcode/`, `.opencode/`, `.agents/`, `skills-lock.json`,
     `.gitignore`. Say plainly that these exist so an agent can write notes consistently, and
     that a human reader can skip all of them.
3. **How to read it.** The three paths, and the rule that makes them work: a beginner reads a
   file up to the end of `## In practice` and stops, because advanced material is confined to
   `## Going deeper`; a practitioner reads `## Traps` and `## Going deeper` and skips the
   basics; the glossary is for looking terms up. The boundary is a heading, not a judgement
   call — say that, because it is the point of the structure.
4. **Where to find things.** How a topic maps to a file: chapter directory → its `README.md`
   map → one `NN-slug.md` per concept, with `GLOSSARY.md` as the cross-chapter index.
5. **What is written and what is not.** Run `node scripts/check.mjs --strict` and report the
   warning *count*, explaining that warnings are files still in the pre-convention shape and
   therefore the outstanding work. Do not paste the whole list.

## If an argument is given — locate one topic

Treat it as a topic, a term, or a question.

1. Find where it is covered: the chapter maps and `GLOSSARY.md` first, then search the chapter
   directories. Name the exact file and the section within it.
2. Give the reading order for that topic and what it depends on.
3. If it is not covered yet, say so plainly, name the closest existing file, and say which
   chapter it would belong to. Never invent coverage.
4. If the term is overloaded, point at the distinction recorded in `GLOSSARY.md`.

## Rules

Read-only — modify nothing. Keep the answer to roughly one screen, and prefer naming a file
over summarising its contents.
