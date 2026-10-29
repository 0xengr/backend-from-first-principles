# HTTP — Complete Learning Notes

**Subject:** Hypertext Transfer Protocol
**Focus:** Web development, backend engineering, browser networking, and security
**Purpose:** Revision notes and practical reference

---

## 1. HTTP Introduction

### What is HTTP?

**HTTP (Hypertext Transfer Protocol)** is a stateless, application-layer protocol used for communication between clients and servers. It defines how clients request resources and how servers respond.

HTTP is used by:

- Web browsers to load websites.
- Frontend applications to communicate with backend APIs.
- Mobile applications to communicate with remote servers.
- Services to exchange data through REST APIs and other HTTP-based interfaces.

HTTP is not limited to HTML. It can transfer JSON, images, videos, files, and many other representations.

### How HTTP works

1. A client initiates a request.
2. The request travels through the network to a server.
3. The server processes the request.
4. The server sends an HTTP response.
5. The client interprets the response.

Example:

```http
GET /api/users/42 HTTP/1.1
Host: example.com
Accept: application/json
```

Response:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 42,
  "name": "Mohammad"
}
```

### Important characteristics

- **Client-server:** The client initiates communication.
- **Request-response:** Clients send requests and servers return responses.
- **Stateless:** HTTP does not inherently remember previous requests.
- **Extensible:** Headers, methods, and status codes support additional behavior.
- **Representation-oriented:** Resources can have different representations, such as JSON or HTML.
- **Intermediary-friendly:** Proxies, gateways, and caches can participate in communication.

### What does stateless mean?

HTTP itself does not require the server to remember the state of a previous request.

For example, two requests can be processed independently:

```http
GET /api/profile HTTP/1.1
Host: example.com
```

```http
GET /api/orders HTTP/1.1
Host: example.com
```

Applications can maintain state using cookies, sessions, access tokens, databases, and other mechanisms.

**Important:** Stateless does not mean that a web application cannot have users, sessions, or persistent data. It means that HTTP does not automatically provide conversational memory between requests.

### Where HTTP fits in the network stack

| Layer       | Example responsibility                                   |
| ----------- | -------------------------------------------------------- |
| Application | HTTP defines requests, responses, methods, and headers.  |
| Transport   | TCP carries HTTP/1.1 and HTTP/2; QUIC carries HTTP/3.    |
| Network     | IP routes packets between hosts.                         |
| Link        | Ethernet or Wi-Fi transmits data across a local network. |

HTTP defines application-level semantics. It does not itself route IP packets or encrypt the connection.

---

## 2. Evolution of HTTP

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

---

## 3. HTTP Messages

HTTP communication consists of two message types:

1. Request messages: client to server.
2. Response messages: server to client.

The classic textual message structure is easiest to study using HTTP/1.1.

### HTTP request structure

An HTTP/1.1 request consists of:

1. Request line.
2. Headers.
3. Empty line separating headers from the body.
4. Optional message body.

Example:

```http
POST /api/users HTTP/1.1
Host: example.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer example-token

{
  "name": "Mohammad",
  "email": "mohammad@example.com"
}
```

Explanation:

- `POST`: Method.
- `/api/users`: Request target.
- `HTTP/1.1`: Protocol version.
- `Host`: Target hostname.
- `Content-Type`: Media type of the request body.
- `Accept`: Preferred response media type.
- `Authorization`: Credentials or authorization information.
- Empty line: Separates headers from the body.
- JSON body: Data submitted to the server.

### HTTP response structure

A response contains:

1. Status line.
2. Headers.
3. Empty line.
4. Optional response body.

Example:

```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: /api/users/42
Cache-Control: no-store

