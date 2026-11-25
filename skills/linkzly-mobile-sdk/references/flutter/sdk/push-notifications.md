<!-- Generated from https://docs.linkzly.com/docs/sdk-flutter#push-notifications by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Push Notifications

Source: https://docs.linkzly.com/docs/sdk-flutter#push-notifications

Before `configure` has run, `setNotificationToken` is ignored on both iOS and Android (nothing is stored), and the call still resolves without an error. If your app delays `configure`, for example until the user has consented, call `setNotificationToken` again after `configure` with the current token from your Firebase Messaging library; a call made after `configure` registers normally.

Two features, and they are not independent: broadcast delivery is unlocked by registering a device token, so start with the token.

| Feature | Methods | What it does |
|---|---|---|
| Device token registration | `setNotificationToken`, `getNotificationToken`, `hasNotificationToken`, `clearNotificationToken` | Registers this device's Firebase Cloud Messaging (FCM) registration token with Linkzly's device registry. On iOS as well as Android, pass the token `firebase_messaging` gives you, never the APNs device token. Devices registered through the SDK are reached through Firebase Cloud Messaging. |
| Broadcast topic subscription | `initializePush`, `disablePush` | Subscribes the device to its per-app, per-platform FCM topic for "send to All" campaigns. FCM only. |

### Notification token

Add `firebase_core` and `firebase_messaging` to your app (`flutter pub add firebase_core firebase_messaging`) and set up Firebase for it; the example below uses them to read the token. They are prerequisites of this example only: the Linkzly calls take the FCM registration token.

Capture the token from your push library (for example `firebase_messaging`) and forward it. It is safe to call on every launch: the native SDK throttles network calls and only registers again when something changed.

```dart
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';

await Firebase.initializeApp();

final String? token = await FirebaseMessaging.instance.getToken();
if (token != null) {
  await Linkzly.instance.setNotificationToken(token);
}

FirebaseMessaging.instance.onTokenRefresh.listen((String newToken) {
  Linkzly.instance.setNotificationToken(newToken);
});
```

- `setNotificationToken` registers the token and, on success, subscribes the device to its broadcast topic. Initialize Firebase first, or the subscribe is deferred to the next launch.
- `getNotificationToken` returns the stored token, or `null`.
- `hasNotificationToken` returns whether a token is stored.
- `clearNotificationToken` clears the token locally and revokes it server-side. This is the durable opt-out: call it on logout or when notifications are turned off.
- When you call `setUserId(...)`, the native SDK re-registers the stored token against the new user id.

```dart
final String? stored = await Linkzly.instance.getNotificationToken();
final bool has = await Linkzly.instance.hasNotificationToken();
await Linkzly.instance.clearNotificationToken();
```

### Broadcast topic

There is no separate broadcast setup call: a successful `setNotificationToken` already subscribes the device, and the native SDK re-subscribes on every launch.

`initializePush()` is a recovery call that re-subscribes to the topic stored by the last successful registration. Most apps never need it. It returns `false` when no registration has succeeded yet or when Firebase Messaging is not available.

`disablePush()` unsubscribes from the broadcast topic for the session only. It is not a durable opt-out: the stored topic and token are kept, so the next launch subscribes again. Use `clearNotificationToken()` for a permanent opt-out.

```dart
final bool resubscribed = await Linkzly.instance.initializePush();
await Linkzly.instance.disablePush();
```

If your app also uses another push provider for its own delivery, you do not need `initializePush` or `disablePush` for it. Devices registered through the SDK are reached through Firebase Cloud Messaging.

If broadcasts never arrive or the build cannot find these methods, your project may be resolving an older native SDK from a lockfile or cache. Refresh both:

```bash
cd ios && pod update LinkzlySDK && cd ..
cd android && ./gradlew --refresh-dependencies && cd ..
```

### Notification opens

Linkzly counts a device as having opened a push campaign when its user taps the notification. The campaign page in the Linkzly console shows the number. This needs Flutter SDK 1.0.9 or later.

**Automatic.** You write no code.

- **Android:** taps on notifications that Android shows itself from an FCM notification message (the system tray, with the app in the background or closed), including the tap that launches the app. The plugin also forwards taps that reach an already-running activity.
- **iOS:** every tap that goes through your app's `UNUserNotificationCenter` delegate, including local notifications your app schedules itself and the tap that launches the app. Your own handler still runs as before. The plugin sets this up before the app starts.

