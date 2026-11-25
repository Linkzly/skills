<!-- Generated from https://docs.linkzly.com/docs/sdk-ios#skadnetwork-and-att by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# SKAdNetwork and ATT

Source: https://docs.linkzly.com/docs/sdk-ios#skadnetwork-and-att

### Request tracking permission (iOS 14.5+)

```swift
import AppTrackingTransparency

LinkzlySDK.requestTrackingPermission { result in
    if case .success(let status) = result {
        // .authorized | .denied | .restricted | .notDetermined
    }
}

if let idfa = LinkzlySDK.getIDFA() { /* ... */ }
if let attStatus = LinkzlySDK.getATTStatus() { /* "authorized" | ... */ }
```

From Objective-C use `requestTrackingPermissionObjC`, which returns the status as a string (`"authorized"`, `"denied"`, `"restricted"`, `"notDetermined"` or `"unknown"`):

```objc
[LinkzlySDK requestTrackingPermissionObjCWithCompletion:^(NSString *status, NSError *error) {
    // status is nil when error is set
}];
```

IDFA is only collected when ATT status is authorized. IDFV is always available. Both identifiers are collected fresh on every event so consent changes are respected immediately.

`requestTrackingPermission` hands the request to Apple's App Tracking Transparency framework and adds nothing of its own, so Apple's rules decide what happens:

- **iOS 14.5 or later.** The method is marked available from iOS 14.5. An app with a lower deployment target has to put the call inside `if #available(iOS 14.5, *)`, or it does not compile.
- **The `Info.plist` key comes first.** The app crashes if the call runs without `NSUserTrackingUsageDescription` (see [Info.plist](../sdk/platform-setup.md)).
- **The app has to be active.** iOS shows the prompt only while the app is active. Called earlier, for example from `application(_:didFinishLaunchingWithOptions:)`, no prompt appears and the completion runs at once with the current status, which is `.notDetermined` on a new install. Call it from a screen the person has reached, or when `UIApplication.didBecomeActiveNotification` arrives, which UIKit posts whether or not the app uses scenes.

The SDK does not wait for the answer. It reads the IDFA at the moment it sends an event, and `configure` sends the install event on the first launch. So the install event has no IDFA unless the person had already allowed tracking when `configure` ran, and the SDK does not send it again once they do. Events sent after the person allows tracking carry the IDFA. An app that calls `configure` only after the answer gets the IDFA on the install event when the person allows tracking, but until `configure` runs the SDK sends nothing and `handleUniversalLink` returns `false`, so a link that opens the app in that time is not handled.

### Conversion values

The SDK sets conversion values on the device in one of two ways. Use one of them for an app, not both: two writers make the value hard to predict.

**By your own code.** Your app decides the value; the SDK passes it to StoreKit.

```swift
LinkzlySDK.updateConversionValue(5)
LinkzlySDK.updateConversionValue(5) { success in /* ... */ }

if #available(iOS 16.1, *) {
    LinkzlySDK.updateConversionValue(5, coarseValue: .high)
    LinkzlySDK.updateConversionValue(5, coarseValue: .medium, lockWindow: true) { _ in }
}
```

**From a schema saved in the console.** Save a conversion value schema for the app on its SKAN tab. The SDK reads it from Linkzly about once a day (with the SDK key and nothing about the person), keeps a short list of the app's own events on the device (`install`, `open`, `purchase` and custom events; never a refund; at most the first 100, and none after day 35), works out the value and sets it. No call is needed in your code. With no saved schema, or a schema with no rules, the SDK sets nothing and `updateConversionValue` behaves as above.

- Within each conversion window (days 0 to 2, 3 to 7 and 8 to 35 after install) the SDK picks the matching rule with the highest fine value, and sends a value again only if it is higher than the one already sent in that window, or if it newly locks the window.
- It calls SKAdNetwork's `updatePostbackConversionValue` on iOS 16.1 and later (with the coarse value and the lock), and AdAttributionKit's `Postback.updateConversionValue` on iOS 17.4 and later. On an older iOS the fine value alone goes to SKAdNetwork where the system allows it. The AdAttributionKit framework is linked weakly, so an app still starts on an older iOS.
- Events are recorded after the same consent checks as every other event. While analytics consent is denied the SDK sets no automatic value and clears the list it kept. While tracking is switched off it sets no automatic value; the list of events it keeps stays on the device and counts again once tracking is back on.
- Everything stays on the device: the event list, the revenue and the decision are not sent anywhere. A schema that does not pass the SDK's checks, or a failed request, leaves the previous schema in place, and the SDK asks again after a day.

Apple sends each postback after its conversion window closes, so a value set late in a window shows up in a postback a day or more later. A window in which the app records no event sends nothing for that window.

### Receiving the postbacks in Linkzly

Apple also sends the developer of an advertised app a copy of each winning postback. To have Linkzly receive and report them, add the endpoint the console's SKAN tab shows to `Info.plist`, as a string with the same value for both keys, and save the app's App Store ID in the console (see [Integrations and Setup](../integrations/skadnetwork-and-app-tracking-transparency.md)):

```xml
<key>NSAdvertisingAttributionReportEndpoint</key>
<string>https://postbacks.example.com</string>
<key>AttributionCopyEndpoint</key>
<string>https://postbacks.example.com</string>
```

`NSAdvertisingAttributionReportEndpoint` is for SKAdNetwork and `AttributionCopyEndpoint` for AdAttributionKit; use the address the console shows, not the example. Do not add `SKAdNetworkItems` for this: that key is for apps that show ads.