{
  "id": 42,
  "name": "Mohammad"
}
```

Explanation:

- `201 Created`: The request successfully created a resource.
- `Content-Type`: The returned representation is JSON.
- `Location`: Identifies the newly created resource.
- `Cache-Control`: Controls caching behavior.
- Body: Contains the resource representation.

### Important distinctions

- The request body contains data being submitted, if any.
- The response body contains returned data, if any.
- Not every request or response has a body.
- `HEAD` responses do not contain a response body.
- `204 No Content` responses do not contain content.
- HTTP/2 and HTTP/3 use binary framing rather than the textual message format shown above.

---

## 4. Importance of HTTP Headers

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

---

## 5. Types of HTTP Headers

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

---

## 6. HTTP Methods

HTTP methods define the intended operation on a target resource.

| Method    | Typical purpose                                       | Example                             |
| --------- | ----------------------------------------------------- | ----------------------------------- |
| `GET`     | Retrieve a representation.                            | `GET /users/42`                     |
| `HEAD`    | Retrieve response metadata without the response body. | `HEAD /users/42`                    |
| `POST`    | Submit data for processing or resource creation.      | `POST /users`                       |
| `PUT`     | Replace the target resource's current representation. | `PUT /users/42`                     |
| `PATCH`   | Apply partial modifications.                          | `PATCH /users/42`                   |
| `DELETE`  | Delete the target resource.                           | `DELETE /users/42`                  |
| `OPTIONS` | Discover communication options.                       | `OPTIONS /users`                    |
| `CONNECT` | Establish a tunnel through a server.                  | Used by HTTP proxies for tunneling. |
| `TRACE`   | Perform a message loop-back test.                     | Rarely enabled in production.       |

### GET vs POST

**GET**

```http
GET /products/15 HTTP/1.1
Host: shop.example.com
```

Used to retrieve a product.

**POST**

```http
POST /products HTTP/1.1
Host: shop.example.com
Content-Type: application/json

{
  "name": "Keyboard",
  "price": 50
}
```

Used to submit data, possibly creating a new product.

### PUT vs PATCH

`PUT` generally replaces the target resource's current representation with the submitted representation.

`PATCH` applies a partial modification according to the patch format and the server's implementation.

Example:

```http
PUT /users/42 HTTP/1.1
Content-Type: application/json

{
  "name": "Mohammad",
  "email": "mohammad@example.com"
}
```

```http
PATCH /users/42 HTTP/1.1
Content-Type: application/merge-patch+json

{
  "name": "Mohammad Ali"
}
```

The exact patch behavior depends on the selected patch format.

### Safe vs unsafe methods

A **safe method** is defined as one whose intended semantics are read-only.

- Safe: `GET`, `HEAD`, `OPTIONS`, `TRACE`.
- Unsafe: `POST`, `PUT`, `PATCH`, `DELETE`.

Safe does not mean that absolutely nothing can change on the server. Logging, metrics, and other incidental effects can still occur.

Reference: [MDN — HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods).

---

## 7. Idempotent vs Non-Idempotent Methods

Idempotency describes the intended effect of repeating an identical request.

A method is idempotent when multiple identical requests have the same intended effect on server state as one request.

### Idempotent methods

`GET`, `HEAD`, `OPTIONS`, `TRACE`, `PUT`, and `DELETE` are defined as idempotent by HTTP semantics.

Example:

```http
PUT /users/42 HTTP/1.1
Content-Type: application/json

{
  "name": "Mohammad"
}
```

Sending this request repeatedly should leave the resource in the same intended state.

Another example:

```http
DELETE /users/42 HTTP/1.1
```

The first request might delete the resource. Repeating the request should not cause an additional deletion effect, even if the subsequent response differs.

### Non-idempotent methods

`POST` and `PATCH` are not guaranteed to be idempotent by their method definitions.

For example:

```http
POST /orders HTTP/1.1
Content-Type: application/json

