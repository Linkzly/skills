<!-- Generated from https://docs.linkzly.com/docs/sdk-react-native#tracking-events by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Tracking Events

Source: https://docs.linkzly.com/docs/sdk-react-native#tracking-events

**Register the name first.** A custom event is kept only if its name is registered for the app in the console. An unregistered name is dropped, and on the default batched path the call and the flush still report success. See [Register each name in the console](../events/sending-a-custom-event.md).

Install and open are tracked for you: the native SDK records an install on the first launch and an open when the app comes to the foreground after at least 30 seconds away, and ends the session when the app goes to the background. `configure` also tracks an open by default (`autoTrackAppOpens`). Sessions are automatic; there are no session methods for app sessions (gaming sessions are separate, see Gaming Intelligence).

```typescript
// Custom event
await LinkzlySDK.trackEvent('signup_completed', { method: 'email' });

// Batch
await LinkzlySDK.trackEventBatch([
    { eventName: 'screen_view',  parameters: { screen: 'home' } },
    { eventName: 'button_click', parameters: { button: 'signup' } }
]);

// Event queue
const success = await LinkzlySDK.flushEvents();
const count   = await LinkzlySDK.getPendingEventCount();
```

`trackInstall()` and `trackOpen()` resolve to `DeepLinkData | null`. The SDK sends the install itself on the first launch of a new install, so calling `trackInstall()` on a new install sends a second install event. On iOS, `addDeepLinkListener` receives the deferred `DeepLinkData` from the automatic install, so you do not need the call. On Android the listener is fed only from `handleUniversalLink` and the activity's `onNewIntent` forwarding, not from the install, so an explicit `trackInstall()` is currently the only way to get the deferred data there; call it once, behind your own first-launch flag (the flag stops a third event, not the second). `trackEventBatch()` and `flushEvents()` resolve to a boolean.

The SDK already sends opens itself: when the app returns to the foreground after more than 30 seconds, and from `configure` unless `autoTrackAppOpens` is `false`. Each explicit `trackOpen()` call sends one more open event; call it only when you need the `DeepLinkData` it returns.

```typescript
// Only when you need the deferred DeepLinkData; each call sends an extra event
const installData = await LinkzlySDK.trackInstall();
const openData    = await LinkzlySDK.trackOpen();
```

### Revenue

`revenue`, `currency`, and `transactionId` are required on both calls. `transactionId` is the dedup key: a repeat of the same id is discarded. A refund reuses the original `transactionId` so it nets out. Purchases are recorded only when Revenue & LTV is enabled for your organisation. See [Tracking purchases](../purchases/overview.md) for the full contract.

```typescript
await LinkzlySDK.trackPurchase({
    revenue: 9.99,
    currency: 'USD',
    transactionId: 'order-12345',
    productId: 'premium_monthly',
    revenueType: 'subscription', // 'iap' | 'subscription' | 'other'
});

await LinkzlySDK.trackRefund({ revenue: 9.99, currency: 'USD', transactionId: 'order-12345' });
```

For event names, parameters and batching, see [Tracking events](../events/overview.md).
