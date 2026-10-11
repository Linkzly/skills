<!-- Generated from https://docs.linkzly.com/docs/sdk-integrations-setup#deep-links by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Deep links

Source: https://docs.linkzly.com/docs/sdk-integrations-setup#deep-links

### What it does

When someone opens a Smart Link on a device that has your app, the SDK gives your app the link's path and parameters as `DeepLinkData`, so you can open the right screen. On iOS the link arrives as a Universal Link and on Android as an App Link.

### Set up in the console

1. Open Apps and choose Register App. Enter the Bundle ID and Team ID for iOS, and the Package Name and SHA-256 Fingerprints for Android. Add the fingerprints of both your debug and release certificates.
2. Under Domain & Verification Setup, choose Hosted Verification (Linkzly hosts the files iOS and Android check) or Custom Domain Verification (you download the verification files from the app's Setup Files tab, host them on your domain, and check the status on the Verification tab).
3. Save the app, open it, and copy the SDK key from the SDK Setup tab.
4. Open Deeplinks and choose Create Deeplink, with the app you registered as its target.

The fields are described on [Smart Links](https://docs.linkzly.com/docs/smart-links).

### Set up in your app project

| Platform | What to add |
|---|---|
| iOS | The Associated Domains capability with your Linkzly domain, for example `applinks:{your-prefix}.linkz.ly`. See [Associated Domains](../sdk/platform-setup.md) and [Smart Links for iOS](https://docs.linkzly.com/docs/sdk-smart-links-ios). |
| Android | An `android:autoVerify="true"` intent filter for your Linkzly domain, and `android:launchMode="singleTask"` on the activity. See [AndroidManifest.xml](https://docs.linkzly.com/docs/sdk-android#androidmanifestxml) and [Smart Links for Android](https://docs.linkzly.com/docs/sdk-smart-links-android). |
| React Native | The iOS AppDelegate forwarding, the Android `onNewIntent` forwarding, and the same domain setup as the native platforms. See [Platform Setup](https://docs.linkzly.com/docs/sdk-react-native#platform-setup). |
| Flutter | The Associated Domains entitlement on iOS, and the intent filters inside the existing launcher activity on Android (`launchMode="singleTop"`). See [Platform Setup](https://docs.linkzly.com/docs/sdk-flutter#platform-setup). |

### SDK calls

Register the handler once at launch, after `configure`, and pass each incoming link to the SDK.

#### iOS (Swift)

```swift
LinkzlySDK.onDeepLink { deepLinkData, url in
    routeSmartLink(deepLinkData)
}

// In .onOpenURL (SwiftUI) or your app delegate:
_ = LinkzlySDK.handleUniversalLink(url)
```

`routeSmartLink` is your own routing function. The full API is in [iOS](../sdk/deep-linking-and-universal-links.md), [Android](https://docs.linkzly.com/docs/sdk-android#deep-linking-and-app-links), [React Native](https://docs.linkzly.com/docs/sdk-react-native#deep-linking) and [Flutter](https://docs.linkzly.com/docs/sdk-flutter#deep-linking-and-universal-links).

**Platform support**

| Platform | Supported | Notes |
|---|---|---|
| iOS | Yes | `onUniversalLink` fires on capture, `onDeepLink` when the server returns the link data. |
| Android | Yes | `handleAppLink(intent)` returns `null` when the intent carries no URL. |
| React Native | Yes | `addDeepLinkListener` and `addUniversalLinkListener`; `handleUniversalLink` for manual handling. |
| Flutter | Yes | `deepLinkStream` and `universalLinkStream`; `handleUniversalLink` for manual handling. |
