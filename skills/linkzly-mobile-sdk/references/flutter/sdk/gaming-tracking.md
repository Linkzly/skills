<!-- Generated from https://docs.linkzly.com/docs/sdk-flutter#gaming-tracking by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Gaming Tracking

Source: https://docs.linkzly.com/docs/sdk-flutter#gaming-tracking

The plugin exposes the gaming tracking helpers of the native SDKs through `Linkzly.instance`. They run a separate gaming pipeline with its own credentials, so call `configureGamingTracking` before the other gaming methods.

```dart
await Linkzly.instance.configureGamingTracking(
  apiKey: 'YOUR_GAMING_API_KEY',
  organizationId: 'YOUR_ORGANIZATION_ID',
  gameId: 'YOUR_GAME_ID',
  environment: LinkzlyEnvironment.production,
  options: const GamingTrackingOptions(autoSessionTracking: true),
);

await Linkzly.instance.identifyGamingPlayer('player-42', {'tier': 'gold'});
await Linkzly.instance.startGamingSession();

await Linkzly.instance.trackGamingEvent(
  'level_completed',
  data: {'level': 3},
  immediate: false,
);

await Linkzly.instance.setGamingAttribution(
  clickId: 'click-abc',
  metadata: {'campaign': 'spring'},
);

final GamingTrackingStatus status = await Linkzly.instance.getGamingStatus();
// status.pendingEventCount, status.hasInflightBatch

await Linkzly.instance.flushGamingEvents();
await Linkzly.instance.endGamingSession();
await Linkzly.instance.clearGamingAttribution();
await Linkzly.instance.resetGamingTracking();
```

Signatures:

| Method | Signature |
|---|---|
| `configureGamingTracking` | `({required String apiKey, required String organizationId, required String gameId, LinkzlyEnvironment environment = production, GamingTrackingOptions options})` |
| `identifyGamingPlayer` | `(String playerId, [Map<String, Object?> traits])` |
| `trackGamingEvent` | `(String eventType, {Map<String, Object?> data, bool immediate = false})` |
| `setGamingAttribution` | `({String? clickId, String? deferredDeepLink, Map<String, Object?> metadata})` |
| `getGamingStatus` | `() -> GamingTrackingStatus` |
| `flushGamingEvents`, `startGamingSession`, `endGamingSession`, `clearGamingAttribution`, `resetGamingTracking` | `()` |

`GamingTrackingOptions` fields, all optional: `baseUrl`, `endpointPath`, `sdkVersion`, `gameVersion`, `includeTraits`, `debug`, `maxBatchSize`, `maxBatchBytes`, `flushIntervalMs`, `maxRetries`, `retryDelayMs`, `maxQueueSize`, `sessionTimeoutMs`, `autoSessionTracking`, `signingSecret`. A field you leave out keeps the native SDK's default. `signingSecret` is the request-signing secret for games that have signing turned on; it is separate from your SDK key.

`GamingTrackingStatus` has `pendingEventCount` and `hasInflightBatch`.

See the [Android SDK guide](https://docs.linkzly.com/docs/sdk-android) and [iOS SDK guide](https://docs.linkzly.com/docs/sdk-ios) for gaming event semantics: the Flutter plugin forwards to those native implementations.
