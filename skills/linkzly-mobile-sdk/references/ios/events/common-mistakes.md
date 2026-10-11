<!-- Generated from https://docs.linkzly.com/docs/sdk-tracking-events#common-mistakes by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Common mistakes

Source: https://docs.linkzly.com/docs/sdk-tracking-events#common-mistakes

- **Sending a name that is not registered.** The event is dropped. On the batch path, the default for custom events, the response is still a success, so a successful flush does not mean the event was kept; on the single-event path the response is a 400 error. Add the name to the app's Custom Events list and save the app settings first.
- **Sending a purchase as a custom event as well as with `trackPurchase`.** A custom event named `purchase` is a custom event, not revenue. Revenue comes only from `trackPurchase`. If the custom data carries a `revenue` or `amount` key, the ingestion service logs a warning to use `trackPurchase` instead; the event is still accepted as a custom event.
- **Changing an event name after it is used.** A name selected in the app's Custom Events list, a segment or a Flows trigger is matched exactly, so a renamed event no longer matches and the new name must be registered too.
- **Putting variation in the event name.** Use one name and a parameter, not `level_completed_3`.
- **Calling `trackEvent` before `configure`.** The SDK logs a warning and does not queue the event.
- **Calling `trackInstall` as a setup step.** The SDK sends the install itself; a call on a new install sends a second install event.
- **Reusing one key with different types on Android.** A numeric-looking string in a batched event arrives as a number. Send consistent types.
