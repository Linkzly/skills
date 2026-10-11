<!-- Generated from https://docs.linkzly.com/docs/sdk-ios#tracking-events by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Tracking Events

Source: https://docs.linkzly.com/docs/sdk-ios#tracking-events

**Register the name first.** A custom event is kept only if its name is registered for the app in the console. An unregistered name is dropped, and on the default batched path the call and the flush still report success. See [Register each name in the console](../events/sending-a-custom-event.md).

```swift
// Custom event
LinkzlySDK.trackEvent("signup_completed", parameters: ["method": "email"])

// Purchase — revenue, currency, and transactionId are required.
// transactionId is the dedup key: a repeat of the same id is discarded.
LinkzlySDK.trackPurchase(parameters: [
    "revenue": 29.99,
    "currency": "USD",
    "transactionId": "order-12345",
    "productId": "premium_monthly",
    "revenueType": "subscription" // "iap" | "subscription" | "other"
]) { result in
    switch result {
    case .success(let response): print("Tracked: \(response.eventId ?? "")")
    case .failure(let error):    print("Error: \(error)")
    }
}

// Refund — reuse the ORIGINAL transactionId so it nets out
LinkzlySDK.trackRefund(parameters: [
    "revenue": 29.99, "currency": "USD", "transactionId": "order-12345"
])

// Install / open are recorded automatically (see Initialization). On a new install,
// calling trackInstall yourself sends a second install event: use onDeepLink to get
// the deferred DeepLinkData instead. The SDK already sends opens itself (when the app
// becomes active more than 30 seconds after the last session). Each explicit trackOpen call
// sends one more open event: call it only when you need the DeepLinkData it returns.
LinkzlySDK.trackInstall { result in /* Result<DeepLinkData?, Error> */ }
LinkzlySDK.trackOpen    { result in /* Result<DeepLinkData?, Error> */ }

// Batch
LinkzlySDK.trackEventBatch([
    ["eventName": "view_item",  "parameters": ["item_id": "123"]],
    ["eventName": "add_to_cart","parameters": ["item_id": "123", "quantity": 1]]
]) { success, error in /* ... */ }
```

For revenue, the full contract and the dedup rules are in [Tracking purchases](../purchases/overview.md). Purchases are recorded only when Revenue & LTV is enabled for your organisation. For event naming and parameters, see [Tracking events](../events/overview.md).

### Objective-C

`trackInstall` and `trackOpen` return a Swift `Result`, which Objective-C cannot read. Use the Objective-C variants, which take a completion with `DeepLinkData` and `NSError`:

```objc
[LinkzlySDK trackInstallObjCWithCompletion:^(DeepLinkData *data, NSError *error) {
    // data is nil when there is no deep link data or the call failed
}];

[LinkzlySDK trackOpenObjCWithCompletion:^(DeepLinkData *data, NSError *error) {
    // same shape as trackInstallObjC
}];
```

`trackEvent`, `trackEventBatch`, `setUserID` and most other calls are exposed to Objective-C directly. `trackPurchase`, `trackRefund` and `flushEvents` are Swift-only.

### Event queue

```swift
let pending = LinkzlySDK.getPendingEventCount()
LinkzlySDK.flushEvents { success, error in /* ... */ }
```
