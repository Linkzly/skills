<!-- Generated from https://docs.linkzly.com/docs/sdk-tracking-purchases#where-to-call-it by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Where to call it

Source: https://docs.linkzly.com/docs/sdk-tracking-purchases#where-to-call-it

Call `trackPurchase` once per transaction, after the store has confirmed the transaction. Do not call it when the user taps Buy, because the user can cancel, the payment can fail, or the purchase can be pending.

Make the call before you finish the transaction with the store, but do not make the finish wait on the result of the call. On iOS, StoreKit delivers an unfinished transaction again at a later launch, and your call is then made a second time. That is safe: a repeat of the same `transactionId` is discarded.

If your app takes the price from a store object, read the price and the currency code from the same store product the user bought. The samples below keep a lookup of products you fetched from the store.

### iOS (Swift), StoreKit 2

Call it in the verified branch of the result of `product.purchase()`, before `transaction.finish()`. Transactions that arrive in `Transaction.updates` take the same call (see [Refunds](../purchases/refunds.md) for the full loop). `Transaction.price` is the total for the quantity purchased, so the sample sends it as is.

```swift
@available(iOS 15.0, *)
func guidePurchasesStoreKit(product: Product) async throws {
    let result = try await product.purchase()
    switch result {
    case .success(.verified(let transaction)):
        LinkzlySDK.trackPurchase(parameters: [
            "revenue": NSDecimalNumber(decimal: transaction.price ?? product.price).doubleValue,
            "currency": product.priceFormatStyle.currencyCode,
            "transactionId": String(transaction.id),
            "productId": transaction.productID,
            "quantity": transaction.purchasedQuantity,
            "revenueType": transaction.productType == .autoRenewable ? "subscription" : "iap"
        ])
        await transaction.finish()
    default:
        break   // unverified, pending, or cancelled: nothing to report
    }
}
```

### A subscription service or your own server

If your app uses a subscription service such as RevenueCat, or your own server confirms purchases, call `trackPurchase` at the point where that service reports a completed purchase, with that service's transaction identifier. The SDK only sends what your app calls, so a renewal that happens while the app is closed is counted only when your app is told about it and makes the call.
