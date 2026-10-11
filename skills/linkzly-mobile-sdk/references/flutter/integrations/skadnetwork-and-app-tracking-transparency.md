<!-- Generated from https://docs.linkzly.com/docs/sdk-integrations-setup#skadnetwork-and-app-tracking-transparency by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# SKAdNetwork and App Tracking Transparency

Source: https://docs.linkzly.com/docs/sdk-integrations-setup#skadnetwork-and-app-tracking-transparency

### What it does

On iOS, the SDK registers your app for SKAdNetwork attribution when it starts (iOS 14.5 or later), and `updateConversionValue` passes a value of 0 to 63 that your app chooses to Apple's StoreKit. This is device-side only: the SDK does not work out a value for you. App Tracking Transparency (ATT) is the permission prompt for the advertising ID; the SDK collects it only when the person allows it.

### Set up in the console

Nothing is needed for the SDK calls. The console's SKAN report (the SKAN tab of an app) shows your iOS installs beside a SKAN column. That column is marked "not configured", and the page says SKAN data is not being received for the app yet and that Linkzly never estimates it. Do not expect SKAdNetwork figures there.

### Set up in your app project

- Add the `NSUserTrackingUsageDescription` key to `Info.plist` with the text the permission prompt shows. See [Info.plist](https://docs.linkzly.com/docs/sdk-ios#infoplist).
- Call `requestTrackingPermission` at a moment that makes sense to the person, and decide your conversion values in your own code.

### SDK calls

#### Flutter

```dart
final String? status = await Linkzly.instance.requestTrackingPermission();
await Linkzly.instance.updateConversionValue(5);
```

The full API is in [iOS](https://docs.linkzly.com/docs/sdk-ios#skadnetwork-and-att), [React Native](https://docs.linkzly.com/docs/sdk-react-native#skadnetwork-and-att-ios) and [Flutter](../sdk/skadnetwork-and-att-ios-only.md).

**Platform support**

| Platform | Supported | Notes |
|---|---|---|
| iOS | Yes | Conversion values are device-side only. |
| Android | Not available | |
| React Native | iOS only | On Android, `updateConversionValue` returns `false` and `requestTrackingPermission` returns `'unsupported'`. |
| Flutter | iOS only | On Android, `updateConversionValue` returns `false` and `requestTrackingPermission` returns `'unsupported'`. |
