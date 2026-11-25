<!-- Generated from https://docs.linkzly.com/docs/sdk-flutter#troubleshooting by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Troubleshooting

Source: https://docs.linkzly.com/docs/sdk-flutter#troubleshooting

**`pod install` fails to find `LinkzlySDK`.** The native iOS SDK is not on CocoaPods Trunk. You must add the explicit `pod 'LinkzlySDK', :git => ..., :tag => ...` pin shown above to your `Podfile`.

**Universal Links don't open the app.** Verify the Associated Domains entitlement is set in `Runner.entitlements` and Signing & Capabilities, the AASA file is served over HTTPS (Linkzly hosts this for you under Hosted Verification), and the Bundle ID and Team ID match.

**App Links don't auto-verify.** The `assetlinks.json` must be served over HTTPS at `/.well-known/assetlinks.json` (Linkzly hosts this under Hosted Verification) with the correct package name and SHA-256 fingerprint. Re-verify with `adb shell pm verify-app-links --re-verify <package>`.

**Listener never fires.** Subscribe to `deepLinkStream` **before** calling `Linkzly.instance.configure(...)` so cold-start data is not missed.

**Gradle can't resolve `com.github.Linkzly:linkzly-android-sdk`.** Add JitPack to your Android repositories, either in `android/build.gradle.kts` (`maven("https://jitpack.io")`) or in `android/settings.gradle.kts` under `dependencyResolutionManagement`.

**`initializePush()` returns `false`.** No broadcast topic is stored yet (`setNotificationToken` has not completed successfully), or Firebase Messaging is not in your app.

**Notifications stop after a "disable".** `disablePush()` only lasts the session. Use `clearNotificationToken()` for a permanent opt-out.

**Opens not counted.** Check that the app is built with Flutter SDK 1.0.9 or later, that the notification was sent by Linkzly (its data carries `campaign_id` or `flow_delivery_id`), that analytics consent is not denied, and that automatic capture is not turned off in the native project. For a notification your app draws itself on Android, call `trackNotificationOpen` from your tap handler, including for the tap that launches a closed app (`getNotificationAppLaunchDetails()` with `flutter_local_notifications`). With Flutter SDK 1.0.10 or later pass the push's data as received (`response.payload`, `message.data`, or a map or JSON string holding it); with 1.0.9 pass a `Map<String, dynamic>` holding the push's data. Then check a build with `adb logcat -s LinkzlySDK` as described under [Notification opens](../sdk/push-notifications.md).
