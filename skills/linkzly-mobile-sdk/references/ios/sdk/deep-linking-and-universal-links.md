<!-- Generated from https://docs.linkzly.com/docs/sdk-ios#deep-linking-and-universal-links by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Deep Linking and Universal Links

Source: https://docs.linkzly.com/docs/sdk-ios#deep-linking-and-universal-links

The SDK provides two handler methods, used together:

**`onUniversalLink`** fires immediately when a Universal Link URL is captured (before the server roundtrip) — ideal for fast navigation in installed apps.

```swift
LinkzlySDK.onUniversalLink { url, attributionData in
    // url: the captured URL
    // attributionData: query parameters from the URL
}
```

**`onDeepLink`** fires when the server returns enriched attribution data, including the smart link ID, click ID, and deferred deep links for fresh installs.

```swift
LinkzlySDK.onDeepLink { deepLinkData, url in
    // deepLinkData.path, .smartLinkId, .clickId, .parameters
}
```

You can also observe `NotificationCenter` notifications:

| Notification | `userInfo` keys |
|---|---|
| `.linkzlyUniversalLinkReceived` | `url`, `attributionData` |
| `.linkzlyDeepLinkDataReceived` | `deepLinkData`, and `url` when present |
| `.linkzlyAffiliateAttributionCaptured` | `clickId` |
| `.linkzlyServerConfigReceived` | `headers` |

### App delegate helpers

If you use `UIApplicationDelegate` callbacks, two helpers forward the link to the SDK and return whether it was handled:

```swift
func application(_ app: UIApplication,
                 open url: URL,
                 options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
    return LinkzlySDK.application(app, open: url, options: options)
}

func application(_ application: UIApplication,
                 continue userActivity: NSUserActivity,
                 restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
    return LinkzlySDK.application(application, continue: userActivity, restorationHandler: restorationHandler)
}
```

The `continue` helper handles only web-browsing activities (Universal Links) and returns `false` for anything else. `handleUniversalLink` has two forms, one for an `NSUserActivity` and one for a `URL`.

### DeepLinkData

`DeepLinkData` carries the link and typed parameter getters:

```swift
class DeepLinkData {
    let url: String?
    let path: String?
    let smartLinkId: String?
    let clickId: String?
    let parameters: [String: Any]
    func getParameter(_ key: String) -> Any?
    func getStringParameter(_ key: String) -> String?
    func getNumberParameter(_ key: String) -> NSNumber?
    func getBoolParameter(_ key: String) -> Bool
    var allParameters: NSDictionary { get }   // Objective-C
}
```

For example, inside an `onDeepLink` handler:

```swift
LinkzlySDK.onDeepLink { deepLinkData, url in
    guard deepLinkData.path == "/product",
          let productId = deepLinkData.getStringParameter("id") else { return }
    let quantity = deepLinkData.getNumberParameter("qty")?.intValue ?? 1
    let isGift = deepLinkData.getBoolParameter("gift")
    openProduct(id: productId, quantity: quantity, isGift: isGift)
}
```
