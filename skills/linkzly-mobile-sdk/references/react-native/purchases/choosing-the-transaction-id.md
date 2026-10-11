<!-- Generated from https://docs.linkzly.com/docs/sdk-tracking-purchases#choosing-the-transaction-id by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Choosing the transaction ID

Source: https://docs.linkzly.com/docs/sdk-tracking-purchases#choosing-the-transaction-id

The `transactionId` is the deduplication key. Linkzly keeps the first purchase it receives for a given combination of organisation, app, transaction ID and direction (purchase or refund), and discards a repeat without an error. The same ID in two different apps is kept in each app. Send each transaction once: deduplication protects against retries and accidental repeats, and is not a way to re-send past transactions.

The match is exact after leading and trailing spaces are trimmed, so `Order-1` and `order-1` are different IDs. Use an ID that is stable: the value you send for a transaction must be the value you would send again if the call were repeated.

| Platform | Use this value |
|---|---|
| iOS, StoreKit 2 | `String(transaction.id)` |
| Android, Google Play Billing | `purchase.orderId` |
| React Native, `react-native-iap` | `purchase.transactionId` (on Android it is empty when Google Play gives no order ID; do not use the purchase token in its place) |
| Flutter, `in_app_purchase` | `purchaseDetails.purchaseID` (on Android it is the order ID, on iOS the transaction identifier) |
| Your own checkout | Your order ID |

Send each renewal your app is told about as its own purchase, with the ID the store gives that renewal. Do not reuse the ID of the first purchase.
