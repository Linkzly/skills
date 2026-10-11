<!-- Generated from https://docs.linkzly.com/docs/sdk-integrations-setup#privacy-controls by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Privacy controls

Source: https://docs.linkzly.com/docs/sdk-integrations-setup#privacy-controls

### What it does

Three controls let your app honour a person's choice:

- `setTrackingEnabled(false)` stops custom events, purchases and refunds. It does not stop the install, open or session-end events the SDK sends itself.
- `setAdvertisingTrackingEnabled(false)` stops collection of the advertising ID. Both controls default to on.
- `resetVisitorID` removes the stored visitor ID. See [Identifying users](../events/identifying-users.md) for what happens next on each platform.

The SDK ships no consent screen. Whether your app meets a privacy law depends on how you use these controls.

### Set up in the console

Nothing. These controls live in your app.

### Set up in your app project

Nothing beyond the SDK. On Android (native, React Native and Flutter on Android), call `setTrackingEnabled` after `configure`; before then the call has no effect. The SDK sends nothing before `configure`: an app that must send nothing before the user consents delays `configure` until the user has consented, and uses `setTrackingEnabled(false)` afterwards to stop events, purchases and refunds. On iOS, `trackEventBatch` is not covered by `setTrackingEnabled(false)`, so skip it in your own code while tracking is off. On Android, `trackEventBatch` is covered as well.

### SDK calls

#### iOS (Swift)

```swift
LinkzlySDK.setTrackingEnabled(false)
LinkzlySDK.setAdvertisingTrackingEnabled(false)
LinkzlySDK.resetVisitorID()
```

`isTrackingEnabled` and `isAdvertisingTrackingEnabled` read the current settings. The full API is in [iOS](../sdk/privacy-controls.md), [Android](https://docs.linkzly.com/docs/sdk-android#privacy-controls), [React Native](https://docs.linkzly.com/docs/sdk-react-native#privacy-controls) and [Flutter](https://docs.linkzly.com/docs/sdk-flutter#privacy-controls).

**Platform support**

| Platform | Supported | Notes |
|---|---|---|
| iOS | Yes | The settings are stored on the device. |
| Android | Yes | Call after `configure`. |
| React Native | Yes | Calls the native settings. |
| Flutter | Yes | Calls the native settings. |
