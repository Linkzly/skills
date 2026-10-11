<!-- Generated from https://docs.linkzly.com/docs/sdk-integrations-setup#gaming-tracking by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Gaming tracking

Source: https://docs.linkzly.com/docs/sdk-integrations-setup#gaming-tracking

### What it does

Gaming tracking is a separate event pipeline for game telemetry, with its own batching, retry and offline queue. It feeds Gaming Intelligence. It uses its own credentials and does not use the app's `slk_` SDK key.

### Set up in the console

1. Open Gaming Intelligence and choose Add Game. The setup wizard walks you through registering the game. The steps are on [Gaming Intelligence](https://docs.linkzly.com/docs/gaming-intelligence).
2. Copy the game's SDK key. The wizard shows it as Your SDK Key, and you can view or regenerate it later under SDK Configuration in the game's settings. This is the `apiKey` you pass to the SDK.
3. Note the Game ID, shown in the wizard and in the game's settings.
4. Note your organisation ID. The wizard's code snippets carry it in the `X-Organization-ID` header.
5. If you turn on request signing in the game's settings, you also pass a `signingSecret`.

### Set up in your app project

Nothing beyond the SDK. Call `configureGamingTracking` once, after the normal `configure`, before the other gaming calls.

### SDK calls

#### Android (Kotlin)

```kotlin
LinkzlySDK.configureGamingTracking(
    context = context,
    options = LinkzlyGamingTracking.GamingOptions(
        apiKey         = "YOUR_GAMING_API_KEY",
        organizationId = "YOUR_ORG_ID",
        gameId         = "YOUR_GAME_ID"
    )
)
LinkzlySDK.identifyGamingPlayer(playerId = "player_abc123", traits = mapOf("level" to 42))
LinkzlySDK.trackGamingEvent("level_complete", mapOf("level" to 15, "score" to 48000))
```

The full API, including sessions, attribution and the options, is in [iOS](https://docs.linkzly.com/docs/sdk-ios#gaming-intelligence), [Android](../sdk/gaming-tracking.md), [React Native](https://docs.linkzly.com/docs/sdk-react-native#gaming-intelligence) and [Flutter](https://docs.linkzly.com/docs/sdk-flutter#gaming-tracking).

**Platform support**

| Platform | Supported | Notes |
|---|---|---|
| iOS | Yes | Options through `LinkzlyGamingOptions`. |
| Android | Yes | Options through `GamingOptions`; a shorthand takes an `Environment`. |
| React Native | Yes | Options as the last argument. |
| Flutter | Yes | Named arguments and `GamingTrackingOptions`. |
