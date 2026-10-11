<!-- Generated from https://docs.linkzly.com/docs/sdk-react-native#initialization by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Initialization

Source: https://docs.linkzly.com/docs/sdk-react-native#initialization

```typescript
import LinkzlySDK, { Environment } from '@linkzly/react-native-sdk';

await LinkzlySDK.configure('slk_your_key_from_console', Environment.PRODUCTION);
```

Signature: `configure(sdkKey, environment = Environment.PRODUCTION, options?)`.

Environments are `Environment.PRODUCTION`, `Environment.STAGING`, and `Environment.DEVELOPMENT` (verbose logging). `STAGING` and `DEVELOPMENT` send to separate Linkzly backends, so events sent with them never show in your console. Use `PRODUCTION` with the key from your console.

`configure` resolves even when the native SDK refused the key. A key that is not `slk_` followed by at least 40 hex characters (the placeholder above is one) leaves the SDK unconfigured for the life of the app process, and later `configure` calls are ignored. After you put the real key in, stop the app and start it again; a JavaScript reload is not enough.

| Option | Default | What it does |
|---|---|---|
| `autoHandleDeepLinks` | `true` | The SDK reads the launch URL (`Linking.getInitialURL()`) and listens for `Linking` `url` events, and passes each URL to the native SDK. Set `false` to handle URLs yourself with `handleUniversalLink`. |
| `autoTrackAppOpens` | `true` | `configure` calls `trackOpen()` in the background. Set `false` to turn this off. |

```typescript
await LinkzlySDK.configure('slk_your_key_from_console', Environment.PRODUCTION, {
    autoHandleDeepLinks: true,
    autoTrackAppOpens: true,
});
```

A typical app-startup pattern:

```typescript
import { useEffect } from 'react';
import LinkzlySDK, { Environment } from '@linkzly/react-native-sdk';

export function useLinkzly(): void {
  useEffect(() => {
    // 1. Subscribe before configuring so cold-start events are not missed
    const unsubscribe = LinkzlySDK.addDeepLinkListener((data) => {
      // data.path, data.parameters, data.smartLinkId, data.clickId
    });

    // 2. Configure the SDK. With autoHandleDeepLinks on (the default), this also
    //    picks up the URL that launched the app.
    LinkzlySDK.configure('slk_your_key_from_console', Environment.PRODUCTION);

    return () => unsubscribe();
  }, []);
}
```

Call `useLinkzly()` from your root component.

Cold start and warm start:

- **Cold start** (app launched from a link): with `autoHandleDeepLinks` on, `configure` reads `Linking.getInitialURL()` for you. A listener added after the link was delivered is called straight away with the last deep link data.
- **Warm start** (app already running): URLs arrive through the `Linking` `url` event, which the SDK listens to, and through the native modules (see Platform Setup above).
- If you set `autoHandleDeepLinks: false`, read `Linking.getInitialURL()` yourself and pass the URL to `handleUniversalLink`.
