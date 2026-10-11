<!-- Generated from https://docs.linkzly.com/docs/sdk-flutter#privacy-controls by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Privacy Controls

Source: https://docs.linkzly.com/docs/sdk-flutter#privacy-controls

```dart
await Linkzly.instance.setTrackingEnabled(false);
final bool isEnabled = await Linkzly.instance.isTrackingEnabled();
```

`setTrackingEnabled(false)` stops custom events, purchases and refunds, and on Android `trackEventBatch`; on iOS `trackEventBatch` is not stopped, so skip it in your own code while tracking is off. It does not stop the install, open and session-end events the SDK sends itself. On Android it has no effect before `configure`. The SDK sends nothing before `configure`: an app that must send nothing before the user consents delays `configure` until the user has consented, and uses `setTrackingEnabled(false)` afterwards to stop events, purchases and refunds.
