<!-- Generated from https://docs.linkzly.com/docs/sdk-web#tracking-events by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Tracking Events

Source: https://docs.linkzly.com/docs/sdk-web#tracking-events

**Register the name first.** A custom event is kept only if its name is registered for the app in the console: the app's **Configuration** tab, **Custom Events** under **Tracking Configuration**, then **Save Configuration**. An unregistered name is dropped while the call still succeeds. See [Register each name in the console](https://docs.linkzly.com/docs/sdk-tracking-events#register-each-name-in-the-console).

```typescript
// Custom event
LinkzlySDK.trackEvent('signup_completed', { method: 'email' });

// Several events in one call
LinkzlySDK.trackEventBatch([
  { eventName: 'add_to_cart', parameters: { product_id: 'SKU-123', quantity: 2 } },
  { eventName: 'begin_checkout', parameters: { cart_value: 49.99 } },
]);

// A page view you send yourself (for example with autoTrackPageViews off)
LinkzlySDK.trackPageView();
LinkzlySDK.trackPageView('/products/123', { category: 'electronics' });
```

Event property values can be strings, numbers, booleans, `Date` objects, nested objects, and arrays of these. From version {{SDK_VERSION_WEB}}:

- A `Date` is sent as ISO 8601 text in UTC, such as `"2026-10-27T10:15:30.123Z"`. Earlier versions usually sent it as an empty object, `{}`.
- A `null` or `undefined` value leaves the key out.
- NaN, Infinity, a `BigInt`, an invalid `Date`, or another value that can't be sent (such as a class instance or a `Map`) is left out, with a warning logged when `debug` is on. The event is still sent with its other event properties. Send a `BigInt` as text, with `String(value)`.

The full rules, limits and reserved names are in [Event properties](https://docs.linkzly.com/docs/sdk-tracking-events#event-properties). For event names and starter event lists, see [Tracking Events](https://docs.linkzly.com/docs/sdk-tracking-events).

### Batching and Flushing

Events go into a queue and are sent in batches: when 20 events are waiting (`batchSize`), every 30 seconds (`flushIntervalMs`), when the page is hidden or closed, and when you call `flushEvents()`. A request carries at most 100 events.

```typescript
const sent = await LinkzlySDK.flushEvents();          // true when the batch was accepted
const waiting = LinkzlySDK.getPendingEventCount();    // a number, not a promise
```

- The queue is kept in `localStorage`, one per tab, with up to 500 events for up to 24 hours. Events a closed tab could not send are sent by the next page of your site the visitor opens.
- When the page closes, the SDK sends with a `keepalive` request, or `navigator.sendBeacon` where that is not available. From version `{{SDK_VERSION_WEB}}`, a batch of 60,000 bytes or more is not sent on page close (browsers refuse larger `keepalive` requests); it stays queued and goes with the next page's first flush.
- Within one flush, a failed send is retried after 1, 2 and 4 seconds when the server answers 5xx or 429, or the network fails. A batch the server rejects with any other 4xx except 408, such as 400 or 413 (too large), is dropped at once, so it cannot block the events behind it.
- From version {{SDK_VERSION_WEB}}, a batch that still fails (5xx, 408, 429 or a network error) stays in the queue for later flushes, up to 5 failed flushes while the browser is online. Then it is dropped, with an error in the log. A flush that fails while the browser is offline (`navigator.onLine` is `false`) doesn't count, so the events wait until it is back online. The count is kept with the stored queue, so it survives page reloads. Earlier versions retried such a batch at every flush, with no limit.
- If `localStorage` cannot be written (for example in some private windows), the queue stays in memory for the life of the page.
