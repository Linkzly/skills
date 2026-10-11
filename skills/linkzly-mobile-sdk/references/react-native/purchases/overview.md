<!-- Generated from https://docs.linkzly.com/docs/sdk-tracking-purchases by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Tracking Purchases

Source: https://docs.linkzly.com/docs/sdk-tracking-purchases

`trackPurchase` is the one way to report revenue from a mobile app, and `trackRefund` reports a reversal. This page tells you which fields to send, where in the purchase flow to make the call, which transaction ID to use, and how to avoid counting the same revenue twice. It applies to all four mobile SDKs, and every code sample is shown in Swift, Kotlin, TypeScript and Dart. What the reported revenue turns into in the console is on the [Revenue & LTV](https://docs.linkzly.com/docs/revenue-ltv) page. Install and configure the SDK first, using the Installation section of your platform page: [iOS](https://docs.linkzly.com/docs/sdk-ios#installation), [Android](https://docs.linkzly.com/docs/sdk-android#installation), [React Native](../sdk/installation.md) or [Flutter](https://docs.linkzly.com/docs/sdk-flutter#installation).

Revenue is as reported by your app. Linkzly records the amount, currency and transaction ID that your code sends. It does not check them against the store.

The store-library samples on this page were checked against: StoreKit 2 (iOS 15 or later; built with Xcode 27.0), Google Play Billing Library `billing-ktx` 7.1.1 (built), `react-native-iap` 16.7.3 (type-checked against its published typings) and `in_app_purchase` 3.3.1 (analyzed with `flutter analyze`). These libraries change their APIs between major versions, so check the names against the version you install.
