# 11. Response Status Codes Demo

> **In one line:** `curl` shows you the actual status line a server returns, and most of the
> mistakes in reading it come from what `curl` leaves out by default.

## The mental model

A status code is the protocol's verdict on a request, and it arrives in a single line above the
headers. When something is wrong, that line is the cheapest evidence available — it tells you
whether the failure is in your request, in the thing between you and the server, or in the
server itself.

`curl` prints only the response body unless you ask for more. So the default output of a broken
endpoint looks a lot like the default output of a working one. These examples are about
surfacing the verdict line, not about memorising codes.

## In practice

`-i` includes the response headers, so the status line comes with them.

```bash
curl -i https://httpbin.org/status/200
```

```http
HTTP/1.1 200 OK
```

The same endpoint pattern produces any status you ask for, which makes it useful for testing
client behaviour:

```bash
curl -i https://httpbin.org/status/404
curl -i https://httpbin.org/status/500
```

```http
HTTP/1.1 404 NOT FOUND
HTTP/1.1 500 INTERNAL SERVER ERROR
```

A redirect shows up as a `3xx` plus a `Location` header. Read the header, not the body:

```bash
curl -i https://httpbin.org/redirect/1
```

To follow redirects instead of observing them, add `-L`. The final status and URL are then
whatever the chain ends at, not what you first asked for:

```bash
curl -i -L https://httpbin.org/redirect/1
```

To fetch headers only, send a `HEAD` request with `-I`:

```bash
curl -I https://example.com
```

`HEAD` asks for the same header fields a `GET` would produce, without the body. It is not
literally "`GET`, then throw the body away" — a server is not required to compute a body it
will not send, so header values that depend on generating the body can differ.

### Burp Suite exercise

For each request you capture, record:

1. Request method and path.
2. Response status.
3. Response headers.
4. Response body, if present.
5. Whether a redirect occurred.
6. What the browser or client did with the result.

## Going deeper

- **The reason phrase is decoration.** Only the three-digit code carries meaning. HTTP/2 and
  HTTP/3 do not transmit a reason phrase at all, and an HTTP/1.1 server may put anything it
  likes in one. Never parse it, never assert on it in a test.
- **`curl`'s exit code is not the HTTP status.** A request that completes at the transport level
  exits `0` even when the response is `500`. Check the status line (`-i`, `-w`, or `-f` to make
  `curl` fail on `4xx`/`5xx`), not the exit code.
- **`-I` is a `HEAD` request, so it can disagree with a `GET`.** RFC 9110 says a server *should*
  send the same header fields for `HEAD` as it would for `GET`, but that is a SHOULD. If you are
  probing `Content-Length` or cache headers, confirm with an actual `GET`.
- **`-L` hides the intermediate hops.** With redirects followed you no longer see the `3xx`
  responses that got you there. That is why the examples read the redirect with `-i` first and
  add `-L` second.
- **httpbin is synthetic.** These endpoints return the status you asked for, deliberately and
  with no corresponding server condition. Good for testing a client's handling of `4xx`/`5xx`;
  useless as evidence about how a real server fails.

## Traps

- Omitting `-i` and concluding the request worked because output appeared — an HTML error page
  prints exactly like a success page.
- Following redirects with `-L` and then debugging the wrong URL, because the response came
  from the end of the chain.
- Treating `curl`'s `0` exit code as "HTTP succeeded", when it only means the exchange completed.
- Asserting on `200 OK` including the reason phrase in a test, which breaks on any server that
  phrases it differently.

## Sources

- [RFC 9110 §15 — Status Codes](https://www.rfc-editor.org/rfc/rfc9110.html) — the classes, the
  registry, and the rule that clients should ignore the reason phrase.
- [RFC 9110 §9.3.2 — HEAD](https://www.rfc-editor.org/rfc/rfc9110.html) — `HEAD` is identical to
  `GET` except that the server sends no content.
- [MDN — HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)
  — a readable index of individual codes.
- [curl — man page](https://curl.se/docs/manpage.html) — `-i`, `-I`, `-L`, `-f`, and the exit
  code table.
