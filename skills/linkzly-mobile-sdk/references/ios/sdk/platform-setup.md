<!-- Generated from https://docs.linkzly.com/docs/sdk-ios#platform-setup by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Platform Setup

Source: https://docs.linkzly.com/docs/sdk-ios#platform-setup

### Associated Domains (Universal Links)

Universal Links require an Associated Domains entitlement. In Xcode, select your target → **Signing & Capabilities** → **+ Capability → Associated Domains**, then add:

```
applinks:{your-prefix}.linkz.ly
```

If you chose **Hosted Verification** in the console, Linkzly hosts your `apple-app-site-association` file automatically. For **Custom Domain Verification**, host the file at `https://yourdomain.com/.well-known/apple-app-site-association`:

```json
{
  "applinks": {
    "apps": [],
    "details": [
      { "appID": "TEAMID.com.yourcompany.yourapp", "paths": ["*"] }
    ]
  }
}
```

### Info.plist

Add a custom URL scheme (helpful for testing) and a tracking-permission description string for ATT:

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array><string>yourapp</string></array>
  </dict>
</array>

<key>NSUserTrackingUsageDescription</key>
<string>We use your data to provide personalized content and improve your app experience.</string>
```
