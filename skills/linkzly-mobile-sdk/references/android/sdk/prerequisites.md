<!-- Generated from https://docs.linkzly.com/docs/sdk-android#prerequisites by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Prerequisites

Source: https://docs.linkzly.com/docs/sdk-android#prerequisites

Before integrating, set up your app in the Linkzly Console:

1. Go to **Dashboard > Apps** and click "Register App".
2. Enter your Android **Package Name** and **SHA-256 certificate fingerprints**.
3. Choose a verification method (Hosted is recommended for a quick start).
4. Copy your **SDK Key** from the post-creation wizard, or from **Manage app > Overview > SDK Configuration**.

Your SDK key starts with `slk_` followed by at least 40 hexadecimal characters, and uniquely identifies one app. `configure()` rejects any other format and the SDK then stays unconfigured. Do not share keys between apps.

| Requirement | Value |
|---|---|
| `minSdk` | 21 (declared in the SDK's `AndroidManifest.xml`) |
| Permissions merged in by the SDK | `INTERNET`, `ACCESS_NETWORK_STATE`, `READ_PHONE_STATE` |
| Permissions merged in through the SDK's dependencies | `com.google.android.gms.permission.AD_ID` and the Play Install Referrer service permission |
| Toolchain the documented steps were built and tested with | Android Gradle Plugin 8.2.2, Gradle 8.2, Kotlin 1.9.20, `compileSdk` 34, Java 17 |

The minimum is the value the SDK declares; it is not a tested floor. The steps on this page were built with the toolchain in the last row.
