<!-- Generated from https://docs.linkzly.com/docs/sdk-android#gaming-tracking by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Gaming Tracking

Source: https://docs.linkzly.com/docs/sdk-android#gaming-tracking

A separate event pipeline for game telemetry with automatic batching, retry logic, optional HMAC request signing, and offline support.

### Configure

```kotlin
LinkzlySDK.configureGamingTracking(
    context = this,
    options = LinkzlyGamingTracking.GamingOptions(
        apiKey         = "YOUR_GAMING_API_KEY",
        organizationId = "YOUR_ORG_ID",
        gameId         = "YOUR_GAME_ID",
        gameVersion    = BuildConfig.VERSION_NAME,
        debug          = BuildConfig.DEBUG,
        signingSecret  = "YOUR_SIGNING_SECRET" // required when HMAC signing is enabled for the game
    )
)
```

There is also a shorthand, `configureGamingTracking(context, apiKey, organizationId, gameId, environment)`, that picks the gaming endpoint from the `Environment`.

### Identify player and track events

```kotlin
LinkzlySDK.identifyGamingPlayer(
    playerId = "player_abc123",
    traits   = mapOf("level" to 42, "vip_tier" to "gold")
)

LinkzlySDK.trackGamingEvent("level_complete", mapOf(
    "level" to 15, "score" to 48000, "stars" to 3
))

// Bypass the batch queue for critical events
LinkzlySDK.trackGamingEventImmediate("purchase", mapOf(
    "item" to "gem_pack_100", "price" to 4.99, "currency" to "USD"
))
```

A gaming `purchase` event is game telemetry and is not recorded as revenue; report revenue with `trackPurchase`.

### Sessions and queue

```kotlin
LinkzlySDK.startGamingSession()         // only needed when autoSessionTracking = false
LinkzlySDK.endGamingSession()

LinkzlySDK.flushGamingEvents { result -> /* ... */ }
val count: Int = LinkzlySDK.getGamingPendingEventCount()
val inflight: Boolean = LinkzlySDK.hasGamingInflightBatch()
LinkzlySDK.resetGamingTracking()        // clear queue + player ID + attribution
```

### Gaming attribution

```kotlin
LinkzlySDK.setGamingAttribution(
    clickId          = "click_abc123",
    deferredDeepLink = "yourapp://game/promo?bonus=100",
    metadata         = mapOf("campaign" to "summer_sale")
)
LinkzlySDK.clearGamingAttribution()
```

### HMAC request signing

HMAC signing is enabled by default for new games. Supply `signingSecret` in `GamingOptions`: the SDK computes the signature and attaches the `X-Signature-256`, `X-Timestamp`, and `X-Nonce` headers to every batch. The replay window is fixed at 300 seconds, so device clocks must be within 5 minutes of UTC. Your signing secret is on your game's **Settings** tab, under **SDK Configuration**, separate from your SDK Key. Never commit it to source; use Gradle secrets or a build-time injection mechanism.

### GamingOptions reference

| Option | Default | Notes |
|---|---|---|
| `apiKey`, `organizationId`, `gameId` | required | |
| `baseUrl` | `https://gaming.linkzly.com` | Override only for a custom deployment |
| `maxBatchSize` | `100` | |
| `maxBatchBytes` | `524288` (512 KB) | |
| `flushIntervalMs` | `5000` | |
| `maxRetries` | `3` | |
| `retryDelayMs` | `1000` | |
| `maxQueueSize` | `10000` | |
| `sessionTimeoutMs` | `1800000` (30 min) | |
| `autoSessionTracking` | `true` | |
| `signingSecret` | `null` | Required when HMAC is enabled |
| `debug` | `false` | Verbose logs under `LinkzlyGaming` tag |