{
  "productId": 15,
  "quantity": 1
}
```

Sending this request twice might create two orders.

### Comparison

| Property                       | Idempotent                         | Non-idempotent     |
| ------------------------------ | ---------------------------------- | ------------------ |
| Repeated intended effect       | Same as one request                | May differ         |
| Typical methods                | GET, HEAD, PUT, DELETE             | POST, PATCH        |
| Useful for automatic retries   | Often, with appropriate safeguards | Requires more care |
| Guarantees identical responses | No                                 | No                 |

### Why it matters

Suppose a client submits an order, but the network connection fails before it receives the response.

The client cannot necessarily tell whether the server created the order.

Blindly retrying a non-idempotent operation can create duplicates.

A backend can address this with an **idempotency key**:

```http
POST /orders HTTP/1.1
Idempotency-Key: 7f0e3d-example-key
Content-Type: application/json
```

The server must implement the key's storage, deduplication, and replay behavior. The header alone does not create idempotency.

**Remember:** Idempotency concerns intended server-side effects, not identical response codes, response bodies, or the absence of all incidental side effects.

---

## 8. OPTIONS Method and CORS Workflow

### What is OPTIONS?

`OPTIONS` asks a server about the communication options available for a target resource or server.

Example:

```http
OPTIONS /api/users HTTP/1.1
Host: api.example.com
```

A response may include:

```http
HTTP/1.1 204 No Content
Allow: GET, POST, OPTIONS
```

The `Allow` header lists methods supported by the resource. Its presence does not itself grant browser cross-origin access.

### What is CORS?

**CORS (Cross-Origin Resource Sharing)** is a browser security mechanism that uses HTTP headers to control whether JavaScript running on one origin may access a response from another origin.

An origin is the combination of:

- Scheme: `http` or `https`.
- Hostname.
- Port.

For example:

- `https://app.example.com`
- `https://api.example.com`

These are different origins because their hostnames differ.

CORS is relevant when browser JavaScript requests a resource from a different origin.

### Why does CORS exist?

The browser applies a same-origin policy to restrict how scripts access cross-origin resources. CORS provides a controlled way for servers to permit particular cross-origin access.

**Important:** CORS is not a general server-to-server access restriction. It also does not replace authentication, authorization, or CSRF defenses.

### CORS workflow

A cross-origin request that qualifies as a _simple request_ may be sent without preflight, although the browser still validates the response before exposing it to JavaScript.

A request requiring preflight follows this sequence:

1. Browser identifies that the cross-origin request requires preflight.
2. Browser sends an `OPTIONS` request.
3. Server returns CORS policy headers.
4. Browser checks whether the requested operation is permitted.
5. If the preflight succeeds, the browser sends the actual request.
6. Browser checks the actual response's CORS headers before exposing the response to JavaScript.

Example preflight request:

```http
OPTIONS /api/orders HTTP/1.1
Host: api.example.com
Origin: https://app.example.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: content-type, authorization
```

Possible response:

```http
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 600
Vary: Origin
```

The browser can then send the actual request if all relevant checks pass.

### When is preflight triggered?

Common reasons include:

- Methods such as `PUT`, `PATCH`, or `DELETE`.
- A `POST` request using a non-safelisted content type, such as `application/json`.
- Non-safelisted request headers, such as `Authorization`.

Not every cross-origin request requires an `OPTIONS` preflight.

### CORS with credentials

When browser requests include credentials such as cookies:

```http
Access-Control-Allow-Credentials: true
```

The server must also provide an explicit permitted origin rather than `*` for credentialed CORS access.

The frontend may need:

```javascript
fetch("https://api.example.com/profile", {
  credentials: "include",
});
```

The server must configure the appropriate credential and origin policy. Cookie `SameSite` rules and other browser restrictions still apply.

### Common CORS errors

- Missing `Access-Control-Allow-Origin`.
- Requested method is not permitted.
- A requested header is not permitted.
- Credentialed requests use an invalid wildcard origin.
- Preflight response is unsuccessful or redirected in an unsupported way.

Reference: [MDN — CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS).

---

## 9. CORS Demo with Burp Suite

**Objective:** Observe the browser's preflight request and actual cross-origin request.

### Prerequisites

