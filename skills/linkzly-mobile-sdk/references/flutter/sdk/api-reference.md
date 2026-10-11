<!-- Generated from https://docs.linkzly.com/docs/sdk-flutter#api-reference by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# API Reference

Source: https://docs.linkzly.com/docs/sdk-flutter#api-reference

Every method is called as `Linkzly.instance.<method>(...)`. Methods that exist for one platform only are marked.

### Setup

| Method | Platforms | What it does |
|---|---|---|
| `configure` | iOS, Android | Configures the SDK from a `LinkzlyConfig`; calls `trackOpen` when `autoTrackAppOpens` is true |

### Install, open and events

| Method | Platforms | What it does |
|---|---|---|
| `trackInstall` | iOS, Android | Records an install; returns `DeepLinkData?`. The SDK already sends the install on a genuine first launch, so calling this on a new install sends a second install event. On iOS use `deepLinkStream` for the deferred data; on Android this call is the only way to get it. |
| `trackOpen` | iOS, Android | Records an app open; returns `DeepLinkData?`. The SDK already sends opens itself; an explicit call sends an additional open event |
| `trackEvent` | iOS, Android | Sends a custom event: `trackEvent(name, [parameters])` |
| `trackEventBatch` | iOS, Android | Sends a list of `BatchEvent` in one call |
| `flushEvents` | iOS, Android | Sends queued events now |
| `getPendingEventCount` | iOS, Android | Returns the number of queued events |

### Revenue

| Method | Platforms | What it does |
|---|---|---|
| `trackPurchase` | iOS, Android | Records a purchase; needs `revenue`, `currency`, `transactionId` |
| `trackRefund` | iOS, Android | Records a refund; reuse the original `transactionId` |

### Identity

| Method | Platforms | What it does |
|---|---|---|
| `setUserId` | iOS, Android | Sets your app's user id |
| `getUserId` | iOS, Android | Returns the user id, or `null` |
| `getVisitorId` | iOS, Android | Returns the SDK's visitor id |
| `resetVisitorId` | iOS, Android | Generates a new visitor id |

### Deep links

| Method | Platforms | What it does |
|---|---|---|
| `deepLinkStream` | iOS, Android | Stream of backend-enriched `DeepLinkData` |
| `universalLinkStream` | iOS, Android | Stream of raw `UniversalLinkEvent` captures |
| `handleUniversalLink` | iOS, Android | Resolves a URL you hand over; returns `DeepLinkData?` |

### Affiliate

| Method | Platforms | What it does |
|---|---|---|
| `captureAffiliateAttribution` | iOS, Android | Captures affiliate data from a URL |
| `getAffiliateAttribution` | iOS, Android | Returns the stored `AffiliateAttribution` |
| `getAffiliateClickId` | iOS, Android | Returns the affiliate click id, or `null` |
| `hasAffiliateAttribution` | iOS, Android | Whether affiliate attribution is stored |
| `clearAffiliateAttribution` | iOS, Android | Clears stored affiliate attribution |

### Tracking permission and SKAdNetwork

| Method | Platforms | What it does |
|---|---|---|
| `requestTrackingPermission` | iOS only | Shows the ATT prompt; returns the status string |
| `getAttStatus` | iOS only | Returns the current ATT status |
| `getIdfa` | iOS only | Returns the IDFA when ATT allows it |
| `updateConversionValue` | iOS only | Sends a SKAdNetwork conversion value (0-63) |
| `setAdvertisingTrackingEnabled` | iOS, Android | Turns advertising identifier use on or off |
| `isAdvertisingTrackingEnabled` | iOS, Android | Whether advertising identifier use is on |

### Push

| Method | Platforms | What it does |
|---|---|---|
| `setNotificationToken` | iOS, Android | Registers the device token and subscribes to the broadcast topic |
| `getNotificationToken` | iOS, Android | Returns the stored token, or `null` |
| `hasNotificationToken` | iOS, Android | Whether a token is stored |
| `clearNotificationToken` | iOS, Android | Clears the token and revokes it server-side (durable opt-out) |
| `initializePush` | iOS, Android | Re-subscribes to the broadcast topic (recovery call) |
| `disablePush` | iOS, Android | Unsubscribes for the session only |

### Privacy

| Method | Platforms | What it does |
|---|---|---|
| `setTrackingEnabled` | iOS, Android | Turns custom events, purchases and refunds on or off. Install, open and session-end events the SDK sends itself are not affected; on iOS `trackEventBatch` is not stopped. On Android it has no effect before `configure` |
| `isTrackingEnabled` | iOS, Android | Whether SDK tracking is on |

### Gaming

| Method | Platforms | What it does |
|---|---|---|
| `configureGamingTracking` | iOS, Android | Configures the gaming pipeline |
| `identifyGamingPlayer` | iOS, Android | Identifies a player, with optional traits |
| `trackGamingEvent` | iOS, Android | Tracks a gaming event; `immediate: true` sends it at once |
| `flushGamingEvents` | iOS, Android | Sends queued gaming events now |
| `startGamingSession` | iOS, Android | Starts a gaming session |
| `endGamingSession` | iOS, Android | Ends the gaming session |
| `setGamingAttribution` | iOS, Android | Sets click id, deferred deep link and metadata |
| `clearGamingAttribution` | iOS, Android | Clears gaming attribution |
| `getGamingStatus` | iOS, Android | Returns queue status |
| `resetGamingTracking` | iOS, Android | Resets gaming tracking state |

### Debug

These fail with `DEBUG_ONLY` on iOS and work in debuggable builds on Android. See [Debug and batching controls](../sdk/debug-and-batching-controls.md).

| Method | Platforms | What it does |
|---|---|---|
| `debugSetBatchingStrategy` | Android only | Sets the batching strategy |
| `debugSetBatchSize` | Android only | Sets the batch size |
| `debugSetFlushInterval` | Android only | Sets the flush interval |
| `debugResetConfig` | Android only | Clears the overrides |
| `debugGetConfig` | Android only | Returns the current overrides |
