<!-- Generated from https://docs.linkzly.com/docs/sdk-android#troubleshooting by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Troubleshooting

Source: https://docs.linkzly.com/docs/sdk-android#troubleshooting

**SDK not initializing.** Confirm `configure()` runs in `Application.onCreate()` (not an Activity), the Application class is registered in `AndroidManifest.xml`, and the SDK key is the exact `slk_` key with no whitespace. Tail `adb logcat | grep LinkzlySDK`; an invalid key format logs `Invalid SDK key format`.

**Events not tracking.** For a custom event, first check that its name is registered for the app in the console: an unregistered name is dropped and the batched path still reports success. Then check `isTrackingEnabled()`, confirm network connectivity, inspect `getPendingEventCount()`, and try a manual `flushEvents { ... }`. Custom events are batched under the default strategy, so they can wait for the next flush.

**Deep links not working.** Verify the intent filter contains `VIEW` + `DEFAULT` + `BROWSABLE`, the data scheme matches, `android:launchMode="singleTask"` is set, and `onNewIntent()` is overridden. Test with `adb shell am start -W -a android.intent.action.VIEW -d "yourapp://test" com.yourcompany.yourapp`.

**App Links not verifying.** Confirm `assetlinks.json` is served over HTTPS at the well-known path with `Content-Type: application/json` and no redirects, the SHA-256 fingerprint matches your signing certificate, and re-verify with `adb shell pm verify-app-links --re-verify <package>`.

**Install Referrer issues.** The install referrer comes from the Google Play Install Referrer API, which requires Google Play Services. Without it, the install is still tracked but without referrer data.

**Push broadcasts not arriving.** `initializePush()` does nothing until a `setNotificationToken` registration has succeeded and stored a topic. Check `hasNotificationToken()`, that Firebase Messaging and `google-services.json` are in your app, and that Google Play Services is on the device.

**Gaming 401 with HMAC enabled.** The signing secret in `GamingOptions` must match the one on your game's Settings tab exactly, and the device clock must be within 5 minutes of UTC.

**Gradle cannot find the SDK.** Check that the JitPack repository is declared in `settings.gradle(.kts)`, the dependency is `com.github.Linkzly:linkzly-android-sdk:1.0.9`, and try `./gradlew --refresh-dependencies`.
