<!-- Generated from https://docs.linkzly.com/docs/sdk-ios#verify-your-setup by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Verify Your Setup

Source: https://docs.linkzly.com/docs/sdk-ios#verify-your-setup

Run the app in `.development` and check the Xcode console:

```
🚀 LinkzlySDK configured with key: ...
📊 Tracking install event (first launch detected)
📤 Tracking event: test_event
🔗 Universal Link received: https://yourdomain.com/product?id=123
📥 Deep link data received: /product
```

Set `.production` again when you are done: events sent in `.development` go to a separate backend and never show in your console.

The `test_event` line only shows that the SDK sent the event. Register `test_event` for the app first (see [Register each name in the console](../events/sending-a-custom-event.md)): Linkzly drops an unregistered name.

Test deep links in the simulator. The custom URL scheme works without the Associated Domains setup once the scheme is registered in `Info.plist` and your app forwards `open url` to the SDK (see App delegate helpers), so it is the quickest first check:

```bash
xcrun simctl openurl booted "https://yourdomain.com/product?id=123"
xcrun simctl openurl booted "yourapp://product?id=123"
```

To confirm a link reached your app, register a handler and watch for the log line, or observe `.linkzlyDeepLinkDataReceived` and check that the notification arrives with `deepLinkData`.

### Integration checklist

- [ ] Created the app in the Linkzly Console and copied its SDK key
- [ ] Added the `Linkzly` product with Swift Package Manager (or the Git-pinned pod)
- [ ] Called `LinkzlySDK.configure(sdkKey:environment:)` at launch
- [ ] Added the Associated Domain (`applinks:{prefix}.linkz.ly`) in Xcode
- [ ] Forwarded Universal Links to `handleUniversalLink` or the app delegate helpers
- [ ] Registered the push token with `setNotificationToken` and cleared it on logout
- [ ] Registered `test_event` for the app, sent it, and saw the install and event lines in the console (the log only shows the event was sent; an unregistered name is dropped by Linkzly)
- [ ] Verified the integration in the console (Manage app > Verification, the SDK connection card)
