<!-- Generated from https://docs.linkzly.com/docs/sdk-android#debug-and-batching-controls by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Debug and batching controls

Source: https://docs.linkzly.com/docs/sdk-android#debug-and-batching-controls

`LinkzlySDKDebug` (in `com.linkzly.sdk.utils`) lets you change how the event queue batches and flushes, so you can watch events arrive without waiting for the default timers. It is for development builds only.

**When they take effect.** Each method first checks whether your app is debuggable (`isAppDebuggable(context)`, which reads your app's `FLAG_DEBUGGABLE`, not the SDK library's build type). In a debuggable build the values you set override the server-driven configuration and the defaults. In a non-debuggable build the setters log a warning and do nothing, and the getters return `null`. The queue also ignores the saved overrides in a non-debuggable build.

**Strategies.** The strategy is one of these strings:

| Strategy | Effect |
|---|---|
| `"smart"` | Only custom events are batched; install, open and purchase events are sent immediately. This is the default. |
| `"all"` | Every event type is batched. |
| `"instant"` | Nothing is batched; every event is sent immediately. |
| `"custom"` | Same as `"smart"`. |

The `BatchingStrategy` class in the SDK's `models` package is deprecated and is not used by these methods.

**Limits and defaults.** Batch size accepts 1 to 100 (default 20). Flush interval is in seconds and accepts 10 to 300 (default 30). Out-of-range values throw `IllegalArgumentException`.

```kotlin
LinkzlySDKDebug.setBatchingStrategy(context, "all")
LinkzlySDKDebug.setBatchSize(context, 5)
LinkzlySDKDebug.setFlushInterval(context, 15)

LinkzlySDKDebug.printDebugConfig(context)        // logs the current values
val strategy: String? = LinkzlySDKDebug.getDebugStrategy(context)
val size: Int? = LinkzlySDKDebug.getDebugBatchSize(context)
val interval: Long? = LinkzlySDKDebug.getDebugFlushInterval(context)

// Set batch size, flush interval and (optionally) strategy in one call
LinkzlySDKDebug.simulateServerConfig(context, batchSize = 10, flushInterval = 30, strategy = "all")

LinkzlySDKDebug.resetDebugConfig(context)        // back to defaults
```

After `simulateServerConfig`, restart the SDK or call `flushEvents` to apply the change immediately. The `ttl` parameter of `simulateServerConfig` is unused.

Do not ship calls to these methods in a release build.
