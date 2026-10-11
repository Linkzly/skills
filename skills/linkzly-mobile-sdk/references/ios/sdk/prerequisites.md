<!-- Generated from https://docs.linkzly.com/docs/sdk-ios#prerequisites by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Prerequisites

Source: https://docs.linkzly.com/docs/sdk-ios#prerequisites

Before integrating, set up your app in the Linkzly Console:

1. Go to **Dashboard > Apps** and click "Register App".
2. Enter your iOS **Bundle ID** and **Team ID**.
3. Choose a verification method (Hosted is recommended for a quick start).
4. Copy your **SDK Key** from the post-creation wizard, or from **Manage app > Overview > SDK Configuration**.

| Requirement | Value |
|---|---|
| Minimum deployment target declared by the SDK | iOS 12.0 |
| Swift tools version declared by the package | 5.7 |

The iOS 12.0 figure is what the package declares. The sample app used to check this page was built with Xcode 27, which only builds targets from iOS 15.0, so it was built at iOS 15.

Your SDK key starts with `slk_` and uniquely identifies one app — do not share keys between apps.
