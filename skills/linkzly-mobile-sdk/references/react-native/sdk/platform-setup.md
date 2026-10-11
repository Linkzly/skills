<!-- Generated from https://docs.linkzly.com/docs/sdk-react-native#platform-setup by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Platform Setup

Source: https://docs.linkzly.com/docs/sdk-react-native#platform-setup

### iOS — AppDelegate forwarding (required for warm-start deep links)

For deep links to work when the app is in the background, you must forward incoming URLs to **both** `RCTLinkingManager` and `LinkzlySDK`.

**Bridging header** (`ios/YourApp-Bridging-Header.h`):

```objc
#import <React/RCTLinkingManager.h>
```

**Swift AppDelegate** (`ios/YourApp/AppDelegate.swift`):

```swift
import Linkzly

override func application(_ app: UIApplication, open url: URL,
                          options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    let handledByRN = RCTLinkingManager.application(app, open: url, options: options)
    _ = LinkzlySDK.handleUniversalLink(url)
    return handledByRN
}

override func application(_ application: UIApplication,
                          continue userActivity: NSUserActivity,
                          restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
    let handledByRN = RCTLinkingManager.application(application,
                                                    continue: userActivity,
                                                    restorationHandler: restorationHandler)
    _ = LinkzlySDK.handleUniversalLink(userActivity)
    return handledByRN
}
```

Do not write `import React_RCTLinkingManager` — the module name varies between RN versions. Use the bridging header.

For Objective-C AppDelegates, import `<React/RCTLinkingManager.h>` and `<Linkzly/Linkzly-Swift.h>` and implement the equivalent `openURL:` and `continueUserActivity:` methods.

You also need an Associated Domains entitlement (`applinks:{prefix}.linkz.ly`) and an `NSUserTrackingUsageDescription` key in `Info.plist`. See the [iOS SDK guide](https://docs.linkzly.com/docs/sdk-ios) for details.

### Android — MainActivity `onNewIntent` (required for warm-start deep links)

React Native's `Linking.addEventListener` is unreliable on Android for warm starts. Override `onNewIntent` to route through the native module instead:

```kotlin
import android.content.Intent
import com.linkzly.reactnative.LinkzlyReactNativeModule

class MainActivity : ReactActivity() {
    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        setIntent(intent)
        LinkzlyReactNativeModule.getLatestInstance()?.handleIntent(intent)
    }
}
```

Add the intent filters (custom URL scheme + App Links with `android:autoVerify="true"`) and `android:launchMode="singleTask"` to `MainActivity` in `AndroidManifest.xml`. See the [Android SDK guide](https://docs.linkzly.com/docs/sdk-android) for the exact manifest snippet.
