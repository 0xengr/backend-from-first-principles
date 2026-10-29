# 3. HTTP Messages

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
