<!-- Generated from https://docs.linkzly.com/docs/sdk-tracking-purchases#purchase-environment by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Purchase environment

Source: https://docs.linkzly.com/docs/sdk-tracking-purchases#purchase-environment

`environment` tells Linkzly whether a purchase was real or a test.

| Value | What Linkzly does |
|---|---|
| `production` (`prod` and `live` are read the same way) | Counts it as revenue. It can be forwarded to your ad networks. |
| `sandbox` (`testflight`, `test`, `license_tester` and `debug` are read the same way) | Keeps it as a test purchase. It is left out of every revenue figure and never forwarded to your ad networks. |
| Nothing, or any other value | Records the environment as unknown. The purchase is counted as revenue, but Linkzly may hold it back from your ad networks. |

Upper and lower case are both accepted. Send `production` on every real purchase.

- **iOS:** leave it out. The SDK reads the app's receipt and sends `production` for an App Store build and `sandbox` for TestFlight, Xcode and sandbox testing. A value you pass replaces the one the SDK reads, so do not hard-code `production`.
- **Android:** the SDK sends only what you pass, because the device cannot tell a license tester's purchase from a real one. Send `production` from your release builds and `sandbox` from the builds you test purchases with. A license tester who buys in a release build is then sent as `production`. If your server checks purchases with Google Play, it can tell test purchases apart: Google marks a license tester's purchase as a test purchase. Send `sandbox` for those and `production` for the rest.
- **React Native and Flutter:** pass it on Android only, as the samples under [Where to call it](../purchases/where-to-call-it.md) do. On iOS leave it out, so that the native SDK reads the receipt.

Older SDK versions do not send it. Update to the current release of your SDK.
