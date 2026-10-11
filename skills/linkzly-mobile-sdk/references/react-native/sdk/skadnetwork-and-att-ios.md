<!-- Generated from https://docs.linkzly.com/docs/sdk-react-native#skadnetwork-and-att-ios by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# SKAdNetwork and ATT (iOS)

Source: https://docs.linkzly.com/docs/sdk-react-native#skadnetwork-and-att-ios

```typescript
import { Platform } from 'react-native';

if (Platform.OS === 'ios') {
    const status = await LinkzlySDK.requestTrackingPermission();
    // 'authorized' | 'denied' | 'restricted' | 'notDetermined'

    const idfa = await LinkzlySDK.getIDFA();
    const attStatus = await LinkzlySDK.getATTStatus();

    await LinkzlySDK.updateConversionValue(42);  // 0-63
}
```

Set `NSUserTrackingUsageDescription` in `Info.plist`. IDFA is only collected after the user grants ATT.
