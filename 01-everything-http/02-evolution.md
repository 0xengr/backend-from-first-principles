# 2. Evolution of HTTP

HTTP evolved to improve compatibility, performance, concurrency, and security.

| Version  | Main characteristics                                                                                                            |
| -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| HTTP/0.9 | Very simple protocol; primarily supported GET and returned HTML.                                                                |
| HTTP/1.0 | Added headers, status codes, and support for different content types. Connections were commonly closed after a response.        |
| HTTP/1.1 | Introduced default persistent connections, improved caching, chunked transfer coding, content negotiation, and the Host header. |
| HTTP/2   | Uses binary framing, multiplexes multiple streams over one connection, and compresses headers using HPACK.                      |
| HTTP/3   | Uses QUIC instead of TCP, supports multiplexed streams, and uses QPACK for header compression.                                  |

### HTTP/1.1

HTTP/1.1 improved connection reuse. A client could request multiple resources over one TCP connection instead of establishing a new connection for every request.

However, HTTP/1.1 does not have HTTP/2's native multiplexing of multiple independent streams.

### HTTP/2

HTTP/2 preserves HTTP's core semantics while changing how messages are transmitted.

Major features:

- Binary framing.
- Multiplexing multiple streams over a connection.
- Header compression with HPACK.
- Stream prioritization mechanisms.

Multiplexing reduces the application-level blocking associated with sequential HTTP/1.1 exchanges. However, HTTP/2 over TCP can still experience transport-level head-of-line blocking if a TCP packet is lost.

### HTTP/3

HTTP/3 uses QUIC, which runs over UDP.

Major features:

- Independent streams reduce cross-stream transport-level blocking caused by packet loss.
- TLS 1.3 security is integrated into QUIC.
- Connection establishment can be faster in suitable circumstances.
- Header compression uses QPACK.

**Key distinction:** HTTP/1.1, HTTP/2, and HTTP/3 share HTTP semantics, but differ in message framing, connection management, and transport behavior.

Reference: [MDN — Evolution of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Evolution_of_HTTP).