- Burp Suite installed.
- A browser configured to route traffic through Burp.
- A local or test web application with two different origins.
- Permission to test the target application.

For a safe local lab, use:

- Frontend: `http://localhost:3000`
- API: `http://localhost:4000`

Different ports mean different origins.

### Step 1: Configure Burp Suite

1. Start Burp Suite.
2. Open a temporary browser from Burp, or configure your test browser to use Burp's proxy.
3. Open the HTTP history.
4. Visit your frontend application.

For HTTPS testing, use Burp's documented certificate setup in a dedicated test browser. Do not install an interception CA into a trusted everyday browsing environment unnecessarily.

### Step 2: Trigger a preflight

From the frontend, execute:

```javascript
fetch("http://localhost:4000/api/orders", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Lab-Header": "demo",
  },
  body: JSON.stringify({
    productId: 15,
  }),
});
```

Because this request uses `application/json` and a custom header, the browser normally preflights it.

### Step 3: Inspect the OPTIONS request

In Burp's HTTP history, find a request resembling:

```http
OPTIONS /api/orders HTTP/1.1
Host: localhost:4000
Origin: http://localhost:3000
Access-Control-Request-Method: POST
Access-Control-Request-Headers: content-type,x-lab-header
```

The browser is asking whether it may send the intended cross-origin request.

### Step 4: Inspect the response

A suitable lab response might contain:

```http
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, X-Lab-Header
Vary: Origin
```

If the browser accepts this response, it can send the actual POST request.

### Step 5: Inspect the POST request

Look for the subsequent request:

```http
POST /api/orders HTTP/1.1
Host: localhost:4000
Origin: http://localhost:3000
Content-Type: application/json
X-Lab-Header: demo

{"productId":15}
```

Inspect the actual response as well. It must satisfy the relevant CORS checks for JavaScript to access the response.

### Step 6: Test a failure

Change the allowed origin on your test server to:

```http
Access-Control-Allow-Origin: http://wrong-origin.example
```

Repeat the request.

Observe whether the browser blocks the intended operation at preflight or refuses to expose the actual response.

### Key observations

- Burp can display HTTP requests and responses, including preflight traffic.
- CORS enforcement is performed by the browser, not by Burp.
- A request appearing in Burp does not prove that frontend JavaScript can read its response.
- Non-browser clients such as `curl` do not enforce browser CORS rules.
- CORS does not prevent every cross-origin request from reaching the server.

---

## 10. Response Status Codes

HTTP status codes indicate the outcome or current state associated with a request.

The first digit identifies the broad category.

| Class | Meaning                       |
| ----- | ----------------------------- |
| `1xx` | Informational                 |
| `2xx` | Successful                    |
| `3xx` | Redirection or further action |
| `4xx` | Client error                  |
| `5xx` | Server error                  |

### Common 1xx codes

- `100 Continue`: The client can continue sending the request.
- `101 Switching Protocols`: Protocol switching is occurring.

### Common 2xx codes

| Code                  | Meaning                                             | Typical use                    |
| --------------------- | --------------------------------------------------- | ------------------------------ |
| `200 OK`              | Request succeeded.                                  | Successful GET.                |
| `201 Created`         | Resource created.                                   | Successful resource creation.  |
| `202 Accepted`        | Accepted for processing, not necessarily completed. | Asynchronous job.              |
| `204 No Content`      | Request succeeded without response content.         | Successful deletion or update. |
| `206 Partial Content` | Partial representation returned.                    | Range request.                 |

### Common 3xx codes

| Code                     | Meaning                                                           |
| ------------------------ | ----------------------------------------------------------------- |
| `301 Moved Permanently`  | Permanent redirection.                                            |
| `302 Found`              | Temporary redirection.                                            |
| `303 See Other`          | Redirects retrieval to another resource, commonly using GET.      |
| `304 Not Modified`       | Cached representation can be reused after conditional validation. |
| `307 Temporary Redirect` | Temporary redirect that preserves the method.                     |
| `308 Permanent Redirect` | Permanent redirect that preserves the method.                     |

