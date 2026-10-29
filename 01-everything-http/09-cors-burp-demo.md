# 9. CORS Demo with Burp Suite

**Objective:** Observe the browser's preflight request and actual cross-origin request.

### Prerequisites

- Burp Suite installed.
- A browser configured to route traffic through Burp.
- A local or test web application with two different origins.
- Permission to test the target application.

For a safe local lab, use:

- Frontend: `http://localhost:3000`
- API: `http://localhost:4000`

Different ports mean different origins.

### Step 1: Configure Burp Suite

1. Start Burp Suite.
2. Open a temporary browser from Burp, or configure your test browser to use Burp's proxy.
3. Open the HTTP history.
4. Visit your frontend application.

For HTTPS testing, use Burp's documented certificate setup in a dedicated test browser. Do not install an interception CA into a trusted everyday browsing environment unnecessarily.

### Step 2: Trigger a preflight

From the frontend, execute:

```javascript
fetch("http://localhost:4000/api/orders", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Lab-Header": "demo",
  },
  body: JSON.stringify({
    productId: 15,
  }),
});
```

Because this request uses `application/json` and a custom header, the browser normally preflights it.

### Step 3: Inspect the OPTIONS request

In Burp's HTTP history, find a request resembling:

```http
OPTIONS /api/orders HTTP/1.1
Host: localhost:4000
Origin: http://localhost:3000
Access-Control-Request-Method: POST
Access-Control-Request-Headers: content-type,x-lab-header
```

The browser is asking whether it may send the intended cross-origin request.

### Step 4: Inspect the response

A suitable lab response might contain:

```http
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, X-Lab-Header
Vary: Origin
```

If the browser accepts this response, it can send the actual POST request.

### Step 5: Inspect the POST request

Look for the subsequent request:

```http
POST /api/orders HTTP/1.1
Host: localhost:4000
Origin: http://localhost:3000
Content-Type: application/json
X-Lab-Header: demo

{"productId":15}
```

Inspect the actual response as well. It must satisfy the relevant CORS checks for JavaScript to access the response.

### Step 6: Test a failure

Change the allowed origin on your test server to:

```http
Access-Control-Allow-Origin: http://wrong-origin.example
```

Repeat the request.

Observe whether the browser blocks the intended operation at preflight or refuses to expose the actual response.

### Key observations

- Burp can display HTTP requests and responses, including preflight traffic.
- CORS enforcement is performed by the browser, not by Burp.
- A request appearing in Burp does not prove that frontend JavaScript can read its response.
- Non-browser clients such as `curl` do not enforce browser CORS rules.
- CORS does not prevent every cross-origin request from reaching the server.