Only notifications sent by Linkzly count. Their data carries `campaign_id`, or `flow_delivery_id` for triggered pushes. Nothing is sent while analytics consent is denied (`setConsent`). A tap that arrives before `configure` is held in memory and sent after it.

**Explicit call.** On Android, call `Linkzly.instance.trackNotificationOpen(data, actionId: ...)` from your own tap handler when your app draws the notification itself, and for action buttons. That means any notification your code shows (for example with `flutter_local_notifications`), whether the app is open, in the background or closed, and any action button. You rarely need it on iOS.

Pass the push's data as your tap handler received it: a `RemoteMessage`'s `data` map, a `flutter_local_notifications` `NotificationResponse.payload` (a JSON string), or any map or JSON string that holds the data, not the `RemoteMessage` or `NotificationResponse` object itself. From Flutter SDK 1.0.10 the SDK finds the push's data in it: the map, a map one or two levels down under `data`, `userInfo`, `notification` or `payload`, or a JSON string of one. Don't pass a copy cut down to the fields your app routes on: it can lose `campaign_id`, and then nothing is counted. With Flutter SDK 1.0.9 the call takes a `Map<String, dynamic>`: decode a JSON payload into a map yourself and pass that.

In this example the app put the FCM message's data into the notification's payload as JSON when it showed the notification. Taps while the app runs arrive in `onDidReceiveNotificationResponse`; the tap that launched a closed app comes from `getNotificationAppLaunchDetails()`, read after `configure`:

```dart
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

void onNotificationTap(NotificationResponse response) {
  Linkzly.instance.trackNotificationOpen(response.payload, actionId: response.actionId);
}

// After Linkzly.instance.configure(...)
Future<void> trackLaunchTap(FlutterLocalNotificationsPlugin plugin) async {
  final NotificationAppLaunchDetails? launch = await plugin.getNotificationAppLaunchDetails();
  final NotificationResponse? response = launch?.notificationResponse;
  if ((launch?.didNotificationLaunchApp ?? false) && response != null) {
    Linkzly.instance.trackNotificationOpen(response.payload, actionId: response.actionId);
  }
}
```

Pass `onNotificationTap` as `onDidReceiveNotificationResponse` when you initialize the plugin. An action handled in `onDidReceiveBackgroundNotificationResponse` without opening the app runs in a background isolate; it is counted only if Linkzly is configured in that app process by then. Only string values are sent on. A tap that reaches the SDK twice within 5 seconds, once automatically and once through this call, is counted once, so it is safe to call on every tap. The call never throws. Called before `configure`, it does nothing, so read the tap that launched the app (`getNotificationAppLaunchDetails()`) after `configure`, and after `setConsent` if your app restores a consent choice.

**Consent at launch.** `setConsent` is stored on the device, so a choice the SDK already has applies from the start. If your app keeps its own consent choice and may not have passed a denial to the SDK yet (for example on the first launch after adding Linkzly), a tap the SDK captured automatically before `configure` is scheduled when `configure` runs and may be sent before your `setConsent` call; the SDK checks consent just before it sends. To rule that out, turn automatic capture off (below) and report every tap with `trackNotificationOpen` after `setConsent`, including `firebase_messaging`'s `onMessageOpenedApp` and `getInitialMessage()` (pass `message.data`).

To check a build on Android, use a build that configures Linkzly with the staging or development environment (the detailed notification-open lines below are logged only then; `SDK not configured - trackNotificationOpen ignored` is logged in every environment), run `adb logcat -s LinkzlySDK`, and tap a Linkzly push once with the app closed and once with it in the background. `Push open reported` means the server accepted the report; confirm the count on the campaign page in the console for that same environment. `Notification data has no campaign_id or flow_delivery_id` means the data passed to `trackNotificationOpen` was not the push's own. `Analytics consent is denied` and `Notification open already reported for this tap` explain a report that was skipped on purpose. `SDK not configured - trackNotificationOpen ignored` means the call came before `configure`. No line at all is inconclusive: the call may not have run, or it was given something that holds no data the SDK can read.

**Turning automatic capture off.** Do it in the app's native project. The explicit call still works.

- **iOS:** add the Boolean `LinkzlyAutoTrackNotificationOpens` with the value `NO` to `ios/Runner/Info.plist`.
- **Android:** add this to the `<application>` element of `android/app/src/main/AndroidManifest.xml`:

```xml
<meta-data
    android:name="com.linkzly.sdk.auto_track_notification_opens"
    android:value="false" />
```
