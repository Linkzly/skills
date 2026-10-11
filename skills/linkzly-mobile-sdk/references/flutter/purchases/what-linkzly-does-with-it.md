<!-- Generated from https://docs.linkzly.com/docs/sdk-tracking-purchases#what-linkzly-does-with-it by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# What Linkzly does with it

Source: https://docs.linkzly.com/docs/sdk-tracking-purchases#what-linkzly-does-with-it

Revenue is as reported by your app. Linkzly does not check the amount, the currency or the transaction against the store. The `receipt` key is forwarded by the SDK, but Linkzly keeps only a flag that a receipt was present and drops the value, and nothing uses it, so there is no reason to send it.

Once a purchase is recorded, repeated transactions are discarded, the amount is converted to USD, and the install campaign, source, platform and country of the user are attached. Purchases are kept apart from your custom events, so they do not appear in the Analytics event stream.

Purchases are recorded only when Revenue & LTV is enabled for your organisation. Linkzly enables it per organisation; contact Linkzly support to have it enabled. Until it is, a purchase call returns success and nothing is recorded. If purchases you reported do not show up, this is one cause to rule out before you look at your code.

Once Revenue & LTV is enabled for your organisation, the figures appear on the Revenue & LTV tab in Analytics, with your app selected: gross and net revenue, purchases and refunds, payers, and lifetime value by install cohort. That reporting is described on the [Revenue & LTV](https://docs.linkzly.com/docs/revenue-ltv) page. Events and the names you register for them are on the [Tracking Events](../events/overview.md) page.
