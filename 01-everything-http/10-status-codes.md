# 10. Response Status Codes

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
