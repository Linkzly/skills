<!-- Generated from https://docs.linkzly.com/docs/sdk-ios#gaming-intelligence by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Gaming Intelligence

Source: https://docs.linkzly.com/docs/sdk-ios#gaming-intelligence

A separate event pipeline for game telemetry with automatic batching, retry logic, optional HMAC request signing, and offline support.

### Configure

```swift
let options = LinkzlyGamingOptions()
options.gameVersion = "1.2.0"
options.maxBatchSize = 50
options.flushIntervalMs = 10_000
options.debug = true
// options.signingSecret = "..."  // required when HMAC signing is enabled for the game

LinkzlySDK.configureGamingTracking(
    apiKey:         "your_gaming_api_key",
    organizationId: "your_org_id",
    gameId:         "your_game_id",
    environment:    .production,
    options:        options
)
```

### Identify player and track events

```swift
LinkzlySDK.identifyGamingPlayer("player_12345", traits: [
    "level": 42, "vip_tier": "gold"
])

LinkzlySDK.trackGamingEvent("level_complete", data: [
    "level": 5, "score": 12500, "stars": 3
])

// Bypass batching for critical events
LinkzlySDK.trackGamingEventImmediate("purchase", data: [
    "item_id": "sword_of_fire", "price": 4.99, "currency": "USD"
])
```

A gaming `purchase` event is game telemetry and is not recorded as revenue; report revenue with `trackPurchase`.

### Sessions and queue

```swift
LinkzlySDK.startGamingSession()
LinkzlySDK.endGamingSession()

LinkzlySDK.flushGamingEvents { success, error in /* ... */ }
LinkzlySDK.getGamingStatus { status in
    // status.pendingEventCount, status.hasInflightBatch
}
LinkzlySDK.resetGamingTracking()
```

### Gaming attribution

```swift
LinkzlySDK.setGamingAttribution(
    clickId: "click_abc123",
    deferredDeepLink: "https://yourgame.com/promo",
    metadata: ["campaign": "summer_sale"]
)
LinkzlySDK.clearGamingAttribution()
```

### HMAC request signing

HMAC signing is enabled by default for new games. Supply `signingSecret` in `LinkzlyGamingOptions` — the SDK computes the signature and attaches the `X-Signature-256`, `X-Timestamp`, and `X-Nonce` headers to every batch. The replay window is fixed at 300 seconds, so device clocks must be within 5 minutes of UTC. Your signing secret is on your game's **Settings** tab, under **SDK Configuration**, separate from the SDK Key. Never commit it to source — store it in Keychain or inject it via Xcode build settings.

### Options reference

| Option | Default |
|---|---|
| `gameVersion` | `""` |
| `maxBatchSize` | `100` |
| `maxBatchBytes` | `524288` (512 KB) |
| `flushIntervalMs` | `5000` |
| `maxRetries` | `3` |
| `retryDelayMs` | `1000` |
| `maxQueueSize` | `10000` |
| `sessionTimeoutMs` | `1800000` (30 min) |
| `autoSessionTracking` | `true` |
| `signingSecret` | `nil` |
| `debug` | `false` |
