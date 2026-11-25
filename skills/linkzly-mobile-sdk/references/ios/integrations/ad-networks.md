<!-- Generated from https://docs.linkzly.com/docs/sdk-integrations-setup#ad-networks by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Ad networks

Source: https://docs.linkzly.com/docs/sdk-integrations-setup#ad-networks

### What it does

Ad networks sends attributed installs to the advertising platforms you connect. The SDK has no ad-network call. The product builds on the install events the SDK already sends: only attributed installs are forwarded, which means an install that carries a Smart Link or click ID, or an ad click ID. An install with no attribution is not forwarded. Open, purchase and custom events are not used, and no conversion is chosen by an SDK event name.

### Set up in the console

1. Open Ad Networks, then Partner catalog, and connect a provider account. The wizard steps are Connect Account, Select Account and Map Conversions, then an Integration Name, then Create Integration. The detail is under Connecting an Ad Network on [Ad Networks](https://docs.linkzly.com/docs/ad-networks).
2. Open Connections (also in Ad Networks) to see the integrations you have created and their status.
3. Create the Smart Links your campaigns use under Deeplinks, as in [Deep links](../integrations/deep-links.md).

### Set up in your app project

- The SDK installed and configured, with the deep link and deferred deep link setup from [Deep links](../integrations/deep-links.md) and [Deferred deep links](../integrations/deferred-deep-links.md), so installs from a campaign link carry their click.
- iOS: if you want the advertising ID on installs, ask for tracking permission (see [SKAdNetwork and App Tracking Transparency](../integrations/skadnetwork-and-app-tracking-transparency.md)). The advertising ID is collected only when the person allows it.

### SDK calls

There is no ad-network-specific call on any platform. The calls that matter are `configure`, the deep link calls in [Deep links](../integrations/deep-links.md) and, on iOS, `requestTrackingPermission` in [SKAdNetwork and App Tracking Transparency](../integrations/skadnetwork-and-app-tracking-transparency.md). `setAdvertisingTrackingEnabled(false)` stops advertising ID collection (see [Privacy controls](../integrations/privacy-controls.md)).

**Platform support**

| Platform | Supported | Notes |
|---|---|---|
| iOS | Yes | No dedicated call. The advertising ID needs tracking permission. |
| Android | Yes | No dedicated call. The advertising ID is collected unless you turn it off. Meta Install Referrer is a manifest entry (below). |
| React Native | Yes | No dedicated call. Meta Install Referrer is the same manifest entry in the app's Android project. |
| Flutter | Yes | No dedicated call. Meta Install Referrer is the same manifest entry in the app's Android project. |

### Meta Install Referrer (Android)

Separate from the install forwarding above: when a person installs your Android app after seeing or tapping a Meta ad, Meta leaves the app an encrypted note that names the campaign, ad set and ad. Linkzly can read it and show those IDs on the app's Overview, in the **Meta installs** card. It works only for the installs that carry such a note, so it is a part of your Android installs, and it shows IDs, not names, cost or revenue. It does not replace the reporting in Meta Ads Manager, and it is separate from the install event Linkzly can send to Meta.

1. Add your Meta app ID to the app's manifest as a string resource (`com.linkzly.sdk.META_APP_ID`). The steps are in the [Android SDK guide](https://docs.linkzly.com/docs/sdk-android#meta-install-referrer-optional). React Native and Flutter apps add it in their Android project and call nothing new.
2. In the console, open the app's Settings page and paste your Install Referrer Decryption Key (Meta app dashboard, App settings, Basic, Android) into the **Meta Install Referrer key** card. The key stays in Linkzly, is stored encrypted and is never sent to a device.
3. Ship an app version with the SDK release that supports it. Look for the **Meta installs** card on the app's Overview once installs from Meta ads arrive.

The SDK does not read the note when advertising tracking is off or consent for advertising data was denied. iOS has no equivalent.
