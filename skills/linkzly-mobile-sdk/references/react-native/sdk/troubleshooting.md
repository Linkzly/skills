<!-- Generated from https://docs.linkzly.com/docs/sdk-react-native#troubleshooting by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Troubleshooting

Source: https://docs.linkzly.com/docs/sdk-react-native#troubleshooting

**Deep links don't fire on warm start (iOS).** Make sure both `RCTLinkingManager` forwards are in your AppDelegate (Swift bridging header or Objective-C imports), then rebuild from Xcode after `pod install`.

**Deep links don't fire on warm start (Android).** Override `onNewIntent` in `MainActivity` to call `LinkzlyReactNativeModule.getLatestInstance()?.handleIntent(intent)`, set `android:launchMode="singleTask"`, and rebuild the Android app.

**Listener never fires.** Subscribe with `addDeepLinkListener` **before** calling `configure`, and remember to call the returned `unsubscribe` in your cleanup.

**`npm install @linkzly/react-native-sdk` fails with 404.** The package is not on npm. Install it from GitHub as shown in Installation.

**Debug controls reject with `DEBUG_ONLY`.** Expected on iOS; on Android use a debuggable build.

**`initializePush()` returns false.** No broadcast topic is stored yet (`setNotificationToken()` has not succeeded), or Firebase Messaging is not integrated or not initialized before the call.

**Opens not counted.** Check that the app is built with React Native SDK 1.0.20 or later, that the notification was sent by Linkzly (its data carries `campaign_id` or `flow_delivery_id`), that analytics consent is not denied, and that automatic capture is not turned off in the native project. For a notification your app draws itself on Android, call `trackNotificationOpen` from your tap handler, including for the tap that launches a closed app. With React Native SDK 1.0.21 or later pass what your notification library gave it, unchanged; with 1.0.20 pass a flat map holding the push's data. Then check a build with `adb logcat -s LinkzlySDK` as described under [Notification opens](../sdk/push-notifications.md).

**Gaming 401 with HMAC enabled.** The `signingSecret` must match the one on your game's Settings tab exactly, and the device clock must be within 5 minutes of UTC.
