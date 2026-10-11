<!-- Generated from https://docs.linkzly.com/docs/sdk-android#tracking-events by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Tracking Events

Source: https://docs.linkzly.com/docs/sdk-android#tracking-events

**Register the name first.** A custom event is kept only if its name is registered for the app in the console. An unregistered name is dropped, and on the default batched path the call and the flush still report success. See [Register each name in the console](../events/sending-a-custom-event.md).

```kotlin
// Custom event
LinkzlySDK.trackEvent("signup_completed", mapOf(
    "method" to "email",
    "plan" to "free"
))
```

`trackEvent(eventName, parameters)` takes a `Map<String, Any>`. You choose the event name, and it must be registered for the app (see the note above). Under the default batching strategy, custom events are queued and sent in batches; install, open and purchase events are sent immediately.

To send several events in one call, pass maps with `eventType`, `eventName` and `customData` keys:

```kotlin
LinkzlySDK.trackEventBatch(
    events = listOf(
        mapOf("eventType" to "custom", "eventName" to "level_started", "customData" to mapOf("level" to 1)),
        mapOf("eventType" to "custom", "eventName" to "level_completed", "customData" to mapOf("level" to 1))
    )
) { result ->
    result.onSuccess { /* batch accepted */ }
}
```

When tracking is disabled with `setTrackingEnabled(false)`, `trackEvent` does nothing, and `trackEventBatch` skips the events and returns `Result.success(false)` to its callback.

### Install and open with a deferred deep link

The SDK sends the install itself on the first launch of a new install (inside `configure()`), and sends an open event itself when the app returns to the foreground after more than 30 seconds. Calling `trackInstall` yourself on a new install sends a second install event. On Android there is no handler for the automatic install, so an explicit call is currently the only way to get the deferred `DeepLinkData` in code; call it once, behind your own first-launch flag (the flag stops a third event, not the second), and only if you need that data. Each explicit `trackOpen` call also sends one more open event on top of the ones the SDK sends itself, so call it only when you need the `DeepLinkData` it returns:

```kotlin
LinkzlySDK.trackInstall { result ->
    result.onSuccess { deepLinkData -> deepLinkData?.let { navigateTo(it.path) } }
}

LinkzlySDK.trackOpen { result ->
    result.onSuccess { deepLinkData -> deepLinkData?.let { navigateTo(it.path) } }
}
```

Both callbacks run on the main thread. If `configure()` has not succeeded, the callback receives a failure.

### Purchases and refunds

For revenue events use `trackPurchase` and `trackRefund`. The contract:

- `revenue`, `currency` and `transactionId` are required.
- `transactionId` is the deduplication key: a repeat of the same id is discarded.
- `revenueType` is `"iap"`, `"subscription"` or `"other"`.
- The SDK also accepts `productId`, `productName` and `quantity`. Key names in `snake_case` (`transaction_id`, `product_id`, `revenue_type`) are accepted as well.
- A refund reuses the **original** `transactionId`, so it nets out the purchase. Send the refund with the positive amount; the SDK marks it as a refund.

```kotlin
LinkzlySDK.trackPurchase(
    parameters = mapOf(
        "revenue" to 9.99,
        "currency" to "USD",
        "transactionId" to "order-12345",
        "productId" to "premium_monthly",
        "revenueType" to "subscription"
    ),
    callback = { result -> result.onSuccess { /* tracked */ } }
)

LinkzlySDK.trackRefund(
    parameters = mapOf(
        "revenue" to 9.99,
        "currency" to "USD",
        "transactionId" to "order-12345"
    )
)
```

The `callback` is optional on both calls. Purchases are recorded only when Revenue & LTV is enabled for your organisation. For the full guide, see [Tracking purchases and refunds](../purchases/overview.md).

### Event queue

Events are queued locally and flushed in batches. The queue is saved to SharedPreferences, so it survives an app restart. It holds up to 1,000 events; when it is full the oldest event is dropped. For manual control:

```kotlin
LinkzlySDK.flushEvents { result -> /* result.onSuccess { ... } */ }
val pending: Int = LinkzlySDK.getPendingEventCount()
```

`getPendingEvents()` returns the queued events as a `List<QueuedEvent>`, but only when SDK logging is enabled, that is, when you configured the SDK with `Environment.STAGING` or `Environment.DEVELOPMENT`. With `Environment.PRODUCTION` it logs `getPendingEvents() requires loggingEnabled=true` and returns an empty list. This keeps queued event contents out of production use.

```kotlin
val queued: List<QueuedEvent> = LinkzlySDK.getPendingEvents()  // empty in PRODUCTION
```
