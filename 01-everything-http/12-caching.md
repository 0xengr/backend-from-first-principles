# 12. HTTP Caching

HTTP caching stores reusable responses to reduce latency, bandwidth, and server load.

Caches may exist in:

- The browser.
- A reverse proxy.
- A CDN.
- A shared intermediary cache.

### Why caching matters

Without caching, the client may repeatedly download the same content even when it has not changed.

Caching can:

- Reduce network traffic.
- Improve page load performance.
- Reduce backend work.
- Improve scalability.

### Cache-Control

`Cache-Control` is the primary header for HTTP caching directives.

Example:

```http
Cache-Control: public, max-age=3600
```

This allows a response to be stored by shared caches and reused while fresh for up to 3,600 seconds, subject to applicable caching rules.

Common directives:

| Directive         | Meaning                                                       |
| ----------------- | ------------------------------------------------------------- |
| `max-age=3600`    | Response freshness lifetime is 3,600 seconds.                 |
| `public`          | Shared caches may store the response when other rules permit. |
| `private`         | Response is intended for a private cache, not a shared cache. |
| `no-cache`        | Stored response must be validated before reuse.               |
| `no-store`        | Caches must not store the response.                           |
| `must-revalidate` | A stale response must be validated before reuse.              |

**Important:** `no-cache` does not mean the response cannot be stored. `no-store` is the directive intended to prohibit storage.

### Freshness vs validation

A cached response can be reused if it is fresh.

If it becomes stale, a cache may revalidate it with the server.

### ETag

An ETag is a validator identifying a particular representation.

Response:

```http
HTTP/1.1 200 OK
ETag: "abc123"
Cache-Control: no-cache

{"name":"Keyboard"}
```

Later request:

```http
GET /api/product/15 HTTP/1.1
If-None-Match: "abc123"
```

If the representation has not changed, the server can respond:

```http
HTTP/1.1 304 Not Modified
ETag: "abc123"
```

The client can reuse its cached representation.

### Last-Modified

The server can also provide:

```http
Last-Modified: Tue, 20 Oct 2026 10:00:00 GMT
```

The client may later send:

```http
If-Modified-Since: Tue, 20 Oct 2026 10:00:00 GMT
```

The server can return `304 Not Modified` when the representation has not changed according to the validator.

### Vary

Example:

```http
Vary: Accept-Encoding
```

This tells caches that the selected representation can depend on `Accept-Encoding`.

### Backend development considerations

- Cache public, relatively stable assets aggressively.
- Use content-hashed asset filenames for versioned static resources.
- Be careful with personalized responses and shared caches.
- Do not assume that frontend state caching and HTTP caching are the same thing.
- Choose cache directives based on sensitivity, freshness requirements, and invalidation strategy.
