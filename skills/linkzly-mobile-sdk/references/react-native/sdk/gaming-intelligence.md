<!-- Generated from https://docs.linkzly.com/docs/sdk-react-native#gaming-intelligence by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Gaming Intelligence

Source: https://docs.linkzly.com/docs/sdk-react-native#gaming-intelligence

A separate event pipeline for game telemetry with automatic batching, retry logic, optional HMAC signing, and offline support.

```typescript
await LinkzlySDK.configureGamingTracking(
    'your_gaming_api_key',
    'your_org_id',
    'your_game_id',
    Environment.PRODUCTION,
    { gameVersion: '1.2.0', maxBatchSize: 50, flushIntervalMs: 10_000, debug: true }
);

await LinkzlySDK.identifyGamingPlayer('player_12345', { level: 42, vip_tier: 'gold' });

await LinkzlySDK.trackGamingEvent('level_complete', {
    level: 5, score: 12500, stars: 3
});

// `immediate: true` bypasses batching
await LinkzlySDK.trackGamingEvent(
    'purchase',
    { item_id: 'sword_of_fire', price: 4.99, currency: 'USD' },
    true
);

await LinkzlySDK.setGamingAttribution(
    'click_abc123',
    'https://yourgame.com/promo',
    { campaign: 'summer_sale' }
);

await LinkzlySDK.startGamingSession();
await LinkzlySDK.endGamingSession();

await LinkzlySDK.flushGamingEvents();
const status = await LinkzlySDK.getGamingStatus();
// status.pendingEventCount, status.hasInflightBatch
await LinkzlySDK.resetGamingTracking();
```

A gaming `purchase` event is game telemetry and is not recorded as revenue; report revenue with `trackPurchase`.

### HMAC request signing

When HMAC signing is enabled on your game's **Settings** tab, under **Security Settings**, pass `signingSecret` in the options object. The SDK computes the HMAC-SHA256 signature and attaches `X-Signature-256`, `X-Timestamp`, and `X-Nonce` to every batch. The replay window is fixed at 300 seconds — device clocks must be within 5 minutes of UTC. Your signing secret is on your game's **Settings** tab, under **SDK Configuration**, separate from the SDK Key.

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
| `signingSecret` | `null` |
| `debug` | `false` |
