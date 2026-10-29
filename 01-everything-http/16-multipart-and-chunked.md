# 16. Multipart Data and Chunked Transfer

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
