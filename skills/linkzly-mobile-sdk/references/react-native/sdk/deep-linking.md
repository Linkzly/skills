<!-- Generated from https://docs.linkzly.com/docs/sdk-react-native#deep-linking by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Deep Linking

Source: https://docs.linkzly.com/docs/sdk-react-native#deep-linking

```typescript
const unsubscribe = LinkzlySDK.addDeepLinkListener((data) => {
    // data.path, data.parameters, data.smartLinkId, data.clickId
});

// Universal/App link raw capture (fires before server enrichment)
LinkzlySDK.addUniversalLinkListener((event) => {
    // event.url, event.attributionData
});

// Manual handling (when autoHandleDeepLinks: false)
await LinkzlySDK.handleUniversalLink(url);

// Auto handling can also be switched at runtime
LinkzlySDK.setAutoHandleDeepLinks(false);
const autoHandling = LinkzlySDK.isAutoHandleDeepLinksEnabled();

// Cleanup
unsubscribe();
LinkzlySDK.removeAllListeners();
```

Both `addDeepLinkListener` and `addUniversalLinkListener` return an unsubscribe function. Call it in your cleanup, or call `removeAllListeners()` to drop every listener. `handleUniversalLink` resolves to `null` on iOS (the data arrives through the listeners) and to `DeepLinkData | null` on Android.

`DeepLinkData` shape:

```typescript
interface DeepLinkData {
    url?: string;
    path?: string;
    parameters: Record<string, any>;
    smartLinkId?: string;
    clickId?: string;
}
```
