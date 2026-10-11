<!-- Generated from https://docs.linkzly.com/docs/sdk-android#deep-linking-and-app-links by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Deep Linking and App Links

Source: https://docs.linkzly.com/docs/sdk-android#deep-linking-and-app-links

Parse incoming intents in your Activity:

```kotlin
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        LinkzlySDK.handleAppLink(intent)?.let { route(it) }
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        LinkzlySDK.handleAppLink(intent)?.let { route(it) }
    }

    private fun route(data: DeepLinkData) {
        when (data.path) {
            "/product" -> showProduct(data.getStringParameter("id"))
            "/promo"   -> applyPromo(data.getStringParameter("code"))
        }
    }
}
```

`handleAppLink(intent)` returns `null` when the intent carries no URL.

`DeepLinkData` (in `com.linkzly.sdk.models`) exposes type-safe getters:

```kotlin
data.url                          // full URL string
data.path                         // URL path
data.smartLinkId                  // Linkzly smart link ID
data.clickId                      // attribution click ID
data.getStringParameter("name")   // String?
data.getIntParameter("count")     // Int?
data.getDoubleParameter("price")  // Double?
data.getBooleanParameter("flag")  // Boolean (defaults to false)
data.getParameter("custom")       // JsonElement?
```

For the Smart Link side of this flow, see [Smart Links for Android](https://docs.linkzly.com/docs/sdk-smart-links-android).
