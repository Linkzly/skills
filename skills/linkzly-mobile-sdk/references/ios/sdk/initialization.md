<!-- Generated from https://docs.linkzly.com/docs/sdk-ios#initialization by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Initialization

Source: https://docs.linkzly.com/docs/sdk-ios#initialization

### SwiftUI

```swift
import SwiftUI
import Linkzly

@main
struct YourApp: App {
    init() {
        LinkzlySDK.configure(
            sdkKey: "slk_your_key_from_console",
            environment: .production
        )

        // Optional: closure-based deep link handlers (recommended)
        LinkzlySDK.onUniversalLink { url, attributionData in
            // Fired immediately when a Universal Link is captured — use for fast navigation.
        }
        LinkzlySDK.onDeepLink { deepLinkData, url in
            // Fired when the server returns enriched attribution data, including
            // deferred deep links for fresh installs.
        }
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
                .onOpenURL { url in
                    _ = LinkzlySDK.handleUniversalLink(url)
                }
                .onContinueUserActivity(NSUserActivityTypeBrowsingWeb) { userActivity in
                    _ = LinkzlySDK.handleUniversalLink(userActivity)
                }
        }
    }
}
```

### UIKit

```swift
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        LinkzlySDK.configure(sdkKey: "slk_your_key_from_console", environment: .production)
        return true
    }

    func application(_ application: UIApplication,
                     continue userActivity: NSUserActivity,
                     restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        return LinkzlySDK.handleUniversalLink(userActivity)
    }
}
```

The SDK supports `.production`, `.staging`, and `.development` environments. Staging and development print verbose console logs; production does not. `configure(sdkKey:)` without an environment uses `.production`.

`.staging` and `.development` send to separate Linkzly backends, so events sent with them never show in your console. Use `.production` with the key from your console.

`configure` is safe to call once at launch: the first call wins and later calls are ignored. The SDK key must start with `slk_` followed by at least 40 hex characters, otherwise configuration fails and the SDK prints an error. A failed `configure` call (a rejected key) is also final for the process: later `configure` calls are ignored.

On the first launch of a new install, `configure` records the install for you. The SDK records an open each time the app becomes active more than 30 seconds after the last session, and sends a session-end event when the app resigns active. You do not start or end sessions yourself.
