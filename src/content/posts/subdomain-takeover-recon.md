## The Pipeline

```bash
subfinder -d target.com -silent | \
  dnsx -silent -cname -resp | \
  grep -Ei 'github.io|herokuapp|s3.amazonaws|azurewebsites' | \
  tee candidates.txt
```

Then verify each manually — automation here causes false positives that burn report credibility.

## Why Manual Verification Wins

The difference between a duplicate and a P1 is reading the actual response.
