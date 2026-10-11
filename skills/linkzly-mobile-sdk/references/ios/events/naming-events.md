<!-- Generated from https://docs.linkzly.com/docs/sdk-tracking-events#naming-events by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Naming events

Source: https://docs.linkzly.com/docs/sdk-tracking-events#naming-events

Names are yours to choose, and Linkzly does not reserve any. The one exception is purchases, which always go through `trackPurchase`.

A convention that keeps names easy to find and filter later:

- Use lower snake case: `signup_completed`, not `SignupCompleted` or `Signup Completed`.
- Say the object first and a past-tense verb last: `signup_completed`, `item_added_to_cart`, `level_completed`.
- Use one name per kind of user action. Put the variation in parameters, not in the name. Send `item_added_to_cart` with `{ item_id: "sku_123" }`, not `item_added_to_cart_sku_123`.
- Use lower snake case for parameter keys too: `item_id`, `plan_type`.
- Use strings, numbers or booleans as parameter values. The SDKs also accept nested maps and lists.

What the SDKs and the ingestion service enforce:

- An event name of more than 100 characters is rejected by the ingestion service's request validation. A name must also be registered (see above).
- Custom data accepts any JSON value under a string key.
- The SDK keeps up to 1,000 queued events on the device and drops the oldest when the queue is full.
- On iOS, a parameter value that is not a string, number, boolean, list or map is sent as `null`.
- On Android, a string value that reads as a number or as `true` or `false` (for example `"123"`) is sent as a number or a boolean in a batched event. Send numbers as numbers, and keep identifiers that look like numbers consistent, so the same key does not arrive with two different types. This includes strings such as `"007"`, which arrive as the number 7. An identifier that must stay a string needs a non-numeric prefix, for example `id_007`.
