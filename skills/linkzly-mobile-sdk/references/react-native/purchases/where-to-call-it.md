<!-- Generated from https://docs.linkzly.com/docs/sdk-tracking-purchases#where-to-call-it by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Where to call it

Source: https://docs.linkzly.com/docs/sdk-tracking-purchases#where-to-call-it

Call `trackPurchase` once per transaction, after the store has confirmed the transaction. Do not call it when the user taps Buy, because the user can cancel, the payment can fail, or the purchase can be pending.

Make the call before you finish the transaction with the store, but do not make the finish wait on the result of the call. On iOS, StoreKit delivers an unfinished transaction again at a later launch, and your call is then made a second time. That is safe: a repeat of the same `transactionId` is discarded.

If your app takes the price from a store object, read the price and the currency code from the same store product the user bought. The samples below keep a lookup of products you fetched from the store.

### React Native, react-native-iap

Call it in the purchase-updated listener, before `finishTransaction`.

```typescript
const productsBySku = new Map<string, Product>();

export function guidePurchasesListener() {
  return purchaseUpdatedListener(async (purchase: Purchase) => {
    if (purchase.purchaseState !== 'purchased') {
      return;
    }
    const product = productsBySku.get(purchase.productId);
    const transactionId = purchase.transactionId; // null on Android when Google Play gives no order ID
    if (product && product.price != null && transactionId) {
      // Do not await: the finish below must not wait on Linkzly.
      LinkzlySDK.trackPurchase({
        revenue: product.price * purchase.quantity,
        currency: product.currency,
        transactionId,
        productId: purchase.productId,
        quantity: purchase.quantity,
        revenueType: 'iap'
      }).catch((error) => console.warn('Linkzly purchase not sent', error));
    }
    await finishTransaction({ purchase, isConsumable: false });
  });
}
```

`productsBySku` is filled from the products you fetched with `fetchProducts`. The sample was type-checked against `react-native-iap` 16.7.3's published typings.

### A subscription service or your own server

If your app uses a subscription service such as RevenueCat, or your own server confirms purchases, call `trackPurchase` at the point where that service reports a completed purchase, with that service's transaction identifier. The SDK only sends what your app calls, so a renewal that happens while the app is closed is counted only when your app is told about it and makes the call.