### Common 4xx codes

| Code                         | Meaning                                                      |
| ---------------------------- | ------------------------------------------------------------ |
| `400 Bad Request`            | Invalid or malformed request.                                |
| `401 Unauthorized`           | Authentication is required or has failed.                    |
| `403 Forbidden`              | Server refuses the request.                                  |
| `404 Not Found`              | Requested resource not found, or deliberately concealed.     |
| `405 Method Not Allowed`     | Method is not supported for the target resource.             |
| `409 Conflict`               | Request conflicts with the current resource state.           |
| `413 Content Too Large`      | Request content exceeds an acceptable limit.                 |
| `415 Unsupported Media Type` | Request content type is unsupported.                         |
| `422 Unprocessable Content`  | Content is understood but cannot be processed as instructed. |
| `429 Too Many Requests`      | Rate limit exceeded.                                         |

### Common 5xx codes

| Code                        | Meaning                                               |
| --------------------------- | ----------------------------------------------------- |
| `500 Internal Server Error` | Unexpected server failure.                            |
| `501 Not Implemented`       | Functionality is not implemented.                     |
| `502 Bad Gateway`           | Gateway received an invalid upstream response.        |
| `503 Service Unavailable`   | Service temporarily unavailable.                      |
| `504 Gateway Timeout`       | Gateway did not receive an upstream response in time. |

### Important distinctions

**401 vs 403**

- `401`: Authentication credentials are missing, invalid, or insufficient for authentication.
- `403`: The server refuses the request, commonly because permission is insufficient.

**404 vs 500**

- `404`: The target resource cannot be found, or the server chooses not to reveal it.
- `500`: The server encountered an unexpected condition.

**202 vs 201**

- `201`: A resource has been created.
- `202`: Processing has been accepted but might not be complete.

---

## 11. Response Status Codes Demo

Use `curl` to observe real HTTP status codes.

### Example 1: Successful response

```bash
curl -i https://httpbin.org/status/200
```

Expected status:

```http
HTTP/1.1 200 OK
```

The `-i` option includes response headers in the output.

### Example 2: Not found

```bash
curl -i https://httpbin.org/status/404
```

Expected status:

```http
HTTP/1.1 404 NOT FOUND
```

### Example 3: Redirect

```bash
curl -i https://httpbin.org/redirect/1
```

Inspect the `Location` header.

To follow redirects:

```bash
curl -i -L https://httpbin.org/redirect/1
```

### Example 4: Server error

```bash
curl -i https://httpbin.org/status/500
```

Expected status:

```http
HTTP/1.1 500 INTERNAL SERVER ERROR
```

The exact reason phrase and formatting can vary by protocol version and server. Status codes are the important part.

### Example 5: Inspect headers only

```bash
curl -I https://example.com
```

This sends a HEAD request. It is not exactly the same as sending GET and discarding the body.

### Burp Suite exercise

For each request, record:

1. Request method and path.
2. Response status.
3. Response headers.
4. Response body, if present.
5. Whether a redirect occurred.
6. What the browser or client did with the result.

---

## 12. HTTP Caching

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

---

## 13. HTTP Content Negotiation

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

---

## 14. HTTP Compression

HTTP compression reduces the number of bytes transferred over the network.

It can improve performance, particularly for text-based content such as HTML, CSS, JavaScript, and JSON.

### Compression workflow

The client advertises supported content codings:

```http
Accept-Encoding: gzip, br
```

The server chooses a suitable supported coding:

```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Encoding: gzip
Vary: Accept-Encoding
```

The response body is compressed using gzip.

The client decodes the representation before exposing the content to the application.

### Common content codings

- `gzip`: Widely supported general-purpose compression.
- `br`: Brotli compression, often useful for web assets.
- `deflate`: A defined compression coding with a specific format.

Other codings may be supported in appropriate environments.

