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

- **New to backend:** go in order. Each chapter assumes the ones before it and
  explains the vocabulary it introduces.
- **Experienced:** use the chapters as a reference for the parts usually
  hand-waved — framing, idempotency, cache validation, concurrency, and what a
  guarantee actually guarantees.
- **Every chapter** has the same shape: a short `README.md` for orientation and
  the full notes in a single long file.

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
