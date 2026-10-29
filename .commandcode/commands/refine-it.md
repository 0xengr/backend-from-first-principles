Refine the note at `$ARGUMENTS` to the standard in `docs/style.md`.

Run the `refine-it` skill (in Command Code that is `/skill:refine-it`, because this command
takes the plain `/refine-it` name). If the skill is unavailable, read `docs/style.md` and follow
its checklist directly.

Edit the file in place, then run `node scripts/check.mjs --strict` and report only: sections
moved, anything unverified, and anything deliberately left alone.
