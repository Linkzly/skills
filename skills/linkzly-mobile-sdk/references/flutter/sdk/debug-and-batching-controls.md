<!-- Generated from https://docs.linkzly.com/docs/sdk-flutter#debug-and-batching-controls by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Debug and batching controls

Source: https://docs.linkzly.com/docs/sdk-flutter#debug-and-batching-controls

These controls do not work on iOS. On iOS every `debug...` call fails with a `PlatformException` whose code is `DEBUG_ONLY`, because the published iOS SDK ships without its debug class. On Android they work in debuggable app builds only; in a release build they fail.

| Method | Signature | Android (debuggable build) |
|---|---|---|
| `debugSetBatchingStrategy` | `(String strategy)` | Sets the batching strategy: `"all"` batches every event, `"smart"` (the default) batches custom events only, `"instant"` sends everything at once, `"custom"` behaves like `"smart"` |
| `debugSetBatchSize` | `(int size)` | Sets the batch size |
| `debugSetFlushInterval` | `(double intervalSeconds)` | Sets the flush interval in seconds |
| `debugResetConfig` | `()` | Clears the three overrides above |
| `debugGetConfig` | `() -> Map<String, Object?>?` | Returns `strategy`, `batchSize` and `flushInterval`, or `null` when none is set |

```dart
import 'package:flutter/services.dart' show PlatformException;

try {
  await Linkzly.instance.debugSetBatchSize(5);
  final Map<String, Object?>? config = await Linkzly.instance.debugGetConfig();
  // {strategy: null, batchSize: 5, flushInterval: null}
} on PlatformException catch (e) {
  if (e.code != 'DEBUG_ONLY') rethrow; // iOS
}
```

The Flutter plugin has no `simulateServerConfig` or `printDebugConfig`. Do not call these controls from production code paths.
