<!-- Generated from https://docs.linkzly.com/docs/sdk-react-native#skadnetwork-and-att-ios by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# SKAdNetwork and ATT (iOS)

Source: https://docs.linkzly.com/docs/sdk-react-native#skadnetwork-and-att-ios

```typescript
import { Platform } from 'react-native';

if (Platform.OS === 'ios') {
    const status = await LinkzlySDK.requestTrackingPermission();
    // 'authorized' | 'denied' | 'restricted' | 'notDetermined' | 'unknown'

    const idfa = await LinkzlySDK.getIDFA();
    const attStatus = await LinkzlySDK.getATTStatus();

    await LinkzlySDK.updateConversionValue(42);  // 0-63
}
```

`NSUserTrackingUsageDescription` has to be in `Info.plist` (see [Platform Setup](../sdk/platform-setup.md)) before the first `requestTrackingPermission` call: the app crashes if the call runs without it. IDFA is only collected after the user grants ATT.

`requestTrackingPermission` hands the request to Apple's App Tracking Transparency framework, so Apple's rules decide what happens:

- **The app has to be active.** iOS shows the prompt only while the app is active. Called earlier, while the app is still starting, no prompt appears and the promise resolves at once with the current status, which is `'notDetermined'` on a new install. Call it from a screen the person has reached.
- **iOS 14.5 or later.** On an earlier iOS version the promise rejects with the code `UNSUPPORTED_IOS`.

The SDK does not wait for the answer. It reads the IDFA at the moment it sends an event, and `configure` sends the install event on the first launch. So the install event has no IDFA unless the person had already allowed tracking when `configure` ran, and the SDK does not send it again once they do. Events sent after the person allows tracking carry the IDFA.
