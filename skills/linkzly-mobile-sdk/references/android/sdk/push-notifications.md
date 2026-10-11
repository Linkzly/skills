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
