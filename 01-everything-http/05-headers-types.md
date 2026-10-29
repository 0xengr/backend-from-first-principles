# 5. Types of HTTP Headers

A useful modern approach is to classify headers by their function rather than memorize only the historical header categories.

### A. Request-related headers

These provide information or preferences about the request.

| Header            | Purpose                                            |
| ----------------- | -------------------------------------------------- |
| `Host`            | Identifies the target hostname in HTTP/1.1.        |
| `User-Agent`      | Provides information about the requesting client.  |
| `Accept`          | Advertises acceptable response media types.        |
| `Accept-Language` | Advertises preferred languages.                    |
| `Accept-Encoding` | Advertises acceptable content codings.             |
| `Authorization`   | Carries authentication credentials.                |
| `Origin`          | Identifies the origin associated with a request.   |
| `Referer`         | May identify the referring URL.                    |
| `If-None-Match`   | Supports conditional requests using an entity tag. |

### B. Response-related headers

These provide information about the server response.

| Header             | Purpose                                                             |
| ------------------ | ------------------------------------------------------------------- |
| `Server`           | Identifies server software, if disclosed.                           |
| `Location`         | Identifies a resource or redirect destination, depending on status. |
| `Retry-After`      | Indicates when a retry may be appropriate.                          |
| `WWW-Authenticate` | Describes an authentication challenge.                              |
| `Allow`            | Lists methods supported by a resource.                              |

### C. Representation and content headers

These describe the representation being sent or received.

| Header                | Purpose                                                        |
| --------------------- | -------------------------------------------------------------- |
| `Content-Type`        | Media type, such as `application/json`.                        |
| `Content-Length`      | Size of the message content in bytes when applicable.          |
| `Content-Encoding`    | Content coding, such as `gzip` or `br`.                        |
| `Content-Language`    | Language of the representation.                                |
| `Content-Disposition` | Provides instructions such as inline display or file download. |
| `Content-Range`       | Describes a partial representation in applicable responses.    |

### D. Caching headers

| Header          | Purpose                                                             |
| --------------- | ------------------------------------------------------------------- |
| `Cache-Control` | Defines caching directives.                                         |
| `ETag`          | Provides a validator for a representation.                          |
| `Last-Modified` | Gives the modification time of a representation.                    |
| `Expires`       | Specifies an expiration time.                                       |
| `Vary`          | Identifies request headers that influence representation selection. |

### E. Security-related headers

| Header                        | Purpose                                                                         |
| ----------------------------- | ------------------------------------------------------------------------------- |
| `Strict-Transport-Security`   | Instructs supporting browsers to use HTTPS for future requests under its scope. |
| `Content-Security-Policy`     | Restricts permitted resource loading and other browser behaviors.               |
| `X-Content-Type-Options`      | Can disable MIME-type sniffing with `nosniff`.                                  |
| `Referrer-Policy`             | Controls referrer information sent by browsers.                                 |
| `Access-Control-Allow-Origin` | Participates in CORS response validation.                                       |

### Important header facts

- Header names are case-insensitive.
- Header values follow the rules of their particular fields.
- Not every header applies to every HTTP version.
- HTTP/2 and HTTP/3 use lowercase field names on the wire.
- Some headers are end-to-end; others are intended for intermediaries.
- Custom headers can be useful, but unnecessary custom headers add complexity and can trigger CORS preflights.

The historical categories _general headers_, _request headers_, _response headers_, and _entity headers_ appear in older material. Modern HTTP specifications describe fields according to their individual semantics and do not rely on that old four-part classification.
