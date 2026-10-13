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

The SDK registers and updates SKAdNetwork conversion values on the device. Your app decides the value; the SDK passes it to StoreKit.

```swift
LinkzlySDK.updateConversionValue(5)
LinkzlySDK.updateConversionValue(5) { success in /* ... */ }

if #available(iOS 16.1, *) {
    LinkzlySDK.updateConversionValue(5, coarseValue: .high)
    LinkzlySDK.updateConversionValue(5, coarseValue: .medium, lockWindow: true) { _ in }
}
```
