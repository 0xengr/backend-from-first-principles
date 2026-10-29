# 4. Importance of HTTP Headers

HTTP headers carry metadata and control information that affect how a request or response is interpreted.

Without headers, communication would be much less flexible. Headers support content types, authentication, caching, compression, browser security, and many other features.

### Examples

**Content type**

```http
Content-Type: application/json
```

Indicates the media type of the message content.

**Authentication**

```http
Authorization: Bearer <access-token>
```

Carries authorization credentials.

**Caching**

```http
Cache-Control: max-age=3600
```

Allows a response to be considered fresh for 3,600 seconds under the applicable caching rules.

**Compression**

```http
Accept-Encoding: gzip, br
```

Advertises supported response content codings.

**CORS**

```http
Access-Control-Allow-Origin: https://app.example.com
```

Allows browser JavaScript from the specified origin to access a qualifying cross-origin response, subject to the rest of the CORS rules.

### Why headers matter in backend development

Headers help determine:

- How request bodies are parsed.
- Which response representation should be returned.
- Whether credentials are included or accepted.
- Whether responses can be cached.
- Whether content is compressed.
- How browsers handle cross-origin access.
- Whether a connection or intermediary should follow specific protocol behavior.

**Important:** Headers do not automatically enforce application authorization. A backend must validate credentials and permissions itself.
