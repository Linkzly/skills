<!-- Generated from https://docs.linkzly.com/docs/sdk-flutter#deep-linking-and-universal-links by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Deep Linking and Universal Links

Source: https://docs.linkzly.com/docs/sdk-flutter#deep-linking-and-universal-links

The plugin exposes two streams:

- `deepLinkStream`: backend-enriched `DeepLinkData` (`url`, `path`, `smartLinkId`, `clickId`, `parameters`, including deferred deep link data on fresh installs).
- `universalLinkStream`: raw `UniversalLinkEvent` from the OS (`url`, `path`, `parameters`, `attributionData`).

```dart
final subscription = Linkzly.instance.deepLinkStream.listen((DeepLinkData data) {
  switch (data.path) {
    case '/product': /* route */ break;
    case '/promo':   /* route */ break;
  }
});

// Manual handling: returns the resolved link, or null
final DeepLinkData? resolved = await Linkzly.instance.handleUniversalLink(url);
```

Cancel subscriptions when no longer needed (`subscription.cancel()`).
