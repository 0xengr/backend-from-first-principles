# 8. OPTIONS Method and CORS Workflow

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
