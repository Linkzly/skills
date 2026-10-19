<!-- Generated from https://docs.linkzly.com/docs/sdk-web#api-reference by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# API Reference

Source: https://docs.linkzly.com/docs/sdk-web#api-reference

All methods are on the default export (`LinkzlySDK`) and are also named exports.

### Setup

| Method | Returns |
|---|---|
| `configure(sdkKey, environment?, options?)` | `void`. Throws on a malformed key |
| `destroy()` | `void`. Queues time on page and scroll depth, removes the SDK's listeners and timers, and leaves unsent events for the next page. `configure` can be called again afterwards |

### Events and purchases

| Method | Returns |
|---|---|
| `trackEvent(eventName, parameters?)` | `Promise<void>` |
| `trackEventBatch(events)` | `Promise<boolean>` |
| `trackPageView(pageUrl?, parameters?)` | `Promise<void>` |
| `trackPurchase(purchase)` | `Promise<void>` |
| `trackRefund(refund)` | `Promise<void>` |
| `trackFirstVisit()` | `Promise<void>`. Sends one more `install`; the SDK sends it itself |
| `trackOpen()` | `Promise<void>`. Sends one more `open`; the SDK sends it itself |
| `flushEvents()` | `Promise<boolean>` |
| `getPendingEventCount()` | `number` |

The `track` methods queue the event before their promise resolves, so you do not need to `await` them.

### Smart links

| Method | Returns |
|---|---|
| `handleSmartLink(url?)` | `DeepLinkData` |
| `addDeepLinkListener(listener)` | A function that removes the listener |
| `removeAllListeners()` | `void` |

### Identity

| Method | Returns |
|---|---|
| `setUserID(userID)` | `void` |
| `getUserID()` | `string` or `null` |
| `clearUserID()` | `void` |
| `getVisitorID()` | `string` |
| `resetVisitorID()` | `string`, the new ID |

### Sessions

| Method | Returns |
|---|---|
| `getSessionId()` | `string` |
| `startSession()` | `string`, the new session ID. Sends `session_end` for the current session and `open` for the new one |
| `endSession()` | `void`. Queues time on page and scroll depth, and sends `session_end` |

### Privacy

| Method | Returns |
|---|---|
| `setTrackingEnabled(enabled)` | `void` |
| `isTrackingEnabled()` | `boolean` |

The identity and privacy methods, `removeAllListeners` and `destroy` also work before `configure`. Every other method needs `configure` first.

The package exports these TypeScript types: `LinkzlyWebConfig`, `EventParameters`, `BatchEvent`, `PurchaseParams`, `RevenueData`, `DeepLinkData`, `DeepLinkListener`, `UTMParameters`, `AttributionData`, `BrowserFingerprint`, `TrackingPayload` and `EventType`, plus the `Environment` enum, the `LinkzlyWebSDK` class and `SDK_VERSION`.
