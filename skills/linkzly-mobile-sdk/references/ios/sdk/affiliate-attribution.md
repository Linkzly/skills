<!-- Generated from https://docs.linkzly.com/docs/sdk-ios#affiliate-attribution by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Affiliate Attribution

Source: https://docs.linkzly.com/docs/sdk-ios#affiliate-attribution

Capture an affiliate click from any incoming Universal Link, then read it back at checkout for S2S postbacks:

```swift
LinkzlySDK.onUniversalLink { url, _ in
    LinkzlySDK.captureAffiliateAttribution(from: url)
}
```

Or in UIKit:

```swift
func application(_ application: UIApplication,
                 continue userActivity: NSUserActivity,
                 restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
    if let url = userActivity.webpageURL {
        LinkzlySDK.captureAffiliateAttribution(from: url)
    }
    return LinkzlySDK.handleUniversalLink(userActivity)
}
```

At conversion time:

```swift
if let clickId = LinkzlySDK.getAffiliateClickId() {
    sendToServer(clickId: clickId, orderId: orderId, amount: amount)
}

// Always returns a value; check hasAttribution before using it
let attribution = LinkzlySDK.getAffiliateAttribution()
if attribution.hasAttribution {
    // attribution.clickId, .programId, .affiliateId, .timestamp, .source
}

LinkzlySDK.hasAffiliateAttribution()
LinkzlySDK.clearAffiliateAttribution()
```

Attribution is stored in the Keychain (with UserDefaults fallback), expires automatically after **30 days**, and is overwritten by newer affiliate clicks.
