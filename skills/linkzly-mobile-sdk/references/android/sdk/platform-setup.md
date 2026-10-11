<!-- Generated from https://docs.linkzly.com/docs/sdk-android#platform-setup by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Platform Setup

Source: https://docs.linkzly.com/docs/sdk-android#platform-setup

### AndroidManifest.xml

Register a custom `Application` class and add intent filters to your launcher Activity for custom URL schemes and App Links:

```xml
<application
    android:name=".MyApplication"
    ... >

    <activity
        android:name=".MainActivity"
        android:launchMode="singleTask"
        android:exported="true">

        <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>

        <!-- Custom URL scheme (for testing) -->
        <intent-filter>
            <action android:name="android.intent.action.VIEW" />
            <category android:name="android.intent.category.DEFAULT" />
            <category android:name="android.intent.category.BROWSABLE" />
            <data android:scheme="yourapp" />
        </intent-filter>

        <!-- App Links (production) -->
        <intent-filter android:autoVerify="true">
            <action android:name="android.intent.action.VIEW" />
            <category android:name="android.intent.category.DEFAULT" />
            <category android:name="android.intent.category.BROWSABLE" />
            <data android:scheme="https" android:host="yourdomain.com" />
        </intent-filter>
    </activity>
</application>
```

`android:launchMode="singleTask"` is required so warm-start deep links route through `onNewIntent()`.

### App Links verification

If you selected **Hosted Verification** in the console, Linkzly hosts your `assetlinks.json` automatically. Point the App Links intent filter at `{your-prefix}.linkz.ly` (the brand prefix you chose in the console) and you are done. For **Custom Domain Verification**, host the file at `https://yourdomain.com/.well-known/assetlinks.json` containing your package name and SHA-256 fingerprint. The `android:autoVerify="true"` attribute triggers verification at install time.

The file must be served over HTTPS, with `Content-Type: application/json`, and without redirects. During development, include the fingerprints of both your debug and release certificates.

Verify on a device with:

```bash
adb shell pm get-app-links com.yourcompany.yourapp
adb shell pm verify-app-links --re-verify com.yourcompany.yourapp
```
