<!-- Generated from https://docs.linkzly.com/docs/sdk-tracking-events#identifying-users by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Identifying users

Source: https://docs.linkzly.com/docs/sdk-tracking-events#identifying-users

Call `setUserID` once the user has signed in, so later events carry your own user ID.

### React Native

```typescript
await LinkzlySDK.setUserID('user_12345');   // after sign-in
await LinkzlySDK.resetVisitorID();          // only to start a new visitor identity
```

What the calls do:

- `setUserID` stores the ID on the device and sends it as `appUserId` on events sent after the call. It also re-registers a stored push token against the new user.
- A custom event waiting in the queue takes the user ID when the queue is flushed, not when `trackEvent` was called. An event tracked before `setUserID` and flushed after it is sent with the new ID. Install, open and purchase events are sent at once with the ID set at that moment.
- The SDK does not change events it has already sent.
- The visitor ID is an ID the SDK creates for the device. On iOS it is kept in the Keychain and survives an app reinstall. On Android it is derived from the device's Android ID when one is available, so a reinstall gives the same value. `resetVisitorID` removes the stored value. On iOS the next event creates a new random ID. On Android, when the Android ID is available, the next event may create the same ID again.
- A user ID and a visitor ID can each be at most 255 characters.
- Do not put personal data, such as an email address, in a user ID unless your app intends to send it to Linkzly. Use an internal ID instead.

On Android you can clear the user ID with `setUserID("")`. The Android platform page's opt-out example does that together with `resetVisitorID`: [Privacy controls](https://docs.linkzly.com/docs/sdk-android#privacy-controls).
