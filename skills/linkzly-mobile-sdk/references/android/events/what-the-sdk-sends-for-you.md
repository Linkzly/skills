<!-- Generated from https://docs.linkzly.com/docs/sdk-tracking-events#what-the-sdk-sends-for-you by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# What the SDK sends for you

Source: https://docs.linkzly.com/docs/sdk-tracking-events#what-the-sdk-sends-for-you

Once `configure` has run, each SDK sends these events without any further code.

| Event | When it is sent | Platforms |
|---|---|---|
| `install` | On the first launch of a genuinely new install, from inside `configure`. An app that was already installed before the SDK first ran sends none. | iOS, Android, React Native, Flutter |
| `open` | When the app comes to the foreground and more than 30 seconds have passed since the last session time. | iOS, Android, React Native, Flutter |
| `open` (at configure) | Also sent by `configure` itself unless you turn off `autoTrackAppOpens` (default `true`). | React Native, Flutter |
| `session_end` | When the app goes to the background. It carries the session length in `duration_seconds`. It is sent once and never retried. | iOS, Android, React Native, Flutter |

Sessions are automatic. There is no `startSession` or `endSession` to call.

Do not call `trackInstall` as part of setup. The SDK has already sent the install, and a call on a new install sends a second install event. The platform pages explain the one case, receiving a deferred deep link on Android, where an explicit call is currently the only way to get that data in code: [Android](../sdk/tracking-events.md).

What your app has to send itself:

- Custom events for the actions that matter in your app (this page).
- Purchases, with `trackPurchase`, never as a custom event (see [Tracking Purchases](../purchases/overview.md)).
- The signed-in user's ID, with `setUserID` (see [Identifying users](../events/identifying-users.md)).
