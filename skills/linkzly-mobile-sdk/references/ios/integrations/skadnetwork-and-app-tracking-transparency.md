<!-- Generated from https://docs.linkzly.com/docs/sdk-integrations-setup#skadnetwork-and-app-tracking-transparency by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# SKAdNetwork and App Tracking Transparency

Source: https://docs.linkzly.com/docs/sdk-integrations-setup#skadnetwork-and-app-tracking-transparency

### What it does

On iOS, the SDK registers your app for SKAdNetwork attribution when it starts (iOS 14.5 or later). Three separate things build on that:

- **Postbacks.** Apple sends the developer of an advertised app a copy of each *winning* postback, to an endpoint you set in `Info.plist`. Linkzly checks Apple's signature and reports the verified postbacks for your app on its SKAN tab, counted by the day Linkzly received them. This works for SKAdNetwork and for AdAttributionKit (Apple's newer framework, iOS 17.4 and later). The SDK has no part in it, and it only sees what Apple sends to your endpoint.
- **Conversion values you set.** `updateConversionValue` passes a value of 0 to 63 that your app chooses to Apple's StoreKit, with an optional coarse value and window lock. This is device-side only.
- **Conversion values from a schema.** You save a conversion value schema for the app in the console. The SDK reads it, keeps a short list of the app's events on the device, works out the value and sets it through SKAdNetwork (iOS 16.1 and later) and AdAttributionKit (iOS 17.4 and later). With no saved schema the SDK sets nothing. Use either your own `updateConversionValue` calls or a schema for an app, not both: two writers make the value hard to predict.

App Tracking Transparency (ATT) is the permission prompt for the advertising ID; the SDK collects it only when the person allows it. It is separate from postbacks: Apple's postbacks carry no device or user identifier, and you do not need the prompt to receive them.

Linkzly reports Apple's numbers as Apple sent them. It does not name ad networks (the report shows Apple's ad network IDs), does not turn a conversion value into an event, makes no claim about how accurate a postback is, and shows nothing for postbacks Apple does not send to your endpoint, such as the ones that go only to the ad network. There is no Android equivalent, and games do not have a postback report.

### Set up in the console

- Open the app's **Configuration** tab and enter the **iOS App Store ID** in the App Store Links card (digits only; the page offers the ID from your App Store URL). Linkzly finds the app a postback belongs to by this ID, the one Apple puts in the postback, so it has to be the app's real App Store ID. One app holds an ID: if another app already claimed it, the console says so.
- Open the app's **SKAN** tab. When Linkzly is receiving postbacks it shows the endpoint address to put in `Info.plist` and a **SKAN postbacks** card: postbacks by Apple's ad network ID and source identifier, by postback number (one for each conversion window), by fine value, by coarse value, and whether the install was a redownload and whether the ad won. A value Apple did not send reads "Not sent by Apple", never 0. The newest days can still be arriving, because Apple sends each postback some time after its window closes. The card is never added to the Linkzly install column beside it, because the two count different things.
- To have the SDK set values for you, use the **Conversion value schema** card on the same tab. A rule names an event (`install`, `open`, `purchase` or a custom event's exact name, which is case sensitive), may limit a purchase to a revenue range in the schema's currency and any rule to a range of days since install (0 to 35), and gives the fine value (0 to 63), the coarse value (low, medium or high) and whether to lock the window. A schema holds up to 50 rules. Each save is a new version; saving a schema with no rules turns automatic values off.

### Set up in your app project

- iOS: add the `NSUserTrackingUsageDescription` key to `Info.plist` with your own text for the permission prompt, before the first `requestTrackingPermission` call. The app crashes if the call runs without the key. See [Info.plist](../sdk/platform-setup.md).
- iOS: call `requestTrackingPermission` while the app is active, at a moment that makes sense to the person. iOS shows the prompt only while the app is active: called earlier, while the app is still starting, no prompt appears and the call returns the current status, which is `notDetermined` on a new install.
- iOS: the SDK does not wait for the answer. `configure` sends the install event on the first launch, so that event has no advertising ID unless the person had already allowed tracking when `configure` ran. Events sent after the person allows tracking carry it.
- iOS: to receive postbacks, add the endpoint the console shows on the SKAN tab to `Info.plist`, as a string with the same value for both keys: `NSAdvertisingAttributionReportEndpoint` (SKAdNetwork) and `AttributionCopyEndpoint` (AdAttributionKit). Apple sends the copy to a fixed path on that address's registrable domain, so no path goes in the value. Rebuild and release the app: a build without the keys sends Linkzly nothing.
- iOS: do **not** add `SKAdNetworkItems` for this. That key is for apps that show other companies' ads; an advertised app does not need it to receive postbacks.
- iOS: either decide your conversion values in your own code, or save a schema in the console and leave `updateConversionValue` out. Automatic values need an iOS SDK release that includes them, and they need analytics consent: while analytics consent is denied the SDK sets no automatic value and clears the list of events it kept; while tracking is switched off it sets no automatic value, and the events it keeps stay on the device.
- Android: nothing to add. The Android SDK has no tracking-permission call, and the advertising ID permission comes in with the SDK's dependencies (see [Prerequisites](https://docs.linkzly.com/docs/sdk-android#prerequisites)).

### SDK calls

#### iOS (Swift)

```swift
LinkzlySDK.requestTrackingPermission { result in
    if case .success(let status) = result {
        // .authorized | .denied | .restricted | .notDetermined
    }
}

LinkzlySDK.updateConversionValue(5)
```

The full API is in [iOS](../sdk/skadnetwork-and-att.md), [React Native](https://docs.linkzly.com/docs/sdk-react-native#skadnetwork-and-att-ios) and [Flutter](https://docs.linkzly.com/docs/sdk-flutter#skadnetwork-and-att-ios-only).

Receiving postbacks and the conversion value schema need no SDK call. The SDK reads a saved schema by itself, about once a day, and your app code does not change.

**Platform support**

| Platform | Supported | Notes |
|---|---|---|
| iOS | Yes | Conversion values are set on the device, by your `updateConversionValue` call or from a saved schema. Postbacks reach Linkzly from Apple, not from the SDK. |
| Android | Not available | |
| React Native | iOS only | On Android, `updateConversionValue` returns `false` and `requestTrackingPermission` returns `'unsupported'`. Automatic values come from the iOS SDK underneath. |
| Flutter | iOS only | On Android, `updateConversionValue` returns `false` and `requestTrackingPermission` returns `'unsupported'`. Automatic values come from the iOS SDK underneath. |
