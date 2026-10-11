<!-- Generated from https://docs.linkzly.com/docs/sdk-ios#privacy-controls by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Privacy Controls

Source: https://docs.linkzly.com/docs/sdk-ios#privacy-controls

```swift
LinkzlySDK.setTrackingEnabled(false)
LinkzlySDK.isTrackingEnabled()

LinkzlySDK.setAdvertisingTrackingEnabled(false)  // IDFA collection only
LinkzlySDK.isAdvertisingTrackingEnabled()
```

The SDK ships a `PrivacyInfo.xcprivacy` manifest that declares the data it collects, and these switches let your app honor a user's choice. Whether your app meets GDPR, CCPA or App Store requirements depends on how you use them.

`setTrackingEnabled(false)` stops custom events, purchases and refunds. It does not stop the install, open and session-end events the SDK sends itself, and it does not stop `trackEventBatch`, so skip that call in your own code while tracking is off. The SDK sends nothing before `configure`: an app that must send nothing before the user consents delays `configure` until the user has consented, and uses `setTrackingEnabled(false)` afterwards to stop events, purchases and refunds.
