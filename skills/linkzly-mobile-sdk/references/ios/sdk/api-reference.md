<!-- Generated from https://docs.linkzly.com/docs/sdk-ios#api-reference by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# API Reference

Source: https://docs.linkzly.com/docs/sdk-ios#api-reference

All methods are static methods on `LinkzlySDK` (module `Linkzly`) unless the group says otherwise. Signatures come from the shipped interface of version 1.0.7.

### Setup

| Method | What it does |
|---|---|
| `configure(sdkKey:environment:)` | Configures the SDK. `environment` defaults to `.production`. The first call wins, and a failed call (a rejected key) is also final for the process. |
| `configure(sdkKey:)` | Objective-C form of the call above; uses `.production`. |

### Install, open and events

| Method | What it does |
|---|---|
| `trackInstall(completion:)` | Records an install and returns `Result<DeepLinkData?, Error>`. The SDK already sends the install on a genuine first launch, so calling this on a new install sends a second install event; register `onDeepLink` to get the deferred `DeepLinkData` without it. |
| `trackOpen(completion:)` | Records an app open and returns `Result<DeepLinkData?, Error>`. The SDK already sends opens itself; an explicit call sends an additional open event. |
| `trackInstallObjC(completion:)` | Objective-C form of `trackInstall`; completion receives `DeepLinkData?` and `Error?`. |
| `trackOpenObjC(completion:)` | Objective-C form of `trackOpen`. |
| `trackEvent(_:parameters:)` | Sends a custom event with optional parameters. |
| `trackEventBatch(_:completion:)` | Sends several events in one call. |
| `flushEvents(completion:)` | Sends the queued events now. |
| `getPendingEventCount()` | Returns how many events are waiting in the queue. |

### Revenue

| Method | What it does |
|---|---|
| `trackPurchase(parameters:completion:)` | Records a purchase. `revenue`, `currency` and `transactionId` are required. See [Tracking purchases](../purchases/overview.md). |
| `trackRefund(parameters:completion:)` | Records a refund of an earlier purchase; pass the original `transactionId`. |

### Identity

| Method | What it does |
|---|---|
| `setUserID(_:)` | Stores your user ID and re-registers a stored push token against it. |
| `getUserID()` | Returns the stored user ID, or `nil`. |
| `getVisitorID()` | Returns the persistent visitor ID. |
| `resetVisitorID()` | Generates a new visitor ID. |

### Deep links

| Method | What it does |
|---|---|
| `handleUniversalLink(_:)` | Handles a Universal Link. Two forms: one takes an `NSUserActivity`, one takes a `URL`. Returns `true` when handled. |
| `onDeepLink(_:)` | Registers a handler called when the server returns attribution data. |
| `onUniversalLink(_:)` | Registers a handler called as soon as a Universal Link is captured. |
| `application(_:open:options:)` | App delegate helper that forwards an opened URL to the SDK. |
| `application(_:continue:restorationHandler:)` | App delegate helper that forwards a Universal Link activity to the SDK. |

### Deep link data (`DeepLinkData`)

| Method | What it does |
|---|---|
| `getParameter(_:)` | Returns the raw value for a key, or `nil`. |
| `getStringParameter(_:)` | Returns the value as a `String?`. |
| `getNumberParameter(_:)` | Returns the value as an `NSNumber?`. |
| `getBoolParameter(_:)` | Returns the value as a `Bool`. |

### Affiliate

| Method | What it does |
|---|---|
| `captureAffiliateAttribution(from:)` | Stores affiliate attribution found in a URL. Returns `true` when it found some. |
| `getAffiliateAttribution()` | Returns the stored `AffiliateAttribution`. |
| `getAffiliateClickId()` | Returns the stored affiliate click ID, or `nil`. |
| `hasAffiliateAttribution()` | Returns `true` when unexpired attribution is stored. |
| `clearAffiliateAttribution()` | Deletes the stored attribution. |

### Tracking permission and SKAdNetwork

| Method | What it does |
|---|---|
| `requestTrackingPermission(completion:)` | Shows the App Tracking Transparency prompt (iOS 14.5+). |
| `requestTrackingPermissionObjC(completion:)` | Objective-C form; completion receives the status as a string. |
| `getATTStatus()` | Returns the current ATT status as a string, or `nil`. |
| `getIDFA()` | Returns the advertising identifier, or `nil` when not authorized. |
| `setAdvertisingTrackingEnabled(_:)` | Turns IDFA collection on or off inside your app. |
| `isAdvertisingTrackingEnabled()` | Returns whether IDFA collection is on. |
| `updateConversionValue(_:)` | Updates the SKAdNetwork conversion value on the device. Five forms: fine value; fine value with completion; with coarse value; with coarse value and completion; with coarse value, `lockWindow` and completion. The coarse forms need iOS 16.1. |

### Push

| Method | What it does |
|---|---|
| `initializePush()` | Re-runs the broadcast topic subscription; returns `false` until a registration has succeeded. |
| `disablePush()` | Unsubscribes from the broadcast topic for the session. |
| `setNotificationToken(_:)` | Registers the device's push token with Linkzly. |
| `getNotificationToken()` | Returns the stored push token, or `nil`. |
| `hasNotificationToken()` | Returns `true` when a token is stored. |
| `clearNotificationToken()` | Removes the token on the device and revokes it with Linkzly. |

### Privacy

| Method | What it does |
|---|---|
| `setTrackingEnabled(_:)` | Turns custom events, purchases and refunds on or off. Install, open and session-end events the SDK sends itself are not affected, and `trackEventBatch` is not stopped. |
| `isTrackingEnabled()` | Returns whether tracking is on. |

### Gaming

| Method | What it does |
|---|---|
| `configureGamingTracking(apiKey:organizationId:gameId:environment:options:)` | Configures the gaming pipeline. A second form omits `environment`. |
| `identifyGamingPlayer(_:traits:)` | Sets the current player and optional traits. |
| `trackGamingEvent(_:data:)` | Queues a gaming event for the next batch. |
| `trackGamingEventImmediate(_:data:)` | Sends a gaming event without waiting for a batch. |
| `flushGamingEvents(_:completion:)` | Sends queued gaming events now. |
| `startGamingSession()` | Starts a gaming session manually. |
| `endGamingSession()` | Ends the gaming session. |
| `setGamingAttribution(clickId:deferredDeepLink:metadata:)` | Attaches attribution to gaming events. |
| `clearGamingAttribution()` | Removes the gaming attribution. |
| `getGamingStatus(_:)` | Returns the pending event count and whether a batch is in flight. |
| `resetGamingTracking()` | Clears the player and resets the gaming pipeline. |
