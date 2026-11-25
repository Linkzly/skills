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

### Meta Install Referrer (optional)

If you run Meta ads (Facebook or Instagram) for this app and want to see which campaign, ad set and ad an install came from, tell the SDK your Meta app ID. Put the ID in a string resource, then name that resource in the manifest, inside `<application>`:

```xml
<!-- res/values/strings.xml -->
<string name="linkzly_meta_app_id">YOUR_META_APP_ID</string>
```

```xml
<!-- AndroidManifest.xml -->
<meta-data
    android:name="com.linkzly.sdk.META_APP_ID"
    android:value="@string/linkzly_meta_app_id" />
```

- **Use a string resource.** A bare number written straight into `android:value` is read by Android as a number, and the SDK refuses it with one log line and reads nothing.
- **What the SDK does.** At the first install attempt it asks the Facebook, Instagram and Facebook Lite apps on the device, when they are installed, for the note Meta keeps about an install that came from its ads, and sends that note with the install event. It asks once. It does not ask when advertising tracking is turned off (`setAdvertisingTrackingEnabled(false)`) or the person has denied consent for advertising data. Meta encrypts the note and the SDK never opens it: nothing is decrypted on the device. The SDK's own manifest already lists the three Meta apps it may ask, so you add nothing for that.
- **The decryption key stays out of the app.** Copy the Install Referrer Decryption Key from your Meta app dashboard (App settings, Basic, Android) and paste it on the app's Settings page in the Linkzly console, in the **Meta Install Referrer key** card. Linkzly stores it encrypted and cannot show it again. Without a key saved, Linkzly stores no Meta campaign details.
- **What you see.** The app's Overview shows a **Meta installs** card with the installs Meta's note named, by campaign, ad set and ad ID. It counts the Android installs that carried a note: a part of your Android installs, with no names, cost or revenue. It does not replace the reporting in Meta Ads Manager, and the installs in it are not added to your install counts or media sources.
- **Which SDK.** This needs the Android SDK release that added Meta Install Referrer; its release notes say which one. Older versions ignore the entry.

### App Links verification

If you selected **Hosted Verification** in the console, Linkzly hosts your `assetlinks.json` automatically. Point the App Links intent filter at `{your-prefix}.linkz.ly` (the brand prefix you chose in the console) and you are done. For **Custom Domain Verification**, host the file at `https://yourdomain.com/.well-known/assetlinks.json` containing your package name and SHA-256 fingerprint. The `android:autoVerify="true"` attribute triggers verification at install time.

The file must be served over HTTPS, with `Content-Type: application/json`, and without redirects. During development, include the fingerprints of both your debug and release certificates.

Verify on a device with:

```bash
adb shell pm get-app-links com.yourcompany.yourapp
adb shell pm verify-app-links --re-verify com.yourcompany.yourapp
```
