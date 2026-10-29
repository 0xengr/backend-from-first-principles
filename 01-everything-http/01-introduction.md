# 1. HTTP Introduction

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
