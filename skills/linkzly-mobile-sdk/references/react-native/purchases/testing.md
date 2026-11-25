<!-- Generated from https://docs.linkzly.com/docs/sdk-tracking-purchases#testing by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Testing

Source: https://docs.linkzly.com/docs/sdk-tracking-purchases#testing

1. Configure the SDK with the SDK key of the console app you are looking at, and the environment you intend to test with.
2. Make a purchase with the store's sandbox or test account, and check in your logs that your call ran once, after the store confirmed the transaction.
3. Check the result: the callback, completion, promise or future should report success. Once Revenue & LTV is enabled for your organisation, a failure that names HTTP 400 means Linkzly rejected the purchase, which is a missing or wrong field (see [The purchase contract](../purchases/the-purchase-contract.md)).
4. If Revenue & LTV is enabled for your organisation, open Analytics, pick your app and select the Revenue & LTV tab, and look for the purchase. If it is not enabled, nothing is recorded and no figure appears; see [Revenue & LTV](https://docs.linkzly.com/docs/revenue-ltv). A purchase sent as `sandbox` is left out of the figures, and on iOS the SDK marks a TestFlight, Xcode or sandbox purchase that way by itself. To check the environment, make a test purchase sent as `sandbox` and confirm that it does not appear. To see a test purchase in the figures, send it as `production` to a console app you keep for testing, never to your live app: a purchase sent as `production` counts as revenue and can be forwarded to your ad networks.
5. With Revenue & LTV enabled, repeat the call with the same `transactionId` and check that the purchase count does not go up.
6. With Revenue & LTV enabled, send a refund with the same `transactionId` and check that net revenue goes down and gross revenue does not.

The SDK's environment setting (`production`, `staging` or `development`) is not the purchase environment: it selects which Linkzly server address the events go to. Whether a purchase was real or a test is the `environment` key described under [Purchase environment](../purchases/purchase-environment.md).
