<!-- Generated from https://docs.linkzly.com/docs/sdk-ios#troubleshooting by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Troubleshooting

Source: https://docs.linkzly.com/docs/sdk-ios#troubleshooting

**SDK not configured.** Make sure `LinkzlySDK.configure(sdkKey:environment:)` runs before any other SDK call — ideally in `App.init()` or `application(_:didFinishLaunchingWithOptions:)`.

**Universal Links don't open the app.** Verify the AASA file is served over HTTPS without redirects at `/.well-known/apple-app-site-association`, the `appID` matches your Team ID and Bundle ID, and the Associated Domains capability lists `applinks:yourdomain.com`. Hosted Verification skips the file step.

**IDFA always nil.** Confirm `NSUserTrackingUsageDescription` is set in `Info.plist`, you called `LinkzlySDK.requestTrackingPermission`, and the user authorized tracking. If no prompt appeared, the call ran before the app was active (see [SKAdNetwork and ATT](../sdk/skadnetwork-and-att.md)). `getIDFA()` also returns `nil` after `setAdvertisingTrackingEnabled(false)`.

**`initializePush()` returns false.** This is expected before the first successful `setNotificationToken` registration, because there is no topic yet. Otherwise check that the SDK is configured, that Firebase is set up (`FirebaseApp.configure()`) before the token is registered, and that APNs entitlements are set.

**Broadcasts resume after `disablePush()`.** `disablePush()` lasts for the session only. Use `clearNotificationToken()` for a durable opt-out.

**Opens not counted.** Check that the app is built with LinkzlySDK 1.0.9 or later, that the notification was sent by Linkzly (its data carries `campaign_id` or `flow_delivery_id`), that analytics consent is not denied, and that `LinkzlyAutoTrackNotificationOpens` is not `NO`. Your notification center delegate must implement `userNotificationCenter(_:didReceive:withCompletionHandler:)`. If you configure the SDK late, call `installNotificationOpenCapture()` early.

**Gaming 401 with HMAC enabled.** The `signingSecret` in `LinkzlyGamingOptions` must match the one on your game's Settings tab exactly, and the device clock must be within 5 minutes of UTC.
