# Backend, From First Principles

Backend work is mostly invisible. A framework gives you a request object, a
response writer, and a router, and everything between the socket and your
handler stays hidden — until it breaks. Then you are reading a stack trace that
starts somewhere you have never looked.

These notes go the other way: build the layers up from underneath, so the
abstractions are things you recognise rather than things you trust.

The goal is not encyclopaedic coverage. It is that when a 502 appears, a
connection hangs, or a write vanishes after a crash, you have a mental model to
debug against instead of a search engine.

## How to read this

Every concept lives in its own file with the same six parts: a one-line summary,
`The mental model`, `In practice`, `Going deeper`, `Traps`, and `Sources`. Depth
increases down the page, so the boundary between beginner and expert material is
a heading rather than a judgement call.

- **First time here:** run `/overview` in OpenCode or Command Code for a guided tour of the
  repo — layout, reading paths, and which files are machinery rather than material. Add a
  topic (`/overview idempotency`) to be told where it lives.
- **New to backend:** read in order, and stop each file after `In practice`.
  That is a complete account of the concept; `Going deeper` is extras, not the
  other half of the explanation.
- **Experienced:** read the chapter's `Traps worth remembering` list, then
  `Traps` and `Going deeper` in the files that matter. Skip the basics.
- **Looking up a term:** [GLOSSARY.md](./GLOSSARY.md) — including the words that
  mean different things in different contexts.
- **Writing or editing a note:** the rules are in
  [docs/style.md](./docs/style.md), and [docs/template.md](./docs/template.md) is
  the skeleton to copy.

A chapter directory holds a `README.md` (its map) plus one `NN-slug.md` file per
concept. `node scripts/check.mjs` verifies links and structure.

## Chapters

| # | Chapter | Starts from | Core question |
|---|---------|-------------|---------------|
| 1 | [Everything HTTP](./01-everything-http/README.md) | The wire | What actually goes over the connection, and why do the rules exist? |

Chapters still to come: TCP/IP and sockets, building an HTTP server without a
framework, routing and middleware, persistence and transactions, concurrency
and connection pools, caching layers, and observability.

## Theses worth remembering

- **The protocol outlives the framework.** Frameworks change; HTTP semantics,
  TCP behaviour, and POSIX guarantees do not.
- **Every abstraction hides a failure mode.** Learn the layer below and the
  failure stops being mysterious.
- **Guarantees are narrower than they sound.** "Idempotent" is about intended
  server effect. "HTTPS" is about the connection. "Durable" is about what
  survives a crash, not what survives a bad deploy.
- **Most production incidents are boundary problems** — framing, timeouts,
  retries, and partial failure — not business logic.