### Content-Length and compression

If `Content-Length` is present on a response whose content is compressed, it describes the number of bytes in the transmitted content, not the decompressed representation size.

Compression and transfer framing are different concerns.

### Compression trade-offs

Benefits:

- Lower bandwidth usage.
- Faster transfers on bandwidth-constrained networks.
- Reduced transfer size for compressible content.

Costs:

- CPU usage for compression and decompression.
- Potential latency when compression is expensive.
- Limited benefit for already-compressed formats such as JPEG, WebP, and many video formats.

### Security consideration

Compression can create side-channel risks when attacker-controlled data and secrets are compressed together and the attacker can observe resulting lengths. Compression settings should be evaluated carefully for sensitive dynamic responses.

---

## 15. Persistent Connections and Keep-Alive

Establishing a connection has costs. Reusing a connection avoids repeating some connection setup work.

### Non-persistent connections

In a simplified model, the client opens a connection for a request, receives the response, and closes the connection.

Repeated connections increase overhead.

### Persistent connections

HTTP/1.1 uses persistent connections by default unless connection management indicates otherwise.

Example:

```http
GET /page HTTP/1.1
Host: example.com
```

The client can reuse the connection for additional requests when it remains available.

A simplified sequence:

```text
Client  -------- Request 1 --------> Server
Client  <------- Response 1 -------- Server
Client  -------- Request 2 --------> Server
Client  <------- Response 2 -------- Server
```

Both requests can use the same TCP connection.

### Connection: keep-alive

Older HTTP/1.0 implementations commonly used:

```http
Connection: keep-alive
```

HTTP/1.1 does not require this header to enable persistence.

### HTTP/2 and HTTP/3

- HTTP/2 multiplexes multiple streams over a connection.
- HTTP/3 multiplexes streams over QUIC.
- The HTTP/1.x `Connection` header is a connection-specific field and must not be used in HTTP/2 or HTTP/3 messages.

### Why connection reuse matters

- Fewer connection handshakes.
- Lower latency for subsequent requests.
- Less repeated connection-management overhead.
- More efficient use of network resources.

Persistent connections are not the same as application sessions. Reusing a TCP or QUIC connection does not automatically preserve a user's login state.

---

## 16. Multipart Data and Chunked Transfer

Multipart data and chunked transfer solve different problems.

- **Multipart** describes a body containing multiple parts.
- **Chunked transfer coding** frames an HTTP/1.1 message body when its total size is not known in advance.

### A. Multipart form data

`multipart/form-data` is commonly used to submit HTML forms containing files.

Example request:

```http
POST /upload HTTP/1.1
Host: example.com
Content-Type: multipart/form-data; boundary=----FormBoundary123

------FormBoundary123
Content-Disposition: form-data; name="username"

Mohammad
------FormBoundary123
Content-Disposition: form-data; name="file"; filename="notes.txt"
Content-Type: text/plain

HTTP study notes
------FormBoundary123--
```

The boundary separates individual parts.

A part may contain:

- Form field data.
- File content.
- Part-specific headers.

The exact body is not necessarily readable text; uploaded files may contain arbitrary binary bytes.

### B. Chunked transfer coding

HTTP/1.1 can use chunked transfer coding when the message content is sent in pieces without specifying its complete length in advance.

Example:

```http
HTTP/1.1 200 OK
Transfer-Encoding: chunked

5
Hello
6
 World
0
```

Explanation:

- `5`: The next chunk contains five bytes.
- `Hello`: First chunk.
- `6`: The next chunk contains six bytes.
- ` World`: Second chunk.
- `0`: Final chunk, indicating completion.

The chunk-size values are hexadecimal.

The example is simplified; real messages may include additional framing details or trailers.

### Content-Length vs chunked transfer

With a known length, HTTP/1.1 can use:

```http
Content-Length: 11
```

With chunked transfer coding, the receiver discovers the end of the content through chunk framing.

