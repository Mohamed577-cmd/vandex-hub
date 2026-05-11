## Why

Recon outputs grow faster than you can read them. `vandex-gf` curates pattern packs for the bugs that actually pay.

```bash
cat all_urls.txt | vandex-gf ssrf,idor,redirect | tee triage.txt
```

## Pattern Packs

- `ssrf` — internal hostnames, metadata endpoints, URL parameters
- `idor` — sequential IDs, UUIDs in unusual positions
- `redirect` — open redirect parameter conventions
- `auth` — token endpoints, session cookies in URL

## Roadmap

Moving from pure pattern matching to behaviour-aware classification.
