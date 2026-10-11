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
