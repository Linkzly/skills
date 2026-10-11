<!-- Generated from https://docs.linkzly.com/docs/sdk-flutter#affiliate-attribution by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Affiliate Attribution

Source: https://docs.linkzly.com/docs/sdk-flutter#affiliate-attribution

Affiliate helpers are available via `Linkzly.instance` and delegate to the native SDKs:

```dart
// Capture from a deep link URL: call this from your universal/app link handler
await Linkzly.instance.captureAffiliateAttribution(url);

// At checkout, retrieve the affiliate click ID
final String? clickId = await Linkzly.instance.getAffiliateClickId();

final AffiliateAttribution attribution =
    await Linkzly.instance.getAffiliateAttribution();
final bool hasAttribution = await Linkzly.instance.hasAffiliateAttribution();
await Linkzly.instance.clearAffiliateAttribution();
```

`AffiliateAttribution` has `clickId`, `programId`, `affiliateId`, `timestamp`, `hasAttribution` and `source`.
