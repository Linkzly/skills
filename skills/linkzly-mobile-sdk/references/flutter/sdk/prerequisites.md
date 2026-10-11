<!-- Generated from https://docs.linkzly.com/docs/sdk-flutter#prerequisites by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Prerequisites

Source: https://docs.linkzly.com/docs/sdk-flutter#prerequisites

Before integrating, set up your app in the Linkzly Console:

1. Go to **Dashboard > Apps** and click "Register App".
2. Enter your iOS **Bundle ID** and **Team ID**, and/or Android **Package Name** + **SHA-256 fingerprints**.
3. Choose a verification method (Hosted is recommended for a quick start).
4. Copy your **SDK Key** from the post-creation wizard, or from **Manage app > Overview > SDK Configuration**.

Minimum versions declared by the package (`pubspec.yaml`, the iOS podspec and the Android `minSdk`):

| Requirement | Declared minimum |
|---|---|
| Flutter | 3.35.6 |
| Dart | 3.9 |
| iOS | 13.0 |
| Android | API 21 |

The sample app used to check this page was built with Flutter 3.44.0 and Dart 3.12.0. The minimums above are what the package declares, not floors that were each built and tested.

Your SDK key starts with `slk_` and uniquely identifies one app.
