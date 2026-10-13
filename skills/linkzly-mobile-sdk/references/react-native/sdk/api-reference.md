<!-- Generated from https://docs.linkzly.com/docs/sdk-react-native#api-reference by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# API Reference

Source: https://docs.linkzly.com/docs/sdk-react-native#api-reference

Platform column: `iOS + Android` means the call reaches both native SDKs.

### Setup

| Method | Platforms | What it does |
|---|---|---|
| `configure` | iOS + Android | Initializes the SDK: `configure(sdkKey, environment = Environment.PRODUCTION, options?: { autoHandleDeepLinks?, autoTrackAppOpens? })`. |

### Install, open, events

| Method | Platforms | What it does |
|---|---|---|
| `trackInstall` | iOS + Android | Tracks an install; resolves to `DeepLinkData` or `null`. The SDK already sends the install on a genuine first launch, so calling this on a new install sends a second install event. On iOS use `addDeepLinkListener` for the deferred data; on Android this call is the only way to get it. |
| `trackOpen` | iOS + Android | Tracks an app open; resolves to `DeepLinkData` or `null`. The SDK already sends opens itself; an explicit call sends an additional open event. |
| `trackEvent` | iOS + Android | Tracks a custom event with optional parameters. |
| `trackEventBatch` | iOS + Android | Tracks several events in one call; resolves to a boolean. |
| `flushEvents` | iOS + Android | Sends queued events now; resolves to a boolean. |
| `getPendingEventCount` | iOS + Android | Returns the number of queued events. |

### Revenue

| Method | Platforms | What it does |
|---|---|---|
| `trackPurchase` | iOS + Android | Tracks a purchase; `revenue`, `currency` and `transactionId` are required. |
| `trackRefund` | iOS + Android | Tracks a refund; reuse the original `transactionId`. |

### Identity

| Method | Platforms | What it does |
|---|---|---|
| `setUserID` | iOS + Android | Sets your user ID for attribution. |
| `getUserID` | iOS + Android | Returns the current user ID, or `null`. |
| `getVisitorID` | iOS + Android | Returns the persistent visitor ID. |
| `resetVisitorID` | iOS + Android | Generates a new visitor ID. |

### Deep links

| Method | Platforms | What it does |
|---|---|---|
| `handleUniversalLink` | iOS + Android | Passes a URL to the native SDK; resolves to `null` on iOS. |
| `addDeepLinkListener` | iOS + Android | Adds a deep link listener; returns an unsubscribe function. |
| `addUniversalLinkListener` | iOS + Android | Adds a raw universal/app link listener; returns an unsubscribe function. |
| `removeAllListeners` | iOS + Android | Removes every listener. |
| `setAutoHandleDeepLinks` | iOS + Android | Turns automatic URL handling on or off. |
| `isAutoHandleDeepLinksEnabled` | iOS + Android | Returns whether automatic URL handling is on. |

### Affiliate

| Method | Platforms | What it does |
|---|---|---|
| `captureAffiliateAttribution` | iOS + Android | Reads affiliate parameters from a URL and stores them; resolves to a boolean. |
| `getAffiliateAttribution` | iOS + Android | Returns the stored attribution object. |
| `getAffiliateClickId` | iOS + Android | Returns the stored click ID, or `null`. |
| `hasAffiliateAttribution` | iOS + Android | Returns whether unexpired attribution exists. |
| `clearAffiliateAttribution` | iOS + Android | Clears stored attribution. |

### Tracking permission and SKAdNetwork

| Method | Platforms | What it does |
|---|---|---|
| `requestTrackingPermission` | iOS only | Shows the ATT prompt; resolves to the status string (`'unsupported'` on Android). Rejects with `UNSUPPORTED_IOS` before iOS 14.5. |
| `getATTStatus` | iOS only | Returns the ATT status, or `null` on Android. |
| `getIDFA` | iOS only | Returns the IDFA, or `null` (also `null` on Android). |
| `setAdvertisingTrackingEnabled` | iOS + Android | Turns advertising-ID collection on or off. |
| `isAdvertisingTrackingEnabled` | iOS + Android | Returns whether advertising-ID collection is on. |
| `updateConversionValue` | iOS only | Updates the SKAdNetwork conversion value (0 to 63); resolves to `false` on Android. |

### Push

| Method | Platforms | What it does |
|---|---|---|
| `initializePush` | iOS + Android | Re-subscribes to the stored broadcast topic (recovery; Firebase Cloud Messaging only). |
| `disablePush` | iOS + Android | Unsubscribes from the broadcast topic for this session. |
| `setNotificationToken` | iOS + Android | Registers the FCM registration token with Linkzly (the Firebase token on iOS too, not the APNs device token). |
| `getNotificationToken` | iOS + Android | Returns the stored token, or `null`. |
| `hasNotificationToken` | iOS + Android | Returns whether a token is stored. |
| `clearNotificationToken` | iOS + Android | Clears the token and revokes it server-side (durable opt-out). |

### Privacy

| Method | Platforms | What it does |
|---|---|---|
| `setTrackingEnabled` | iOS + Android | Turns custom events, purchases and refunds on or off. Install, open and session-end events the SDK sends itself are not affected; on iOS `trackEventBatch` is not stopped. On Android it has no effect before `configure`. |
| `isTrackingEnabled` | iOS + Android | Returns whether tracking is on. |

### Gaming

| Method | Platforms | What it does |
|---|---|---|
| `configureGamingTracking` | iOS + Android | Configures the gaming pipeline. |
| `identifyGamingPlayer` | iOS + Android | Sets the player identity and traits. |
| `trackGamingEvent` | iOS + Android | Tracks a gaming event; pass `true` as the third argument to send immediately. |
| `flushGamingEvents` | iOS + Android | Sends queued gaming events now. |
| `startGamingSession` | iOS + Android | Starts a gaming session. |
| `endGamingSession` | iOS + Android | Ends the gaming session. |
| `setGamingAttribution` | iOS + Android | Sets click ID, deferred deep link and metadata. |
| `clearGamingAttribution` | iOS + Android | Clears gaming attribution. |
| `resetGamingTracking` | iOS + Android | Clears the queue, player and attribution. |
| `getGamingStatus` | iOS + Android | Returns `pendingEventCount` and `hasInflightBatch`. |

### Debug (`LinkzlyDebug`)

Rejects with `DEBUG_ONLY` on iOS; works in debuggable builds on Android.

| Method | Platforms | What it does |
|---|---|---|
| `setBatchingStrategy` | Android (debuggable) | Sets `'all'`, `'smart'`, `'instant'` or `'custom'`. |
| `setBatchSize` | Android (debuggable) | Sets events per batch (1 to 100). |
| `setFlushInterval` | Android (debuggable) | Sets the flush interval in seconds (10 to 300). |
| `simulateServerConfig` | Android (debuggable) | Sets batch size, flush interval and optional strategy at once. |
| `resetDebugConfig` | Android (debuggable) | Clears all debug overrides. |
| `printDebugConfig` | Android (debuggable) | Logs the debug configuration to the native console. |
| `getDebugConfig` | Android (debuggable) | Returns `{ strategy, batchSize, flushInterval }` or `null`. |
| `getPendingEventCount` | iOS + Android | Returns the number of queued events (same as on `LinkzlySDK`). |
| `flushEvents` | iOS + Android | Sends queued events now (same as on `LinkzlySDK`). |
