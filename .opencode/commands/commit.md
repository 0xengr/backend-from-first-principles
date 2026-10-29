---
description: Commit the working tree with a Conventional Commit message
---

Follow the commit protocol in `AGENTS.md`.

1. Run `git status --short`, `git diff`, and `git diff --staged` yourself. Do not ask me to
   paste them.
2. Run `node scripts/check.mjs`. If it reports errors, stop and show them instead of committing.
3. Choose one Conventional Commit message following the protocol: `docs(<chapter>): <imperative
   summary>`, or `chore:` for tooling and scaffolding. The body explains why.
4. Show the message and the files it covers, then stage and commit with that message. Do not
   push.

Extra arguments, if any, are a hint for the message: $ARGUMENTS
