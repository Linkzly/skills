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
