<!-- Generated from https://docs.linkzly.com/docs/sdk-tracking-events#sending-a-custom-event by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Sending a custom event

Source: https://docs.linkzly.com/docs/sdk-tracking-events#sending-a-custom-event

`trackEvent` takes a name and an optional set of parameters. The SDK sends it as an event of type `custom`: the name travels as the event name and the parameters travel as the event's custom data.

### Flutter

```dart
await Linkzly.instance.trackEvent('signup_completed', {'method': 'email'});
```

To send several events in one call, use `trackEventBatch`. The call shape differs on each platform, as shown below. It sends the list straight away and does not use the queue. It sends at most 100 events per call.

### Flutter

```dart
await Linkzly.instance.trackEventBatch([
  const BatchEvent('level_started', parameters: {'level': 1}),
  const BatchEvent('level_completed', parameters: {'level': 1}),
]);
```

Other things to know about both calls:

- Call them after `configure` has succeeded. Before that, the SDK logs a warning and the event is not queued.
- If you turned tracking off with `setTrackingEnabled(false)`, `trackEvent` does nothing (the install and open events the SDK sends itself are not affected).
- Under the default batching strategy a custom event waits in a queue on the device and is sent with others (see [Batching and flushing](../events/batching-and-flushing.md)).

The full call reference for each platform is in its Tracking Events section: [iOS](https://docs.linkzly.com/docs/sdk-ios#tracking-events), [Android](https://docs.linkzly.com/docs/sdk-android#tracking-events), [React Native](https://docs.linkzly.com/docs/sdk-react-native#tracking-events), [Flutter](../sdk/tracking-events.md).

### Register each name in the console

The event ingestion service keeps a custom event only if its name is in the Custom Events list of the app that owns the SDK key. A name that is not in the list is dropped. How that shows up depends on the path the event takes:

- On the batch path, which is the default for custom events and the path `trackEventBatch` uses, the response is a success even when events were dropped. A successful flush does not mean the events were kept, and nothing in your app reports the loss.
- On the single-event path, used when instant sending is selected, an unregistered name returns a 400 error.
- If the registry lookup itself fails, the event is treated as unregistered and dropped.

To register a name in the console:

1. Open Apps in the sidebar and open your app.
2. Open the app's **Configuration** tab (or use the Manage or Edit link on the app's overview).
3. Find the Tracking Configuration section and its Custom Events block.
4. Choose Add event. A small panel opens.
5. Type the name and choose Add. The name now shows in the list, but it is not registered yet.
6. Choose Save Configuration at the bottom of the page. The name is registered only once the settings are saved.

The same Custom Events block is on the form where you first register an app, and the same rule applies: the names are saved with the form.

- Matching is exact and case-sensitive. `Signup_Completed` and `signup_completed` are different names. The console trims spaces around the name you type, so do not put spaces at the start or end of a name in code.
- A name can be at most 100 characters.
- A name you have just added can take a few minutes to be accepted.
