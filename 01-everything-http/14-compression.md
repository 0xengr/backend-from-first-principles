# 14. HTTP Compression

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
