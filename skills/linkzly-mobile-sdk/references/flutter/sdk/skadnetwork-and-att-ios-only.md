<!-- Generated from https://docs.linkzly.com/docs/sdk-flutter#skadnetwork-and-att-ios-only by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# SKAdNetwork and ATT (iOS only)

Source: https://docs.linkzly.com/docs/sdk-flutter#skadnetwork-and-att-ios-only

These methods are iOS only. On Android they do nothing: `updateConversionValue` returns `false`, `requestTrackingPermission` returns `'unsupported'`, and `getIdfa` and `getAttStatus` return `null`.

```dart
final String? status = await Linkzly.instance.requestTrackingPermission();
// 'authorized' | 'denied' | 'restricted' | 'notDetermined'

final String? idfa = await Linkzly.instance.getIdfa();
final String? attStatus = await Linkzly.instance.getAttStatus();

await Linkzly.instance.updateConversionValue(42); // 0-63

await Linkzly.instance.setAdvertisingTrackingEnabled(false);
final bool adEnabled = await Linkzly.instance.isAdvertisingTrackingEnabled();
```

Make sure `NSUserTrackingUsageDescription` is set in `Info.plist`. IDFA is only collected after the user grants ATT.
