<!-- Generated from https://docs.linkzly.com/docs/sdk-react-native#affiliate-attribution by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Affiliate Attribution

Source: https://docs.linkzly.com/docs/sdk-react-native#affiliate-attribution

Affiliate clicks are **not captured automatically** — call `captureAffiliateAttribution(url)` from your deep link handler:

```typescript
LinkzlySDK.addUniversalLinkListener(async (data) => {
    await LinkzlySDK.captureAffiliateAttribution(data.url);
});
```

At conversion time, retrieve the stored click ID and send it to your server for server-to-server conversion tracking:

```typescript
const clickId = await LinkzlySDK.getAffiliateClickId();
if (clickId) {
    await fetch('https://your-backend.com/api/conversions', {
        method: 'POST',
        body: JSON.stringify({ click_id: clickId, order_value: 99.99, currency: 'USD' })
    });
}

const attribution = await LinkzlySDK.getAffiliateAttribution();
const hasAttribution = await LinkzlySDK.hasAffiliateAttribution();
await LinkzlySDK.clearAffiliateAttribution();
```

Storage delegates to native — Keychain on iOS, EncryptedSharedPreferences (AES256-GCM) on Android. Data expires after **30 days**.
