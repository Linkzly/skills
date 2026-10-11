<!-- Generated from https://docs.linkzly.com/docs/sdk-android#proguard-r8 by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# ProGuard / R8

Source: https://docs.linkzly.com/docs/sdk-android#proguard-r8

The SDK ships with consumer ProGuard rules; no manual configuration is required. If you hit issues, add:

```proguard
-keep public class com.linkzly.sdk.LinkzlySDK { *; }
-keep public class com.linkzly.sdk.models.** { *; }
-keep public class com.linkzly.sdk.gaming.** { *; }
-dontwarn okhttp3.**
-dontwarn okio.**
```
