<!-- Generated from https://docs.linkzly.com/docs/sdk-android#affiliate-attribution by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Affiliate Attribution

Source: https://docs.linkzly.com/docs/sdk-android#affiliate-attribution

Capture an affiliate click from any incoming deep link, then read it back at checkout for server-to-server (S2S) reporting:

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    LinkzlySDK.captureAffiliateAttribution(intent.data)
}

override fun onNewIntent(intent: Intent) {
    super.onNewIntent(intent)
    LinkzlySDK.captureAffiliateAttribution(intent.data)
}
```

`captureAffiliateAttribution(uri)` returns `true` when affiliate data was found in the URI and stored.

At conversion time:

```kotlin
if (LinkzlySDK.hasAffiliateAttribution()) {
    val attribution: AffiliateAttribution = LinkzlySDK.getAffiliateAttribution()
    // attribution.clickId, programId, affiliateId, timestamp, hasAttribution, source
    val clickId = LinkzlySDK.getAffiliateClickId()
    yourApi.reportConversion(clickId, orderId, revenue = 29.99)
}

LinkzlySDK.clearAffiliateAttribution()
```

`attribution.source` is `DEEP_LINK`, `STORED` or `NONE`. Attribution is stored in encrypted SharedPreferences, expires automatically after **30 days**, and is overwritten by newer affiliate clicks.
