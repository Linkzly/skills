<!-- Generated from https://docs.linkzly.com/docs/sdk-android#privacy-controls by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Privacy Controls

Source: https://docs.linkzly.com/docs/sdk-android#privacy-controls

```kotlin
LinkzlySDK.setTrackingEnabled(false)
LinkzlySDK.isTrackingEnabled()

LinkzlySDK.setAdvertisingTrackingEnabled(false)  // disables GAID collection only
LinkzlySDK.isAdvertisingTrackingEnabled()
```

Opt-out example:

```kotlin
fun handleOptOut() {
    LinkzlySDK.setTrackingEnabled(false)
    LinkzlySDK.setAdvertisingTrackingEnabled(false)
    LinkzlySDK.setUserID("")
    LinkzlySDK.resetVisitorID()
    LinkzlySDK.clearAffiliateAttribution()
}
```

`setTrackingEnabled(false)` stops custom events, purchases, refunds and `trackEventBatch`. It does not stop the install, open and session-end events the SDK sends itself. It has no effect before `configure`, because the setting is stored through the configured SDK instance. The SDK sends nothing before `configure`: an app that must send nothing before the user consents delays `configure` until the user has consented, and uses `setTrackingEnabled(false)` afterwards to stop events, purchases and refunds.

No personal data is attached to events unless you set it, for example with `setUserID()`. Each event carries device details (model, manufacturer, Android version and API level, app version and package name, screen size, locale, time zone, carrier name and the Android ID); the Google advertising ID is added when advertising tracking is enabled.
