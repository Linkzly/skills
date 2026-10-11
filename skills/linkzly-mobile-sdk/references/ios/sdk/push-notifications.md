<!-- Generated from https://docs.linkzly.com/docs/sdk-ios#push-notifications by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Push Notifications

Source: https://docs.linkzly.com/docs/sdk-ios#push-notifications

The SDK can subscribe the device to a Linkzly Firebase Cloud Messaging broadcast topic. Prerequisite: Firebase Messaging integrated in your app.

```swift
import FirebaseCore
import FirebaseMessaging
import Linkzly

FirebaseApp.configure()
LinkzlySDK.configure(sdkKey: "slk_your_key_from_console", environment: .production)

let success = LinkzlySDK.initializePush()  // returns false if Firebase is unavailable
LinkzlySDK.disablePush()
```

### Notification token

Register the device's push token with Linkzly so campaigns can target this device. On iOS the token you pass must be the Firebase Cloud Messaging (FCM) registration token that Firebase Messaging gives your app. Do not pass the APNs device token from `didRegisterForRemoteNotificationsWithDeviceToken`: devices registered through the SDK are reached through Firebase Cloud Messaging, so an APNs device token can never receive a push. Your app therefore requires Firebase Messaging, and Firebase needs your APNs key or certificate (set up in the Firebase console). The sample below was compiled against Firebase iOS SDK 13.0.1 (`FirebaseMessaging`).

```swift
import FirebaseCore
import FirebaseMessaging
import UIKit
import Linkzly

class AppDelegate: UIResponder, UIApplicationDelegate, MessagingDelegate {
    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil) -> Bool {
        FirebaseApp.configure()
        LinkzlySDK.configure(sdkKey: "slk_your_key_from_console", environment: .production)
        Messaging.messaging().delegate = self
        application.registerForRemoteNotifications()
        return true
    }

    // Firebase calls this with the FCM registration token at launch and whenever it changes.
    func messaging(_ messaging: Messaging, didReceiveRegistrationToken fcmToken: String?) {
        guard let fcmToken else { return }
        LinkzlySDK.setNotificationToken(fcmToken)
    }
}

// Alternative: read the current FCM registration token on demand.
func registerCurrentFcmToken() async {
    if let fcmToken = try? await Messaging.messaging().token() {
        LinkzlySDK.setNotificationToken(fcmToken)
    }
}

let token = LinkzlySDK.getNotificationToken()   // String?
let hasToken = LinkzlySDK.hasNotificationToken()
LinkzlySDK.clearNotificationToken()
```

- **Your app passes the token itself.** `initializePush` never reads or sends a token. Call `setNotificationToken` whenever Firebase gives your app a new FCM registration token. The SDK only contacts Linkzly again when the token, the user or the app version changes, or after 7 days, so calling it on every launch is safe.
- **Delayed `configure`.** On iOS, `setNotificationToken` is ignored until `configure` has run (it logs a warning and stores nothing). If your app delays `configure`, for example until the user has consented, call `setNotificationToken` again after `configure`, for example with the current token from Firebase Messaging; a call made after `configure` registers normally.
- **Binding to a user.** `setUserID` re-registers the stored token against the new user.
- **`clearNotificationToken` is the durable opt-out.** Use it on logout or when the user turns notifications off. It removes the token on the device, revokes it with Linkzly and drops the stored broadcast topic.

### Broadcast topic (Firebase only)

A successful `setNotificationToken` registration already subscribes the device to its Linkzly broadcast topic, and the SDK re-subscribes on every launch. `initializePush` and `disablePush` are recovery and session-level controls, and most apps never call them. `initializePush` returns `false` until a registration has succeeded, and also when the SDK is not configured or Firebase Messaging is unavailable. `disablePush` lasts for the session; the next launch subscribes again.

`initializePush()` uses runtime reflection — there is no Firebase dependency in the SDK itself, and it returns `false` safely when Firebase is missing. It works alongside other push providers (OneSignal, Braze, Airship) because it only subscribes to Linkzly-specific topics.
