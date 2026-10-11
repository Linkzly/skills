<!-- Generated from https://docs.linkzly.com/docs/sdk-tracking-purchases#where-to-call-it by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Where to call it

Source: https://docs.linkzly.com/docs/sdk-tracking-purchases#where-to-call-it

Call `trackPurchase` once per transaction, after the store has confirmed the transaction. Do not call it when the user taps Buy, because the user can cancel, the payment can fail, or the purchase can be pending.

Make the call before you finish the transaction with the store, but do not make the finish wait on the result of the call. On iOS, StoreKit delivers an unfinished transaction again at a later launch, and your call is then made a second time. That is safe: a repeat of the same `transactionId` is discarded.

If your app takes the price from a store object, read the price and the currency code from the same store product the user bought. The samples below keep a lookup of products you fetched from the store.

### Flutter, in_app_purchase

Call it in the `purchaseStream` listener when `purchaseDetails.status` is `PurchaseStatus.purchased`, before `completePurchase`.

```dart
final Map<String, ProductDetails> productsById = <String, ProductDetails>{};

StreamSubscription<List<PurchaseDetails>> guidePurchasesListener() {
  return InAppPurchase.instance.purchaseStream.listen((purchases) async {
    for (final PurchaseDetails purchase in purchases) {
      if (purchase.status == PurchaseStatus.purchased) {
        final ProductDetails? product = productsById[purchase.productID];
        final String? transactionId = purchase.purchaseID;
        if (product != null && transactionId != null) {
          // Do not await: completing the purchase must not wait on Linkzly.
          unawaited(
            Linkzly.instance.trackPurchase({
              'revenue': product.rawPrice,
              'currency': product.currencyCode,
              'transactionId': transactionId,
              'productId': purchase.productID,
              'revenueType': 'iap',
            }).catchError((Object error) => false),
          );
        }
      }
      if (purchase.pendingCompletePurchase) {
        await InAppPurchase.instance.completePurchase(purchase);
      }
    }
  });
}
```

`productsById` is filled from the result of `queryProductDetails`.

### A subscription service or your own server

If your app uses a subscription service such as RevenueCat, or your own server confirms purchases, call `trackPurchase` at the point where that service reports a completed purchase, with that service's transaction identifier. The SDK only sends what your app calls, so a renewal that happens while the app is closed is counted only when your app is told about it and makes the call.
