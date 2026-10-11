<!-- Generated from https://docs.linkzly.com/docs/sdk-tracking-purchases#the-purchase-contract by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# The purchase contract

Source: https://docs.linkzly.com/docs/sdk-tracking-purchases#the-purchase-contract

Both calls take one set of fields. Send these keys; the SDK moves them into a revenue block and sends the event as a purchase.

| Field | Required | Type | Notes |
|---|---|---|---|
| `revenue` | Yes | Number greater than 0 | The amount charged, in `currency`. Always positive, including on a refund. A numeric string such as `"29.99"` is also accepted. Linkzly adds up `revenue` as sent and does not multiply it by `quantity`. |
| `currency` | Yes | String | A three-letter currency code from the supported list under [Revenue, currency and type](../purchases/revenue-currency-and-type.md). Upper or lower case. |
| `transactionId` | Yes | String | The store's or your own ID for this transaction. It is the deduplication key (see [Choosing the transaction ID](../purchases/choosing-the-transaction-id.md)). Spaces at the start and end are trimmed. `transaction_id` is accepted as well. |
| `productId` | No | String | Your product identifier. `product_id` is accepted as well. |
| `productName` | No | String | A readable product name. `product_name` is accepted as well. |
| `quantity` | No | Number | Units bought. Stored as sent, default 1. |
| `revenueType` | No | `iap`, `subscription` or `other` | Default `iap`. `revenue_type` is accepted as well. |
| `receipt` | No | String | Not used. Leave it out (see [What Linkzly does with it](../purchases/what-linkzly-does-with-it.md)). |

Any other key you pass stays on the event as ordinary custom data.

The smallest call:

### Android (Kotlin)

```kotlin
LinkzlySDK.trackPurchase(
    mapOf(
        "revenue" to 29.99,
        "currency" to "USD",
        "transactionId" to "order-12345"
    )
) { result -> result.onSuccess { /* sent */ } }
```

What each call returns:

| Platform | Result |
|---|---|
| iOS | `completion` receives `Result<TrackingResponse, Error>`. The completion is optional. |
| Android | `callback` receives `Result<Boolean>`. The callback is optional. |
| React Native | A `Promise<void>`. It rejects with `TRACK_PURCHASE_ERROR` (`TRACK_REFUND_ERROR` for a refund) on failure. |
| Flutter | A `Future<bool>`: `true` on success. On failure it throws a `PlatformException` with the same two codes. |

On Android, React Native and Flutter the callback, promise or future is not completed when tracking is off, and on Android also when the batching strategy batches purchases. The same holds for the iOS completion when tracking is off. Do not make finishing a store transaction wait on the result, as the samples below show.

If a required field is missing or wrong:

- The SDK does not check the fields. It sends what you give it.
- Once Revenue & LTV is enabled for your organisation, Linkzly rejects the event when `revenue` is missing or not greater than 0, when `currency` is missing or not in the supported list, when `transactionId` is missing or empty, or when the event's timestamp is more than 24 hours in the future. On the single-event path, which is how purchases are sent by default, the answer is an HTTP 400 whose body carries the code `INVALID_PURCHASE` and a message naming the problem, and your callback receives a failure. The SDK does not pass that code on: the failure you see names the HTTP status. Before Revenue & LTV is enabled for your organisation, even a call with a missing or invalid field returns success, so a success response is not proof that the fields are right.
- A rejected purchase is also put in the SDK's retry queue. The queued copy goes out on the batch path, where an invalid purchase is dropped with a success response. A failure callback therefore does not mean the purchase will arrive later. Fix the call.
- A success result means Linkzly answered with success. It does not mean the purchase was recorded: a repeated `transactionId` is discarded without any error (see [Avoiding double counting](../purchases/avoiding-double-counting.md)), and purchases are recorded only when Revenue & LTV is enabled for your organisation (see [What Linkzly does with it](../purchases/what-linkzly-does-with-it.md)).
- Before `configure` has succeeded the call fails (iOS completion, Android callback, React Native rejection, Flutter exception). If you turned tracking off with `setTrackingEnabled(false)`, the call does nothing and the callback is not called (the install and open events are not affected).
- Purchases are sent at once under the default batching strategy. Only custom events are queued. Purchases are queued only if the batching strategy is set to batch everything, in which case on Android the callback is not called. A purchase never needs its event name registered in the console: that rule applies to custom events only.
