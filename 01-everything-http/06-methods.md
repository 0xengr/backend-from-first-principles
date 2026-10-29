# 6. HTTP Methods

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
