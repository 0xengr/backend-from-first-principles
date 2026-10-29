# 13. HTTP Content Negotiation

Content negotiation allows a client and server to select an appropriate representation of a resource.

For example, the same endpoint may return JSON or HTML, depending on the request and server capabilities.

### Client preference headers

| Request header    | Purpose                      |
| ----------------- | ---------------------------- |
| `Accept`          | Preferred media types.       |
| `Accept-Language` | Preferred natural languages. |
| `Accept-Encoding` | Accepted content codings.    |

### Example

Request:

```http
GET /products/15 HTTP/1.1
Host: example.com
Accept: application/json, text/html;q=0.8
Accept-Language: en, fr;q=0.7
```

The client expresses a preference for JSON and English.

The server might respond:

```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Language: en
Vary: Accept, Accept-Language

{"id":15,"name":"Keyboard"}
```

### What does q mean?

The `q` parameter represents a relative preference weight, generally from 0 to 1.

For example:

```http
Accept: text/html;q=0.9, application/json;q=1.0
```

JSON has the higher preference.

The server must still consider which representations it actually supports and the rules for matching the client's preferences.

### Content negotiation vs content encoding

These are related but different:

- `Accept`: What media types the client prefers.
- `Content-Type`: The media type of the representation actually sent.
- `Accept-Encoding`: What content codings the client accepts.
- `Content-Encoding`: The coding applied to the message content.

JSON is a media format. Gzip is a compression coding.

### Why Vary matters

If a response changes based on `Accept-Language`, caches need to know that the language preference affects the representation.

```http
Vary: Accept-Language
```

Without the correct cache variation, a shared cache could serve the wrong language variant.
