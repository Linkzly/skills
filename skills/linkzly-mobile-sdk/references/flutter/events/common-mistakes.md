<!-- Generated from https://docs.linkzly.com/docs/sdk-tracking-events#common-mistakes by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Common mistakes

Source: https://docs.linkzly.com/docs/sdk-tracking-events#common-mistakes

- **Sending a name that is not registered.** The event is dropped. On the batch path, the default for custom events, the response is still a success, so a successful flush does not mean the event was kept; on the single-event path the response is a 400 error. Add the name to the app's Custom Events list and save the app settings first.
- **Sending a purchase as a custom event as well as with `trackPurchase`.** A custom event named `purchase` is a custom event, not revenue. Revenue comes only from `trackPurchase`. If the event properties include a `revenue` or `amount` key, the ingestion service logs a warning to use `trackPurchase` instead; the event is still accepted as a custom event.
- **Changing an event name after it is used.** A name selected in the app's Custom Events list, a segment or a Flows trigger is matched exactly, so a renamed event no longer matches and the new name must be registered too.
- **Putting variation in the event name.** Use one name and an event property, not `level_completed_3`.
- **Calling `trackEvent` before `configure`.** The SDK logs a warning and does not queue the event.
- **Calling `trackInstall` as a setup step.** The SDK sends the install itself; a call on a new install sends a second install event.
- **Sending one key with different kinds of value.** Send each key as text every time, or as a number every time, and so on. On Android versions before {{SDK_VERSION_ANDROID}}, text that looks like a number in a queued event also arrived as a number.
- **Sending a date as formatted text, such as `Oct 27, 2026`.** It does not read as a Date. Pass a date object, or ISO 8601 text (see [Dates](../events/event-properties.md)).
- **Sending a long ID as a number.** Whole numbers beyond 2^53 lose digits. Send IDs as text (see [Long numbers and IDs](../events/event-properties.md)).
- **Using a name Linkzly reserves.** Linkzly's own value replaces an event property with a reserved key. Keep your keys and event names off the `__` prefix and the Web SDK's built-in event names too (see [Reserved names](../events/event-properties.md)).
