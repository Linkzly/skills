<!-- Generated from https://docs.linkzly.com/docs/sdk-react-native#debug-and-batching-controls by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Debug and batching controls

Source: https://docs.linkzly.com/docs/sdk-react-native#debug-and-batching-controls

These controls do not work on iOS: on iOS every `LinkzlyDebug` batching call rejects with the error code `DEBUG_ONLY`, because the published iOS SDK does not include the debug class. On Android they work in debuggable app builds only; in a release build they reject with `DEBUG_ONLY` too.

`LinkzlyDebug` is a named export, used to try different batching settings while testing:

```typescript
import { LinkzlyDebug } from '@linkzly/react-native-sdk';
import type { BatchingStrategy } from '@linkzly/react-native-sdk';

export async function tryBatching(): Promise<void> {
  const strategy: BatchingStrategy = 'all';
  await LinkzlyDebug.setBatchingStrategy(strategy);
  await LinkzlyDebug.setBatchSize(5);
  await LinkzlyDebug.setFlushInterval(60);
  await LinkzlyDebug.simulateServerConfig({ batchSize: 10, flushInterval: 60, strategy: 'smart' });
  await LinkzlyDebug.printDebugConfig();
  const config = await LinkzlyDebug.getDebugConfig(); // { strategy?, batchSize?, flushInterval? } | null
  console.log(config);
  await LinkzlyDebug.resetDebugConfig();
}
```

`BatchingStrategy` values:

| Value | Meaning |
|---|---|
| `'all'` | Batch all events (install, open, purchase, custom) |
| `'smart'` | Batch only custom events (the default) |
| `'instant'` | Send every event immediately, no batching |
| `'custom'` | Same as `'smart'` |

Ranges checked in JavaScript before the call: `setBatchSize` takes 1 to 100; `setFlushInterval` takes 10 to 300 seconds; `simulateServerConfig` checks both and takes an optional `ttl` and `strategy`. `LinkzlyDebug` also has `getPendingEventCount()` and `flushEvents()`, which behave like the same-named methods on `LinkzlySDK`.
