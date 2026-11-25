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

### Notification opens

Linkzly counts a device as having opened a push campaign when its user taps the notification. The campaign page in the Linkzly console shows the number. This needs React Native SDK 1.0.20 or later.

**Automatic.** You write no code.

- **Android:** taps on notifications that Android shows itself from an FCM notification message (the system tray, with the app in the background or closed), including the tap that launches the app. The SDK also forwards taps that reach an already-running activity.
- **iOS:** every tap that goes through your app's `UNUserNotificationCenter` delegate, including local notifications your app schedules itself and the tap that launches the app. Your own handler still runs as before. The SDK sets this up before the app starts.

Only notifications sent by Linkzly count. Their data carries `campaign_id`, or `flow_delivery_id` for triggered pushes. Nothing is sent while analytics consent is denied (`setConsent`). A tap that arrives before `configure` is held in memory and sent after it.

**Explicit call.** On Android, call `trackNotificationOpen(notification, actionId?)` from your own tap handler when your app draws the notification itself, and for action buttons. That means any notification your code shows (react-native-push-notification, Notifee, or your own native `FirebaseMessagingService`), whether the app is open, in the background or closed, and any action button. You rarely need it on iOS.

Pass what your notification library hands your tap handler, unchanged. From React Native SDK 1.0.21 the SDK finds the push's data in it: at the top, one or two levels down under `data`, `userInfo`, `notification` or `payload`, or in a JSON string there. Don't pass a copy cut down to the fields your app routes on: it can lose `campaign_id`, and then nothing is counted. With React Native SDK 1.0.20, pass a flat map that holds the push's data itself (for example Notifee's `detail.notification.data`).

Add one line in each place your notification library delivers a tap, including the tap that launches a closed app. Pass a button's id as the second argument only for an action button:

| Library | Where taps arrive | What to pass |
|---|---|---|
| react-native-push-notification | `onNotification` when `notification.userInteraction` is true: it also runs for the tap that launched the app, and for an action button that opens the app. `onAction` for a button that does not open the app (Android) | `notification, notification.action` (no action on a plain tap) |
| Notifee | `onForegroundEvent` and `onBackgroundEvent`: `EventType.PRESS` for a tap, `EventType.ACTION_PRESS` for a button. `getInitialNotification()` for the tap that launched the app | a tap: `detail.notification`; a button: `detail.notification, detail.pressAction?.id`. At launch: `initial.notification`, plus `initial.pressAction.id` when it is one of your buttons |

A call made before `configure` does nothing, and a tap can arrive as soon as your notification library starts, before any screen mounts: the tap that launched the app, a Notifee `onBackgroundEvent`, a react-native-push-notification button with `invokeApp: false`. So set Linkzly up once at your app's entry point (`index.js`), and have every tap handler wait for it:

```typescript
// index.js: set Linkzly up once, before any notification library hands over a tap.
import LinkzlySDK, { Environment } from '@linkzly/react-native-sdk';

const linkzlyReady: Promise<boolean> = (async () => {
  try {
    await LinkzlySDK.configure('YOUR_SDK_KEY', Environment.PRODUCTION);
    // If your app keeps its own consent choice, restore it here:
    // await LinkzlySDK.setConsent({ analytics: savedAnalyticsChoice });
    return true;
  } catch {
    return false; // Reporting is skipped; your own notification handling still runs.
  }
})();

// Never rejects.
async function trackTap(notification: unknown, actionId?: string): Promise<void> {
  if (await linkzlyReady) {
    await LinkzlySDK.trackNotificationOpen(notification, actionId);
  }
}
```

With react-native-push-notification, in the `PushNotification.configure` call your app already makes at the entry point:

```typescript
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification(notification) {
    if (notification.userInteraction) {
      trackTap(notification, notification.action);
    }
    // ...your existing handling
  },
  onAction(notification) {
    trackTap(notification, notification.action);
  },
  // ...your existing options
});
```

With Notifee, in the handlers your app already registers:

```typescript
import notifee, { EventType, type Event, type InitialNotification } from '@notifee/react-native';

async function onNotifeeEvent({ type, detail }: Event): Promise<void> {
  if (type === EventType.PRESS) {
    await trackTap(detail.notification);
  } else if (type === EventType.ACTION_PRESS) {
    await trackTap(detail.notification, detail.pressAction?.id);
  }
}

notifee.onBackgroundEvent(onNotifeeEvent);
notifee.onForegroundEvent(onNotifeeEvent);

// The tap that launched the app. getInitialNotification() returns it once, then null,
// so pass on the result where your app already reads it.
async function trackLaunchTap(initial: InitialNotification | null): Promise<void> {
  if (initial) {
    const pressed = initial.pressAction.id;
    await trackTap(initial.notification, pressed === 'default' ? undefined : pressed);
  }
}

// Only if nothing else in your app reads it:
notifee.getInitialNotification().then(trackLaunchTap, () => {});
```

Replace `'default'` with the `pressAction` id your app gives a tap on the notification itself.

`linkzlyReady` orders only your own `trackNotificationOpen` calls. Taps on notifications Android shows itself are counted automatically (one that arrives before `configure` is sent once `configure` runs, and checked against the consent the SDK has stored when it is sent), so a notification your app does not draw needs no call; calling anyway is harmless.

Only string values are passed on. A tap that reaches the SDK twice within 5 seconds, once automatically and once through this call, is counted once, so it is safe to call on every tap. The call never throws.

**Consent at launch.** `setConsent` is stored on the device, so a choice the SDK already has applies from the start. If your app keeps its own consent choice and may not have passed a denial to the SDK yet (for example on the first launch after adding Linkzly), a tap the SDK captured automatically before `configure` is scheduled when `configure` runs and may be sent before your `setConsent` call; the SDK checks consent just before it sends. To rule that out, turn automatic capture off (below) and report every tap with `trackNotificationOpen` after `setConsent`, including the ones React Native Firebase delivers through `onNotificationOpenedApp` and `getInitialNotification`.

To check a build on Android, use a build that configures Linkzly with the staging or development environment (the detailed notification-open lines below are logged only then; `SDK not configured - trackNotificationOpen ignored` is logged in every environment), run `adb logcat -s LinkzlySDK`, and tap a Linkzly push once with the app closed and once with it in the background. `Push open reported` means the server accepted the report; confirm the count on the campaign page in the console for that same environment. `Notification data has no campaign_id or flow_delivery_id` means the data passed to `trackNotificationOpen` was not the push's own. `Analytics consent is denied` and `Notification open already reported for this tap` explain a report that was skipped on purpose. `SDK not configured - trackNotificationOpen ignored` means the call came before `configure`. No line at all is inconclusive: the call may not have run, or it was given something that holds no data the SDK can read.

**Turning automatic capture off.** Do it in the app's native project. The explicit call still works.

- **iOS:** add the Boolean `LinkzlyAutoTrackNotificationOpens` with the value `NO` to `Info.plist`.
- **Android:** add this to the `<application>` element of `AndroidManifest.xml`:

```xml
<meta-data
    android:name="com.linkzly.sdk.auto_track_notification_opens"
    android:value="false" />
```
