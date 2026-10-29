# 15. Persistent Connections and Keep-Alive

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
