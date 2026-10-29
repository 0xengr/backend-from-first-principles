---
name: refine-it
description: Refine a backend concept note in this repo to the house standard. Use when asked to improve, tighten, restructure, or review a Markdown note, when a note is missing the six-part skeleton, when advanced detail has leaked into beginner sections, or when a claim needs a source. Also use proactively before committing a new or heavily edited topic file.
argument-hint: "<path-to-note.md>"
---

# Refine a concept note

Bring one topic file up to [docs/style.md](../../../docs/style.md). The standard is the single
source of truth: if this skill and that file disagree, the file wins.

**Scope:** one topic file per run, the one in `$ARGUMENTS`. If no path is given, refine the
file the current conversation is about, and say which one you chose.

## Hard constraints

- **Never invent a fact, RFC section, or URL.** If a claim can't be verified from something you
  can actually read, mark it `<!-- unverified: what needs checking -->` and report it.
- **Preserve the technical content.** Restructuring moves text; it does not delete it. If
  something has to go, say where it went.
- **Do not rewrite for taste.** Apply the documented rules, not your own preferences for how
  prose should sound.
- **One file at a time.** Do not touch sibling files except to update the chapter map and
  glossary.

## Procedure

1. **Read the standard.** Read `docs/style.md` in full, then the target file. Don't skip this
   to save a step — the checklist below is a summary, not the standard.
2. **Check the skeleton.** The file must have, in order: an H1, a `> **In one line:**` summary
   directly under it, then `## The mental model`, `## In practice`, `## Going deeper`,
   `## Traps`, `## Sources`. Add what's missing. Keep the author's words; move them into the
   right section rather than rewriting them.
3. **Enforce the depth boundary.** Any RFC clause number, version-specific nuance, or edge
   case in `The mental model` or `In practice` belongs under `## Going deeper`. This is the
   rule that makes the file serve both a beginner and an expert — treat a violation as a bug.
4. **Test both readers.** Read only the one-liner, `The mental model`, and `In practice`.
   Is it a complete account of the concept, with no dangling references to later sections?
   Then read only `Going deeper` and `Traps`. Is it still coherent, without needing the
   beginner sections re-read? Fix whichever reading fails.
5. **Fix the mechanical rules.** Banned filler (*basically, simply, just, obviously, of
   course, in order to, leverage, delve*); undefined *secure / fast / scalable / robust*;
   unlabelled code fences; version-specific claims written as bare "HTTP"; tables used where
   cause and effect matters.
6. **Repair the sources.** Every contested claim needs a link, preferring the RFC with its
   section pinned, then MDN. A blog post is a pointer, not a source. Remove links that are
   only a bibliography if they back nothing specific.
7. **Check the map and glossary.** If the file was added, renamed, or removed, update the
   chapter `README.md` map. If the concept introduces a term that recurs across chapters or is
   overloaded, add one line to `GLOSSARY.md`.
8. **Verify.** Run `node scripts/check.mjs --strict` and fix what it reports for this file.
   Warnings elsewhere in the repo are not yours to fix in this pass — say so rather than
   silently editing other files.
9. **Report.** End with: sections moved (and from where), anything you could not verify,
   and anything you deliberately left alone. Keep it to a short list.

## What "better" does not mean

- Longer. A shorter file that keeps the depth boundary is better than a longer one that blurs it.
- More opinions. Notes state what is true about the protocol, not what the author prefers.
- More links. Three precise sources beat ten general ones.
