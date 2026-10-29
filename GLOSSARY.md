# Glossary

Terms that either recur across chapters or are overloaded enough to cause confusion. One line
each. If a term has two plausible meanings in common use, say so — that ambiguity is usually
what makes a note unreadable.

| Term | Meaning | Covered in |
|---|---|---|
| **Stateless** | HTTP itself keeps no memory of a previous request. Any continuity is application state (cookies, sessions, tokens), not protocol memory. | [01/01](./01-everything-http/01-introduction.md) |
| **Representation** | The concrete bytes of a resource in a particular format (JSON, HTML). The resource is the abstraction; the representation is what travels. | [01/03](./01-everything-http/03-messages.md) |
| **Safe method** | A method whose intended semantics are read-only: `GET`, `HEAD`, `OPTIONS`, `TRACE`. Incidental effects such as logging can still occur. | [01/06](./01-everything-http/06-methods.md) |
| **Idempotent** | Repeating an identical request has the same *intended server effect* as one request. Says nothing about identical responses. | [01/07](./01-everything-http/07-idempotency.md) |
| **Idempotency key** | A client-supplied value that lets a server deduplicate retries of a non-idempotent request. The header alone does nothing — the server must store and honour it. | [01/07](./01-everything-http/07-idempotency.md) |
| **Origin** | Scheme + host + port. A different port is a different origin. | [01/08](./01-everything-http/08-options-and-cors.md) |
| **Preflight** | The browser's `OPTIONS` request asking whether a cross-origin request is permitted, sent before the actual request. | [01/08](./01-everything-http/08-options-and-cors.md) |
| **Fresh / stale** | A cached response is fresh while its freshness lifetime lasts. Once stale it must be revalidated or refetched. | [01/12](./01-everything-http/12-caching.md) |
| **Validator** | A value (`ETag`, `Last-Modified`) that lets a client ask "has this changed?" and get `304 Not Modified`. | [01/12](./01-everything-http/12-caching.md) |
| **Content coding** | A reversible transform applied to a message body (`gzip`, `br`). Not the same as the media type. | [01/14](./01-everything-http/14-compression.md) |
| **Persistent connection** | A transport connection reused across several requests. Not a session. | [01/15](./01-everything-http/15-persistent-connections.md) |
| **Session** | Application-level continuity for a user, carried by cookies or tokens. Unrelated to whether a connection is reused. | [01/15](./01-everything-http/15-persistent-connections.md) |
| **Message framing** | How a receiver knows where a message ends: `Content-Length`, chunked coding, or (in HTTP/2 and HTTP/3) its own frame structure. | [01/16](./01-everything-http/16-multipart-and-chunked.md) |
| **Chunked transfer coding** | HTTP/1.1 framing for a body of unknown length. HTTP/2 and HTTP/3 do not use it. | [01/16](./01-everything-http/16-multipart-and-chunked.md) |
