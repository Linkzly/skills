<!-- Generated from https://docs.linkzly.com/docs/sdk-web#what-the-sdk-sends-for-you by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# What the SDK Sends for You

Source: https://docs.linkzly.com/docs/sdk-web#what-the-sdk-sends-for-you

| Event | When it is sent | Data |
|---|---|---|
| `install` | On the first visit of a browser, unless `autoTrackFirstVisit` is `false` | |
| `open` | When a session starts: on the first page of a new session, and when a hidden page becomes visible again after 30 minutes without activity. A first visit sends `install` only | |
| `session_end` | Each time the page is hidden or closed, and on `endSession()` | `duration_seconds` |
| `page_view` | Only with `autoTrackPageViews: true`: when the page loads and on every single-page-app navigation | `page_url`, `page_title` |
| `time_on_page` | When the visitor leaves the page (closes it, reloads it or goes to another page), on a single-page-app navigation, and on `endSession()` | `duration_seconds`, `page_url` |
| `scroll_depth` | At the same moments as `time_on_page`, if the visitor scrolled | `max_depth_percent`, `page_url` |
| `outbound_click` | When the visitor clicks a link to another host name | `destination_url`, `link_text`, `page_url` |

Sessions are kept per browser tab: each new tab starts its own session and sends its own `open`. A session ends after 30 minutes without activity (`sessionTimeoutMs`).

Every event carries the visitor ID, your user ID once you set one, the session ID, browser details (user agent, language, screen and window size, time zone, referrer and page URL), the session's UTM parameters and its smart link IDs.

`page_view`, `time_on_page`, `scroll_depth` and `outbound_click` are built-in events. They are accepted for every app without being registered.

The package also exports `trackFirstVisit()` and `trackOpen()`. Each call sends one more `install` or `open` event, so do not call them while the automatic events are on.
