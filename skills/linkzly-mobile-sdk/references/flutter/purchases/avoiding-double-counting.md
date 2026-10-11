<!-- Generated from https://docs.linkzly.com/docs/sdk-tracking-purchases#avoiding-double-counting by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Avoiding double counting

Source: https://docs.linkzly.com/docs/sdk-tracking-purchases#avoiding-double-counting

- **Do not also send the purchase as a custom event.** A custom event named `purchase`, or one with a `revenue` or `amount` key in its data, is a custom event and is not revenue. Linkzly logs a warning for the second kind and still accepts it as a custom event. Revenue comes only from `trackPurchase`. If an older version of your app sent purchases as custom events, remove that call when you add `trackPurchase`.
- **Do not call `trackPurchase` from a restore flow.** A restored purchase is an old transaction, not new revenue, and a call would carry today's timestamp. If you call it anyway, a repeat of the same `transactionId` is discarded, but a purchase made before you added Linkzly would then be counted as revenue on today's date.
- **One call per transaction.** Call it from one place only, the store callback in [Where to call it](../purchases/where-to-call-it.md). A retry or a second call with the same `transactionId` is discarded as a repeat. A call with a different `transactionId` for the same payment is counted as a second purchase.
- **Keep the ID stable.** Do not build the ID from the time of the call or from a random value. The deduplication works only if the same transaction always carries the same ID.
- **Do not retry a failure by changing the ID.** If a call fails, fix the cause and call again with the same `transactionId`.
