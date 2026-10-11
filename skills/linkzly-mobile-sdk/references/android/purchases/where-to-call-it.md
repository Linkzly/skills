<!-- Generated from https://docs.linkzly.com/docs/sdk-tracking-purchases#where-to-call-it by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Where to call it

Source: https://docs.linkzly.com/docs/sdk-tracking-purchases#where-to-call-it

Call `trackPurchase` once per transaction, after the store has confirmed the transaction. Do not call it when the user taps Buy, because the user can cancel, the payment can fail, or the purchase can be pending.

Make the call before you finish the transaction with the store, but do not make the finish wait on the result of the call. On iOS, StoreKit delivers an unfinished transaction again at a later launch, and your call is then made a second time. That is safe: a repeat of the same `transactionId` is discarded.

If your app takes the price from a store object, read the price and the currency code from the same store product the user bought. The samples below keep a lookup of products you fetched from the store.

### Android (Kotlin), Google Play Billing

Call it in `PurchasesUpdatedListener` when the response code is `OK` and the purchase state is `PURCHASED`, before you acknowledge or consume the purchase. Google Play can leave `orderId` empty; the sample skips the report in that case, because there is no ID to use.

```kotlin
val purchasesUpdatedListener = PurchasesUpdatedListener { billingResult, purchases ->
    if (billingResult.responseCode != BillingClient.BillingResponseCode.OK || purchases == null) {
        return@PurchasesUpdatedListener
    }
    for (purchase in purchases) {
        if (purchase.purchaseState != Purchase.PurchaseState.PURCHASED) continue
        val orderId = purchase.orderId ?: continue
        val productId = purchase.products.firstOrNull() ?: continue
        val offer = productsById[productId]?.oneTimePurchaseOfferDetails
        if (offer != null) {
            LinkzlySDK.trackPurchase(
                mapOf(
                    "revenue" to offer.priceAmountMicros / 1_000_000.0 * purchase.quantity,
                    "currency" to offer.priceCurrencyCode,
                    "transactionId" to orderId,
                    "productId" to productId,
                    "quantity" to purchase.quantity,
                    "revenueType" to "iap"
                )
            )
        }
        if (!purchase.isAcknowledged) {
            billingClient.acknowledgePurchase(
                AcknowledgePurchaseParams.newBuilder()
                    .setPurchaseToken(purchase.purchaseToken)
                    .build()
            ) { /* acknowledged */ }
        }
    }
}
```

`productsById` holds the `ProductDetails` you fetched with `queryProductDetails`. The sample reads the one-time price. For a subscription, read the price from the offer that the user bought; that variant of the sample was not compiled or tested.

### A subscription service or your own server

If your app uses a subscription service such as RevenueCat, or your own server confirms purchases, call `trackPurchase` at the point where that service reports a completed purchase, with that service's transaction identifier. The SDK only sends what your app calls, so a renewal that happens while the app is closed is counted only when your app is told about it and makes the call.
