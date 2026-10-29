# 01 — Everything HTTP

HTTP is the protocol every backend speaks. Frameworks hide it, but the moment
something breaks — a 502, a cookie that won't stick, a request that hangs — you
are debugging the protocol, not your code.

These notes build HTTP from the wire up: what goes over the connection, why the
rules exist, and which parts matter in practice. Full notes live in
[`http.md`](./http.md).

## How to read this

- **Beginners:** read in order. Sections 1–7 are the mental model; sections 8–16
  apply it through demos, caching, compression, connections, and TLS.
- **Experienced devs:** skim 1–5, then focus on the parts that are usually
  hand-waved — idempotency (7), CORS preflight (8–9), cache validation (12),
  framing (16), and what HTTPS does *not* protect (17).

## Table of contents

### Part I — Foundations

| # | Topic | What it covers |
|---|-------|----------------|
| 1 | [HTTP Introduction](./http.md#1-http-introduction) | Client-server, request-response, statelessness, and where HTTP sits in the network stack |
| 2 | [Evolution of HTTP](./http.md#2-evolution-of-http) | HTTP/0.9 → 1.0 → 1.1 → 2 → 3, and what each version actually changed |
| 3 | [HTTP Messages](./http.md#3-http-messages) | Request line, status line, headers, body, and when a message has no body |
| 4 | [Importance of HTTP Headers](./http.md#4-importance-of-http-headers) | How metadata drives parsing, auth, caching, compression, and CORS |
| 5 | [Types of HTTP Headers](./http.md#5-types-of-http-headers) | Request, response, representation, caching, and security headers |
| 6 | [HTTP Methods](./http.md#6-http-methods) | GET/HEAD/POST/PUT/PATCH/DELETE/OPTIONS, plus safe vs unsafe |
| 7 | [Idempotent vs Non-Idempotent Methods](./http.md#7-idempotent-vs-non-idempotent-methods) | Retry semantics, why PUT is idempotent, and idempotency keys |

### Part II — Applied HTTP

| # | Topic | What it covers |
|---|-------|----------------|
| 8 | [OPTIONS Method and CORS Workflow](./http.md#8-options-method-and-cors-workflow) | Origins, preflight, credentialed requests, and common browser errors |
| 9 | [CORS Demo with Burp Suite](./http.md#9-cors-demo-with-burp-suite) | Observing a real preflight and actual request, and testing a failure case |
| 10 | [Response Status Codes](./http.md#10-response-status-codes) | The five classes, the codes you actually use, and 401 vs 403, 404 vs 500 |
| 11 | [Response Status Codes Demo](./http.md#11-response-status-codes-demo) | Inspecting real status codes and redirects with `curl` |
| 12 | [HTTP Caching](./http.md#12-http-caching) | `Cache-Control`, freshness vs revalidation, ETag/Last-Modified, `Vary` |
| 13 | [HTTP Content Negotiation](./http.md#13-http-content-negotiation) | `Accept*` headers, `q` weights, and why negotiation needs `Vary` |
| 14 | [HTTP Compression](./http.md#14-http-compression) | gzip/Brotli, `Content-Encoding` vs `Content-Length`, trade-offs and risks |

### Part III — Connections and Security

| # | Topic | What it covers |
|---|-------|----------------|
| 15 | [Persistent Connections and Keep-Alive](./http.md#15-persistent-connections-and-keep-alive) | Connection reuse, HTTP/2–3 multiplexing, and why connections ≠ sessions |
| 16 | [Multipart Data and Chunked Transfer](./http.md#16-multipart-data-and-chunked-transfer) | File uploads, unknown-length bodies, and the framing ambiguity behind request smuggling |
| 17 | [SSL, TLS, and HTTPS](./http.md#17-ssl-tls-and-https) | TLS guarantees, certificates, HSTS, mixed content, and the limits of HTTPS |

### Revision

- [Final Revision Checklist](./http.md#final-revision-checklist)
- [Recommended References](./http.md#recommended-references)

## Traps worth remembering

- `200 OK` with an error inside the body — breaks every client that trusts status codes.
- `POST` for everything — gives up safe-method guarantees, caching, and easy retries.
- Assuming idempotent means "same response" — it means same *intended server effect*.
- `no-cache` meaning "don't store" — it means "revalidate"; `no-store` is the one that forbids storage.
- Sending `Content-Length` and `Transfer-Encoding` together — the classic request-smuggling vector.
- Treating CORS as access control — it is browser-enforced, and `curl` ignores it entirely.
- Believing HTTPS secures the application — it protects the connection only.
