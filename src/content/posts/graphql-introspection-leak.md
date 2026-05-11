## Discovery

```bash
curl -X POST https://target/graphql \
  -H 'Content-Type: application/json' \
  -d '{"query":"{__schema{types{name fields{name}}}}"}' | jq
```

## What Was Exposed

A mutation: `internalImpersonateUser(userId: ID!)`. Reachable. Authorized only on `role == "support"`. The frontend hid the link, but the resolver did not check the role.

## Lesson

Disable introspection in prod. Authorize at the resolver, not the UI.
