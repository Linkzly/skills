<!-- Generated from https://docs.linkzly.com/docs/sdk-tracking-events#naming-events by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Naming events

Source: https://docs.linkzly.com/docs/sdk-tracking-events#naming-events

Names are yours to choose. Linkzly reserves only names that start with `__` and the Web SDK's four built-in events (see [Reserved names](../events/event-properties.md)). Purchases always go through `trackPurchase`, never a custom event.

A convention that keeps names easy to find and filter later:

- Use lower snake case: `signup_completed`, not `SignupCompleted` or `Signup Completed`.
- Say the object first and a past-tense verb last: `signup_completed`, `item_added_to_cart`, `level_completed`.
- Use one name per kind of user action. Put the variation in event properties, not in the name. Send `item_added_to_cart` with `{ item_id: "sku_123" }`, not `item_added_to_cart_sku_123`.
- Use lower snake case for event property keys too: `item_id`, `plan_type`. Avoid dots in keys (see [Keys with dots](../events/event-properties.md)).
- Send each key with the same kind of value every time: always text, always a number, always true or false, or always a date. What each kind is sent as is in [Event properties](../events/event-properties.md).

What the SDKs and the ingestion service enforce:

- An event name of more than 255 characters is refused. A name must also be registered (see above).
- Event properties have no limit of their own on count, key length or value length. The size limits that apply are in [Limits](../events/event-properties.md).
- The SDK keeps up to 1,000 queued events on the device and drops the oldest when the queue is full.
