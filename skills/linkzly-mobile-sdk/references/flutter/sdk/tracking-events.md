<!-- Generated from https://docs.linkzly.com/docs/sdk-flutter#tracking-events by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Tracking Events

Source: https://docs.linkzly.com/docs/sdk-flutter#tracking-events

**Register the name first.** A custom event is kept only if its name is registered for the app in the console. An unregistered name is dropped, and on the default batched path the call and the flush still report success. See [Register each name in the console](../events/sending-a-custom-event.md).

For naming, parameters and what to track, see the [tracking events guide](../events/overview.md).

```dart
// Custom event: the name, then an optional positional map of parameters
await Linkzly.instance.trackEvent('signup_completed', {'method': 'email'});

// Batch
await Linkzly.instance.trackEventBatch([
  const BatchEvent('level_started', parameters: {'level': 1}),
  const BatchEvent('level_completed', parameters: {'level': 1}),
]);

// Manual queue control
await Linkzly.instance.flushEvents();
final int pending = await Linkzly.instance.getPendingEventCount();
```

The SDK sends the install itself on the first launch of a new install, so calling `trackInstall()` on a new install sends a second install event. On iOS, `deepLinkStream` receives the deferred `DeepLinkData` from the automatic install, so you do not need the call. On Android the stream is fed from `handleAppLink` and from explicit `trackInstall()` / `trackOpen()` calls, not from the automatic install, so an explicit `trackInstall()` is currently the only way to get the deferred data there; call it once, behind your own first-launch flag (the flag stops a third event, not the second).

The SDK already sends opens itself: when the app returns to the foreground after more than 30 seconds, and from `configure` unless `autoTrackAppOpens` is `false`. Each explicit `trackOpen()` call sends one more open event; call it only when you need the `DeepLinkData` it returns.

```dart
// Only when you need the deferred DeepLinkData; each call sends an extra event
final DeepLinkData? install = await Linkzly.instance.trackInstall();
final DeepLinkData? open = await Linkzly.instance.trackOpen();
```

### Purchases and refunds

`trackPurchase` and `trackRefund` take one positional map. Send `revenue`, `currency` and `transactionId` in every call. `transactionId` is the dedup key: a repeat of the same id is discarded. A refund reuses the original `transactionId`, so the two net out. `productId`, `productName`, `quantity` and `revenueType` are optional. Both methods return `true` when the event was accepted. Purchases are recorded only when Revenue & LTV is enabled for your organisation. See the [purchases guide](../purchases/overview.md) for the full contract.

```dart
final bool purchased = await Linkzly.instance.trackPurchase({
  'revenue': 29.99,
  'currency': 'USD',
  'transactionId': 'order-12345',
  'productId': 'premium_monthly',
});

final bool refunded = await Linkzly.instance.trackRefund({
  'revenue': 29.99,
  'currency': 'USD',
  'transactionId': 'order-12345',
});
```
