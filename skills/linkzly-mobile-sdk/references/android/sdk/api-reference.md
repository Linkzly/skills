<!-- Generated from https://docs.linkzly.com/docs/sdk-android#api-reference by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# API Reference

Source: https://docs.linkzly.com/docs/sdk-android#api-reference

Every public method of `LinkzlySDK`, plus the `LinkzlySDKDebug` helpers. All are static (`@JvmStatic`).

### Setup

| Method | What it does |
|---|---|
| `configure(context, sdkKey, environment = Environment.PRODUCTION)` | Starts the SDK. Call once in `Application.onCreate()`; the first call wins and an invalid key format leaves the SDK unconfigured. |

### Install, open, events

| Method | What it does |
|---|---|
| `trackInstall(callback)` | Sends an install event and returns deferred deep-link data to the callback. The SDK already sends the install on a genuine first launch, so calling this on a new install sends a second install event; on Android it is the only way to get the deferred `DeepLinkData` in code. |
| `trackOpen(callback)` | Sends an open event and returns deep-link data to the callback. Also runs automatically on foreground; an explicit call sends an additional open event. |
| `trackEvent(eventName, parameters)` | Tracks a custom event with an optional `Map<String, Any>`. |
| `trackEventBatch(events, callback)` | Sends a list of event maps (`eventType`, `eventName`, `customData`) in one call. |
| `flushEvents(callback)` | Sends the queued events now. |
| `getPendingEventCount()` | Returns the number of queued events. |
| `getPendingEvents()` | Returns the queued events; empty unless SDK logging is enabled (not `PRODUCTION`). |

### Revenue

| Method | What it does |
|---|---|
| `trackPurchase(parameters, callback)` | Records revenue. Requires `revenue`, `currency` and `transactionId`; `callback` is optional. |
| `trackRefund(parameters, callback)` | Records a refund against the original `transactionId`; `callback` is optional. |

### Identity

| Method | What it does |
|---|---|
| `setUserID(userID)` | Sets your app's user id on later events and rebinds a registered push token to it. Pass `""` to clear. |
| `getUserID()` | Returns the current user id, or `null`. |
| `getVisitorID()` | Returns the auto-generated visitor id. |
| `resetVisitorID()` | Generates a new visitor id. |

### Deep links

| Method | What it does |
|---|---|
| `handleAppLink(intent): DeepLinkData?` | Parses an incoming intent into `DeepLinkData`, or returns `null` when the intent has no URL. |

### Affiliate

| Method | What it does |
|---|---|
| `captureAffiliateAttribution(uri)` | Stores affiliate data found in a deep link URI. Returns `true` when something was stored. |
| `getAffiliateAttribution()` | Returns the stored `AffiliateAttribution`. |
| `getAffiliateClickId()` | Returns the stored affiliate click id, or `null`. |
| `hasAffiliateAttribution()` | Tells you whether valid attribution is stored. |
| `clearAffiliateAttribution()` | Deletes the stored attribution. |

### Push

| Method | What it does |
|---|---|
| `initializePush()` | Subscribes to the broadcast FCM topic; returns `false` until a token registration has stored a topic, or when Firebase is missing. |
| `disablePush()` | Unsubscribes from the broadcast topic. |
| `setNotificationToken(token)` | Registers the FCM token your app passes in. |
| `getNotificationToken()` | Returns the stored token, or `null`. |
| `hasNotificationToken()` | Tells you whether a token is stored. |
| `clearNotificationToken()` | Removes the token locally, revokes it on the server and unsubscribes the topic. |

### Privacy

| Method | What it does |
|---|---|
| `setTrackingEnabled(enabled)` | Turns custom events, purchases, refunds and `trackEventBatch` on or off. Install, open and session-end events the SDK sends itself are not affected. It has no effect before `configure`. |
| `isTrackingEnabled()` | Returns the tracking setting (on by default). |
| `setAdvertisingTrackingEnabled(enabled)` | Turns Google advertising ID collection on or off. |
| `isAdvertisingTrackingEnabled()` | Returns the advertising ID setting. |

### Gaming

| Method | What it does |
|---|---|
| `configureGamingTracking(context, options)` | Starts the gaming pipeline with a `GamingOptions` object. A second form takes `apiKey`, `organizationId`, `gameId` and an `environment`. |
| `identifyGamingPlayer(playerId, traits)` | Sets the current player and optional traits. |
| `trackGamingEvent(eventType, data)` | Queues a gaming event for batched sending. |
| `trackGamingEventImmediate(eventType, data)` | Sends a gaming event without waiting for the batch. |
| `flushGamingEvents(callback)` | Sends the queued gaming events now. |
| `startGamingSession()` | Starts a gaming session (needed only when `autoSessionTracking` is off). |
| `endGamingSession()` | Ends the gaming session. |
| `setGamingAttribution(clickId, deferredDeepLink, metadata)` | Attaches campaign attribution to gaming events. |
| `clearGamingAttribution()` | Removes the gaming attribution. |
| `getGamingPendingEventCount()` | Returns the number of queued gaming events. |
| `hasGamingInflightBatch()` | Tells you whether a gaming batch is being sent. |
| `resetGamingTracking()` | Clears the gaming queue, player id and attribution. |

### Debug (`LinkzlySDKDebug`)

Debuggable app builds only; see [Debug and batching controls](../sdk/debug-and-batching-controls.md). Each method takes a `Context` first.

| Method | What it does |
|---|---|
| `setBatchingStrategy(context, strategy)` | Overrides the batching strategy (`"all"`, `"smart"`, `"instant"`, `"custom"`). |
| `setBatchSize(context, size)` | Overrides the batch size (1 to 100). |
| `setFlushInterval(context, intervalSeconds)` | Overrides the flush interval in seconds (10 to 300). |
| `simulateServerConfig(context, batchSize, flushInterval, ttl, strategy)` | Sets batch size, flush interval and optionally strategy in one call. |
| `resetDebugConfig(context)` | Clears every override. |
| `printDebugConfig(context)` | Logs the current overrides. |
| `getDebugStrategy(context)` | Returns the strategy override, or `null`. |
| `getDebugBatchSize(context)` | Returns the batch size override, or `null`. |
| `getDebugFlushInterval(context)` | Returns the flush interval override in seconds, or `null`. |
| `isAppDebuggable(context)` | Returns `true` when the host app is debuggable. |
