## The Smallest Useful Extension

Drop into Burp's Extender. Highlights any response missing `Content-Security-Policy`.

```java
public void initialize(MontoyaApi api) {
    api.http().registerHttpHandler(new HttpHandler() {
        @Override
        public ResponseReceivedAction handleHttpResponseReceived(HttpResponseReceived r) {
            if (r.headerValue("Content-Security-Policy") == null) {
                r.annotations().setHighlightColor(HighlightColor.RED);
            }
            return ResponseReceivedAction.continueWith(r);
        }
    });
}
```
