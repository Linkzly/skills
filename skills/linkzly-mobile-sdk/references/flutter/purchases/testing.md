<!-- Generated from https://docs.linkzly.com/docs/sdk-tracking-purchases#testing by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Testing

Source: https://docs.linkzly.com/docs/sdk-tracking-purchases#testing

1. Configure the SDK with the SDK key of the console app you are looking at, and the environment you intend to test with.
2. Make a purchase with the store's sandbox or test account, and check in your logs that your call ran once, after the store confirmed the transaction.
3. Check the result: the callback, completion, promise or future should report success. Once Revenue & LTV is enabled for your organisation, a failure that names HTTP 400 means Linkzly rejected the purchase, which is a missing or wrong field (see [The purchase contract](../purchases/the-purchase-contract.md)).
4. If Revenue & LTV is enabled for your organisation, open Analytics, pick your app and select the Revenue & LTV tab, and look for the purchase. If it is not enabled, nothing is recorded and no figure appears; see [Revenue & LTV](https://docs.linkzly.com/docs/revenue-ltv).
5. With Revenue & LTV enabled, repeat the call with the same `transactionId` and check that the purchase count does not go up.
6. With Revenue & LTV enabled, send a refund with the same `transactionId` and check that net revenue goes down and gross revenue does not.

Linkzly has no way to tell a sandbox purchase from a real one. Nothing in the SDK or in Linkzly looks at it, so a sandbox purchase is counted like any other purchase for the app and environment it is sent to. The SDK's environment setting (`production`, `staging` or `development`) selects which Linkzly server address the events go to. Use an app and environment whose figures you are prepared to see test purchases in.
