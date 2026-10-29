# Notes style

The editorial contract for this repo. Every topic file, chapter index, and glossary entry is
held to it. If a rule is wrong, change it here — never in a single file.

## What these notes are for

Someone arrives with a question — *why does my 502 come from the proxy and not my app?* — and
leaves with a model they can debug against. Not completeness. Not a tutorial series. A map of
how the layer actually behaves, including the parts frameworks hide.

Two readers are always present:

- **The beginner** needs the shape of the idea before any detail, and needs a clean place to
  stop without feeling they missed something.
- **The expert** doesn't want the shape explained again; they want the edge case, the clause,
  and the trap. They will read the last two sections and skip the first two.

One file serves both by making the depth **positional**: depth increases down the file, and
the boundary is a heading, not a judgement call.

## One concept per file

- A chapter is a directory (`01-everything-http/`). A concept is a file (`07-idempotency.md`).
- The filename is `NN-slug.md`: two-digit order, lowercase slug. Never rename to reorder —
  insert `08a-` only as a last resort, and renumber deliberately in one commit.
- Title inside the file repeats the concept, not the chapter: `# 7. Idempotent vs
  Non-Idempotent Methods`.
- If a file needs "and also", it is two files.
- Topic files never contain a table of contents. The chapter `README.md` is the map.

## The six-part skeleton

Fixed order, fixed names. Headings are structural, never `## Beginner` or `## Advanced` —
labelling the reader is condescending and goes stale.

| Part | Contains | Length guide |
|---|---|---|
| `> **In one line:**` | The whole concept as one sentence, immediately under the H1. No jargon that isn't defined below. | 1 sentence |
| `## The mental model` | Why the concept exists, the shape of it, an analogy if it earns its place. **No spec citations, no RFC clause numbers.** | ≤ 150 words |
| `## In practice` | What you actually write, see, or run. Raw messages, commands, tool output, code. | 150–400 words |
| `## Going deeper` | Everything advanced: protocol nuance, edge cases, version differences, spec detail. | as long as needed |
| `## Traps` | The mistakes that bite, each stated as a thing that breaks. | bullet list |
| `## Sources` | Links backing the contested claims. Not a bibliography of everything read. | ≥ 1 link |

**The load-bearing rule: advanced material appears only under `## Going deeper`.** That single
constraint is what makes the file dual-audience. A beginner stops after `In practice` and is
complete, not truncated. An expert jumps to `Going deeper` and isn't made to re-read the
basics. Move a stray RFC clause out of the other sections whenever you see one.

`## Traps` earns its place by being concrete. "Be careful with CORS" is not a trap. "Treating
CORS as access control — `curl` ignores it entirely, so a server-to-server call succeeds
where the browser is blocked" is.

## Evidence

The repo's stake is that claims can be trusted.

- **Cite the primary source or mark the claim as unverified.** This project's taste
  preference is explicit: verify against RFCs and MDN rather than asserting from memory.
- Prefer in order: the RFC text (pin the section, e.g. *RFC 9110 §9.2.2*) → MDN → a vendor's
  own protocol documentation. A blog post can point you at a source; it is not the source.
- If you are unsure, write what you know and mark it: `<!-- unverified: check RFC 9112 §7.1 -->`.
  An honest gap is better than a confident error, because the error gets memorised.
- Prefer "the spec requires" over "always" when the requirement has exceptions, and name the
  exception.
- Version-specific claims name the version. `HTTP/1.1` uses chunked transfer coding;
  "HTTP" does not. This is the single most common inaccuracy in HTTP writing.

## Voice

- Second person, present tense: "you send", not "the client would send". Imperative for
  instructions.
- Define a term on first use, in the same sentence, then use the term. "A *safe* method is one
  whose intended semantics are read-only" — then never re-explain it.
- Banned filler: *basically*, *simply*, *just*, *obviously*, *of course*, *it should be noted*,
  *in order to*, *leverage*, *delve*.
- Banned until defined: *secure*, *fast*, *scalable*, *robust*, *works*. All are claims with
  hidden conditions. Say what is guaranteed and against what.
- No marketing intensifiers: *powerful*, *seamless*, *cutting-edge*.
- Bold the load-bearing word in a sentence, not whole sentences. If everything is emphasised,
  nothing is.
- Em dashes and semicolons are fine. Exclamation marks are not.

## Formatting

- One `#` H1 per file. Headings in sentence case.
- Fence every code block with a language: `http`, `bash`, `json`, `text`, `javascript`.
  Unlabelled fences lose syntax highlighting and look like prose.
- Show the wire. A raw request/response beats a description of one, and beats a framework
  snippet that hides the headers.
- Tables for comparisons across a fixed set of axes. Prose for mechanisms and sequences —
  a table of steps loses cause and effect.
- Relative links between files (`./07-idempotency.md`), absolute URLs for sources.
- Line length is not enforced. One sentence per line is welcome but not required.

## Chapter index (`README.md`)

Three parts, nothing else:

1. **Why the chapter exists** — the failure that sends someone here.
2. **How to read it** — a beginner path and a practitioner path, phrased against the
   six-part skeleton.
3. **Map** — one row per topic file: number, link, one line on what it answers.

Plus a `## Traps worth remembering` list, which is the practitioner's fast path through the
chapter. No anchor-based table of contents: the map replaces it, and duplicating headings
guarantees drift.

## Glossary

`GLOSSARY.md` at the root holds terms that either recur across chapters or are overloaded
enough to cause confusion. One line each, then the chapter that covers it.

Include a term when it has two plausible meanings in common use — *session*, *connection*,
*stateless*, *cache* — because that ambiguity is exactly what makes notes unreadable.

## Checklist

What `/refine-it` enforces, in order:

- [ ] Filename is `NN-slug.md`; one concept; no TOC inside the file.
- [ ] H1 present, one only, concept-level title.
- [ ] `> **In one line:**` exists directly under the H1.
- [ ] All five H2s present, in the fixed order.
- [ ] No RFC clause numbers or spec nuance outside `## Going deeper`.
- [ ] `The mental model` is coherent without the later sections.
- [ ] `Going deeper` and `Traps` are coherent without the earlier ones.
- [ ] Every contested claim cites a source; unverified claims are marked as such.
- [ ] No banned filler words; no undefined *secure*/*fast*/*scalable*.
- [ ] Every code fence has a language.
- [ ] Version named for version-specific claims.
- [ ] Chapter `README.md` map updated if a file was added, renamed, or removed.
- [ ] New cross-cutting terms added to `GLOSSARY.md`.
- [ ] `node scripts/check.mjs` passes.
