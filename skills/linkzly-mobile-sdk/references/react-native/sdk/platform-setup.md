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

The key goes in `ios/YourApp/Info.plist`:

```xml
<key>NSUserTrackingUsageDescription</key>
<string>We use your data to provide personalized content and improve your app experience.</string>
```

Replace the example text with your own. The permission prompt shows it to the person, so keep it short and specific; iOS adds your app's name itself.

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

### Expo — generated native folders (prebuild)

In an Expo app that uses prebuild, `ios/` and `android/` are generated from the app config (`app.json` or `app.config.*`) and its config plugins, and `expo prebuild --clean` deletes them and writes them again. You can tell from the project: it depends on `expo`, and `ios/` and `android/` are missing or listed in `.gitignore`, or its scripts run `expo prebuild`.

In such an app nothing written by hand in `ios/` or `android/` lasts, so every native step on this page goes into the app config or a config plugin instead. An Expo app that keeps `ios/` and `android/` in Git and does not run prebuild is set up like any other React Native app.

| Step | Where it goes |
|---|---|
| The `LinkzlySDK` pod line for `ios/Podfile` (see [Installation](../sdk/installation.md)) | A config plugin, with `withPodfile` |
| AppDelegate forwarding | A config plugin, with `withAppDelegate` |
| `MainActivity` `onNewIntent` | A config plugin, with `withMainActivity` |
| `Info.plist` keys, such as `NSUserTrackingUsageDescription` | `ios.infoPlist` in the app config |
| Associated Domains entitlement | `ios.associatedDomains` in the app config |
| Custom URL scheme | `scheme` in the app config |
| App Links intent filter | `android.intentFilters` in the app config, with `autoVerify: true` |
| `android:launchMode="singleTask"` | Nothing to add: the Expo template already sets it |
| The Android dependency | Nothing to add, as in [Installation](../sdk/installation.md) |

This plugin does the first three rows. Save it as `plugins/with-linkzly.cjs` and add `"./plugins/with-linkzly.cjs"` to `plugins` in the app config:

```js
const { withAppDelegate, withMainActivity, withPodfile } = require('expo/config-plugins');

const POD = "  pod 'LinkzlySDK', :git => 'https://github.com/Linkzly/linkzly-ios-sdk.git', :tag => '1.0.7'";

const ON_NEW_INTENT = `  override fun onNewIntent(intent: android.content.Intent) {
    super.onNewIntent(intent)
    setIntent(intent)
    com.linkzly.reactnative.LinkzlyReactNativeModule.getLatestInstance()?.handleIntent(intent)
  }`;

// Adds `added` above or below the first line that contains `anchor`, once.
// Stops the prebuild when the line is missing, so a new Expo template cannot drop the change unnoticed.
function insert(source, anchor, added, where = 'below') {
  if (source.includes(added)) return source;
  const lines = source.split('\n');
  const at = lines.findIndex((line) => line.includes(anchor));
  if (at === -1) throw new Error(`with-linkzly: no line contains "${anchor}"`);
  lines.splice(where === 'above' ? at : at + 1, 0, added);
  return lines.join('\n');
}

module.exports = function withLinkzly(config) {
  config = withPodfile(config, (mod) => {
    mod.modResults.contents = insert(mod.modResults.contents, 'use_expo_modules!', POD);
    return mod;
  });
  config = withAppDelegate(config, (mod) => {
    let source = mod.modResults.contents;
    source = insert(source, 'import React', 'import Linkzly');
    source = insert(source, 'return super.application(app, open: url', '    _ = LinkzlySDK.handleUniversalLink(url)', 'above');
    source = insert(source, 'return super.application(application, continue: userActivity', '    _ = LinkzlySDK.handleUniversalLink(userActivity)', 'above');
    mod.modResults.contents = source;
    return mod;
  });
  return withMainActivity(config, (mod) => {
    mod.modResults.contents = insert(mod.modResults.contents, 'class MainActivity : ReactActivity() {', ON_NEW_INTENT);
    return mod;
  });
};
```

The plugin is written for the files the Expo SDK 57 template generates. Another Expo version can generate different files. The plugin then stops the prebuild with an error that names the line it could not find, and the anchors in it need updating for that template.

To check the setup, run prebuild the way the project does: use its own script if it has one, with the same environment variables as the build, because an app config can read them. Then look at the generated files. `ios/Podfile` has the `LinkzlySDK` line, `AppDelegate.swift` has the two `handleUniversalLink` lines, `MainActivity.kt` has `onNewIntent`, and `Info.plist` and the entitlements file have what you put in the app config.

The SDK is a native module, so the app needs a development build. It does not run in Expo Go.
