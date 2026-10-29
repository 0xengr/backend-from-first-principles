# 7. Idempotent vs Non-Idempotent Methods

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
