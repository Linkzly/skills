<!-- Generated from https://docs.linkzly.com/docs/sdk-android#user-identity by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# User Identity

Source: https://docs.linkzly.com/docs/sdk-android#user-identity

```kotlin
LinkzlySDK.setUserID("user_12345")          // after login
val userId: String? = LinkzlySDK.getUserID()
LinkzlySDK.setUserID("")                     // clear after logout

// Persistent visitor ID (auto-generated UUID)
val visitorId: String = LinkzlySDK.getVisitorID()
LinkzlySDK.resetVisitorID()                  // generate a new one
```

There is no separate `clearUserID()` method. Pass an empty string. `setUserID` also re-registers a stored push token against the new user (see [Notification token](../sdk/push-notifications.md)).
