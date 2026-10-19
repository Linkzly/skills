<!-- Generated from https://docs.linkzly.com/docs/sdk-web#smart-links-and-attribution by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Smart Links and Attribution

Source: https://docs.linkzly.com/docs/sdk-web#smart-links-and-attribution

When a smart link sends a visitor to a web address (its **Web Fallback URL**, or the app's), Linkzly adds the click's IDs to that address: `slid` (the smart link), `cid` (the click) and `vid` (the visitor), plus the UTM parameters the smart link was opened with.

On the page the visitor lands on, the SDK:

- reads `slid`, `cid` and `vid` and keeps them for the rest of the tab's session, so every later event, on any page of your site, carries them;
- reads the UTM parameters from the landing URL (from any link, not only smart links) and keeps them for the session in the same way;
- replaces the IDs when the visitor arrives from another smart link in the same tab.

To act on the link in your own code, add a listener. If the page was opened from a Linkzly smart link, the listener is called once with that link. After that it is called on every single-page-app navigation, with or without `autoTrackPageViews`.

```typescript
const unsubscribe = LinkzlySDK.addDeepLinkListener((data) => {
  if (data.smartLinkId) {
    console.log('Opened from smart link', data.smartLinkId);
  }
  // Route with data.path and data.parameters
});

// Later
unsubscribe();
```

`handleSmartLink(url?)` reads a URL, the current page by default, into the same shape:

```typescript
const data = LinkzlySDK.handleSmartLink('https://example.com/product?id=123&slid=abc');
// { url, path: '/product', parameters: { id: '123' }, smartLinkId: 'abc', clickId: null, linkVisitorId: null }
```

| Field | What it holds |
|---|---|
| `url` | The full URL |
| `path` | The URL's path |
| `parameters` | The query parameters, without the Linkzly ones (`slid`, `cid`, `vid`, `smartLinkId`, `clickId` and `_t`) |
| `smartLinkId` | `slid` (or `smartLinkId`) from the URL, or `null` |
| `clickId` | `cid` (or `clickId`) from the URL, or `null` |
| `linkVisitorId` | `vid` from the URL, or `null` |
