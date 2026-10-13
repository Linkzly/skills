<!-- Generated from https://docs.linkzly.com/docs/sdk-integrations-setup#setup-checklist by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Setup checklist

Source: https://docs.linkzly.com/docs/sdk-integrations-setup#setup-checklist

Each list runs in the order you do the work: console, app project, code, then how to confirm it works.

### Deep links checklist

- [ ] The app is registered in Apps with the Bundle ID, Team ID, Package Name and fingerprints, and verification is complete.
- [ ] Associated Domains (iOS) or the verified intent filter (Android) is in the project.
- [ ] A deep link exists under Deeplinks.
- [ ] `onDeepLink`, `handleAppLink`, `addDeepLinkListener` or `deepLinkStream` is wired and calls your router.
- [ ] Tapping the Smart Link on a device with the app opens the right screen.

### Deferred deep links checklist

- [ ] iOS App Store URL and Google Play Store URL are set on the app.
- [ ] The iOS handler is registered right after `configure`.
- [ ] On Android, you decided whether you need the data in code; if so, `trackInstall` runs once behind a first-launch flag.
- [ ] Uninstall the app, tap the Smart Link, install from the store (a Play build on Android), open the app, and check it lands on the right screen.

### Push notifications checklist

- [ ] An FCM provider is added under Push Providers and its app is mapped to your Linkzly app.
- [ ] Firebase Messaging is set up in the app, as in the table above.
- [ ] `setNotificationToken` is called with the FCM token after `configure` and on every refresh.
- [ ] `hasNotificationToken` returns `true`, and `initializePush` returns `true` once registration has succeeded and Firebase Messaging is available.
- [ ] A campaign sent to All Subscribed Users reaches the device.

### Affiliate attribution checklist

- [ ] A program, tracking domain and tracking link exist under Affiliate.
- [ ] Deep links work, so the affiliate link opens the app.
- [ ] `captureAffiliateAttribution` is called for each incoming URL.
- [ ] Your server receives the click ID at conversion time and reports the conversion.
- [ ] After opening an affiliate link, `hasAffiliateAttribution` returns `true`.

### Ad networks checklist

- [ ] A provider is connected in Partner catalog and shows in Connections.
- [ ] Smart Links exist for your campaigns, and the deep link setup is done.
- [ ] On iOS, tracking permission is requested if you want the advertising ID.
- [ ] Install from a campaign link, then look for an `install` event in Analytics, Event stream.

### SKAdNetwork and App Tracking Transparency checklist

- [ ] `NSUserTrackingUsageDescription` is in `Info.plist` (iOS).
- [ ] `requestTrackingPermission` runs while the app is active, and the prompt appears on a new install.
- [ ] `updateConversionValue` runs with the values you chose.
- [ ] The conversion value call reports success on a real iOS device.

### Revenue checklist

- [ ] Revenue & LTV is enabled for your organisation.
- [ ] `trackPurchase` runs after the store confirms the transaction, with `revenue`, `currency` and `transactionId`.
- [ ] Refunds use `trackRefund` with the original `transactionId`.
- [ ] Check the purchase in Analytics, Revenue & LTV, as described on [Tracking Purchases](../purchases/overview.md).

### Gaming tracking checklist

- [ ] The game is added in Gaming Intelligence, and you have its SDK key, Game ID and your organisation ID.
- [ ] `configureGamingTracking` runs once before the other gaming calls.
- [ ] Events are sent with `trackGamingEvent`.
- [ ] In the setup wizard, choose Verify Integration and check it reports the integration as verified.

### Privacy controls checklist

- [ ] Your settings screen calls `setTrackingEnabled` and `setAdvertisingTrackingEnabled`.
- [ ] On Android, the calls run after `configure`.
- [ ] `isTrackingEnabled` returns `false` after you turn tracking off, and new custom events stop.
