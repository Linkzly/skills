<!-- Generated from https://docs.linkzly.com/docs/sdk-integrations-setup#affiliate-attribution by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Affiliate attribution

Source: https://docs.linkzly.com/docs/sdk-integrations-setup#affiliate-attribution

### What it does

When a person opens an affiliate link that lands in your app, the SDK can keep the affiliate click ID, and optionally the program and affiliate IDs, for 30 days. At conversion time your app reads the click ID and sends it to your own server, which reports the conversion to Linkzly.

### Set up in the console

1. Open Affiliate Programs and choose Create Program.
2. Open the program. On the Tracking tab, set up the tracking domain. On the Links tab, choose Create Link to make a tracking link.
3. On the Integration tab, find the API credentials your server uses to report conversions. The conversion fields are described under Conversion Tracking on [Affiliate Marketing](https://docs.linkzly.com/docs/affiliate-marketing).

### Set up in your app project

- The affiliate link has to open your app, so the deep link setup in [Deep links](../integrations/deep-links.md) applies.
- Capture is not automatic. Your code calls `captureAffiliateAttribution` with each incoming URL. The SDK reads `lz_click_id`, and `lz_program_id` and `lz_affiliate_id` when present, and stores them for 30 days. A newer affiliate click overwrites the stored one.
- The SDK does not send the click ID to Linkzly for you. Your server needs a route that receives it from the app.

### SDK calls

#### Android (Kotlin)

```kotlin
// In onCreate and onNewIntent:
LinkzlySDK.captureAffiliateAttribution(intent.data)

// At conversion time:
if (LinkzlySDK.hasAffiliateAttribution()) {
    val clickId = LinkzlySDK.getAffiliateClickId()
    yourApi.reportConversion(clickId, orderId, revenue = 29.99)
}
```

`hasAffiliateAttribution` and `clearAffiliateAttribution` complete the set. The full API is in [iOS](https://docs.linkzly.com/docs/sdk-ios#affiliate-attribution), [Android](../sdk/affiliate-attribution.md), [React Native](https://docs.linkzly.com/docs/sdk-react-native#affiliate-attribution) and [Flutter](https://docs.linkzly.com/docs/sdk-flutter#affiliate-attribution).

**Platform support**

| Platform | Supported | Notes |
|---|---|---|
| iOS | Yes | Stored in the Keychain, with a UserDefaults fallback. |
| Android | Yes | Stored in encrypted SharedPreferences. |
| React Native | Yes | Calls the native stores; capture is manual. |
| Flutter | Yes | Calls the native stores; capture is manual. |
