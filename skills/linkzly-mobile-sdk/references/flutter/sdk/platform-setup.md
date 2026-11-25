<!-- Generated from https://docs.linkzly.com/docs/sdk-flutter#platform-setup by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Platform Setup

Source: https://docs.linkzly.com/docs/sdk-flutter#platform-setup

### iOS — `Info.plist`

Add to `ios/Runner/Info.plist`:

```xml
<key>NSUserTrackingUsageDescription</key>
<string>We use your data to provide personalized content and improve your app experience.</string>

<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLName</key>
    <string>your.bundle.identifier</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>your-app-scheme</string>
    </array>
  </dict>
</array>
```

Replace the example `NSUserTrackingUsageDescription` text with your own. The permission prompt shows it to the person, so keep it short and specific; iOS adds your app's name itself.

To have Linkzly receive and report the postbacks Apple sends for your app, add the endpoint the console's SKAN tab shows to `Info.plist` as the value of both `NSAdvertisingAttributionReportEndpoint` (SKAdNetwork) and `AttributionCopyEndpoint` (AdAttributionKit), and save the app's App Store ID in the console. Do not add `SKAdNetworkItems` for this or for `updateConversionValue(...)`: that key is for apps that show other companies' ads, not for an app that is advertised. See [Integrations and Setup](../integrations/skadnetwork-and-app-tracking-transparency.md).

### iOS — Associated Domains entitlement (Universal Links)

Universal Links do not work without an Associated Domains entitlement. Create or update `ios/Runner/Runner.entitlements`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>com.apple.developer.associated-domains</key>
  <array>
    <string>applinks:your-linkzly-domain.example</string>
  </array>
</dict>
</plist>
```

Open `ios/Runner.xcworkspace` in Xcode → Runner target → **Signing & Capabilities** → confirm **Associated Domains** lists your domain, or set `CODE_SIGN_ENTITLEMENTS = Runner/Runner.entitlements;` in each build configuration. Universal Links also require a valid Apple App Site Association file for your bundle ID and team ID on that domain — Linkzly hosts this for you under Hosted Verification.

### Android — `AndroidManifest.xml`

Add Linkzly deep-link intent filters **inside the existing Flutter launcher activity** (`android/app/src/main/AndroidManifest.xml`). Do not create a separate activity. Use `launchMode="singleTop"`:

```xml
<activity
    android:name=".MainActivity"
    android:exported="true"
    android:launchMode="singleTop">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>

    <!-- Custom URL scheme -->
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="example" />
    </intent-filter>

    <!-- App Links (verified HTTPS) -->
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="https" android:host="example.linkzly.com" />
    </intent-filter>
</activity>
```

Replace `example` with your URI scheme and `example.linkzly.com` with the verified Linkzly domain configured in the console. App Links require a valid Digital Asset Links file — Linkzly hosts this for you under Hosted Verification.

### Android — Meta Install Referrer (optional)

To see which Meta ad campaign, ad set and ad an Android install came from, add your Meta app ID to `android/app/src/main/AndroidManifest.xml`, inside `<application>`, as a string resource. This is a manifest step only: there is no new call in Dart.

```xml
<meta-data
    android:name="com.linkzly.sdk.META_APP_ID"
    android:value="@string/linkzly_meta_app_id" />
```

Define `linkzly_meta_app_id` in `android/app/src/main/res/values/strings.xml`. Write it as a string resource, not a number straight in `android:value`: the SDK refuses a number. It needs a version of this package that depends on the Android SDK release with Meta Install Referrer; older versions ignore the entry. The details, what the SDK reads and how to save your decryption key in the console are in the [Android SDK guide](https://docs.linkzly.com/docs/sdk-android).
