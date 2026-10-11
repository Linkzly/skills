<!-- Generated from https://docs.linkzly.com/docs/sdk-android#initialization by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Initialization

Source: https://docs.linkzly.com/docs/sdk-android#initialization

Call `LinkzlySDK.configure()` once in `Application.onCreate()`:

```kotlin
import android.app.Application
import com.linkzly.sdk.LinkzlySDK
import com.linkzly.sdk.models.Environment

class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        LinkzlySDK.configure(
            context = this,
            sdkKey = "slk_your_key_from_console",
            environment = Environment.PRODUCTION
        )
    }
}
```

`Environment` has three values: `PRODUCTION` (the default), `STAGING` and `DEVELOPMENT`. The first `configure()` call wins; a later call is ignored and logs a warning. SDK logging is on for every environment except `PRODUCTION`.

`STAGING` and `DEVELOPMENT` send to separate Linkzly backends, so events sent with them never show in your console. Use `PRODUCTION` with the key from your console.

The SDK observes `ProcessLifecycleOwner` and, with no further code from you:

- tracks the install on the first launch of a genuinely new install (an app that was already installed more than 48 hours before the SDK first ran is treated as an existing user and sends no install event);
- tracks an open when the app comes to the foreground and more than 30 seconds have passed since the last foreground;
- starts a session each time the app comes to the foreground and ends it when the app goes to the background (there are no session methods to call);
- flushes the event queue when the app goes to the background.
