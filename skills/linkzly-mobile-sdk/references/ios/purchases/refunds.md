<!-- Generated from https://docs.linkzly.com/docs/sdk-tracking-purchases#refunds by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Refunds

Source: https://docs.linkzly.com/docs/sdk-tracking-purchases#refunds

Call `trackRefund` with the original `transactionId` and a positive `revenue`. Never send a negative amount: the SDK marks the event as a refund itself.

### iOS (Swift)

```swift
LinkzlySDK.trackRefund(parameters: [
    "revenue": 29.99,
    "currency": "USD",
    "transactionId": "order-12345"
])
```

What a refund does:

- It is recorded as a separate refund. Gross revenue stays the same, and net revenue goes down by the refunded amount. The refund count goes up by one.
- Only the first refund for a `transactionId` is recorded. A second `trackRefund` with the same `transactionId` is a duplicate and is discarded, so a second partial refund against the same transaction is lost.
- A refund whose `transactionId` matches no purchase is not rejected. Nothing compares it with the original. It is recorded and lowers net revenue. Likewise nothing compares the refund amount with the original amount.

Where your app learns about a refund depends on the platform. On iOS with StoreKit 2, a refunded transaction arrives in `Transaction.updates` with a `revocationDate`. The loop below reports it, and reports other verified transactions as purchases (a repeat of the same `transactionId` is discarded). Start the loop once when the app launches, not in a restore handler: StoreKit delivers unfinished transactions to it once, right after launch, and a restore handler would report old purchases as new revenue.

```swift
@available(iOS 15.0, *)
func guidePurchasesStoreKitUpdates(productsById: [String: Product]) async {
    for await update in Transaction.updates {
        guard case .verified(let transaction) = update else { continue }
        guard let product = productsById[transaction.productID] else { continue }
        let revenue = NSDecimalNumber(decimal: transaction.price ?? product.price).doubleValue
        let currency = product.priceFormatStyle.currencyCode
        if transaction.revocationDate != nil {
            LinkzlySDK.trackRefund(parameters: [
                "revenue": revenue,
                "currency": currency,
                "transactionId": String(transaction.id)
            ])
        } else {
            LinkzlySDK.trackPurchase(parameters: [
                "revenue": revenue,
                "currency": currency,
                "transactionId": String(transaction.id),
                "productId": transaction.productID,
                "revenueType": transaction.productType == .autoRenewable ? "subscription" : "iap"
            ])
        }
        await transaction.finish()
    }
}
```

On the other platforms, call `trackRefund` wherever your app, your server or your subscription service learns that the purchase was refunded. The SDK can only send a refund while the app is running, so a refund learned on your server has to reach the app before the app can report it.
