<!-- Generated from https://docs.linkzly.com/docs/sdk-tracking-events#starter-event-plans by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Starter event plans

Source: https://docs.linkzly.com/docs/sdk-tracking-events#starter-event-plans

These tables are suggestions for four common kinds of app. Pick the rows that match your product, and register each name in the app's Custom Events list before you ship. Purchases are sent with `trackPurchase`, see [Tracking Purchases](../purchases/overview.md).

### Commerce

| Event | When to send | Useful parameters |
|---|---|---|
| `product_viewed` | The product detail screen appears | `product_id`, `category` |
| `search_performed` | The user submits a search | `query_length`, `result_count` |
| `item_added_to_cart` | An item is added to the cart | `product_id`, `quantity` |
| `item_removed_from_cart` | An item is removed from the cart | `product_id`, `quantity` |
| `checkout_started` | The user opens checkout | `item_count`, `currency` |
| `coupon_applied` | A coupon is accepted | `coupon_code` |
| `wishlist_item_added` | An item is saved to a wishlist | `product_id` |

Send the order itself with `trackPurchase`. Register these names in the app's Custom Events list first.

### Subscription

| Event | When to send | Useful parameters |
|---|---|---|
| `signup_completed` | An account is created | `method` |
| `onboarding_completed` | The user finishes the first-run flow | `steps_completed` |
| `paywall_viewed` | The paywall screen appears | `placement`, `plan_options` |
| `trial_started` | A free trial begins | `plan_id` |
| `trial_converted` | A trial turns into a paid plan | `plan_id` |
| `subscription_cancelled` | The user cancels in your app | `plan_id`, `reason` |
| `feature_used` | A key feature is used | `feature_name` |

Send each paid start or renewal with `trackPurchase` and `revenueType` set to `subscription`. Register these names in the app's Custom Events list first.

### Content and media

| Event | When to send | Useful parameters |
|---|---|---|
| `signup_completed` | An account is created | `method` |
| `content_viewed` | An article, video or episode opens | `content_id`, `content_type` |
| `content_completed` | The user reaches the end | `content_id`, `content_type` |
| `content_shared` | The user shares an item | `content_id`, `channel` |
| `content_saved` | The user bookmarks or downloads an item | `content_id` |
| `search_performed` | The user submits a search | `query_length`, `result_count` |
| `notification_opened` | The app opens from a notification | `campaign` |

Send any paid purchase with `trackPurchase`. Register these names in the app's Custom Events list first.

### Games

| Event | When to send | Useful parameters |
|---|---|---|
| `tutorial_started` | The tutorial begins | `variant` |
| `tutorial_completed` | The tutorial ends | `duration_seconds` |
| `level_started` | A level begins | `level`, `mode` |
| `level_completed` | A level is won | `level`, `duration_seconds`, `score` |
| `level_failed` | A level is lost | `level`, `attempt` |
| `reward_claimed` | A reward is collected | `reward_type`, `amount` |
| `invite_sent` | The user invites a friend | `channel` |

For game telemetry such as sessions, progression and economy, the SDKs also ship gaming tracking methods: [iOS](https://docs.linkzly.com/docs/sdk-ios#gaming-intelligence), [Android](../sdk/gaming-tracking.md), [React Native](https://docs.linkzly.com/docs/sdk-react-native#gaming-intelligence), [Flutter](https://docs.linkzly.com/docs/sdk-flutter#gaming-tracking). Send the order itself with `trackPurchase`. Register the custom names above in the app's Custom Events list first.
