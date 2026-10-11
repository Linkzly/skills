<!-- Generated from https://docs.linkzly.com/docs/sdk-react-native#prerequisites by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Prerequisites

Source: https://docs.linkzly.com/docs/sdk-react-native#prerequisites

Before integrating, set up your app in the Linkzly Console:

1. Go to **Dashboard > Apps** and click "Register App".
2. Enter your iOS **Bundle ID** and/or Android **Package Name** (plus SHA-256 fingerprints for Android).
3. Choose a verification method (Hosted is recommended for a quick start).
4. Copy your **SDK Key** from the post-creation wizard, or from **Manage app > Overview > SDK Configuration**.

| Requirement | Value |
|---|---|
| React Native | Tested on React Native 0.82.1. The package declares `react-native >=0.71.2` and `react >=16.13.1` as its peer range; versions below 0.82.1 have not been tested. |
| Node.js | The package declares `>= 16.0.0` |
| iOS | Minimum deployment target declared by the SDK: iOS 12.0 |
| Android | Minimum declared by the SDK: API 21 (`minSdk 21`) |

Your SDK key starts with `slk_` and uniquely identifies one app — do not share keys between apps.