**Important:** Do not send conflicting `Content-Length` and `Transfer-Encoding` framing information. Ambiguous message framing can create serious HTTP request-smuggling vulnerabilities.

### HTTP/2 and HTTP/3 distinction

Chunked transfer coding is specific to HTTP/1.1 message framing.

HTTP/2 and HTTP/3 use their own frame structures to delimit content and must not use the HTTP/1.1 `Transfer-Encoding: chunked` mechanism.

### Multipart vs chunked transfer

| Property                | Multipart                         | Chunked transfer                           |
| ----------------------- | --------------------------------- | ------------------------------------------ |
| Purpose                 | Organize multiple body parts      | Frame an HTTP/1.1 body                     |
| Typical use             | File uploads and form submissions | Streaming a body with unknown final length |
| Boundary or chunk sizes | Multipart uses boundaries         | Chunked coding uses hexadecimal sizes      |
| Independent concepts?   | Yes                               | Yes                                        |

A multipart request can have a known `Content-Length` or be transmitted using HTTP/1.1 chunked transfer coding, where applicable.

---

## 17. SSL, TLS, and HTTPS

### What is SSL?

SSL stands for Secure Sockets Layer. It was an earlier protocol family used to secure network communication.

SSL is obsolete and should not be used in modern systems.

### What is TLS?

TLS stands for Transport Layer Security.

TLS provides:

- **Confidentiality:** Encryption helps prevent unauthorized parties from reading transmitted data.
- **Integrity:** Protects against undetected modification of protected data.
- **Authentication:** Certificates and the TLS handshake can authenticate the server and, where configured, the client.

Modern systems should use appropriately configured TLS rather than SSL.

### What is HTTPS?

HTTPS is HTTP secured by TLS.

The URL scheme is:

```text
https://example.com
```

The conventional default port is `443`.

For HTTP over TLS, the browser establishes a secure connection and then communicates using HTTP semantics over that connection.

### Simplified HTTPS workflow

1. Browser resolves the server hostname.
2. Browser establishes the required network connection.
3. Client and server perform a TLS handshake.
4. The browser validates the server's certificate and hostname.
5. The parties establish cryptographic session keys.
6. HTTP messages are transmitted over the protected connection.

HTTP/3 differs in its transport setup: QUIC integrates TLS 1.3 into its handshake and carries HTTP/3 streams over QUIC.

### TLS certificates

A server certificate helps the client verify the server's identity.

The browser checks relevant certificate properties, including:

- Whether the certificate is valid for the hostname.
- Whether the certificate chain leads to a trusted authority.
- Whether validity and other applicable checks succeed.

A valid certificate does not prove that a website is trustworthy in every sense. It helps authenticate control of the relevant domain under the certificate system.

### HTTP vs HTTPS

| Property                                | HTTP without TLS  | HTTPS                                      |
| --------------------------------------- | ----------------- | ------------------------------------------ |
| Encryption in transit                   | No                | Yes, when TLS is correctly configured      |
| Message integrity protection in transit | No TLS protection | Yes                                        |
| Server authentication through TLS       | No                | Normally yes                               |
| Typical port                            | 80                | 443                                        |
| Suitable for sensitive public traffic   | No                | Yes, with appropriate application security |

### Important security concepts

**HSTS**

The `Strict-Transport-Security` header instructs supporting browsers to use HTTPS for future requests under its scope.

**Mixed content**

An HTTPS page loading insecure HTTP resources can expose users to security risks and may cause browsers to block those resources.

**Certificate errors**

Expired certificates, hostname mismatches, or untrusted certificate chains can prevent a secure connection from being established normally.

**HTTPS does not replace application security.**

A correctly secured TLS connection does not prevent:

- SQL injection.
- Broken access control.
- Cross-site scripting.
- Insecure session handling.
- Server-side authorization mistakes.
- Malicious actions by an authenticated user.

TLS protects the connection; application security protects the application and its data.

---

# Final Revision Checklist

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

# Recommended References

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
