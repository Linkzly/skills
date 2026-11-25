<!-- Generated from https://docs.linkzly.com/docs/sdk-android#push-notifications by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Push Notifications

Source: https://docs.linkzly.com/docs/sdk-android#push-notifications

The SDK has two independent push features:

| Feature | Methods | Use it when |
|---|---|---|
| Device token registration | `setNotificationToken`, `getNotificationToken`, `hasNotificationToken`, `clearNotificationToken` | You want Linkzly to target individual devices or users. Works with the FCM token your app already receives. |
| Broadcast topic subscription | `initializePush`, `disablePush` | You want broadcast-to-everyone campaigns. FCM only. |

Both require Firebase Cloud Messaging integrated in your app (`com.google.firebase:firebase-messaging`) and a valid `google-services.json` in your app module. The SDK itself has no Firebase dependency.

### Notification token

`setNotificationToken(token)` records the device's FCM token in Linkzly's device registry. **Your app passes the token**; the SDK never reads it from Firebase. Call it whenever Firebase gives you a token:

```kotlin
class MyFirebaseMessagingService : FirebaseMessagingService() {
    override fun onNewToken(token: String) {
        LinkzlySDK.setNotificationToken(token)
    }
}
```

You can also pass the current token at startup:

```kotlin
FirebaseMessaging.getInstance().token.addOnSuccessListener { token ->
    LinkzlySDK.setNotificationToken(token)
}
```

How it behaves:

- The SDK saves the token and registers it with the device registry. It only calls the network again when the token, the user, or the app version changes, or after 7 days, so calling it on every launch is safe. If the server does not acknowledge a registration, the token is kept and registration is retried on the next trigger or app launch.
- An empty token is ignored. If the SDK is not configured, the call is ignored and a warning is logged.
- `setUserID(...)` re-registers the stored token against the new user id, so campaigns can target that user.
- `getNotificationToken()` returns the stored token or `null`, and `hasNotificationToken()` tells you whether one is stored.
- `clearNotificationToken()` removes the token locally, revokes it on the server and unsubscribes the broadcast topic. It is the durable opt-out: call it on logout or when the user turns notifications off.

```kotlin
val token: String? = LinkzlySDK.getNotificationToken()
val has: Boolean = LinkzlySDK.hasNotificationToken()
LinkzlySDK.clearNotificationToken()   // logout or notifications turned off
```

### Broadcast topic

`initializePush()` subscribes the device to the Linkzly broadcast FCM topic. The topic name comes from the server when a `setNotificationToken` registration succeeds, so `initializePush()` does nothing until that has happened. After a registration succeeds the SDK subscribes to the topic by itself; `initializePush()` is the explicit re-subscribe call, and most apps do not need it.

```kotlin
val subscribed: Boolean = LinkzlySDK.initializePush()   // subscribe
LinkzlySDK.disablePush()                                 // unsubscribe
```

`initializePush()` returns `false` when no topic is stored yet or Firebase Messaging is not in your app. It uses runtime reflection, so it fails safely. `disablePush()` unsubscribes from the topic until the next registration or `initializePush()` call; use `clearNotificationToken()` for a durable opt-out.

If you use Huawei Push Kit or another non-FCM provider, these methods do not apply. Pass attribution data through custom events instead.

### Notification opens

Linkzly counts a device as having opened a push campaign when its user taps the notification. The campaign page in the Linkzly console shows the number. This needs Android SDK 1.0.11 or later.

**Automatic.** You write no code. The SDK counts taps on notifications that Android shows itself from an FCM notification message (the system tray, with the app in the background or closed), including the tap that launches the app.

- Only notifications sent by Linkzly count. Their data carries `campaign_id`, or `flow_delivery_id` for triggered pushes.
- Nothing is sent while analytics consent is denied (`setConsent`).
- A tap that arrives before `configure` is held in memory and sent after it.

If a tap can bring a running `singleTop` or `singleTask` activity to the front, Android hands the tap to `onNewIntent`, which the SDK cannot see by itself. Pass it on from there:

```kotlin
override fun onNewIntent(intent: Intent) {
    super.onNewIntent(intent)
    LinkzlySDK.handleNotificationIntent(intent)
}
```

**Explicit call.** Call `trackNotificationOpen` from your own tap handling when your app draws the notification itself, and for action buttons. That means any notification your code shows (from your `FirebaseMessagingService`, with `NotificationCompat`, Notifee or a similar library), whether the app is open, in the background or closed, and any action button. Pass the push's data as it arrived and, for a button, its id. A copy cut down to the fields your app routes on can lose `campaign_id`, and then nothing is counted:

```kotlin
// Tap on the notification itself
LinkzlySDK.trackNotificationOpen(remoteMessage.data)

// Tap on an action button
LinkzlySDK.trackNotificationOpen(remoteMessage.data, actionId = "accept")

// Or from the tap's Intent, when your code put the data on it as top-level String extras
LinkzlySDK.trackNotificationOpen(intent)
```

The signatures are `trackNotificationOpen(data: Map<String, Any?>?, actionId: String? = null)` and `trackNotificationOpen(intent: Intent?, actionId: String? = null)`. Only String values are read. The Intent overload reads only top-level extras; when your tap Intent nests the data in a bundle, pass that data as a map instead. A tap that reaches the SDK twice within 5 seconds, once automatically and once through this call, is counted once, so it is safe to call on every tap. Called before `configure`, the call does nothing.

To check a build, use a build that configures Linkzly with the staging or development environment (the detailed notification-open lines below are logged only then; `SDK not configured - trackNotificationOpen ignored` is logged in every environment), run `adb logcat -s LinkzlySDK`, and tap a Linkzly push once with the app closed and once with it in the background. `Push open reported` means the server accepted the report; confirm the count on the campaign page in the console for that same environment. `Notification data has no campaign_id or flow_delivery_id` means the data passed to `trackNotificationOpen` was not the push's own. `Analytics consent is denied` and `Notification open already reported for this tap` explain a report that was skipped on purpose. `SDK not configured - trackNotificationOpen ignored` means the call came before `configure`. No line at all is inconclusive: the call may not have run, or it was given something that holds no data the SDK can read.

**Turning automatic capture off.** Add this to the `<application>` element of your `AndroidManifest.xml`. The explicit call still works.

```xml
<meta-data
    android:name="com.linkzly.sdk.auto_track_notification_opens"
    android:value="false" />
```
