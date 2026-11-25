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

A flush starts when the queue reaches the batch size, when the timer fires, when the app goes to the background, when the network becomes reachable again, or when your code calls `flushEvents`. The queue is saved on the device, so queued events survive an app restart.

When a batch fails to send, the SDK versions in [SDK versions](../events/event-properties.md) handle it this way:

- A batch Linkzly refuses, for example one that is too large, is dropped at once.
- A batch that gets a server error, or no answer while the device is online, stays in the queue and is tried again at later flushes, up to 5 attempts in all. Then it is dropped.
- While the device is offline, failed attempts don't count, and the events wait in the queue.

Older versions differ: iOS retried a batch that got a server error or no answer with no limit, and Android dropped a batch after any failure, offline included.

Call `flushEvents` yourself only when you need events sent at a known moment, for example before a screen you know will close the app. `getPendingEventCount` returns how many events are still waiting.

### Android (Kotlin)

```kotlin
LinkzlySDK.flushEvents { result -> /* result.onSuccess { ... } */ }
val pending: Int = LinkzlySDK.getPendingEventCount()
```

The SDKs also have debug controls for batching. They behave differently by platform: on iOS they do not work in the shipped binary, and on Android they work in debuggable builds only. Read the section on your platform page before using them: [Android](../sdk/debug-and-batching-controls.md), [React Native](https://docs.linkzly.com/docs/sdk-react-native#debug-and-batching-controls), [Flutter](https://docs.linkzly.com/docs/sdk-flutter#debug-and-batching-controls). For iOS, see the [event queue](https://docs.linkzly.com/docs/sdk-ios#event-queue) section.
