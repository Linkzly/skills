<!-- Generated from https://docs.linkzly.com/docs/sdk-integrations-setup#revenue by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Revenue

Source: https://docs.linkzly.com/docs/sdk-integrations-setup#revenue

### What it does

`trackPurchase` reports a purchase and `trackRefund` reports a reversal. Revenue & LTV turns them into revenue and lifetime-value reporting. Purchases are recorded only when Revenue & LTV is enabled for your organisation; until it is, a purchase call returns success and nothing is recorded. Revenue is as reported by your app; Linkzly does not validate receipts.

### Set up in the console

1. Confirm with Linkzly support that Revenue & LTV is enabled for your organisation.
2. Open Analytics, then Revenue & LTV, and choose your app. The reports are described on [Revenue & LTV](https://docs.linkzly.com/docs/revenue-ltv).

### Set up in your app project

Nothing beyond the SDK. The fields, the transaction ID to use, refunds and double counting are on [Tracking Purchases](../purchases/overview.md). Never send a purchase as a custom event.

### SDK calls

`revenue`, `currency` and `transactionId` are required.

#### iOS (Swift)

```swift
LinkzlySDK.trackPurchase(parameters: [
    "revenue": 29.99,
    "currency": "USD",
    "transactionId": "order-12345"
]) { result in
    switch result {
    case .success: break      // accepted
    case .failure(let error): print("Purchase not sent: \(error)")
    }
}
```

The full API is in [iOS](../sdk/tracking-events.md), [Android](https://docs.linkzly.com/docs/sdk-android#purchases-and-refunds), [React Native](https://docs.linkzly.com/docs/sdk-react-native#revenue) and [Flutter](https://docs.linkzly.com/docs/sdk-flutter#purchases-and-refunds).

**Platform support**

| Platform | Supported | Notes |
|---|---|---|
| iOS | Yes | `trackPurchase` and `trackRefund`. |
| Android | Yes | `trackPurchase` and `trackRefund`. |
| React Native | Yes | `trackPurchase` and `trackRefund`. |
| Flutter | Yes | `trackPurchase` and `trackRefund`. |
