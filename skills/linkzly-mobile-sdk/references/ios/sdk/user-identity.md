<!-- Generated from https://docs.linkzly.com/docs/sdk-ios#user-identity by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# User Identity

Source: https://docs.linkzly.com/docs/sdk-ios#user-identity

```swift
LinkzlySDK.setUserID("user_12345")
let userId = LinkzlySDK.getUserID()

// Persistent visitor ID (auto-generated UUID)
let visitorId = LinkzlySDK.getVisitorID()
LinkzlySDK.resetVisitorID()
```

Sessions are automatic. Calling `setUserID` also re-registers a stored push token against the new user (see [Notification token](../sdk/push-notifications.md)).
