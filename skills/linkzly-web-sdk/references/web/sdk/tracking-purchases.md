<!-- Generated from https://docs.linkzly.com/docs/sdk-web#tracking-purchases by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Tracking Purchases

Source: https://docs.linkzly.com/docs/sdk-web#tracking-purchases

`revenue` (greater than 0), `currency` (an ISO 4217 code such as `USD`) and `transactionId` are required on both calls. A call without them is ignored, and the reason is logged with `debug` on. `transactionId` is the dedup key: a repeat of the same id is discarded. A refund reuses the purchase's `transactionId`. Purchases are recorded only when Revenue & LTV is enabled for your organisation; ask Linkzly support to enable it.

```typescript
LinkzlySDK.trackPurchase({
  revenue: 59.99,
  currency: 'USD',
  transactionId: 'ORD-98765', // your order ID
  productId: 'pro-annual',
  productName: 'Pro (annual)',
  quantity: 1,
  revenueType: 'subscription', // 'iap' | 'subscription' | 'other'
  customData: { coupon: 'SPRING' },
});

LinkzlySDK.trackRefund({ revenue: 59.99, currency: 'USD', transactionId: 'ORD-98765' });
```

Call `trackPurchase` once per order, after the payment has succeeded, for example on the order confirmation page. The SDK also drops a transaction ID this browser already sent among its last 50, so reloading the confirmation page does not count the order twice. See [Tracking Purchases](https://docs.linkzly.com/docs/sdk-tracking-purchases) for the full contract.
