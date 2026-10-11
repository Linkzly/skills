<!-- Generated from https://docs.linkzly.com/docs/sdk-tracking-events#batching-and-flushing by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Batching and flushing

Source: https://docs.linkzly.com/docs/sdk-tracking-events#batching-and-flushing

Under the default strategy, install, open and purchase events are sent immediately. Custom events are queued on the device and sent together. The defaults in the SDKs:

| Setting | Default |
|---|---|
| Strategy | Batch custom events only; send other events at once |
| Batch size | 20 events |
| Flush interval | 30 seconds |
| Queue size | 1,000 events; the oldest is dropped when full |

A flush starts when the queue reaches the batch size, when the timer fires, when the app goes to the background, when the network becomes reachable again, or when your code calls `flushEvents`. The queue is saved on the device, so queued events survive an app restart. A failed send leaves the events in the queue for the next flush.

Call `flushEvents` yourself only when you need events sent at a known moment, for example before a screen you know will close the app. `getPendingEventCount` returns how many events are still waiting.

### iOS (Swift)

```swift
LinkzlySDK.flushEvents { success, error in /* ... */ }
let pending = LinkzlySDK.getPendingEventCount()
```

The SDKs also have debug controls for batching. They behave differently by platform: on iOS they do not work in the shipped binary, and on Android they work in debuggable builds only. Read the section on your platform page before using them: [Android](https://docs.linkzly.com/docs/sdk-android#debug-and-batching-controls), [React Native](https://docs.linkzly.com/docs/sdk-react-native#debug-and-batching-controls), [Flutter](https://docs.linkzly.com/docs/sdk-flutter#debug-and-batching-controls). For iOS, see the [event queue](../sdk/tracking-events.md) section.
