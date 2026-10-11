<!-- Generated from https://docs.linkzly.com/docs/sdk-android#testing-with-adb by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Testing with adb

Source: https://docs.linkzly.com/docs/sdk-android#testing-with-adb

Watch the SDK's log output:

```bash
adb logcat | grep LinkzlySDK
```

With `Environment.STAGING` or `Environment.DEVELOPMENT`, look for `SDK configured successfully` after launch. Events sent in those environments go to a separate backend, so set `Environment.PRODUCTION` again when you are done. Test a custom URL scheme and an App Link:

```bash
adb shell am start -W -a android.intent.action.VIEW \
  -d "yourapp://product?id=123" com.yourcompany.yourapp

adb shell am start -W -a android.intent.action.VIEW \
  -d "https://yourdomain.com/product?id=123" com.yourcompany.yourapp
```

### Integration checklist

- [ ] App registered in the Linkzly Console and SDK key copied
- [ ] JitPack repository and the `1.0.9` dependency added, Gradle synced
- [ ] `LinkzlySDK.configure(...)` called in `Application.onCreate()` and the Application class registered in the manifest
- [ ] Intent filters added with `android:launchMode="singleTask"` on the Activity
- [ ] `handleAppLink` called in `onCreate` and `onNewIntent`
- [ ] A custom event shows up after `trackEvent`, once its name is registered for the app
- [ ] Device push token passed with `setNotificationToken`, and cleared on logout
