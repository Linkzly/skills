<!-- Generated from https://docs.linkzly.com/docs/sdk-integrations-setup#deferred-deep-links by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Deferred deep links

Source: https://docs.linkzly.com/docs/sdk-integrations-setup#deferred-deep-links

### What it does

A deferred deep link carries the Smart Link's destination across an install. A person taps the link without the app, goes to the store, installs, and opens the app; the SDK then gives your app the original destination.

The SDK sends the install event itself when `configure` runs on a genuinely new install. Do not call `trackInstall` as a setup step: on a new install it sends a second install event.

### Set up in the console

1. Make sure the app has the store link for each platform: in Apps, on the app's form under App Store Links, set iOS App Store URL and Google Play Store URL. Deferred delivery needs the store link for the platform.
2. Create the Smart Link under Deeplinks, as in [Deep links](../integrations/deep-links.md).

### Set up in your app project

- Everything in [Deep links](../integrations/deep-links.md).
- Android: nothing to add for the Play Install Referrer. The SDK brings the dependency it needs. Only a build installed from Google Play has a referrer, so test with an internal testing track and not with `adb install` (see [Smart Links for Android](https://docs.linkzly.com/docs/sdk-smart-links-android#step-7-deferred-deep-linking)).

### SDK calls

On iOS the deferred data arrives in the same handler as any other link, so register it right after `configure`. On Android there is no handler for the automatic install, so the deferred data reaches your code only if you call `trackInstall` yourself, once, behind your own first-launch flag. That sends a second install event for the same install, so do it only if your app needs the data in code.

#### iOS (Swift)

```swift
LinkzlySDK.configure(sdkKey: "YOUR_SDK_KEY", environment: .production)
LinkzlySDK.onDeepLink { deepLinkData, url in
    routeSmartLink(deepLinkData)
}
```

The full steps are in [Smart Links for iOS](https://docs.linkzly.com/docs/sdk-smart-links-ios#step-5-deferred-deep-linking) and [Smart Links for Android](https://docs.linkzly.com/docs/sdk-smart-links-android#step-7-deferred-deep-linking).

**Platform support**

| Platform | Supported | Notes |
|---|---|---|
| iOS | Yes | Delivered to `onDeepLink`. |
| Android | Yes | The SDK reads the Play Install Referrer. The data reaches your code only through an explicit `trackInstall`, which sends a second install event. |
| React Native | Yes | iOS through the listener; Android through `trackInstall`, as above. |
| Flutter | Yes | iOS through `deepLinkStream`; Android through `trackInstall`, as above. |
