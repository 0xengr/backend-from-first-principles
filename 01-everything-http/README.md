# 01 — Everything HTTP

HTTP is the protocol every backend speaks. Frameworks hide it, but the moment
something breaks — a 502, a cookie that won't stick, a request that hangs — you
are debugging the protocol, not your code.

These notes build HTTP from the wire up: what goes over the connection, why the
rules exist, and which parts matter in practice. One file per concept.

**Subject:** Hypertext Transfer Protocol. **Focus:** web development, backend
engineering, browser networking, and security. **Purpose:** revision notes and
practical reference.

## How to read this

Every topic file has the same six parts, in the same order: a one-line summary,
`The mental model`, `In practice`, `Going deeper`, `Traps`, and `Sources`.

- **Beginners:** read in order, and stop each file after `In practice`. That is a
  complete account of the concept; `Going deeper` is optional extras, not the
  other half of the explanation.
- **Experienced devs:** read `Traps` and `Going deeper` only. Skim 1–5, then spend
  your time on the parts usually hand-waved — idempotency (7), CORS preflight
  (8–9), cache validation (12), framing (16), and what HTTPS does *not* protect
  (17).
- **Looking up a term:** [GLOSSARY.md](../GLOSSARY.md).

## Map

### Part I — Foundations

| # | Topic | What it answers |
|---|-------|-----------------|
| 1 | [HTTP Introduction](./01-introduction.md) | What HTTP is, what stateless means, and where it sits in the network stack |
| 2 | [Evolution of HTTP](./02-evolution.md) | What HTTP/0.9 → 1.0 → 1.1 → 2 → 3 each actually changed |
| 3 | [HTTP Messages](./03-messages.md) | Request line, status line, headers, body, and when a message has no body |
| 4 | [Importance of HTTP Headers](./04-headers-why.md) | How metadata drives parsing, auth, caching, compression, and CORS |
| 5 | [Types of HTTP Headers](./05-headers-types.md) | Request, response, representation, caching, and security headers |
| 6 | [HTTP Methods](./06-methods.md) | GET/HEAD/POST/PUT/PATCH/DELETE/OPTIONS, plus safe vs unsafe |
| 7 | [Idempotent vs Non-Idempotent Methods](./07-idempotency.md) | Retry semantics, why PUT is idempotent, and idempotency keys |

### Part II — Applied HTTP

| # | Topic | What it answers |
|---|-------|-----------------|
| 8 | [OPTIONS Method and CORS Workflow](./08-options-and-cors.md) | Origins, preflight, credentialed requests, and common browser errors |
| 9 | [CORS Demo with Burp Suite](./09-cors-burp-demo.md) | Observing a real preflight and actual request, and testing a failure case |
| 10 | [Response Status Codes](./10-status-codes.md) | The five classes, the codes you actually use, and 401 vs 403, 404 vs 500 |
| 11 | [Response Status Codes Demo](./11-status-codes-demo.md) | Inspecting real status codes and redirects with `curl` |
| 12 | [HTTP Caching](./12-caching.md) | `Cache-Control`, freshness vs revalidation, ETag/Last-Modified, `Vary` |
| 13 | [HTTP Content Negotiation](./13-content-negotiation.md) | `Accept*` headers, `q` weights, and why negotiation needs `Vary` |
| 14 | [HTTP Compression](./14-compression.md) | gzip/Brotli, `Content-Encoding` vs `Content-Length`, trade-offs and risks |

### Part III — Connections and Security

| # | Topic | What it answers |
|---|-------|-----------------|
| 15 | [Persistent Connections and Keep-Alive](./15-persistent-connections.md) | Connection reuse, HTTP/2–3 multiplexing, and why connections ≠ sessions |
| 16 | [Multipart Data and Chunked Transfer](./16-multipart-and-chunked.md) | File uploads, unknown-length bodies, and the framing ambiguity behind request smuggling |
| 17 | [SSL, TLS, and HTTPS](./17-tls-https.md) | TLS guarantees, certificates, HSTS, mixed content, and the limits of HTTPS |

## Traps worth remembering

- `200 OK` with an error inside the body — breaks every client that trusts status codes.
- `POST` for everything — gives up safe-method guarantees, caching, and easy retries.
- Assuming idempotent means "same response" — it means same *intended server effect*.
- `no-cache` meaning "don't store" — it means "revalidate"; `no-store` is the one that forbids storage.
- Sending `Content-Length` and `Transfer-Encoding` together — the classic request-smuggling vector.
- Treating CORS as access control — it is browser-enforced, and `curl` ignores it entirely.
- Believing HTTPS secures the application — it protects the connection only.

## Final revision checklist

Before considering HTTP fundamentals revised, make sure you can explain these without looking at the notes:

- [ ] Why HTTP is called a stateless request-response protocol.
- [ ] The differences between HTTP/1.1, HTTP/2, and HTTP/3.
- [ ] The structure of HTTP requests and responses.
- [ ] The purpose of `Content-Type`, `Accept`, `Authorization`, and `Cache-Control`.
- [ ] The difference between safe and idempotent methods.
- [ ] Why PUT is generally idempotent and POST is not guaranteed to be.
- [ ] How an OPTIONS preflight works and what CORS actually enforces.
- [ ] How to inspect requests and responses in Burp Suite.
- [ ] The meaning of common 2xx, 3xx, 4xx, and 5xx status codes.
- [ ] The difference between cache freshness and conditional validation.
- [ ] How content negotiation differs from content compression.
- [ ] Why persistent connections improve performance.
- [ ] The difference between multipart bodies and chunked transfer coding.
- [ ] Why HTTP/2 and HTTP/3 do not use HTTP/1.1 chunked transfer coding.
- [ ] How TLS protects HTTP communication and what HTTPS does not protect against.

## Recommended references

1. [MDN — Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview)
2. [MDN — HTTP Messages](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Messages)
3. [MDN — HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods)
4. [MDN — CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)
5. [MDN — HTTP Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching)
6. [RFC 9110 — HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html)
7. [RFC 9111 — HTTP Caching](https://www.rfc-editor.org/rfc/rfc9111.html)
8. [RFC 9112 — HTTP/1.1](https://www.rfc-editor.org/rfc/rfc9112.html)
9. [RFC 9113 — HTTP/2](https://www.rfc-editor.org/rfc/rfc9113.html)
10. [RFC 9114 — HTTP/3](https://www.rfc-editor.org/rfc/rfc9114.html)

**Study recommendation:** Learn HTTP message structure, headers, methods, status codes, caching, and CORS first. Then practice observing real traffic in browser developer tools and Burp Suite. Understanding actual requests and responses is more valuable than memorizing every header or status code.
