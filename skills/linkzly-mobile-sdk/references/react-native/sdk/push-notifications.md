<!-- Generated from https://docs.linkzly.com/docs/sdk-react-native#push-notifications by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Push Notifications

Source: https://docs.linkzly.com/docs/sdk-react-native#push-notifications

Before `configure` has run, `setNotificationToken` is ignored on both iOS and Android (nothing is stored), and the call still resolves without an error. If your app delays `configure`, for example until the user has consented, call `setNotificationToken` again after `configure` with the current token from your Firebase Messaging library; a call made after `configure` registers normally.

The SDK has two push features. Registering the device token is the whole setup; the broadcast-topic calls are recovery and opt-out controls.

```typescript
import messaging from '@react-native-firebase/messaging';
import LinkzlySDK from '@linkzly/react-native-sdk';

await LinkzlySDK.configure('slk_your_key_from_console');

// Forward the device token on startup and whenever it refreshes
const token = await messaging().getToken();
await LinkzlySDK.setNotificationToken(token);

messaging().onTokenRefresh(async (newToken) => {
    await LinkzlySDK.setNotificationToken(newToken);
});
```

(`@react-native-firebase/messaging` is one way to get the token; it is not a dependency of the Linkzly SDK.)

### Notification token

| Method | What it does |
|---|---|
| `setNotificationToken(token)` | Registers the device's Firebase Cloud Messaging (FCM) registration token in Linkzly's device registry. On iOS as well as Android, pass the FCM token from your Firebase Messaging library, never the APNs device token. Safe to call on every launch: the native SDK throttles network calls and only registers when something meaningful changed. |
| `getNotificationToken()` | Returns the stored token, or `null`. |
| `hasNotificationToken()` | Returns whether a token is stored. |
| `clearNotificationToken()` | Clears the token locally and revokes it server-side. This is the durable opt-out: use it on logout or when the user turns notifications off. |

Your app passes the token itself with `setNotificationToken`. `initializePush()` does not fetch or send a token.

### Broadcast topic (Firebase Cloud Messaging only)

A successful `setNotificationToken()` registration stores the device's broadcast topic and subscribes to it; the native SDK re-subscribes on every launch. `initializePush()` re-subscribes to that stored topic. It is a recovery call, for when you unsubscribed yourself or when registration succeeded before Firebase Messaging was ready. Most apps never call it. It returns `false` if no topic has been stored (register the token first) or Firebase Messaging is not available.

```typescript
const resubscribed = await LinkzlySDK.initializePush();
await LinkzlySDK.disablePush();
```

`disablePush()` is session-scoped, not a durable opt-out: it unsubscribes, but the stored topic and token are kept, so the next launch subscribes again. Use `clearNotificationToken()` for a permanent opt-out.

Both calls use runtime reflection, so Firebase is not a dependency of the SDK. If your app also uses another push provider for its own delivery, you do not need these calls for it. Devices registered through the SDK are reached through Firebase Cloud Messaging.
