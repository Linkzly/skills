<!-- Generated from https://docs.linkzly.com/docs/sdk-web#troubleshooting by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Troubleshooting

Source: https://docs.linkzly.com/docs/sdk-web#troubleshooting

**`configure` throws "invalid sdkKey format".** The key is not `slk_` followed by at least 40 hexadecimal characters, which is the case for the placeholder in these examples. Copy the key from **Manage app**, **Overview**, **SDK Configuration**.

**"LinkzlySDK is not configured. Call LinkzlySDK.configure() first."** A call ran before `configure`, or on the server. In Next.js, call the SDK only from client components, after the `configure` effect has run.

**Nothing is sent.** Check `LinkzlySDK.isTrackingEnabled()`. It is `false` while the browser sends Do Not Track or Global Privacy Control, or after your site called `setTrackingEnabled(false)`, a choice that stays in `localStorage` across visits. Then check the browser's Network tab for requests to `ske.linkzly.com`: a content blocker can stop them. Set `debug: true` to see what the SDK does.

**A custom event does not show up.** Its name must be registered for the app, spelled exactly as in your code. Events sent with `Environment.STAGING` or `Environment.DEVELOPMENT` never show in your console. The Event stream also runs behind the current time: see [Confirming events arrive](https://docs.linkzly.com/docs/sdk-tracking-events#confirming-events-arrive).

**Installs jumped after adding the SDK.** Every browser that had not run the SDK counted as a first visit. Set `autoTrackFirstVisit: false` when you add the SDK to a site that already has visitors.

**More sessions than expected.** Each browser tab has its own session, and a session also ends after 30 minutes without activity.

**A purchase does not show up.** Check that `revenue` is greater than 0 and `currency` and `transactionId` are set, that the transaction ID was not sent before, and that Revenue & LTV is enabled for your organisation.
