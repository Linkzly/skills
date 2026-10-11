<!-- Generated from https://docs.linkzly.com/docs/sdk-integrations-setup#push-notifications by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Push notifications

Source: https://docs.linkzly.com/docs/sdk-integrations-setup#push-notifications

### What it does

The SDK registers the device's push token with Linkzly, and subscribes the device to its broadcast topic so a campaign sent to all subscribed users can reach it. The SDK integrates with Firebase Cloud Messaging (FCM): devices registered through the SDK are reached through Firebase Cloud Messaging.

### Set up in the console

1. Open Engagement, then Push Providers, and choose Add Provider. Choose FCM and add your Firebase service account credentials. The steps are in Connecting Providers on [Push Notifications](https://docs.linkzly.com/docs/push-notifications).
2. Select the provider's app, then open its App mappings and link it to your Linkzly app. An app with no mapping is rejected for segment campaigns.
3. Build a campaign under Push Campaigns. For Audience, choose All Subscribed Users to reach the devices that registered through the SDK, or Segments for a segment you built under Segments.

### Set up in your app project

The Linkzly SDK has no Firebase dependency of its own, and it reads no token from Firebase. Your app does the Firebase work itself:

| Platform | What your app adds |
|---|---|
| iOS | Firebase Messaging, with `FirebaseApp.configure()` run before `LinkzlySDK.configure`. |
| Android | The `com.google.firebase:firebase-messaging` dependency and a valid `google-services.json` in your app module. |
| React Native | A Firebase Messaging library of your choice to get the token. The page example uses `@react-native-firebase/messaging`. |
| Flutter | `firebase_core` and `firebase_messaging`, with `Firebase.initializeApp()` run first. |

Without Firebase Messaging in the app, the topic subscription is skipped and `initializePush` returns `false`; the token registration itself does not need it. Pass the Firebase Cloud Messaging registration token to `setNotificationToken` on both platforms. On iOS this is the token Firebase Messaging gives you, never the APNs device token from `didRegisterForRemoteNotificationsWithDeviceToken`, which can never receive a push; Firebase needs your APNs key or certificate, which you set up in the Firebase console. Call it after `configure`, whenever Firebase gives you a token. It is safe to call on every launch.

### SDK calls

#### React Native

```typescript
// token is the token your Firebase Messaging library gives your app.
await LinkzlySDK.setNotificationToken(token);

const stored = await LinkzlySDK.hasNotificationToken();
await LinkzlySDK.clearNotificationToken();   // logout or notifications turned off
```

On every platform `setNotificationToken` is ignored until `configure` has run (it logs a warning and stores nothing). If your app delays `configure`, for example until the user has consented, call `setNotificationToken` again after `configure`, for example with the current token from Firebase Messaging; a call made after `configure` registers normally.

`setUserID` re-registers the stored token for the new user. `clearNotificationToken` is the durable opt-out. `initializePush` and `disablePush` are recovery and session-level controls that most apps never call. The full API is in [iOS](https://docs.linkzly.com/docs/sdk-ios#push-notifications), [Android](https://docs.linkzly.com/docs/sdk-android#push-notifications), [React Native](../sdk/push-notifications.md) and [Flutter](https://docs.linkzly.com/docs/sdk-flutter#push-notifications).

**Platform support**

| Platform | Supported | Notes |
|---|---|---|
| iOS | Yes | Needs Firebase Messaging in the app. |
| Android | Yes | Needs `firebase-messaging` and `google-services.json`. |
| React Native | Yes | Needs a Firebase library in your app. |
| Flutter | Yes | Needs `firebase_core` and `firebase_messaging` in your app. |
