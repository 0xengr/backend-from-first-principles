# 17. SSL, TLS, and HTTPS

### What is SSL?

SSL stands for Secure Sockets Layer. It was an earlier protocol family used to secure network communication.

SSL is obsolete and should not be used in modern systems.

### What is TLS?

TLS stands for Transport Layer Security.

TLS provides:

- **Confidentiality:** Encryption helps prevent unauthorized parties from reading transmitted data.
- **Integrity:** Protects against undetected modification of protected data.
- **Authentication:** Certificates and the TLS handshake can authenticate the server and, where configured, the client.

Modern systems should use appropriately configured TLS rather than SSL.

### What is HTTPS?

HTTPS is HTTP secured by TLS.

The URL scheme is:

```text
https://example.com
```

The conventional default port is `443`.

For HTTP over TLS, the browser establishes a secure connection and then communicates using HTTP semantics over that connection.

### Simplified HTTPS workflow

1. Browser resolves the server hostname.
2. Browser establishes the required network connection.
3. Client and server perform a TLS handshake.
4. The browser validates the server's certificate and hostname.
5. The parties establish cryptographic session keys.
6. HTTP messages are transmitted over the protected connection.

HTTP/3 differs in its transport setup: QUIC integrates TLS 1.3 into its handshake and carries HTTP/3 streams over QUIC.

### TLS certificates

A server certificate helps the client verify the server's identity.

The browser checks relevant certificate properties, including:

- Whether the certificate is valid for the hostname.
- Whether the certificate chain leads to a trusted authority.
- Whether validity and other applicable checks succeed.

A valid certificate does not prove that a website is trustworthy in every sense. It helps authenticate control of the relevant domain under the certificate system.

### HTTP vs HTTPS

| Property                                | HTTP without TLS  | HTTPS                                      |
| --------------------------------------- | ----------------- | ------------------------------------------ |
| Encryption in transit                   | No                | Yes, when TLS is correctly configured      |
| Message integrity protection in transit | No TLS protection | Yes                                        |
| Server authentication through TLS       | No                | Normally yes                               |
| Typical port                            | 80                | 443                                        |
| Suitable for sensitive public traffic   | No                | Yes, with appropriate application security |

### Important security concepts

**HSTS**

The `Strict-Transport-Security` header instructs supporting browsers to use HTTPS for future requests under its scope.

**Mixed content**

An HTTPS page loading insecure HTTP resources can expose users to security risks and may cause browsers to block those resources.

**Certificate errors**

Expired certificates, hostname mismatches, or untrusted certificate chains can prevent a secure connection from being established normally.

**HTTPS does not replace application security.**

A correctly secured TLS connection does not prevent:

- SQL injection.
- Broken access control.
- Cross-site scripting.
- Insecure session handling.
- Server-side authorization mistakes.
- Malicious actions by an authenticated user.

TLS protects the connection; application security protects the application and its data.
