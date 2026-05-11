## Feature

Multistage Login

## Invariant

- An application may assume that a user who accesses stage three must have cleared stages one and two
- An application may assume that the same user identity is used to complete each stage
- You cannot edit values between stages
- Access requires completion of all stages for the same identity

## Break Classes

- **Order** — access stage three directly
- **Tamper** — mutate stage transition values
- **Identity Mix** — swap identities across stages
- **Workflow Abuse** — complete different stages using different users

## Testing Strategy

1. Perform a valid login using a controlled account and record all requests with your proxy.

2. Replay the workflow with malformed sequencing:

   - Try performing steps out of order
   - Jump directly to later stages
   - Skip intermediate stages
   - Attempt unanticipated traversal paths

3. If data is submitted more than once, modify values across stages.

4. Inspect all client-transmitted state.

Example:

```http
stage2complete=true
```

Mutate transition state and determine whether progression validation is enforced server-side.

## Lessons

Authentication stage progression must remain server-authoritative and identity-bound.
